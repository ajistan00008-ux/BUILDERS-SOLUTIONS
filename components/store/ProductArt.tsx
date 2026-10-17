"use client";

import React from 'react';
import type { Form, Product } from '../../content/daily';

/**
 * Pack illustrations are drawn rather than photographed: the storefront ships
 * before the first consignment case lands, and a partner brand's product
 * photography is not ours to publish until they are a partner. Replace these
 * with studio shots taken in Manama as each brand signs.
 *
 * One silhouette per pack format, tinted per category so a grid of thirty
 * products still reads as a shelf rather than a wall of identical bottles.
 */

const TINTS: Record<string, { light: string; dark: string; cap: string }> = {
  hair: { light: '#cfe3c9', dark: '#4c7f47', cap: '#2d512c' },
  skin: { light: '#d9e4ef', dark: '#4a6f94', cap: '#2e4a63' },
  body: { light: '#f0e0cf', dark: '#b07f4e', cap: '#6f4e2d' },
  grooming: { light: '#d8d6d2', dark: '#5d5a54', cap: '#36342f' },
  fragrance: { light: '#e6d9ea', dark: '#7c5a8c', cap: '#4b3458' },
};

const fallback = { light: '#dfe2d9', dark: '#5d6b58', cap: '#333d31' };

function Sprig({ x = 0, y = 0, scale = 1, flip = false, color = '#4c7f47' }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${flip ? -scale : scale} ${scale})`} opacity="0.7">
      <path d="M0 0 C 5 -12 5 -26 2 -38" stroke={color} strokeWidth="1.5" fill="none" strokeLinecap="round" />
      {[0, 1, 2, 3, 4].map((i) => {
        const ty = -5 - i * 7;
        return (
          <g key={i}>
            <path d={`M1 ${ty} C 9 ${ty - 3} 12 ${ty - 7} 14 ${ty - 11}`} stroke={color} strokeWidth="1.4" fill="none" strokeLinecap="round" />
            <path d={`M1 ${ty} C -7 ${ty - 3} -10 ${ty - 7} -12 ${ty - 11}`} stroke={color} strokeWidth="1.4" fill="none" strokeLinecap="round" />
          </g>
        );
      })}
    </g>
  );
}

/** Pack outlines, drawn to a common 200×260 box so a grid lines up. */
function Pack({ form, uid, cap }: { form: Form; uid: string; cap: string }) {
  const body = `url(#glass-${uid})`;
  const liquid = `url(#liquid-${uid})`;

  switch (form) {
    case 'pump':
      return (
        <g>
          <path d="M100 14 h17 a4 4 0 0 1 4 4 v6 h-21 z" fill={cap} />
          <rect x="96" y="18" width="8" height="28" fill={cap} />
          <rect x="84" y="44" width="32" height="14" rx="3" fill={cap} />
          <rect x="62" y="58" width="76" height="146" rx="14" fill={body} stroke={cap} strokeWidth="2" />
          <rect x="68" y="98" width="64" height="100" rx="10" fill={liquid} opacity="0.75" />
        </g>
      );
    case 'tube':
      return (
        <g>
          <rect x="86" y="30" width="28" height="18" rx="4" fill={cap} />
          <path d="M70 48 H130 L136 196 a8 8 0 0 1 -8 9 H72 a8 8 0 0 1 -8 -9 Z" fill={body} stroke={cap} strokeWidth="2" />
          <path d="M66 110 H134 L131 196 a6 6 0 0 1 -6 6 H75 a6 6 0 0 1 -6 -6 Z" fill={liquid} opacity="0.72" />
          <rect x="64" y="196" width="72" height="10" rx="3" fill={cap} opacity="0.85" />
        </g>
      );
    case 'jar':
      return (
        <g>
          <rect x="56" y="58" width="88" height="24" rx="8" fill={cap} />
          <path d="M60 80 H140 a8 8 0 0 1 8 8 V188 a12 12 0 0 1 -12 12 H64 a12 12 0 0 1 -12 -12 V88 a8 8 0 0 1 8 -8 z" fill={body} stroke={cap} strokeWidth="2" />
          <rect x="62" y="118" width="76" height="76" rx="8" fill={liquid} opacity="0.75" />
        </g>
      );
    case 'stick':
      return (
        <g>
          <path d="M74 44 H126 a6 6 0 0 1 6 6 v18 H68 V50 a6 6 0 0 1 6 -6 z" fill={cap} />
          <rect x="68" y="68" width="64" height="130" rx="10" fill={body} stroke={cap} strokeWidth="2" />
          <rect x="74" y="106" width="52" height="86" rx="7" fill={liquid} opacity="0.75" />
          <rect x="78" y="198" width="44" height="12" rx="4" fill={cap} opacity="0.85" />
        </g>
      );
    case 'dropper':
      return (
        <g>
          <rect x="82" y="30" width="36" height="20" rx="4" fill={cap} />
          <rect x="90" y="14" width="20" height="18" rx="7" fill={cap} opacity="0.8" />
          <rect x="74" y="50" width="52" height="132" rx="10" fill={body} stroke={cap} strokeWidth="2" />
          <rect x="80" y="84" width="40" height="92" rx="7" fill={liquid} opacity="0.75" />
        </g>
      );
    case 'refill':
      return (
        <g>
          <rect x="86" y="26" width="28" height="18" rx="3" fill={cap} />
          <path d="M58 44 H142 a10 10 0 0 1 10 10 V198 a10 10 0 0 1 -10 10 H58 a10 10 0 0 1 -10 -10 V54 a10 10 0 0 1 10 -10 z" fill={body} stroke={cap} strokeWidth="2" />
          <path d="M56 84 H144 V196 a6 6 0 0 1 -6 6 H62 a6 6 0 0 1 -6 -6 z" fill={liquid} opacity="0.75" />
        </g>
      );
    case 'box':
      return (
        <g>
          <path d="M54 72 L100 50 L146 72 L100 94 Z" fill={body} stroke={cap} strokeWidth="2" strokeLinejoin="round" />
          <path d="M54 72 V190 L100 212 V94 Z" fill={liquid} opacity="0.65" stroke={cap} strokeWidth="2" strokeLinejoin="round" />
          <path d="M146 72 V190 L100 212 V94 Z" fill={body} stroke={cap} strokeWidth="2" strokeLinejoin="round" />
          <path d="M100 94 V212" stroke={cap} strokeWidth="1.2" opacity="0.5" />
        </g>
      );
    case 'spray':
    default:
      return (
        <g>
          <path d="M78 22 h30 a6 6 0 0 1 6 6 v10 h-36 z" fill={cap} />
          <path d="M74 32 l-16 6 a3 3 0 0 0 1 6 l15 -3 z" fill={cap} />
          <rect x="86" y="38" width="28" height="12" rx="3" fill={cap} />
          <rect x="66" y="50" width="68" height="152" rx="12" fill={body} stroke={cap} strokeWidth="2" />
          <rect x="72" y="92" width="56" height="104" rx="8" fill={liquid} opacity="0.75" />
          <rect x="98" y="58" width="3" height="40" rx="1.5" fill={cap} opacity="0.5" />
        </g>
      );
  }
}

export function ProductArt({
  product,
  className = '',
}: {
  product: Pick<Product, 'form' | 'size' | 'name' | 'category'> & Partial<Pick<Product, 'artLabel'>>;
  className?: string;
}) {
  const tint = TINTS[product.category] ?? fallback;
  const uid = `${product.category}-${product.form}`;
  // The drawn label panel fits about ten characters.
  const label = product.artLabel ?? product.size;
  const lowLabel = product.form === 'dropper' || product.form === 'stick';

  return (
    <svg
      viewBox="0 0 200 260"
      className={className}
      role="img"
      aria-label={`${product.name}, ${product.size}`}
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id={`glass-${uid}`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.95" />
          <stop offset="38%" stopColor={tint.light} stopOpacity="0.9" />
          <stop offset="100%" stopColor={tint.light} stopOpacity="1" />
        </linearGradient>
        <linearGradient id={`liquid-${uid}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={tint.light} />
          <stop offset="100%" stopColor={tint.dark} />
        </linearGradient>
      </defs>

      <ellipse cx="100" cy="232" rx="52" ry="8" fill="#12180f" opacity="0.08" />
      <Sprig x={38} y={208} scale={0.95} color={tint.dark} />
      <Sprig x={164} y={214} scale={0.8} flip color={tint.dark} />

      <Pack form={product.form} uid={uid} cap={tint.cap} />

      <rect
        x={product.form === 'box' ? 62 : 66}
        y={lowLabel ? 118 : 128}
        width={product.form === 'box' ? 34 : 68}
        height="42"
        rx="4"
        fill="#fbfaf5"
        stroke={tint.cap}
        strokeWidth="1.2"
        opacity="0.96"
      />
      <text
        x={product.form === 'box' ? 79 : 100}
        y={lowLabel ? 136 : 146}
        textAnchor="middle"
        fontSize={product.form === 'box' ? 6 : 8}
        letterSpacing="1.2"
        fill={tint.cap}
        fontFamily="var(--font-mono), monospace"
      >
        DAILY.BH
      </text>
      <text
        x={product.form === 'box' ? 79 : 100}
        y={lowLabel ? 150 : 160}
        textAnchor="middle"
        fontSize={product.form === 'box' ? 8 : 11}
        fontWeight="700"
        fill={tint.dark}
        fontFamily="var(--font-body), sans-serif"
      >
        {label}
      </text>
    </svg>
  );
}
