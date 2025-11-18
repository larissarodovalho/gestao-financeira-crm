'use client';

import { useState } from 'react';
import { 
  BarChart3, 
  TrendingUp,
  Users,
  Building2,
  DollarSign,
  Target,
  Calendar,
  Download,
  Filter
} from 'lucide-react';
import { 
  mockDashboardStats, 
  mockMonthlyRevenue,
  mockSales,
  mockClients,
  mockProperties,
  mockOpportunities
} from '@/lib/mock-data';
import { formatCurrency } from '@/lib/constants';

export default function RelatoriosPage() {
  const [selectedPeriod, setSelectedPeriod] = useState('month');

  // Calcular métricas
  const totalSales = mockSales.length;
  const totalRevenue = mockSales.reduce((sum, s) => sum + s.propertyValue, 0);
  const totalCommission = mockSales.reduce((sum, s) => sum + s.commissionValue, 0);
  const averageTicket = totalSales > 0 ? totalRevenue / totalSales : 0;

  // Origem dos leads
  const leadsByOrigin = mockClients.reduce((acc, client) => {
    acc[client.origin] = (acc[client.origin] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const originData = Object.entries(leadsByOrigin).map(([origin, count]) => ({
    origin,
    count,
    percentage: (count / mockClients.length) * 100
  }));

  // Status dos clientes
  const clientsByStatus = mockClients.reduce((acc, client) => {
    acc[client.status] = (acc[client.status] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  // Funil de vendas
  const opportunitiesByStage = mockOpportunities.reduce((acc, opp) => {
    acc[opp.stage] = (acc[opp.stage] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const getOriginLabel = (origin: string) => {
    const originMap: Record<string, string> = {
      instagram: 'Instagram',
      facebook: 'Facebook',
      google: 'Google',
      indicacao: 'Indicação',
      site: 'Site',
      outro: 'Outro',
    };
    return originMap[origin] || origin;
  };

  const getStatusLabel = (status: string) => {
    const statusMap: Record<string, string> = {
      lead_novo: 'Lead Novo',
      lead_nutricao: 'Em Nutrição',
      cliente_ativo: 'Cliente Ativo',
      cliente_comprador: 'Comprador',
      inativo: 'Inativo',
    };
    return statusMap[status] || status;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Relatórios</h1>
          <p className="mt-2 text-gray-600">
            Análise completa do seu desempenho
          </p>
        </div>
        <div className="flex items-center gap-3">
          <select
            value={selectedPeriod}
            onChange={(e) => setSelectedPeriod(e.target.value)}
            className="px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="week">Última Semana</option>
            <option value="month">Último Mês</option>
            <option value="quarter">Último Trimestre</option>
            <option value="year">Último Ano</option>
          </select>
          <button className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-xl font-medium hover:from-blue-700 hover:to-cyan-700 transition-all shadow-lg hover:shadow-xl">
            <Download className="h-5 w-5" />
            Exportar
          </button>
        </div>
      </div>

      {/* KPIs Principais */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-100">
              <Target className="h-6 w-6 text-blue-600" />
            </div>
            <TrendingUp className="h-5 w-5 text-green-600" />
          </div>
          <p className="text-sm text-gray-600 mb-1">Total de Vendas</p>
          <p className="text-2xl font-bold text-gray-900">{totalSales}</p>
          <p className="text-xs text-green-600 mt-2">↑ 15% vs período anterior</p>
        </div>

        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-green-100">
              <DollarSign className="h-6 w-6 text-green-600" />
            </div>
            <TrendingUp className="h-5 w-5 text-green-600" />
          </div>
          <p className="text-sm text-gray-600 mb-1">Receita Total</p>
          <p className="text-2xl font-bold text-gray-900">{formatCurrency(totalRevenue)}</p>
          <p className="text-xs text-green-600 mt-2">↑ 22% vs período anterior</p>
        </div>

        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-purple-100">
              <BarChart3 className="h-6 w-6 text-purple-600" />
            </div>
            <TrendingUp className="h-5 w-5 text-green-600" />
          </div>
          <p className="text-sm text-gray-600 mb-1">Comissões</p>
          <p className="text-2xl font-bold text-gray-900">{formatCurrency(totalCommission)}</p>
          <p className="text-xs text-green-600 mt-2">↑ 18% vs período anterior</p>
        </div>

        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-orange-100">
              <TrendingUp className="h-6 w-6 text-orange-600" />
            </div>
            <TrendingUp className="h-5 w-5 text-green-600" />
          </div>
          <p className="text-sm text-gray-600 mb-1">Ticket Médio</p>
          <p className="text-2xl font-bold text-gray-900">{formatCurrency(averageTicket)}</p>
          <p className="text-xs text-green-600 mt-2">↑ 8% vs período anterior</p>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Receita Mensal */}
        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
          <h3 className="text-lg font-bold text-gray-900 mb-6">Receita Mensal</h3>
          <div className="space-y-4">
            {mockMonthlyRevenue.map((month) => {
              const total = month.received + month.pending;
              const receivedPercentage = total > 0 ? (month.received / total) * 100 : 0;
              
              return (
                <div key={month.month}>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-gray-700">{month.month}</span>
                    <span className="text-sm font-bold text-gray-900">{formatCurrency(total)}</span>
                  </div>
                  <div className="h-8 bg-gray-100 rounded-lg overflow-hidden">
                    <div className="h-full flex">
                      <div 
                        className="bg-gradient-to-r from-green-500 to-emerald-500"
                        style={{ width: `${receivedPercentage}%` }}
                      />
                      <div 
                        className="bg-gradient-to-r from-yellow-400 to-orange-400"
                        style={{ width: `${100 - receivedPercentage}%` }}
                      />
                    </div>
                  </div>
                  <div className="flex items-center justify-between mt-1 text-xs text-gray-500">
                    <span>Recebido: {formatCurrency(month.received)}</span>
                    <span>Pendente: {formatCurrency(month.pending)}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Origem dos Leads */}
        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
          <h3 className="text-lg font-bold text-gray-900 mb-6">Origem dos Leads</h3>
          <div className="space-y-4">
            {originData.sort((a, b) => b.count - a.count).map((item, index) => {
              const colors = [
                'from-blue-500 to-cyan-500',
                'from-purple-500 to-pink-500',
                'from-green-500 to-emerald-500',
                'from-orange-500 to-red-500',
                'from-yellow-500 to-orange-500',
              ];
              
              return (
                <div key={item.origin}>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-gray-700">{getOriginLabel(item.origin)}</span>
                    <span className="text-sm font-bold text-gray-900">{item.count} leads</span>
                  </div>
                  <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
                    <div 
                      className={`h-full bg-gradient-to-r ${colors[index % colors.length]} rounded-full transition-all`}
                      style={{ width: `${item.percentage}%` }}
                    />
                  </div>
                  <p className="text-xs text-gray-500 mt-1">{item.percentage.toFixed(1)}% do total</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Status e Funil */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Status dos Clientes */}
        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
          <h3 className="text-lg font-bold text-gray-900 mb-6">Status dos Clientes</h3>
          <div className="space-y-3">
            {Object.entries(clientsByStatus).map(([status, count]) => {
              const percentage = (count / mockClients.length) * 100;
              const statusColors: Record<string, string> = {
                lead_novo: 'bg-blue-500',
                lead_nutricao: 'bg-yellow-500',
                cliente_ativo: 'bg-green-500',
                cliente_comprador: 'bg-purple-500',
                inativo: 'bg-gray-400',
              };
              
              return (
                <div key={status} className="flex items-center gap-4">
                  <div className={`h-10 w-10 rounded-lg ${statusColors[status]} flex items-center justify-center text-white font-bold flex-shrink-0`}>
                    {count}
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900">{getStatusLabel(status)}</p>
                    <div className="h-2 bg-gray-100 rounded-full overflow-hidden mt-1">
                      <div 
                        className={`h-full ${statusColors[status]} rounded-full`}
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                  </div>
                  <span className="text-sm text-gray-600">{percentage.toFixed(0)}%</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Performance Geral */}
        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
          <h3 className="text-lg font-bold text-gray-900 mb-6">Performance Geral</h3>
          <div className="space-y-6">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-gray-600">Taxa de Conversão</span>
                <span className="text-lg font-bold text-gray-900">{mockDashboardStats.conversionRate}%</span>
              </div>
              <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full"
                  style={{ width: `${mockDashboardStats.conversionRate}%` }}
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 pt-4 border-t border-gray-200">
              <div className="text-center p-4 rounded-lg bg-blue-50">
                <Users className="h-6 w-6 text-blue-600 mx-auto mb-2" />
                <p className="text-2xl font-bold text-gray-900">{mockClients.length}</p>
                <p className="text-xs text-gray-600">Total Clientes</p>
              </div>
              <div className="text-center p-4 rounded-lg bg-green-50">
                <Building2 className="h-6 w-6 text-green-600 mx-auto mb-2" />
                <p className="text-2xl font-bold text-gray-900">{mockProperties.length}</p>
                <p className="text-xs text-gray-600">Total Imóveis</p>
              </div>
              <div className="text-center p-4 rounded-lg bg-purple-50">
                <Target className="h-6 w-6 text-purple-600 mx-auto mb-2" />
                <p className="text-2xl font-bold text-gray-900">{mockOpportunities.length}</p>
                <p className="text-xs text-gray-600">Oportunidades</p>
              </div>
              <div className="text-center p-4 rounded-lg bg-orange-50">
                <Calendar className="h-6 w-6 text-orange-600 mx-auto mb-2" />
                <p className="text-2xl font-bold text-gray-900">{totalSales}</p>
                <p className="text-xs text-gray-600">Vendas Fechadas</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
