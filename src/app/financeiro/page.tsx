'use client';

import { useState } from 'react';
import { 
  DollarSign, 
  TrendingUp,
  TrendingDown,
  Calendar,
  CheckCircle,
  Clock,
  AlertCircle,
  Download,
  Filter,
  Search
} from 'lucide-react';
import { mockSales, mockInstallments, mockProperties, mockClients } from '@/lib/mock-data';
import { formatCurrency, formatDate } from '@/lib/constants';

export default function FinanceiroPage() {
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');

  // Calcular totais
  const totalReceived = mockInstallments
    .filter(i => i.status === 'recebido')
    .reduce((sum, i) => sum + (i.amountReceived || 0), 0);

  const totalPending = mockInstallments
    .filter(i => i.status === 'pendente')
    .reduce((sum, i) => sum + i.amount, 0);

  const totalOverdue = mockInstallments
    .filter(i => i.status === 'atrasado')
    .reduce((sum, i) => sum + i.amount, 0);

  const totalCommission = mockSales.reduce((sum, s) => sum + s.commissionValue, 0);

  // Filtrar parcelas
  const filteredInstallments = mockInstallments.filter(installment => {
    const sale = mockSales.find(s => s.id === installment.saleId);
    if (!sale) return false;

    const property = mockProperties.find(p => p.id === sale.propertyId);
    const client = mockClients.find(c => c.id === sale.clientId);

    const matchesSearch = 
      property?.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      client?.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      false;

    const matchesStatus = filterStatus === 'all' || installment.status === filterStatus;

    return matchesSearch && matchesStatus;
  });

  const getStatusBadge = (status: string) => {
    const statusMap: Record<string, { label: string; color: string; icon: any }> = {
      recebido: { label: 'Recebido', color: 'bg-green-100 text-green-700', icon: CheckCircle },
      pendente: { label: 'Pendente', color: 'bg-yellow-100 text-yellow-700', icon: Clock },
      atrasado: { label: 'Atrasado', color: 'bg-red-100 text-red-700', icon: AlertCircle },
    };
    
    return statusMap[status] || statusMap.pendente;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Financeiro</h1>
          <p className="mt-2 text-gray-600">
            Gerencie suas comissões e recebimentos
          </p>
        </div>
        <button className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-xl font-medium hover:from-green-700 hover:to-emerald-700 transition-all shadow-lg hover:shadow-xl">
          <Download className="h-5 w-5" />
          Exportar Relatório
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-green-100">
              <CheckCircle className="h-6 w-6 text-green-600" />
            </div>
            <TrendingUp className="h-5 w-5 text-green-600" />
          </div>
          <p className="text-sm text-gray-600 mb-1">Total Recebido</p>
          <p className="text-2xl font-bold text-gray-900">{formatCurrency(totalReceived)}</p>
          <p className="text-xs text-green-600 mt-2">↑ 12% vs mês anterior</p>
        </div>

        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-yellow-100">
              <Clock className="h-6 w-6 text-yellow-600" />
            </div>
            <TrendingUp className="h-5 w-5 text-yellow-600" />
          </div>
          <p className="text-sm text-gray-600 mb-1">A Receber</p>
          <p className="text-2xl font-bold text-gray-900">{formatCurrency(totalPending)}</p>
          <p className="text-xs text-gray-500 mt-2">{mockInstallments.filter(i => i.status === 'pendente').length} parcelas</p>
        </div>

        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-red-100">
              <AlertCircle className="h-6 w-6 text-red-600" />
            </div>
            <TrendingDown className="h-5 w-5 text-red-600" />
          </div>
          <p className="text-sm text-gray-600 mb-1">Em Atraso</p>
          <p className="text-2xl font-bold text-gray-900">{formatCurrency(totalOverdue)}</p>
          <p className="text-xs text-red-600 mt-2">{mockInstallments.filter(i => i.status === 'atrasado').length} parcelas</p>
        </div>

        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-100">
              <DollarSign className="h-6 w-6 text-blue-600" />
            </div>
            <TrendingUp className="h-5 w-5 text-blue-600" />
          </div>
          <p className="text-sm text-gray-600 mb-1">Total Comissões</p>
          <p className="text-2xl font-bold text-gray-900">{formatCurrency(totalCommission)}</p>
          <p className="text-xs text-gray-500 mt-2">{mockSales.length} vendas</p>
        </div>
      </div>

      {/* Filters */}
      <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
        <div className="flex flex-col lg:flex-row gap-4">
          {/* Search */}
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Buscar por imóvel ou cliente..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* Status Filter */}
          <div className="flex items-center gap-2">
            <Filter className="h-5 w-5 text-gray-400" />
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">Todos os Status</option>
              <option value="recebido">Recebido</option>
              <option value="pendente">Pendente</option>
              <option value="atrasado">Atrasado</option>
            </select>
          </div>
        </div>
      </div>

      {/* Installments Table */}
      <div className="rounded-xl border border-gray-200 bg-white shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Venda
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Parcela
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Vencimento
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Valor
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Pagamento
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredInstallments.length > 0 ? (
                filteredInstallments.map((installment) => {
                  const sale = mockSales.find(s => s.id === installment.saleId);
                  const property = sale ? mockProperties.find(p => p.id === sale.propertyId) : null;
                  const client = sale ? mockClients.find(c => c.id === sale.clientId) : null;
                  const statusBadge = getStatusBadge(installment.status);
                  const StatusIcon = statusBadge.icon;

                  return (
                    <tr key={installment.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4">
                        <div>
                          <p className="font-medium text-gray-900">{property?.title || 'Imóvel não encontrado'}</p>
                          <p className="text-sm text-gray-600">{client?.name || 'Cliente não encontrado'}</p>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="text-sm font-medium text-gray-900">
                          Parcela {installment.installmentNumber}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <Calendar className="h-4 w-4 text-gray-400" />
                          <span suppressHydrationWarning>{formatDate(installment.dueDate)}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <p className="text-sm font-medium text-gray-900">
                          {formatCurrency(installment.amount)}
                        </p>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${statusBadge.color}`}>
                          <StatusIcon className="h-3.5 w-3.5" />
                          {statusBadge.label}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {installment.status === 'recebido' && installment.paymentDate ? (
                          <div className="text-sm">
                            <p className="text-gray-900" suppressHydrationWarning>{formatDate(installment.paymentDate)}</p>
                            <p className="text-gray-500">{installment.paymentMethod?.toUpperCase()}</p>
                          </div>
                        ) : (
                          <span className="text-sm text-gray-500">-</span>
                        )}
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-gray-500">
                    Nenhuma parcela encontrada
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Sales Summary */}
      <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
        <h3 className="text-lg font-bold text-gray-900 mb-6">Resumo de Vendas</h3>
        <div className="space-y-4">
          {mockSales.map((sale) => {
            const property = mockProperties.find(p => p.id === sale.propertyId);
            const client = mockClients.find(c => c.id === sale.clientId);
            const installments = mockInstallments.filter(i => i.saleId === sale.id);
            const received = installments.filter(i => i.status === 'recebido').length;
            const total = installments.length;

            return (
              <div key={sale.id} className="p-4 rounded-lg border border-gray-200 hover:border-blue-200 hover:bg-blue-50/50 transition-all">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <p className="font-medium text-gray-900">{property?.title}</p>
                    <p className="text-sm text-gray-600">{client?.name}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-600">Comissão</p>
                    <p className="text-lg font-bold text-green-600">{formatCurrency(sale.commissionValue)}</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-4 text-sm">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-gray-400" />
                    <span className="text-gray-600" suppressHydrationWarning>{formatDate(sale.saleDate)}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <DollarSign className="h-4 w-4 text-gray-400" />
                    <span className="text-gray-600">{formatCurrency(sale.propertyValue)}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-gray-600">{received}/{total} parcelas recebidas</span>
                  </div>
                </div>

                <div className="mt-3">
                  <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-green-500 to-emerald-500 rounded-full transition-all"
                      style={{ width: `${(received / total) * 100}%` }}
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
