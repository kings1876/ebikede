import { Redis } from '@upstash/redis';
import type { StoredOrder, StoredEnquiry } from './order';
import { REPLY } from './config';

// Vercel's Storage tab can assign any of these name pairs depending on the prefix chosen.
const CREDENTIAL_CANDIDATES: [string, string][] = [
  ['UPSTASH_REDIS_REST_URL', 'UPSTASH_REDIS_REST_TOKEN'],
  ['KV_REST_API_URL', 'KV_REST_API_TOKEN'],
  ['STORAGE_REST_API_URL', 'STORAGE_REST_API_TOKEN'],
  ['STORAGE_KV_REST_API_URL', 'STORAGE_KV_REST_API_TOKEN'],
  ['UPSTASH_REDIS_KV_REST_API_URL', 'UPSTASH_REDIS_KV_REST_API_TOKEN'],
];

let cached: Redis | null | undefined;
function getRedis(): Redis | null {
  if (cached !== undefined) return cached;
  for (const [u, t] of CREDENTIAL_CANDIDATES) {
    const url = process.env[u];
    const token = process.env[t];
    if (url && token) {
      cached = new Redis({ url, token });
      return cached;
    }
  }
  cached = null;
  return null;
}

export const isStoreConfigured = () => getRedis() !== null;

const prefix = REPLY.orderPrefix.toLowerCase();
const ORDERS = `${prefix}:orders`;
const ENQUIRIES = `${prefix}:enquiries`;

const parse = <T,>(v: unknown): T => (typeof v === 'string' ? JSON.parse(v) : (v as T));

async function put<T extends object>(key: string, id: string, value: T) {
  const r = getRedis();
  if (r) await r.hset(key, { [id]: JSON.stringify(value) });
}
async function list<T extends { createdAt: string }>(key: string): Promise<T[]> {
  const r = getRedis();
  if (!r) return [];
  const all = await r.hgetall(key);
  if (!all) return [];
  return Object.values(all)
    .map((v) => parse<T>(v))
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
}
async function get<T>(key: string, id: string): Promise<T | null> {
  const r = getRedis();
  if (!r) return null;
  const raw = await r.hget(key, id);
  return raw ? parse<T>(raw) : null;
}
async function del(key: string, id: string) {
  const r = getRedis();
  if (r) await r.hdel(key, id);
}

export const saveOrder = (o: StoredOrder) => put(ORDERS, o.orderNumber, o);
export const listOrders = () => list<StoredOrder>(ORDERS);
export const getOrder = (id: string) => get<StoredOrder>(ORDERS, id);
export const deleteOrder = (id: string) => del(ORDERS, id);

export async function markOrderSent(id: string, paymentDetails: StoredOrder['paymentDetails']) {
  const o = await getOrder(id);
  if (!o) return;
  o.status = 'payment-sent';
  o.paymentDetails = paymentDetails;
  await saveOrder(o);
}

export async function markPaymentConfirmed(id: string, note?: string) {
  const o = await getOrder(id);
  if (!o) return;
  o.status = 'payment-confirmed';
  o.paymentConfirmation = { note, at: new Date().toISOString() };
  await saveOrder(o);
}

export const saveEnquiry = (e: StoredEnquiry) => put(ENQUIRIES, e.id, e);
export const listEnquiries = () => list<StoredEnquiry>(ENQUIRIES);
export const getEnquiry = (id: string) => get<StoredEnquiry>(ENQUIRIES, id);
export const deleteEnquiry = (id: string) => del(ENQUIRIES, id);

export async function markEnquiryReplied(id: string, text?: string, from: 'us' | 'customer' = 'us') {
  const e = await getEnquiry(id);
  if (!e) return;
  if (from === 'us') e.status = 'replied';
  if (text) e.thread = [...(e.thread || []), { from, text, at: new Date().toISOString() }];
  await saveEnquiry(e);
}
