import { SITE_NAME, TOOLS, callTool, json, preflight } from '../../../lib/agent';

export const dynamic = 'force-dynamic';
export const OPTIONS = preflight;

const PROTOCOL = '2025-03-26';

function handle(msg: any): any | null {
  const id = msg?.id ?? null;
  const err = (code: number, message: string) => ({ jsonrpc: '2.0', id, error: { code, message } });
  if (!msg || msg.jsonrpc !== '2.0' || typeof msg.method !== 'string') return err(-32600, 'Invalid Request');
  if (msg.id === undefined) return null; // notification
  switch (msg.method) {
    case 'initialize':
      return { jsonrpc: '2.0', id, result: { protocolVersion: PROTOCOL, capabilities: { tools: { listChanged: false } }, serverInfo: { name: SITE_NAME, version: '1.0.0' } } };
    case 'ping':
      return { jsonrpc: '2.0', id, result: {} };
    case 'tools/list':
      return { jsonrpc: '2.0', id, result: { tools: TOOLS } };
    case 'tools/call': {
      const name = msg.params?.name;
      if (typeof name !== 'string') return err(-32602, 'Missing tool name');
      const r = callTool(name, msg.params?.arguments || {});
      if (!r.ok && /Unknown tool/.test(r.error || '')) return err(-32602, r.error || 'Unknown tool');
      return { jsonrpc: '2.0', id, result: { content: [{ type: 'text', text: JSON.stringify(r.ok ? r.data : { error: r.error }) }], isError: !r.ok } };
    }
    default:
      return err(-32601, 'Method not found: ' + msg.method);
  }
}

export async function POST(req: Request) {
  let body: any;
  try { body = await req.json(); } catch { return json({ jsonrpc: '2.0', id: null, error: { code: -32700, message: 'Parse error' } }, 400, { 'Cache-Control': 'no-store' }); }
  if (Array.isArray(body)) {
    const out = body.map(handle).filter((x) => x !== null);
    return out.length ? json(out, 200, { 'Cache-Control': 'no-store' }) : new Response(null, { status: 202 });
  }
  const res = handle(body);
  return res ? json(res, 200, { 'Cache-Control': 'no-store' }) : new Response(null, { status: 202, headers: { 'Access-Control-Allow-Origin': '*' } });
}

export function GET() {
  return new Response('POST JSON-RPC 2.0 messages to this endpoint (MCP Streamable HTTP).', { status: 405, headers: { Allow: 'POST, OPTIONS', 'Content-Type': 'text/plain', 'Access-Control-Allow-Origin': '*' } });
}
