import React, { useState } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';
import { useShopkeeperDashboardStore } from '../../../../store/useShopkeeperDashboardStore';

export default function PerformanceOverview() {
  const { performanceData } = useShopkeeperDashboardStore();
  const [timeframe, setTimeframe] = useState('Last 7 Days');

  // Custom premium styled tooltip
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white border border-neutral-100 p-3 rounded-2xl shadow-lg text-left text-xs font-inter min-w-[150px]">
          <span className="font-poppins font-bold text-text-primary block mb-2">{label}</span>
          <div className="flex flex-col gap-1.5 font-semibold">
            {payload.map((entry) => (
              <div key={entry.name} className="flex items-center justify-between gap-4">
                <span className="flex items-center gap-1.5 text-text-secondary">
                  <span className="w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: entry.color }} />
                  {entry.name}
                </span>
                <span className="text-text-primary font-bold">{entry.value}</span>
              </div>
            ))}
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="w-full bg-white border border-neutral-100/80 rounded-2xl p-5 shadow-3xs flex flex-col justify-between text-left">
      
      {/* Chart Header block */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="font-poppins font-bold text-sm md:text-base text-brand-900 leading-none">
            Performance Overview
          </h3>
        </div>

        {/* Dropdown date selector */}
        <div className="relative">
          <select
            value={timeframe}
            onChange={(e) => setTimeframe(e.target.value)}
            className="bg-neutral-50 border border-neutral-200 hover:border-neutral-300 rounded-xl py-1.5 pl-3 pr-8 text-[11px] font-bold font-poppins text-text-secondary hover:text-text-primary focus:outline-none focus:ring-4 focus:ring-brand-500/10 focus:border-brand-500 transition-all cursor-pointer appearance-none"
          >
            <option>Last 7 Days</option>
            <option>Last Month</option>
            <option>Last 3 Months</option>
          </select>
          <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none text-text-muted">
            {/* Visual Arrow indicator */}
            <svg className="w-3 h-3 stroke-current" fill="none" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
            </svg>
          </div>
        </div>
      </div>

      {/* Main Chart Workspace */}
      <div className="w-full h-64 md:h-72 select-none">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={performanceData} margin={{ top: 5, right: 10, left: -20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F3F4F6" />
            <XAxis
              dataKey="date"
              axisLine={false}
              tickLine={false}
              tick={{ fill: '#9CA3AF', fontSize: 10, fontWeight: 700, fontFamily: 'Poppins' }}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fill: '#9CA3AF', fontSize: 10, fontWeight: 700, fontFamily: 'Poppins' }}
              tickFormatter={(val) => {
                if (val >= 1000) return `${(val / 1000).toFixed(1)}K`;
                return val;
              }}
            />
            <Tooltip content={<CustomTooltip />} />
            
            {/* Legend visual dots */}
            <Legend
              verticalAlign="top"
              height={36}
              iconType="circle"
              iconSize={6}
              wrapperStyle={{
                fontFamily: 'Poppins',
                fontSize: '10px',
                wrapperStyle: { display: 'none' },
                fontWeight: 700,
                color: '#6B7280'
              }}
              formatter={(value) => <span className="text-text-secondary hover:text-text-primary transition-colors cursor-pointer">{value}</span>}
            />

            {/* Lines */}
            <Line
              type="monotone"
              dataKey="Profile Views"
              stroke="#10B981"
              strokeWidth={2.5}
              dot={{ r: 4, strokeWidth: 1 }}
              activeDot={{ r: 6, strokeWidth: 0 }}
              animationDuration={1000}
            />
            <Line
              type="monotone"
              dataKey="Direction Clicks"
              stroke="#0B3B2C"
              strokeWidth={2.5}
              dot={{ r: 4, strokeWidth: 1 }}
              activeDot={{ r: 6, strokeWidth: 0 }}
              animationDuration={1000}
            />
            <Line
              type="monotone"
              dataKey="Inquiries"
              stroke="#F59E0B"
              strokeWidth={2.5}
              dot={{ r: 4, strokeWidth: 1 }}
              activeDot={{ r: 6, strokeWidth: 0 }}
              animationDuration={1000}
            />
            <Line
              type="monotone"
              dataKey="Followers"
              stroke="#3B82F6"
              strokeWidth={2.5}
              dot={{ r: 4, strokeWidth: 1 }}
              activeDot={{ r: 6, strokeWidth: 0 }}
              animationDuration={1000}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

    </div>
  );
}
