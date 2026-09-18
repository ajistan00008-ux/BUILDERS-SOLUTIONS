"use client";

import React from 'react';
import type { Sku } from '../../content/rosemary';

/**
 * Product illustrations are drawn rather than photographed: the storefront ships
 * before the first container lands, and hotlinking the supplier's product
 * photography is not ours to do. Swap these for real studio shots once the
 * first PO is photographed in Manama.
 */

const LEAF = '#4c7f47';
const LEAF_DARK = '#2d512c';

function Sprig({ x = 0, y = 0, scale = 1, flip = false }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${flip ? -scale : scale} ${scale})`} opacity="0.85">
      <path d="M0 0 C 6 -14 6 -30 2 -44" stroke={LEAF_DARK} strokeWidth="1.6" fill="none" strokeLinecap="round" />
      {[0, 1, 2, 3, 4, 5].map((i) => {
        const ty = -6 - i * 7;
        const tx = 1 + i * 0.9;
        return (
          <g key={i}>
            <path d={`M${tx} ${ty} C ${tx + 9} ${ty - 3} ${tx + 13} ${ty - 8} ${tx + 15} ${ty - 12}`} stroke={LEAF} strokeWidth="1.5" fill="none" strokeLinecap="round" />
            <path d={`M${tx} ${ty} C ${tx - 8} ${ty - 4} ${tx - 12} ${ty - 9} ${tx - 14} ${ty - 13}`} stroke={LEAF} strokeWidth="1.5" fill="none" strokeLinecap="round" />
          </g>
        );
      })}
    </g>
  );
}

export function BottleArt({
  sku,
  className = '',
}: {
  sku: Pick<Sku, 'art' | 'size' | 'name'> & Partial<Pick<Sku, 'artLabel'>>;
  className?: string;
}) {
  // The drawn label panel fits about ten characters; bundles carry a short form.
  const label = sku.artLabel ?? sku.size;

  return (
    <svg
      viewBox="0 0 200 260"
      className={className}
      role="img"
      aria-label={`${sku.name}, ${sku.size}`}
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id={`glass-${sku.art}`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.95" />
          <stop offset="38%" stopColor="#e6efe3" stopOpacity="0.9" />
          <stop offset="100%" stopColor="#c2d8bd" stopOpacity="0.85" />
        </linearGradient>
        <linearGradient id={`liquid-${sku.art}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#98bc91" />
          <stop offset="100%" stopColor="#4c7f47" />
        </linearGradient>
      </defs>

      <ellipse cx="100" cy="236" rx="52" ry="8" fill="#12180f" opacity="0.08" />
      <Sprig x={38} y={210} scale={1.05} />
      <Sprig x={164} y={216} scale={0.9} flip />

      {sku.art === 'dropper' ? (
        <g>
          <rect x="82" y="34" width="36" height="20" rx="4" fill={LEAF_DARK} />
          <rect x="90" y="18" width="20" height="18" rx="7" fill="#8a5a33" />
          <rect x="74" y="54" width="52" height="128" rx="10" fill={`url(#glass-${sku.art})`} stroke={LEAF_DARK} strokeWidth="2" />
          <rect x="80" y="86" width="40" height="90" rx="7" fill={`url(#liquid-${sku.art})`} opacity="0.75" />
        </g>
      ) : sku.art === 'refill' ? (
        <g>
          <rect x="86" y="26" width="28" height="18" rx="3" fill={LEAF_DARK} />
          <path d="M58 44 H142 a10 10 0 0 1 10 10 V198 a10 10 0 0 1 -10 10 H58 a10 10 0 0 1 -10 -10 V54 a10 10 0 0 1 10 -10 z" fill={`url(#glass-${sku.art})`} stroke={LEAF_DARK} strokeWidth="2" />
          <path d="M56 84 H144 V196 a6 6 0 0 1 -6 6 H62 a6 6 0 0 1 -6 -6 z" fill={`url(#liquid-${sku.art})`} opacity="0.78" />
        </g>
      ) : sku.art === 'pump' ? (
        <g>
          <path d="M100 16 h16 a4 4 0 0 1 4 4 v6 h-20 z" fill={LEAF_DARK} />
          <rect x="96" y="20" width="8" height="26" fill={LEAF_DARK} />
          <rect x="84" y="44" width="32" height="14" rx="3" fill="#254124" />
          <rect x="62" y="58" width="76" height="146" rx="14" fill={`url(#glass-${sku.art})`} stroke={LEAF_DARK} strokeWidth="2" />
          <rect x="68" y="98" width="64" height="100" rx="10" fill={`url(#liquid-${sku.art})`} opacity="0.78" />
        </g>
      ) : (
        <g>
          {/* trigger spray */}
          <path d="M78 22 h30 a6 6 0 0 1 6 6 v10 h-36 z" fill={LEAF_DARK} />
          <path d="M74 32 l-16 6 a3 3 0 0 0 1 6 l15 -3 z" fill={LEAF_DARK} />
          <rect x="86" y="38" width="28" height="12" rx="3" fill="#254124" />
          <rect x="66" y="50" width="68" height="152" rx="12" fill={`url(#glass-${sku.art})`} stroke={LEAF_DARK} strokeWidth="2" />
          <rect x="72" y="92" width="56" height="104" rx="8" fill={`url(#liquid-${sku.art})`} opacity="0.78" />
          <rect x="98" y="58" width="3" height="40" rx="1.5" fill={LEAF_DARK} opacity="0.5" />
        </g>
      )}

      {/* paper label */}
      <rect
        x={sku.art === 'dropper' ? 78 : sku.art === 'refill' ? 60 : 68}
        y={sku.art === 'dropper' ? 104 : 120}
        width={sku.art === 'dropper' ? 44 : sku.art === 'refill' ? 80 : 64}
        height="46"
        rx="4"
        fill="#fbfaf5"
        stroke={LEAF_DARK}
        strokeWidth="1.2"
        opacity="0.96"
      />
      <text
        x="100"
        y={sku.art === 'dropper' ? 124 : 140}
        textAnchor="middle"
        fontSize="9"
        letterSpacing="1.4"
        fill={LEAF_DARK}
        fontFamily="var(--font-mono), monospace"
      >
        ROSEMARY
      </text>
      <text
        x="100"
        y={sku.art === 'dropper' ? 138 : 156}
        textAnchor="middle"
        fontSize="11"
        fontWeight="700"
        fill={LEAF}
        fontFamily="var(--font-body), sans-serif"
      >
        {label}
      </text>
    </svg>
  );
}
