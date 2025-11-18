'use client';

import { formatCurrency } from '@/lib/constants';
import { MonthlyRevenue } from '@/lib/types';

interface StatsOverviewProps {
  monthlyRevenue: MonthlyRevenue[];
}

export default function StatsOverview({ monthlyRevenue }: StatsOverviewProps) {
  const maxValue = Math.max(
    ...monthlyRevenue.map(m => Math.max(m.received, m.pending))
  );

  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h3 className="text-lg font-bold text-gray-900">Fluxo de Caixa</h3>
          <p className="text-sm text-gray-500">Comissões recebidas vs. pendentes</p>
        </div>
        <div className="flex gap-4 text-sm">
          <div className="flex items-center gap-2">
            <div className="h-3 w-3 rounded-full bg-gradient-to-r from-green-500 to-emerald-500"></div>
            <span className="text-gray-600">Recebido</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="h-3 w-3 rounded-full bg-gradient-to-r from-orange-500 to-red-500"></div>
            <span className="text-gray-600">Pendente</span>
          </div>
        </div>
      </div>

      {/* Chart */}
      <div className="space-y-4">
        {monthlyRevenue.map((month) => (
          <div key={month.month} className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="font-medium text-gray-700">{month.month}</span>
              <div className="flex gap-4">
                <span className="text-green-600 font-medium">
                  {formatCurrency(month.received)}
                </span>
                <span className="text-orange-600 font-medium">
                  {formatCurrency(month.pending)}
                </span>
              </div>
            </div>
            <div className="flex gap-1 h-8">
              {/* Received Bar */}
              <div
                className="bg-gradient-to-r from-green-500 to-emerald-500 rounded-lg transition-all"
                style={{ width: `${(month.received / maxValue) * 100}%` }}
              />
              {/* Pending Bar */}
              <div
                className="bg-gradient-to-r from-orange-500 to-red-500 rounded-lg transition-all"
                style={{ width: `${(month.pending / maxValue) * 100}%` }}
              />
            </div>
          </div>
        ))}
      </div>

      {/* Summary */}
      <div className="mt-6 grid grid-cols-2 gap-4 border-t border-gray-200 pt-6">
        <div>
          <p className="text-sm text-gray-500">Total Recebido</p>
          <p className="text-2xl font-bold text-green-600">
            {formatCurrency(monthlyRevenue.reduce((acc, m) => acc + m.received, 0))}
          </p>
        </div>
        <div>
          <p className="text-sm text-gray-500">Total Pendente</p>
          <p className="text-2xl font-bold text-orange-600">
            {formatCurrency(monthlyRevenue.reduce((acc, m) => acc + m.pending, 0))}
          </p>
        </div>
      </div>
    </div>
  );
}
