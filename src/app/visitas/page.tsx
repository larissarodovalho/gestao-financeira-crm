'use client';

import { useState } from 'react';
import { 
  Calendar, 
  Clock, 
  CheckCircle, 
  XCircle, 
  User,
  Building2,
  Phone,
  MessageSquare,
  Filter,
  Search
} from 'lucide-react';
import { mockVisits, mockProperties, mockClients, mockUsers } from '@/lib/mock-data';
import { formatDate, formatDateTime } from '@/lib/constants';

type VisitFilter = 'todas' | 'pendente' | 'aprovada' | 'recusada' | 'realizada';

export default function VisitasPage() {
  const [filter, setFilter] = useState<VisitFilter>('todas');
  const [searchTerm, setSearchTerm] = useState('');

  // Simular usuário logado como vendedor
  const currentUser = mockUsers.find(u => u.role === 'vendedor');

  // Filtrar visitas do vendedor
  const userVisits = mockVisits.filter(visit => {
    const property = mockProperties.find(p => p.id === visit.propertyId);
    return property?.owner.name === currentUser?.name;
  });

  const filteredVisits = userVisits.filter(visit => {
    const matchesFilter = filter === 'todas' || visit.status === filter;
    
    if (!matchesFilter) return false;
    
    if (searchTerm) {
      const client = mockClients.find(c => c.id === visit.clientId);
      const property = mockProperties.find(p => p.id === visit.propertyId);
      const searchLower = searchTerm.toLowerCase();
      
      return (
        client?.name.toLowerCase().includes(searchLower) ||
        property?.title.toLowerCase().includes(searchLower) ||
        property?.code.toLowerCase().includes(searchLower)
      );
    }
    
    return true;
  });

  const handleApprove = (visitId: string) => {
    console.log('Aprovar visita:', visitId);
    // Aqui você implementaria a lógica de aprovação
  };

  const handleReject = (visitId: string) => {
    console.log('Recusar visita:', visitId);
    // Aqui você implementaria a lógica de recusa
  };

  const getStatusBadge = (status: string) => {
    const badges = {
      pendente: 'bg-yellow-100 text-yellow-700 border-yellow-300',
      aprovada: 'bg-green-100 text-green-700 border-green-300',
      recusada: 'bg-red-100 text-red-700 border-red-300',
      realizada: 'bg-blue-100 text-blue-700 border-blue-300',
      cancelada: 'bg-gray-100 text-gray-700 border-gray-300',
    };
    return badges[status as keyof typeof badges] || badges.pendente;
  };

  const getStatusLabel = (status: string) => {
    const labels = {
      pendente: 'Pendente',
      aprovada: 'Aprovada',
      recusada: 'Recusada',
      realizada: 'Realizada',
      cancelada: 'Cancelada',
    };
    return labels[status as keyof typeof labels] || status;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Gerenciar Visitas</h1>
        <p className="mt-2 text-gray-600">
          Aprove ou recuse solicitações de visitas aos seus imóveis
        </p>
      </div>

      {/* Filtros e Busca */}
      <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          {/* Busca */}
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Buscar por cliente ou imóvel..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full rounded-lg border border-gray-300 pl-10 pr-4 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
            />
          </div>

          {/* Filtros */}
          <div className="flex items-center gap-2">
            <Filter className="h-5 w-5 text-gray-400" />
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value as VisitFilter)}
              className="rounded-lg border border-gray-300 px-4 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
            >
              <option value="todas">Todas</option>
              <option value="pendente">Pendentes</option>
              <option value="aprovada">Aprovadas</option>
              <option value="recusada">Recusadas</option>
              <option value="realizada">Realizadas</option>
            </select>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-yellow-100">
              <Clock className="h-5 w-5 text-yellow-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">
                {userVisits.filter(v => v.status === 'pendente').length}
              </p>
              <p className="text-sm text-gray-600">Pendentes</p>
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
                {userVisits.filter(v => v.status === 'aprovada').length}
              </p>
              <p className="text-sm text-gray-600">Aprovadas</p>
            </div>
          </div>
        </div>

        <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-100">
              <Calendar className="h-5 w-5 text-blue-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">
                {userVisits.filter(v => v.status === 'realizada').length}
              </p>
              <p className="text-sm text-gray-600">Realizadas</p>
            </div>
          </div>
        </div>

        <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-red-100">
              <XCircle className="h-5 w-5 text-red-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">
                {userVisits.filter(v => v.status === 'recusada').length}
              </p>
              <p className="text-sm text-gray-600">Recusadas</p>
            </div>
          </div>
        </div>
      </div>

      {/* Lista de Visitas */}
      <div className="space-y-4">
        {filteredVisits.length > 0 ? (
          filteredVisits.map((visit) => {
            const property = mockProperties.find(p => p.id === visit.propertyId);
            const client = mockClients.find(c => c.id === visit.clientId);
            const broker = mockUsers.find(u => u.id === visit.brokerId);

            return (
              <div
                key={visit.id}
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
                            {property?.title}
                          </h3>
                          <span className={`text-xs px-3 py-1 rounded-full border ${getStatusBadge(visit.status)}`}>
                            {getStatusLabel(visit.status)}
                          </span>
                        </div>
                        <p className="text-sm text-gray-600 mt-1">
                          Código: {property?.code}
                        </p>
                      </div>
                    </div>

                    {/* Detalhes */}
                    <div className="grid gap-4 sm:grid-cols-2">
                      {/* Cliente */}
                      <div className="flex items-start gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-100 flex-shrink-0">
                          <User className="h-5 w-5 text-blue-600" />
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-900">Comprador</p>
                          <p className="text-sm text-gray-600">{client?.name}</p>
                          <p className="text-xs text-gray-500">{client?.phone}</p>
                        </div>
                      </div>

                      {/* Corretor */}
                      <div className="flex items-start gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-purple-100 flex-shrink-0">
                          <User className="h-5 w-5 text-purple-600" />
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-900">Corretor</p>
                          <p className="text-sm text-gray-600">{broker?.name}</p>
                          <p className="text-xs text-gray-500">{broker?.phone}</p>
                        </div>
                      </div>

                      {/* Data Solicitada */}
                      <div className="flex items-start gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-orange-100 flex-shrink-0">
                          <Calendar className="h-5 w-5 text-orange-600" />
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-900">Data Solicitada</p>
                          <p className="text-sm text-gray-600" suppressHydrationWarning>
                            {formatDateTime(visit.requestedDate)}
                          </p>
                        </div>
                      </div>

                      {/* Data Agendada */}
                      {visit.scheduledDate && (
                        <div className="flex items-start gap-3">
                          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-100 flex-shrink-0">
                            <Clock className="h-5 w-5 text-green-600" />
                          </div>
                          <div>
                            <p className="text-sm font-medium text-gray-900">Data Agendada</p>
                            <p className="text-sm text-gray-600" suppressHydrationWarning>
                              {formatDateTime(visit.scheduledDate)}
                            </p>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Observações */}
                    {visit.notes && (
                      <div className="rounded-lg bg-gray-50 p-4">
                        <p className="text-sm font-medium text-gray-900 mb-1">Observações do Cliente:</p>
                        <p className="text-sm text-gray-600">{visit.notes}</p>
                      </div>
                    )}

                    {visit.sellerNotes && (
                      <div className="rounded-lg bg-blue-50 p-4">
                        <p className="text-sm font-medium text-blue-900 mb-1">Suas Observações:</p>
                        <p className="text-sm text-blue-700">{visit.sellerNotes}</p>
                      </div>
                    )}
                  </div>

                  {/* Ações */}
                  {visit.status === 'pendente' && (
                    <div className="flex flex-col gap-3 lg:w-48">
                      <button
                        onClick={() => handleApprove(visit.id)}
                        className="flex items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-green-600 to-emerald-600 px-4 py-3 text-sm font-medium text-white hover:from-green-700 hover:to-emerald-700 transition-all shadow-md hover:shadow-lg"
                      >
                        <CheckCircle className="h-5 w-5" />
                        Aprovar Visita
                      </button>
                      
                      <button
                        onClick={() => handleReject(visit.id)}
                        className="flex items-center justify-center gap-2 rounded-lg border-2 border-red-200 bg-white px-4 py-3 text-sm font-medium text-red-600 hover:bg-red-50 transition-all"
                      >
                        <XCircle className="h-5 w-5" />
                        Recusar Visita
                      </button>

                      <a
                        href={`https://wa.me/${client?.phone?.replace(/\D/g, '')}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center gap-2 rounded-lg border-2 border-green-200 bg-white px-4 py-3 text-sm font-medium text-green-600 hover:bg-green-50 transition-all"
                      >
                        <MessageSquare className="h-5 w-5" />
                        WhatsApp
                      </a>
                    </div>
                  )}
                </div>
              </div>
            );
          })
        ) : (
          <div className="rounded-2xl border border-gray-200 bg-white p-12 text-center shadow-sm">
            <Calendar className="mx-auto h-12 w-12 text-gray-400 mb-4" />
            <p className="text-lg font-medium text-gray-900 mb-2">
              Nenhuma visita encontrada
            </p>
            <p className="text-sm text-gray-600">
              {filter === 'todas' 
                ? 'Você ainda não possui solicitações de visitas.'
                : `Não há visitas com status "${getStatusLabel(filter)}".`}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
