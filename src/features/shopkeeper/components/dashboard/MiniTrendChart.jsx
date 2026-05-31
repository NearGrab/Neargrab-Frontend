import React from 'react';
import { AreaChart, Area, ResponsiveContainer } from 'recharts';

export default function MiniTrendChart({ trendData = [], isPositive = true }) {
  if (!trendData || trendData.length === 0) return null;

  // Format the simple flat array into Recharts-friendly objects
  const data = trendData.map((val, index) => ({ day: index, value: val }));

  // Emerald brand green or neutral fallback colors
  const strokeColor = isPositive ? '#10B981' : '#6B7280';
  const fillColor = isPositive ? '#E6F4EA' : '#F3F4F6';

  return (
    <div className="w-full h-10 select-none">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data} margin={{ top: 2, right: 2, bottom: 2, left: 2 }}>
          <defs>
            <linearGradient id={`gradient_${isPositive}`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={strokeColor} stopOpacity={0.4} />
              <stop offset="100%" stopColor={fillColor} stopOpacity={0.01} />
            </linearGradient>
          </defs>
          <Area
            type="monotone"
            dataKey="value"
            stroke={strokeColor}
            strokeWidth={1.8}
            fill={`url(#gradient_${isPositive})`}
            dot={false}
            animationDuration={800}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
