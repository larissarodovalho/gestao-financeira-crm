import { 
  LeadOrigin, 
  FunnelStage, 
  PropertyType, 
  PaymentMethod,
  ContactType,
  ClientStatus,
  PropertyStatus,
  SaleStatus
} from './types';

// ========== CONFIGURAÇÕES DO SISTEMA ==========

export const LEAD_ORIGINS: { value: LeadOrigin; label: string; color: string }[] = [
  { value: 'instagram', label: 'Instagram', color: 'from-pink-500 to-purple-500' },
  { value: 'google', label: 'Google', color: 'from-blue-500 to-cyan-500' },
  { value: 'indicacao', label: 'Indicação', color: 'from-green-500 to-emerald-500' },
  { value: 'portal', label: 'Portal Imobiliário', color: 'from-orange-500 to-red-500' },
  { value: 'site', label: 'Site Próprio', color: 'from-indigo-500 to-blue-500' },
  { value: 'facebook', label: 'Facebook', color: 'from-blue-600 to-blue-400' },
  { value: 'whatsapp', label: 'WhatsApp', color: 'from-green-600 to-green-400' },
  { value: 'outro', label: 'Outro', color: 'from-gray-500 to-gray-400' },
];

export const FUNNEL_STAGES: { value: FunnelStage; label: string; color: string }[] = [
  { value: 'novo_lead', label: 'Novo Lead', color: 'bg-gray-100 text-gray-700 border-gray-300' },
  { value: 'primeiro_contato', label: 'Primeiro Contato', color: 'bg-blue-100 text-blue-700 border-blue-300' },
  { value: 'em_atendimento', label: 'Em Atendimento', color: 'bg-cyan-100 text-cyan-700 border-cyan-300' },
  { value: 'visita_agendada', label: 'Visita Agendada', color: 'bg-purple-100 text-purple-700 border-purple-300' },
  { value: 'proposta_enviada', label: 'Proposta Enviada', color: 'bg-indigo-100 text-indigo-700 border-indigo-300' },
  { value: 'em_negociacao', label: 'Em Negociação', color: 'bg-orange-100 text-orange-700 border-orange-300' },
  { value: 'aprovado_financiamento', label: 'Aprovado/Financiamento', color: 'bg-yellow-100 text-yellow-700 border-yellow-300' },
  { value: 'venda_concluida', label: 'Venda Concluída', color: 'bg-green-100 text-green-700 border-green-300' },
  { value: 'perdido', label: 'Perdido', color: 'bg-red-100 text-red-700 border-red-300' },
];

export const PROPERTY_TYPES: { value: PropertyType; label: string; icon: string }[] = [
  { value: 'casa', label: 'Casa', icon: '🏠' },
  { value: 'apartamento', label: 'Apartamento', icon: '🏢' },
  { value: 'terreno', label: 'Terreno', icon: '🏞️' },
  { value: 'comercial', label: 'Comercial', icon: '🏪' },
  { value: 'fazenda', label: 'Fazenda', icon: '🌾' },
  { value: 'chacara', label: 'Chácara', icon: '🏡' },
  { value: 'sobrado', label: 'Sobrado', icon: '🏘️' },
  { value: 'kitnet', label: 'Kitnet', icon: '🚪' },
];

export const PAYMENT_METHODS: { value: PaymentMethod; label: string }[] = [
  { value: 'pix', label: 'PIX' },
  { value: 'ted', label: 'TED' },
  { value: 'dinheiro', label: 'Dinheiro' },
  { value: 'boleto', label: 'Boleto' },
  { value: 'cheque', label: 'Cheque' },
];

export const CONTACT_TYPES: { value: ContactType; label: string; icon: string }[] = [
  { value: 'whatsapp', label: 'WhatsApp', icon: '💬' },
  { value: 'ligacao', label: 'Ligação', icon: '📞' },
  { value: 'email', label: 'E-mail', icon: '📧' },
  { value: 'visita_presencial', label: 'Visita Presencial', icon: '🏠' },
  { value: 'reuniao_online', label: 'Reunião Online', icon: '💻' },
];

export const CLIENT_STATUS: { value: ClientStatus; label: string; color: string }[] = [
  { value: 'lead_novo', label: 'Lead Novo', color: 'bg-blue-100 text-blue-700' },
  { value: 'lead_nutricao', label: 'Lead em Nutrição', color: 'bg-purple-100 text-purple-700' },
  { value: 'cliente_ativo', label: 'Cliente Ativo', color: 'bg-green-100 text-green-700' },
  { value: 'cliente_comprador', label: 'Cliente Comprador', color: 'bg-emerald-100 text-emerald-700' },
  { value: 'perdido', label: 'Perdido/Desinteressado', color: 'bg-red-100 text-red-700' },
];

export const PROPERTY_STATUS: { value: PropertyStatus; label: string; color: string }[] = [
  { value: 'captado', label: 'Captado', color: 'bg-blue-100 text-blue-700' },
  { value: 'divulgacao', label: 'Em Divulgação', color: 'bg-cyan-100 text-cyan-700' },
  { value: 'negociacao', label: 'Em Negociação', color: 'bg-orange-100 text-orange-700' },
  { value: 'reservado', label: 'Reservado', color: 'bg-yellow-100 text-yellow-700' },
  { value: 'vendido', label: 'Vendido', color: 'bg-green-100 text-green-700' },
  { value: 'inativo', label: 'Inativo', color: 'bg-gray-100 text-gray-700' },
];

export const SALE_STATUS: { value: SaleStatus; label: string; color: string }[] = [
  { value: 'em_andamento', label: 'Em Andamento', color: 'bg-blue-100 text-blue-700' },
  { value: 'aguardando_pagamento', label: 'Aguardando Pagamento', color: 'bg-yellow-100 text-yellow-700' },
  { value: 'parcialmente_recebida', label: 'Parcialmente Recebida', color: 'bg-orange-100 text-orange-700' },
  { value: 'comissao_quitada', label: 'Comissão Quitada', color: 'bg-green-100 text-green-700' },
];

// ========== UTILITÁRIOS ==========

export const formatCurrency = (value: number): string => {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(value);
};

export const formatDate = (date: Date): string => {
  return new Intl.DateTimeFormat('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  }).format(date);
};

export const formatDateTime = (date: Date): string => {
  return new Intl.DateTimeFormat('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(date);
};

export const calculateDaysAgo = (date: Date): string => {
  const now = new Date();
  const diffTime = Math.abs(now.getTime() - date.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  
  if (diffDays === 0) return 'Hoje';
  if (diffDays === 1) return 'Ontem';
  if (diffDays < 7) return `${diffDays} dias atrás`;
  if (diffDays < 30) return `${Math.floor(diffDays / 7)} semanas atrás`;
  if (diffDays < 365) return `${Math.floor(diffDays / 30)} meses atrás`;
  return `${Math.floor(diffDays / 365)} anos atrás`;
};

export const getInitials = (name: string): string => {
  return name
    .split(' ')
    .map(n => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
};
