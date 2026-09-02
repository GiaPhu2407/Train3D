import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export type Currency = 'VND' | 'USD' | 'EUR' | 'JPY';

export const CURRENCY_RATES: Record<Currency, { rate: number; symbol: string; decimals: number; prefix: boolean }> = {
  VND: { rate: 1, symbol: '₫', decimals: 0, prefix: false },
  USD: { rate: 0.000039, symbol: '$', decimals: 0, prefix: true },
  EUR: { rate: 0.000036, symbol: '€', decimals: 0, prefix: true },
  JPY: { rate: 0.0061, symbol: '¥', decimals: 0, prefix: true },
};

export function formatCurrency(amountVND: number, currency: Currency = 'VND'): string {
  const info = CURRENCY_RATES[currency] || CURRENCY_RATES.VND;
  const converted = amountVND * info.rate;
  
  const formattedNumber = new Intl.NumberFormat('en-US', {
    maximumFractionDigits: info.decimals,
    minimumFractionDigits: info.decimals,
  }).format(converted);

  if (info.prefix) {
    return `${info.symbol}${formattedNumber}`;
  }
  return `${formattedNumber} ${info.symbol}`;
}

export function generatePNR(): string {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  let pnr = 'RW-';
  for (let i = 0; i < 6; i++) {
    pnr += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return pnr;
}

export function formatDate(dateString: string): string {
  if (!dateString) return '';
  const date = new Date(dateString);
  if (isNaN(date.getTime())) return dateString;
  return date.toLocaleDateString('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });
}
