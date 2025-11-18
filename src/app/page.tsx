'use client';

import DashboardCard from '@/components/custom/dashboard-card';
import StatsOverview from '@/components/custom/stats-overview';
import { 
  Users, 
  TrendingUp, 
  DollarSign, 
  Building2,
  Calendar,
  Target,
  ArrowUpRight,
  Clock
} from 'lucide-react';
import { 
  mockDashboardStats, 
  mockMonthlyRevenue,
  mockTopProperties,
  mockTopOrigins,
  mockOpportunities,
  mockClients,
  mockProperties
} from '@/lib/mock-data';
import { formatCurrency, formatDate, calculateDaysAgo, FUNNEL_STAGES } from '@/lib/constants';
import Link from 'next/link';

export default function DashboardPage() {
  const stats = mockDashboardStats;

  // Próximas tarefas (baseado em oportunidades)
  const upcomingTasks = mockOpportunities
    .filter(opp => opp.nextStepDate)
    .sort((a, b) => {
      if (!a.nextStepDate || !b.nextStepDate) return 0;
      return a.nextStepDate.getTime() - b.nextStepDate.getTime();
    })
    .slice(0, 5);

  // Clientes recentes
  const recentClients = [...mockClients]
    .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
    .slice(0, 5);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="mt-2 text-gray-600">
          Visão geral do seu negócio imobiliário
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <DashboardCard
          title="Total de Clientes"
          value={stats.totalClients}
          subtitle="Cadastrados no sistema"
          icon={Users}
          gradient="from-blue-500 to-cyan-500"
          trend={{ value: 12, isPositive: true }}
        />
        <DashboardCard
          title="Oportunidades Ativas"
          value={stats.activeOpportunities}
          subtitle="No funil de vendas"
          icon={TrendingUp}
          gradient="from-purple-500 to-pink-500"
          trend={{ value: 8, isPositive: true }}
        />
        <DashboardCard
          title="Vendas no Mês"
          value={stats.salesThisMonth}
          subtitle="Contratos fechados"
          icon={Target}
          gradient="from-green-500 to-emerald-500"
          trend={{ value: 15, isPositive: true }}
        />
        <DashboardCard
          title="Imóveis Disponíveis"
          value={stats.propertiesAvailable}
          subtitle="Prontos para venda"
          icon={Building2}
          gradient="from-orange-500 to-red-500"
        />
      </div>

      {/* Financial Overview */}
      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-1">
          <div className="space-y-6">
            {/* Comissões Recebidas */}
            <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
              <div className="flex items-center gap-3 mb-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-green-500 to-emerald-500">
                  <DollarSign className="h-6 w-6 text-white" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-600">Comissões Recebidas</p>
                  <p className="text-xs text-gray-400">Este mês</p>
                </div>
              </div>
              <p className="text-3xl font-bold text-green-600">
                {formatCurrency(stats.commissionReceived)}
              </p>
            </div>

            {/* Comissões Pendentes */}
            <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
              <div className="flex items-center gap-3 mb-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-orange-500 to-red-500">
                  <Clock className="h-6 w-6 text-white" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-600">Comissões Pendentes</p>
                  <p className="text-xs text-gray-400">A receber</p>
                </div>
              </div>
              <p className="text-3xl font-bold text-orange-600">
                {formatCurrency(stats.commissionPending)}
              </p>
            </div>

            {/* Métricas Adicionais */}
            <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm space-y-4">
              <div>
                <p className="text-sm text-gray-600">Taxa de Conversão</p>
                <div className="mt-2 flex items-end gap-2">
                  <p className="text-2xl font-bold text-gray-900">{stats.conversionRate}%</p>
                  <span className="text-sm text-green-600 mb-1">↑ 3.2%</span>
                </div>
                <div className="mt-2 h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full"
                    style={{ width: `${stats.conversionRate}%` }}
                  />
                </div>
              </div>
              <div className="pt-4 border-t border-gray-200">
                <p className="text-sm text-gray-600">Ticket Médio</p>
                <p className="mt-1 text-2xl font-bold text-gray-900">
                  {formatCurrency(stats.averageTicket)}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-2">
          <StatsOverview monthlyRevenue={mockMonthlyRevenue} />
        </div>
      </div>

      {/* Bottom Section */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Próximas Tarefas */}
        <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
          <div className="mb-6 flex items-center justify-between">
            <div>
              <h3 className="text-lg font-bold text-gray-900">Próximas Tarefas</h3>
              <p className="text-sm text-gray-500">Ações agendadas no funil</p>
            </div>
            <Link 
              href="/funil"
              className="text-sm font-medium text-blue-600 hover:text-blue-700 flex items-center gap-1"
            >
              Ver funil
              <ArrowUpRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="space-y-4">
            {upcomingTasks.length > 0 ? (
              upcomingTasks.map((task) => {
                const client = mockClients.find(c => c.id === task.clientId);
                const property = mockProperties.find(p => p.id === task.propertyId);
                const stage = FUNNEL_STAGES.find(s => s.value === task.stage);
                
                return (
                  <div key={task.id} className="flex items-start gap-4 p-4 rounded-lg border border-gray-100 hover:border-blue-200 hover:bg-blue-50/50 transition-all">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500 to-cyan-500 flex-shrink-0">
                      <Calendar className="h-5 w-5 text-white" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-gray-900">{task.nextStep}</p>
                      <p className="text-sm text-gray-600 mt-1">{client?.name}</p>
                      {property && (
                        <p className="text-xs text-gray-500 mt-1">{property.title}</p>
                      )}
                      <div className="flex items-center gap-2 mt-2">
                        <span className={`text-xs px-2 py-1 rounded-full ${stage?.color}`}>
                          {stage?.label}
                        </span>
                        <span className="text-xs text-gray-500" suppressHydrationWarning>
                          {task.nextStepDate && formatDate(task.nextStepDate)}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })
            ) : (
              <p className="text-center text-gray-500 py-8">Nenhuma tarefa agendada</p>
            )}
          </div>
        </div>

        {/* Clientes Recentes */}
        <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
          <div className="mb-6 flex items-center justify-between">
            <div>
              <h3 className="text-lg font-bold text-gray-900">Clientes Recentes</h3>
              <p className="text-sm text-gray-500">Últimos cadastros</p>
            </div>
            <Link 
              href="/clientes"
              className="text-sm font-medium text-blue-600 hover:text-blue-700 flex items-center gap-1"
            >
              Ver todos
              <ArrowUpRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="space-y-4">
            {recentClients.map((client) => {
              const initials = client.name
                .split(' ')
                .map(n => n[0])
                .join('')
                .toUpperCase()
                .slice(0, 2);
              
              return (
                <div key={client.id} className="flex items-center gap-4 p-4 rounded-lg border border-gray-100 hover:border-blue-200 hover:bg-blue-50/50 transition-all">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-purple-500 to-pink-500 text-white font-bold flex-shrink-0">
                    {initials}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-gray-900">{client.name}</p>
                    <p className="text-sm text-gray-600">{client.phone}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-xs text-gray-500" suppressHydrationWarning>
                        {calculateDaysAgo(client.createdAt)}
                      </span>
                      {client.tags.length > 0 && (
                        <span className="text-xs px-2 py-0.5 rounded-full bg-blue-100 text-blue-700">
                          {client.tags[0]}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Top Performers */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Top Imóveis */}
        <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
          <h3 className="text-lg font-bold text-gray-900 mb-6">Top Imóveis por Comissão</h3>
          <div className="space-y-4">
            {mockTopProperties.map((property, index) => (
              <div key={property.id} className="flex items-center gap-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-green-500 to-emerald-500 text-white font-bold flex-shrink-0">
                  #{index + 1}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-gray-900">{property.name}</p>
                  <p className="text-sm text-gray-600">{formatCurrency(property.value)}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Top Origens */}
        <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
          <h3 className="text-lg font-bold text-gray-900 mb-6">Top Origens de Leads</h3>
          <div className="space-y-4">
            {mockTopOrigins.map((origin, index) => (
              <div key={origin.id} className="flex items-center gap-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500 to-cyan-500 text-white font-bold flex-shrink-0">
                  #{index + 1}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-gray-900">{origin.name}</p>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <span>{formatCurrency(origin.value)}</span>
                    <span className="text-gray-400">•</span>
                    <span>{origin.count} vendas</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
