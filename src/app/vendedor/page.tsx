'use client';

import { useState } from 'react';
import { 
  Home, 
  Calendar, 
  CheckCircle, 
  XCircle, 
  Clock,
  MessageCircle,
  Phone,
  MapPin,
  DollarSign,
  Eye,
  Bell,
  TrendingUp
} from 'lucide-react';
import { formatCurrency, formatDate } from '@/lib/constants';

// Mock data para vendedor
const mockSellerProperties = [
  {
    id: '1',
    code: 'IMV-001',
    title: 'Casa 3 Quartos - Jardim América',
    type: 'Casa',
    status: 'divulgacao',
    address: 'Rua das Flores, 123',
    neighborhood: 'Jardim América',
    city: 'São Paulo',
    salePrice: 850000,
    bedrooms: 3,
    bathrooms: 2,
    parkingSpaces: 2,
    photos: ['https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=400&h=300&fit=crop'],
    pendingVisits: 3,
    totalVisits: 12
  },
  {
    id: '2',
    code: 'IMV-002',
    title: 'Apartamento 2 Quartos - Centro',
    type: 'Apartamento',
    status: 'negociacao',
    address: 'Av. Paulista, 1000',
    neighborhood: 'Centro',
    city: 'São Paulo',
    salePrice: 450000,
    bedrooms: 2,
    bathrooms: 1,
    parkingSpaces: 1,
    photos: ['https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=400&h=300&fit=crop'],
    pendingVisits: 1,
    totalVisits: 8
  }
];

const mockPendingVisits = [
  {
    id: '1',
    propertyId: '1',
    propertyTitle: 'Casa 3 Quartos - Jardim América',
    buyerName: 'João Silva',
    buyerPhone: '(11) 98765-4321',
    brokerName: 'Maria Santos',
    brokerPhone: '(11) 91234-5678',
    requestedDate: new Date('2024-01-20T14:00:00'),
    notes: 'Cliente interessado em financiamento. Prefere visita pela manhã.',
    status: 'pendente'
  },
  {
    id: '2',
    propertyId: '1',
    propertyTitle: 'Casa 3 Quartos - Jardim América',
    buyerName: 'Ana Costa',
    buyerPhone: '(11) 97654-3210',
    brokerName: 'Pedro Oliveira',
    brokerPhone: '(11) 99876-5432',
    requestedDate: new Date('2024-01-22T10:00:00'),
    notes: 'Primeira visita, cliente vem de outra cidade.',
    status: 'pendente'
  },
  {
    id: '3',
    propertyId: '2',
    propertyTitle: 'Apartamento 2 Quartos - Centro',
    buyerName: 'Carlos Mendes',
    buyerPhone: '(11) 96543-2109',
    brokerName: 'Maria Santos',
    brokerPhone: '(11) 91234-5678',
    requestedDate: new Date('2024-01-21T16:00:00'),
    notes: 'Cliente quer ver a vista do apartamento.',
    status: 'pendente'
  }
];

const mockApprovedVisits = [
  {
    id: '4',
    propertyTitle: 'Casa 3 Quartos - Jardim América',
    buyerName: 'Roberto Lima',
    scheduledDate: new Date('2024-01-19T15:00:00'),
    status: 'aprovada'
  },
  {
    id: '5',
    propertyTitle: 'Apartamento 2 Quartos - Centro',
    buyerName: 'Fernanda Souza',
    scheduledDate: new Date('2024-01-19T11:00:00'),
    status: 'aprovada'
  }
];

const mockStats = {
  totalProperties: 2,
  pendingVisits: 3,
  approvedVisits: 2,
  totalViews: 156
};

export default function VendedorPage() {
  const [activeTab, setActiveTab] = useState<'imoveis' | 'visitas-pendentes' | 'visitas-aprovadas'>('imoveis');
  const [selectedVisit, setSelectedVisit] = useState<string | null>(null);

  const handleApproveVisit = (visitId: string) => {
    console.log('Aprovar visita:', visitId);
    // Implementar lógica de aprovação
  };

  const handleRejectVisit = (visitId: string) => {
    console.log('Recusar visita:', visitId);
    // Implementar lógica de recusa
  };

  const handleWhatsApp = (phone: string) => {
    const cleanPhone = phone.replace(/\D/g, '');
    window.open(`https://wa.me/55${cleanPhone}`, '_blank');
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Painel do Vendedor</h1>
        <p className="mt-2 text-gray-600">
          Gerencie seus imóveis e aprove visitas
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
          <div className="flex items-center gap-3 mb-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500">
              <Home className="h-6 w-6 text-white" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600">Meus Imóveis</p>
              <p className="text-2xl font-bold text-gray-900">{mockStats.totalProperties}</p>
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
          <div className="flex items-center gap-3 mb-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-orange-500 to-red-500">
              <Clock className="h-6 w-6 text-white" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600">Visitas Pendentes</p>
              <p className="text-2xl font-bold text-orange-600">{mockStats.pendingVisits}</p>
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
          <div className="flex items-center gap-3 mb-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-green-500 to-emerald-500">
              <CheckCircle className="h-6 w-6 text-white" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600">Visitas Aprovadas</p>
              <p className="text-2xl font-bold text-green-600">{mockStats.approvedVisits}</p>
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
          <div className="flex items-center gap-3 mb-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-purple-500 to-pink-500">
              <Eye className="h-6 w-6 text-white" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600">Visualizações</p>
              <p className="text-2xl font-bold text-purple-600">{mockStats.totalViews}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          <button
            onClick={() => setActiveTab('imoveis')}
            className={`
              whitespace-nowrap border-b-2 py-4 px-1 text-sm font-medium transition-colors
              ${activeTab === 'imoveis'
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
              }
            `}
          >
            Meus Imóveis
          </button>
          <button
            onClick={() => setActiveTab('visitas-pendentes')}
            className={`
              whitespace-nowrap border-b-2 py-4 px-1 text-sm font-medium transition-colors
              ${activeTab === 'visitas-pendentes'
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
              }
            `}
          >
            Visitas Pendentes
            {mockStats.pendingVisits > 0 && (
              <span className="ml-2 inline-flex items-center justify-center h-5 w-5 rounded-full bg-orange-500 text-xs font-bold text-white">
                {mockStats.pendingVisits}
              </span>
            )}
          </button>
          <button
            onClick={() => setActiveTab('visitas-aprovadas')}
            className={`
              whitespace-nowrap border-b-2 py-4 px-1 text-sm font-medium transition-colors
              ${activeTab === 'visitas-aprovadas'
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
              }
            `}
          >
            Visitas Aprovadas
          </button>
        </nav>
      </div>

      {/* Content */}
      {activeTab === 'imoveis' && (
        <div className="grid gap-6 lg:grid-cols-2">
          {mockSellerProperties.map((property) => (
            <div key={property.id} className="rounded-2xl border border-gray-200 bg-white overflow-hidden shadow-sm hover:shadow-md transition-shadow">
              <div className="relative h-48">
                <img 
                  src={property.photos[0]} 
                  alt={property.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-4 right-4">
                  <span className={`
                    px-3 py-1 rounded-full text-xs font-medium
                    ${property.status === 'divulgacao' ? 'bg-blue-100 text-blue-700' : ''}
                    ${property.status === 'negociacao' ? 'bg-green-100 text-green-700' : ''}
                  `}>
                    {property.status === 'divulgacao' ? 'Em Divulgação' : 'Em Negociação'}
                  </span>
                </div>
              </div>
              
              <div className="p-6">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <p className="text-xs text-gray-500 mb-1">{property.code}</p>
                    <h3 className="text-lg font-bold text-gray-900">{property.title}</h3>
                  </div>
                </div>

                <div className="flex items-center gap-2 text-sm text-gray-600 mb-4">
                  <MapPin className="h-4 w-4" />
                  <span>{property.neighborhood}, {property.city}</span>
                </div>

                <div className="flex items-center gap-4 text-sm text-gray-600 mb-4 pb-4 border-b border-gray-200">
                  <span>{property.bedrooms} quartos</span>
                  <span>•</span>
                  <span>{property.bathrooms} banheiros</span>
                  <span>•</span>
                  <span>{property.parkingSpaces} vagas</span>
                </div>

                <div className="flex items-center justify-between mb-4">
                  <div>
                    <p className="text-xs text-gray-500">Valor</p>
                    <p className="text-xl font-bold text-green-600">{formatCurrency(property.salePrice)}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-gray-500">Visitas</p>
                    <p className="text-lg font-bold text-gray-900">{property.totalVisits}</p>
                  </div>
                </div>

                {property.pendingVisits > 0 && (
                  <div className="bg-orange-50 border border-orange-200 rounded-lg p-3 flex items-center gap-2">
                    <Bell className="h-5 w-5 text-orange-600" />
                    <span className="text-sm font-medium text-orange-900">
                      {property.pendingVisits} {property.pendingVisits === 1 ? 'visita pendente' : 'visitas pendentes'}
                    </span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {activeTab === 'visitas-pendentes' && (
        <div className="space-y-4">
          {mockPendingVisits.map((visit) => (
            <div key={visit.id} className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-gray-900 mb-1">{visit.propertyTitle}</h3>
                  <p className="text-sm text-gray-500" suppressHydrationWarning>
                    Solicitada para {formatDate(visit.requestedDate)}
                  </p>
                </div>
                <span className="px-3 py-1 rounded-full text-xs font-medium bg-orange-100 text-orange-700">
                  Aguardando Aprovação
                </span>
              </div>

              <div className="grid gap-4 sm:grid-cols-2 mb-4 pb-4 border-b border-gray-200">
                <div>
                  <p className="text-xs text-gray-500 mb-2">Comprador</p>
                  <div className="flex items-center gap-2 mb-2">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 text-white font-bold text-sm">
                      {visit.buyerName.split(' ').map(n => n[0]).join('').toUpperCase()}
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">{visit.buyerName}</p>
                      <p className="text-sm text-gray-600">{visit.buyerPhone}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => handleWhatsApp(visit.buyerPhone)}
                    className="flex items-center gap-2 text-sm text-green-600 hover:text-green-700 font-medium"
                  >
                    <MessageCircle className="h-4 w-4" />
                    Enviar WhatsApp
                  </button>
                </div>

                <div>
                  <p className="text-xs text-gray-500 mb-2">Corretor Responsável</p>
                  <div className="flex items-center gap-2 mb-2">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-purple-500 to-pink-500 text-white font-bold text-sm">
                      {visit.brokerName.split(' ').map(n => n[0]).join('').toUpperCase()}
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">{visit.brokerName}</p>
                      <p className="text-sm text-gray-600">{visit.brokerPhone}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => handleWhatsApp(visit.brokerPhone)}
                    className="flex items-center gap-2 text-sm text-green-600 hover:text-green-700 font-medium"
                  >
                    <MessageCircle className="h-4 w-4" />
                    Enviar WhatsApp
                  </button>
                </div>
              </div>

              {visit.notes && (
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mb-4">
                  <p className="text-xs text-blue-700 font-medium mb-1">Observações do Corretor:</p>
                  <p className="text-sm text-blue-900">{visit.notes}</p>
                </div>
              )}

              <div className="flex gap-3">
                <button
                  onClick={() => handleApproveVisit(visit.id)}
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-lg font-medium hover:from-green-600 hover:to-emerald-600 transition-all"
                >
                  <CheckCircle className="h-5 w-5" />
                  Aprovar Visita
                </button>
                <button
                  onClick={() => handleRejectVisit(visit.id)}
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-red-500 to-pink-500 text-white rounded-lg font-medium hover:from-red-600 hover:to-pink-600 transition-all"
                >
                  <XCircle className="h-5 w-5" />
                  Recusar Visita
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {activeTab === 'visitas-aprovadas' && (
        <div className="space-y-4">
          {mockApprovedVisits.map((visit) => (
            <div key={visit.id} className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-gray-900 mb-1">{visit.propertyTitle}</h3>
                  <p className="text-sm text-gray-600 mb-2">Comprador: {visit.buyerName}</p>
                  <p className="text-sm text-gray-500" suppressHydrationWarning>
                    Agendada para {formatDate(visit.scheduledDate)}
                  </p>
                </div>
                <span className="px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700">
                  Aprovada
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
