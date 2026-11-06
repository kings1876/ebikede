'use client';
import React, { useEffect, useState } from 'react';
import QRCode from 'qrcode';
import { getWallet } from '../lib/reply/config';
import { money, paymentMethodParts } from '../lib/reply/order';

function CopyRow({ label, value, done, onCopy }: { label: string; value: string; done: string; onCopy: string }) {
  const [ok, setOk] = useState(false);
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(value);
      setOk(true);
      setTimeout(() => setOk(false), 2000);
    } catch {}
  };
  return (
    <div className="flex items-center gap-3 bg-white border border-slate-200 rounded-xl px-4 py-3">
      <div className="min-w-0 flex-1">
        <div className="text-[10px] uppercase tracking-wider font-bold text-slate-400">{label}</div>
        <div className="font-mono text-sm break-all">{value}</div>
      </div>
      <button type="button" onClick={copy} className="shrink-0 text-xs font-bold px-3 py-1.5 rounded-lg bg-slate-900 text-white cursor-pointer">
        {ok ? done : onCopy}
      </button>
    </div>
  );
}

/**
 * Payment panel for a crypto order: wallet address with copy button, network, amount due and a QR code of
 * the address. The wallet comes from config, so it works straight after checkout without any request.
 */
export function CryptoPayCard({
  assetId,
  amount,
  orderNumber,
  lang,
}: {
  assetId?: string;
  amount: number;
  orderNumber: string;
  lang: 'de' | 'en';
}) {
  const wallet = getWallet(assetId) ?? getWallet('usdt')!;
  const de = lang === 'de';
  const [qr, setQr] = useState('');
  useEffect(() => {
    let live = true;
    QRCode.toDataURL(wallet.address, { margin: 1, width: 220, errorCorrectionLevel: 'M' })
      .then((u) => live && setQr(u))
      .catch(() => {});
    return () => {
      live = false;
    };
  }, [wallet.address]);
  const { closing } = paymentMethodParts('crypto', amount, orderNumber, lang);

  return (
    <div className="rounded-3xl border border-emerald-200 bg-emerald-50/50 p-5 sm:p-6 space-y-4">
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <div>
          <div className="text-xs text-slate-500">{de ? 'Zu zahlen (Gegenwert)' : 'Amount due (equivalent)'}</div>
          <div className="text-3xl font-black text-emerald-700">{money(amount, lang)}</div>
        </div>
        <div className="text-right">
          <div className="text-xs text-slate-500">{de ? 'Zahlung in' : 'Pay with'}</div>
          <div className="text-lg font-black text-slate-900">
            {wallet.symbol} <span className="text-sm font-semibold text-slate-500">({wallet.network})</span>
          </div>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-[auto_1fr] items-start">
        <div className="mx-auto sm:mx-0 rounded-2xl bg-white border border-slate-200 p-2 w-[236px] h-[236px] flex items-center justify-center">
          {qr ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={qr} width={220} height={220} alt={de ? `QR-Code der ${wallet.symbol}-Adresse` : `QR code of the ${wallet.symbol} address`} />
          ) : (
            <span className="text-xs text-slate-400">QR…</span>
          )}
        </div>
        <div className="space-y-2 min-w-0">
          <CopyRow label={de ? 'Wallet-Adresse' : 'Wallet address'} value={wallet.address} done={de ? 'Kopiert ✓' : 'Copied ✓'} onCopy={de ? 'Kopieren' : 'Copy'} />
          <CopyRow label={de ? 'Netzwerk' : 'Network'} value={wallet.network} done={de ? 'Kopiert ✓' : 'Copied ✓'} onCopy={de ? 'Kopieren' : 'Copy'} />
          <CopyRow label={de ? 'Bestellnummer' : 'Order number'} value={orderNumber} done={de ? 'Kopiert ✓' : 'Copied ✓'} onCopy={de ? 'Kopieren' : 'Copy'} />
        </div>
      </div>

      <p className="text-xs text-slate-600 leading-relaxed">
        {de
          ? `Sende ausschließlich ${wallet.symbol} über das Netzwerk ${wallet.network} an diese Adresse. `
          : `Send only ${wallet.symbol} on the ${wallet.network} network to this address. `}
        {closing}
      </p>
      <a
        href={`/order/confirm-payment/?id=${encodeURIComponent(orderNumber)}`}
        className="inline-block px-5 py-3 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white text-sm font-bold"
      >
        {de ? 'Ich habe bezahlt – Beleg hochladen' : "I've paid – upload confirmation"}
      </a>
    </div>
  );
}
