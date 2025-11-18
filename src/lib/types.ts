// ========== TIPOS BASE ==========

export type LeadOrigin = 
  | 'instagram' 
  | 'google' 
  | 'indicacao' 
  | 'portal' 
  | 'site' 
  | 'facebook' 
  | 'whatsapp' 
  | 'outro';

export type FunnelStage = 
  | 'novo_lead'
  | 'primeiro_contato'
  | 'em_atendimento'
  | 'visita_agendada'
  | 'proposta_enviada'
  | 'em_negociacao'
  | 'aprovado_financiamento'
  | 'venda_concluida'
  | 'perdido';

export type PropertyType = 
  | 'casa' 
  | 'apartamento' 
  | 'terreno' 
  | 'comercial' 
  | 'fazenda' 
  | 'chacara' 
  | 'sobrado' 
  | 'kitnet';

export type PaymentMethod = 
  | 'pix' 
  | 'ted' 
  | 'dinheiro' 
  | 'boleto' 
  | 'cheque';

export type ContactType = 
  | 'whatsapp' 
  | 'ligacao' 
  | 'email' 
  | 'visita_presencial' 
  | 'reuniao_online';

export type ClientStatus = 
  | 'lead_novo' 
  | 'lead_nutricao' 
  | 'cliente_ativo' 
  | 'cliente_comprador' 
  | 'perdido';

export type PropertyStatus = 
  | 'captado' 
  | 'divulgacao' 
  | 'negociacao' 
  | 'reservado' 
  | 'vendido' 
  | 'inativo';

export type SaleStatus = 
  | 'em_andamento' 
  | 'aguardando_pagamento' 
  | 'parcialmente_recebida' 
  | 'comissao_quitada';

export type UserRole = 
  | 'vendedor' 
  | 'comprador' 
  | 'corretor' 
  | 'admin';

export type VisitStatus = 
  | 'pendente' 
  | 'aprovada' 
  | 'recusada' 
  | 'realizada' 
  | 'cancelada';

export type NotificationType = 
  | 'nova_visita' 
  | 'visita_aprovada' 
  | 'visita_recusada' 
  | 'visita_confirmada'
  | 'nova_proposta'
  | 'proposta_aceita'
  | 'proposta_recusada'
  | 'novo_imovel'
  | 'mudanca_status';

export type ContractStatus = 
  | 'rascunho' 
  | 'aguardando_assinatura' 
  | 'assinado' 
  | 'cancelado';

// ========== INTERFACES ==========

export interface Client {
  id: string;
  name: string;
  phone: string;
  whatsapp?: string;
  email?: string;
  cpf?: string;
  city?: string;
  neighborhood?: string;
  profession?: string;
  maritalStatus?: string;
  preferences?: {
    propertyType?: PropertyType[];
    purpose?: 'moradia' | 'investimento' | 'comercial';
    priceRange?: { min: number; max: number };
    desiredLocation?: string[];
    bedrooms?: number;
    suites?: number;
  };
  origin: LeadOrigin;
  status: ClientStatus;
  tags: string[];
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Property {
  id: string;
  code: string;
  title: string;
  type: PropertyType;
  purpose: 'venda' | 'aluguel';
  status: PropertyStatus;
  address: string;
  neighborhood: string;
  city: string;
  state: string;
  characteristics: {
    builtArea?: number;
    totalArea?: number;
    bedrooms?: number;
    suites?: number;
    bathrooms?: number;
    parkingSpaces?: number;
  };
  salePrice?: number;
  rentalPrice?: number;
  owner: {
    name: string;
    contact: string;
    commissionPercentage: number;
  };
  documents: string[];
  photos: string[];
  internalNotes?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Opportunity {
  id: string;
  clientId: string;
  propertyId?: string;
  stage: FunnelStage;
  estimatedValue: number;
  probability: number;
  origin: LeadOrigin;
  enteredAt: Date;
  lastInteraction: Date;
  nextStep?: string;
  nextStepDate?: Date;
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Attendance {
  id: string;
  clientId: string;
  propertyId?: string;
  date: Date;
  contactType: ContactType;
  description: string;
  nextStep?: string;
  nextStepDate?: Date;
  responsible: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Sale {
  id: string;
  clientId: string;
  propertyId: string;
  saleDate: Date;
  propertyValue: number;
  commissionPercentage: number;
  commissionValue: number;
  paymentCondition: 'vista' | 'entrada_parcelas' | 'financiamento';
  paymentSource: string;
  status: SaleStatus;
  notes?: string;
  attachments: string[];
  createdAt: Date;
  updatedAt: Date;
}

export interface Installment {
  id: string;
  saleId: string;
  installmentNumber: number;
  dueDate: Date;
  amount: number;
  status: 'pendente' | 'recebido' | 'atrasado';
  paymentDate?: Date;
  paymentMethod?: PaymentMethod;
  amountReceived?: number;
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Visit {
  id: string;
  propertyId: string;
  clientId: string;
  brokerId: string;
  requestedDate: Date;
  scheduledDate?: Date;
  status: VisitStatus;
  notes?: string;
  sellerNotes?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Notification {
  id: string;
  userId: string;
  type: NotificationType;
  title: string;
  message: string;
  relatedId?: string;
  read: boolean;
  createdAt: Date;
}

export interface Contract {
  id: string;
  saleId: string;
  propertyId: string;
  buyerId: string;
  sellerId: string;
  brokerId: string;
  status: ContractStatus;
  contractUrl?: string;
  signedByBuyer?: boolean;
  signedBySeller?: boolean;
  signedByBroker?: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: UserRole;
  creci?: string;
  createdAt: Date;
}

// ========== TIPOS AUXILIARES ==========

export interface DashboardStats {
  totalClients: number;
  activeOpportunities: number;
  salesThisMonth: number;
  commissionReceived: number;
  commissionPending: number;
  conversionRate: number;
  averageTicket: number;
  propertiesAvailable: number;
}

export interface MonthlyRevenue {
  month: string;
  received: number;
  pending: number;
}

export interface TopPerformer {
  id: string;
  name: string;
  value: number;
  count: number;
}
