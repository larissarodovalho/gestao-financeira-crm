'use client';

import { useState } from 'react';
import { 
  FileText, 
  Download, 
  Eye,
  CheckCircle,
  Clock,
  XCircle,
  User,
  Building2,
  Calendar,
  Filter
} from 'lucide-react';
import { mockContracts, mockProperties, mockClients, mockUsers, mockSales } from '@/lib/mock-data';
import { formatDate, formatCurrency } from '@/lib/constants';

type ContractFilter = 'todos' | 'rascunho' | 'aguardando_assinatura' | 'assinado' | 'cancelado';

export default function ContratosPage() {
  const [filter, setFilter] = useState<ContractFilter>('todos');

  const filteredContracts = mockContracts.filter(contract => {
    if (filter === 'todos') return true;
    return contract.status === filter;
  });

  const getStatusBadge = (status: string) => {
    const badges = {
      rascunho: 'bg-gray-100 text-gray-700 border-gray-300',
      aguardando_assinatura: 'bg-yellow-100 text-yellow-700 border-yellow-300',
      assinado: 'bg-green-100 text-green-700 border-green-300',
      cancelado: 'bg-red-100 text-red-700 border-red-300',
    };
    return badges[status as keyof typeof badges] || badges.rascunho;
  };

  const getStatusLabel = (status: string) => {
    const labels = {
      rascunho: 'Rascunho',
      aguardando_assinatura: 'Aguardando Assinatura',
      assinado: 'Assinado',
      cancelado: 'Cancelado',
    };
    return labels[status as keyof typeof labels] || status;
  };

  const getStatusIcon = (status: string) => {
    const icons = {
      rascunho: Clock,
      aguardando_assinatura: Clock,
      assinado: CheckCircle,
      cancelado: XCircle,
    };
    const Icon = icons[status as keyof typeof icons] || Clock;
    return Icon;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Contratos</h1>
        <p className="mt-2 text-gray-600">
          Gerencie contratos digitais e acompanhe assinaturas
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-100">
              <FileText className="h-5 w-5 text-blue-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">{mockContracts.length}</p>
              <p className="text-sm text-gray-600">Total</p>
            </div>
          </div>
        </div>

        <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-yellow-100">
              <Clock className="h-5 w-5 text-yellow-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">
                {mockContracts.filter(c => c.status === 'aguardando_assinatura').length}
              </p>
              <p className="text-sm text-gray-600">Aguardando</p>
            </div>
          </div>
        </div>

        <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-100">
              <CheckCircle className="h-5 w-5 text-green-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">
                {mockContracts.filter(c => c.status === 'assinado').length}
              </p>
              <p className="text-sm text-gray-600">Assinados</p>
            </div>
          </div>
        </div>

        <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gray-100">
              <FileText className="h-5 w-5 text-gray-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">
                {mockContracts.filter(c => c.status === 'rascunho').length}
              </p>
              <p className="text-sm text-gray-600">Rascunhos</p>
            </div>
          </div>
        </div>
      </div>

      {/* Filtros */}
      <div className="rounded-2xl border border-gray-200 bg-white p-4 shadow-sm">
        <div className="flex items-center gap-4">
          <Filter className="h-5 w-5 text-gray-400" />
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value as ContractFilter)}
            className="rounded-lg border border-gray-300 px-4 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
          >
            <option value="todos">Todos os Contratos</option>
            <option value="rascunho">Rascunhos</option>
            <option value="aguardando_assinatura">Aguardando Assinatura</option>
            <option value="assinado">Assinados</option>
            <option value="cancelado">Cancelados</option>
          </select>
        </div>
      </div>

      {/* Lista de Contratos */}
      <div className="space-y-4">
        {filteredContracts.length > 0 ? (
          filteredContracts.map((contract) => {
            const property = mockProperties.find(p => p.id === contract.propertyId);
            const buyer = mockClients.find(c => c.id === contract.buyerId);
            const seller = mockUsers.find(u => u.id === contract.sellerId);
            const broker = mockUsers.find(u => u.id === contract.brokerId);
            const sale = mockSales.find(s => s.id === contract.saleId);
            const StatusIcon = getStatusIcon(contract.status);

            return (
              <div
                key={contract.id}
                className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
                  {/* Informações Principais */}
                  <div className="flex-1 space-y-4">
                    {/* Cabeçalho */}
                    <div className="flex items-start justify-between">
                      <div>
                        <div className="flex items-center gap-3">
                          <h3 className="text-lg font-bold text-gray-900">
                            Contrato #{contract.id}
                          </h3>
                          <span className={`text-xs px-3 py-1 rounded-full border ${getStatusBadge(contract.status)}`}>
                            {getStatusLabel(contract.status)}
                          </span>
                        </div>
                        <p className="text-sm text-gray-600 mt-1">
                          {property?.title}
                        </p>
                      </div>
                    </div>

                    {/* Detalhes do Imóvel */}
                    <div className="rounded-lg bg-gray-50 p-4">
                      <div className="flex items-start gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-100 flex-shrink-0">
                          <Building2 className="h-5 w-5 text-blue-600" />
                        </div>
                        <div className="flex-1">
                          <p className="text-sm font-medium text-gray-900">Imóvel</p>
                          <p className="text-sm text-gray-600">{property?.address}</p>
                          <p className="text-sm text-gray-600">{property?.neighborhood}, {property?.city}</p>
                          {sale && (
                            <p className="text-sm font-bold text-green-600 mt-2">
                              Valor: {formatCurrency(sale.propertyValue)}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Partes Envolvidas */}
                    <div className="grid gap-4 sm:grid-cols-3">
                      {/* Comprador */}
                      <div className="rounded-lg border border-gray-200 p-3">
                        <div className="flex items-center gap-2 mb-2">
                          <User className="h-4 w-4 text-blue-600" />
                          <p className="text-xs font-medium text-gray-900">Comprador</p>
                        </div>
                        <p className="text-sm text-gray-900">{buyer?.name}</p>
                        <div className="flex items-center gap-2 mt-2">
                          {contract.signedByBuyer ? (
                            <>
                              <CheckCircle className="h-4 w-4 text-green-600" />
                              <span className="text-xs text-green-600">Assinado</span>
                            </>
                          ) : (
                            <>
                              <Clock className="h-4 w-4 text-yellow-600" />
                              <span className="text-xs text-yellow-600">Pendente</span>
                            </>
                          )}
                        </div>
                      </div>

                      {/* Vendedor */}
                      <div className="rounded-lg border border-gray-200 p-3">
                        <div className="flex items-center gap-2 mb-2">
                          <User className="h-4 w-4 text-purple-600" />
                          <p className="text-xs font-medium text-gray-900">Vendedor</p>
                        </div>
                        <p className="text-sm text-gray-900">{seller?.name}</p>
                        <div className="flex items-center gap-2 mt-2">
                          {contract.signedBySeller ? (
                            <>
                              <CheckCircle className="h-4 w-4 text-green-600" />
                              <span className="text-xs text-green-600">Assinado</span>
                            </>
                          ) : (
                            <>
                              <Clock className="h-4 w-4 text-yellow-600" />
                              <span className="text-xs text-yellow-600">Pendente</span>
                            </>
                          )}
                        </div>
                      </div>

                      {/* Corretor */}
                      <div className="rounded-lg border border-gray-200 p-3">
                        <div className="flex items-center gap-2 mb-2">
                          <User className="h-4 w-4 text-orange-600" />
                          <p className="text-xs font-medium text-gray-900">Corretor</p>
                        </div>
                        <p className="text-sm text-gray-900">{broker?.name}</p>
                        <div className="flex items-center gap-2 mt-2">
                          {contract.signedByBroker ? (
                            <>
                              <CheckCircle className="h-4 w-4 text-green-600" />
                              <span className="text-xs text-green-600">Assinado</span>
                            </>
                          ) : (
                            <>
                              <Clock className="h-4 w-4 text-yellow-600" />
                              <span className="text-xs text-yellow-600">Pendente</span>
                            </>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Data */}
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Calendar className="h-4 w-4" />
                      <span suppressHydrationWarning>
                        Criado em {formatDate(contract.createdAt)}
                      </span>
                    </div>
                  </div>

                  {/* Ações */}
                  <div className="flex flex-col gap-3 lg:w-48">
                    {contract.contractUrl && (
                      <>
                        <button className="flex items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-blue-600 to-cyan-600 px-4 py-3 text-sm font-medium text-white hover:from-blue-700 hover:to-cyan-700 transition-all shadow-md hover:shadow-lg">
                          <Eye className="h-5 w-5" />
                          Visualizar
                        </button>
                        
                        <button className="flex items-center justify-center gap-2 rounded-lg border-2 border-blue-200 bg-white px-4 py-3 text-sm font-medium text-blue-600 hover:bg-blue-50 transition-all">
                          <Download className="h-5 w-5" />
                          Baixar PDF
                        </button>
                      </>
                    )}

                    {contract.status === 'aguardando_assinatura' && (
                      <button className="flex items-center justify-center gap-2 rounded-lg border-2 border-green-200 bg-white px-4 py-3 text-sm font-medium text-green-600 hover:bg-green-50 transition-all">
                        <CheckCircle className="h-5 w-5" />
                        Assinar
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <div className="rounded-2xl border border-gray-200 bg-white p-12 text-center shadow-sm">
            <FileText className="mx-auto h-12 w-12 text-gray-400 mb-4" />
            <p className="text-lg font-medium text-gray-900 mb-2">
              Nenhum contrato encontrado
            </p>
            <p className="text-sm text-gray-600">
              {filter === 'todos'
                ? 'Você ainda não possui contratos cadastrados.'
                : `Não há contratos com status "${getStatusLabel(filter)}".`}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
