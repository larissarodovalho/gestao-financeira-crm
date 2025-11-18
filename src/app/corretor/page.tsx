'use client';

import { useState } from 'react';
import { 
  Users, 
  Calendar, 
  DollarSign, 
  TrendingUp,
  Plus,
  Search,
  Phone,
  MessageCircle,
  Eye,
  CheckCircle,
  Clock,
  XCircle,
  Building2
} from 'lucide-react';
import { formatCurrency, formatDate } from '@/lib/constants';

// Mock data para corretor
const mockBrokerStats = {
  totalClients: 24,
  activeVisits: 8,
  monthCommission: 12500,
  closedDeals: 3
};

const mockBrokerClients = [
  {
    id: '1',
    name: 'João Silva',
    phone: '(11) 98765-4321',
    email: 'joao.silva@email.com',
    status: 'ativo',
    activeVisits: 2,
    createdAt: new Date('2024-01-10')
  },
  {
    id: '2',
    name: 'Ana Costa',
    phone: '(11) 97654-3210',
    email: 'ana.costa@email.com',
    status: 'ativo',
    activeVisits: 1,
    createdAt: new Date('2024-01-12')
  },
  {
    id: '3',
    name: 'Carlos Mendes',
    phone: '(11) 96543-2109',
    email: 'carlos.mendes@email.com',
    status: 'ativo',
    activeVisits: 1,
    createdAt: new Date('2024-01-15')
  },
  {
    id: '4',
    name: 'Fernanda Souza',
    phone: '(11) 95432-1098',
    email: 'fernanda.souza@email.com',
    status: 'negociacao',
    activeVisits: 0,
    createdAt: new Date('2024-01-08')
  }
];

const mockBrokerVisits = [
  {
    id: '1',
    clientName: 'João Silva',
    propertyTitle: 'Casa 3 Quartos - Jardim América',
    propertyAddress: 'Rua das Flores, 123',
    scheduledDate: new Date('2024-01-20T14:00:00'),
    status: 'pendente',
    notes: 'Cliente interessado em financiamento'
  },
  {
    id: '2',
    clientName: 'Ana Costa',
    propertyTitle: 'Casa 3 Quartos - Jardim América',
    propertyAddress: 'Rua das Flores, 123',
    scheduledDate: new Date('2024-01-22T10:00:00'),
    status: 'pendente',
    notes: 'Primeira visita'
  },
  {
    id: '3',
    clientName: 'Carlos Mendes',
    propertyTitle: 'Apartamento 2 Quartos - Centro',
    propertyAddress: 'Av. Paulista, 1000',
    scheduledDate: new Date('2024-01-21T16:00:00'),
    status: 'pendente',
    notes: 'Cliente quer ver a vista'
  },
  {
    id: '4',
    clientName: 'Fernanda Souza',
    propertyTitle: 'Apartamento 2 Quartos - Centro',
    propertyAddress: 'Av. Paulista, 1000',
    scheduledDate: new Date('2024-01-19T11:00:00'),
    status: 'aprovada',
    notes: ''
  }
];

const mockCommissions = [
  {
    id: '1',
    propertyTitle: 'Casa 4 Quartos - Vila Mariana',
    clientName: 'Roberto Lima',
    saleValue: 950000,
    commissionPercentage: 6,
    commissionValue: 57000,
    status: 'recebido',
    paidDate: new Date('2024-01-15')
  },
  {
    id: '2',
    propertyTitle: 'Apartamento 3 Quartos - Moema',
    clientName: 'Patricia Alves',
    saleValue: 680000,
    commissionPercentage: 6,
    commissionValue: 40800,
    status: 'pendente',
    expectedDate: new Date('2024-02-01')
  },
  {
    id: '3',
    propertyTitle: 'Cobertura Duplex - Itaim',
    clientName: 'Eduardo Santos',
    saleValue: 1200000,
    commissionPercentage: 5,
    commissionValue: 60000,
    status: 'pendente',
    expectedDate: new Date('2024-02-15')
  }
];

export default function CorretorPage() {
  const [activeTab, setActiveTab] = useState<'clientes' | 'visitas' | 'financeiro'>('clientes');
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddClient, setShowAddClient] = useState(false);

  const handleWhatsApp = (phone: string) => {
    const cleanPhone = phone.replace(/\D/g, '');
    window.open(`https://wa.me/55${cleanPhone}`, '_blank');
  };

  const filteredClients = mockBrokerClients.filter(client =>
    client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    client.phone.includes(searchTerm)
  );

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Painel do Corretor</h1>
        <p className="mt-2 text-gray-600">
          Gerencie seus clientes, visitas e comissões
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
          <div className="flex items-center gap-3 mb-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500">
              <Users className="h-6 w-6 text-white" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600">Meus Clientes</p>
              <p className="text-2xl font-bold text-gray-900">{mockBrokerStats.totalClients}</p>
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
          <div className="flex items-center gap-3 mb-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-purple-500 to-pink-500">
              <Calendar className="h-6 w-6 text-white" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600">Visitas Ativas</p>
              <p className="text-2xl font-bold text-purple-600">{mockBrokerStats.activeVisits}</p>
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
          <div className="flex items-center gap-3 mb-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-green-500 to-emerald-500">
              <DollarSign className="h-6 w-6 text-white" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600">Comissão Mês</p>
              <p className="text-xl font-bold text-green-600">{formatCurrency(mockBrokerStats.monthCommission)}</p>
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
          <div className="flex items-center gap-3 mb-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-orange-500 to-red-500">
              <TrendingUp className="h-6 w-6 text-white" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600">Vendas Fechadas</p>
              <p className="text-2xl font-bold text-orange-600">{mockBrokerStats.closedDeals}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          <button
            onClick={() => setActiveTab('clientes')}
            className={`
              whitespace-nowrap border-b-2 py-4 px-1 text-sm font-medium transition-colors
              ${activeTab === 'clientes'
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
              }
            `}
          >
            Meus Clientes
          </button>
          <button
            onClick={() => setActiveTab('visitas')}
            className={`
              whitespace-nowrap border-b-2 py-4 px-1 text-sm font-medium transition-colors
              ${activeTab === 'visitas'
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
              }
            `}
          >
            Visitas Agendadas
          </button>
          <button
            onClick={() => setActiveTab('financeiro')}
            className={`
              whitespace-nowrap border-b-2 py-4 px-1 text-sm font-medium transition-colors
              ${activeTab === 'financeiro'
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
              }
            `}
          >
            Financeiro
          </button>
        </nav>
      </div>

      {/* Content */}
      {activeTab === 'clientes' && (
        <div className="space-y-6">
          {/* Search and Add */}
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Buscar cliente por nome ou telefone..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <button
              onClick={() => setShowAddClient(true)}
              className="flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-lg font-medium hover:from-blue-700 hover:to-cyan-700 transition-all"
            >
              <Plus className="h-5 w-5" />
              Novo Cliente
            </button>
          </div>

          {/* Clients Grid */}
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {filteredClients.map((client) => (
              <div key={client.id} className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 text-white font-bold">
                      {client.name.split(' ').map(n => n[0]).join('').toUpperCase()}
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900">{client.name}</h3>
                      <p className="text-sm text-gray-600">{client.phone}</p>
                    </div>
                  </div>
                  <span className={`
                    px-2 py-1 rounded-full text-xs font-medium
                    ${client.status === 'ativo' ? 'bg-green-100 text-green-700' : ''}
                    ${client.status === 'negociacao' ? 'bg-blue-100 text-blue-700' : ''}
                  `}>
                    {client.status === 'ativo' ? 'Ativo' : 'Em Negociação'}
                  </span>
                </div>

                <div className="space-y-2 mb-4">
                  <p className="text-sm text-gray-600">{client.email}</p>
                  {client.activeVisits > 0 && (
                    <div className="flex items-center gap-2 text-sm text-purple-600">
                      <Calendar className="h-4 w-4" />
                      <span>{client.activeVisits} {client.activeVisits === 1 ? 'visita agendada' : 'visitas agendadas'}</span>
                    </div>
                  )}
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => handleWhatsApp(client.phone)}
                    className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-green-500 text-white rounded-lg text-sm font-medium hover:bg-green-600 transition-colors"
                  >
                    <MessageCircle className="h-4 w-4" />
                    WhatsApp
                  </button>
                  <button className="flex items-center justify-center px-3 py-2 border border-gray-300 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors">
                    <Eye className="h-4 w-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'visitas' && (
        <div className="space-y-4">
          {mockBrokerVisits.map((visit) => (
            <div key={visit.id} className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <Building2 className="h-5 w-5 text-gray-400" />
                    <h3 className="text-lg font-bold text-gray-900">{visit.propertyTitle}</h3>
                  </div>
                  <p className="text-sm text-gray-600 mb-1">{visit.propertyAddress}</p>
                  <p className="text-sm text-gray-500" suppressHydrationWarning>
                    {formatDate(visit.scheduledDate)}
                  </p>
                </div>
                <span className={`
                  px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap
                  ${visit.status === 'pendente' ? 'bg-orange-100 text-orange-700' : ''}
                  ${visit.status === 'aprovada' ? 'bg-green-100 text-green-700' : ''}
                `}>
                  {visit.status === 'pendente' ? 'Aguardando Aprovação' : 'Aprovada'}
                </span>
              </div>

              <div className="flex items-center gap-3 mb-4 pb-4 border-b border-gray-200">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-purple-500 to-pink-500 text-white font-bold text-sm">
                  {visit.clientName.split(' ').map(n => n[0]).join('').toUpperCase()}
                </div>
                <div>
                  <p className="text-sm text-gray-500">Cliente</p>
                  <p className="font-medium text-gray-900">{visit.clientName}</p>
                </div>
              </div>

              {visit.notes && (
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                  <p className="text-xs text-blue-700 font-medium mb-1">Observações:</p>
                  <p className="text-sm text-blue-900">{visit.notes}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {activeTab === 'financeiro' && (
        <div className="space-y-6">
          {/* Summary Cards */}
          <div className="grid gap-6 sm:grid-cols-3">
            <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
              <p className="text-sm text-gray-600 mb-2">Total Recebido</p>
              <p className="text-2xl font-bold text-green-600">
                {formatCurrency(mockCommissions.filter(c => c.status === 'recebido').reduce((sum, c) => sum + c.commissionValue, 0))}
              </p>
            </div>
            <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
              <p className="text-sm text-gray-600 mb-2">A Receber</p>
              <p className="text-2xl font-bold text-orange-600">
                {formatCurrency(mockCommissions.filter(c => c.status === 'pendente').reduce((sum, c) => sum + c.commissionValue, 0))}
              </p>
            </div>
            <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
              <p className="text-sm text-gray-600 mb-2">Total Geral</p>
              <p className="text-2xl font-bold text-blue-600">
                {formatCurrency(mockCommissions.reduce((sum, c) => sum + c.commissionValue, 0))}
              </p>
            </div>
          </div>

          {/* Commissions List */}
          <div className="space-y-4">
            {mockCommissions.map((commission) => (
              <div key={commission.id} className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-gray-900 mb-1">{commission.propertyTitle}</h3>
                    <p className="text-sm text-gray-600">Cliente: {commission.clientName}</p>
                  </div>
                  <span className={`
                    px-3 py-1 rounded-full text-xs font-medium
                    ${commission.status === 'recebido' ? 'bg-green-100 text-green-700' : 'bg-orange-100 text-orange-700'}
                  `}>
                    {commission.status === 'recebido' ? 'Recebido' : 'Pendente'}
                  </span>
                </div>

                <div className="grid gap-4 sm:grid-cols-3 mb-4 pb-4 border-b border-gray-200">
                  <div>
                    <p className="text-xs text-gray-500 mb-1">Valor da Venda</p>
                    <p className="font-bold text-gray-900">{formatCurrency(commission.saleValue)}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 mb-1">Comissão ({commission.commissionPercentage}%)</p>
                    <p className="font-bold text-green-600">{formatCurrency(commission.commissionValue)}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 mb-1">
                      {commission.status === 'recebido' ? 'Data Recebimento' : 'Previsão'}
                    </p>
                    <p className="font-medium text-gray-900" suppressHydrationWarning>
                      {formatDate(commission.status === 'recebido' ? commission.paidDate! : commission.expectedDate!)}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
