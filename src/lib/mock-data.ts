import { 
  Client, 
  Property, 
  Opportunity, 
  Sale, 
  Installment, 
  DashboardStats,
  MonthlyRevenue,
  TopPerformer,
  Attendance,
  Visit,
  Notification,
  Contract,
  User
} from './types';

// ========== DADOS MOCK PARA DEMONSTRAÇÃO ==========

// Usuários do sistema
export const mockUsers: User[] = [
  {
    id: '1',
    name: 'Corretor Principal',
    email: 'corretor@imobiliaria.com',
    phone: '(11) 99999-8888',
    role: 'corretor',
    creci: '12345-F',
    createdAt: new Date('2023-01-01T00:00:00Z'),
  },
  {
    id: '2',
    name: 'Carlos Proprietário',
    email: 'carlos@email.com',
    phone: '(11) 98888-7777',
    role: 'vendedor',
    createdAt: new Date('2024-01-05T00:00:00Z'),
  },
  {
    id: '3',
    name: 'Ana Proprietária',
    email: 'ana@email.com',
    phone: '(11) 97777-6666',
    role: 'vendedor',
    createdAt: new Date('2024-01-03T00:00:00Z'),
  },
];

// Clientes de exemplo
export const mockClients: Client[] = [
  {
    id: '1',
    name: 'João Silva',
    phone: '(11) 98765-4321',
    whatsapp: '(11) 98765-4321',
    email: 'joao.silva@email.com',
    cpf: '123.456.789-00',
    city: 'São Paulo',
    neighborhood: 'Jardins',
    profession: 'Empresário',
    maritalStatus: 'Casado',
    preferences: {
      propertyType: ['apartamento', 'casa'],
      purpose: 'moradia',
      priceRange: { min: 800000, max: 1500000 },
      desiredLocation: ['Jardins', 'Moema', 'Itaim'],
      bedrooms: 3,
      suites: 2,
    },
    origin: 'instagram',
    status: 'cliente_ativo',
    tags: ['alto_padrao', 'urgente'],
    notes: 'Cliente muito interessado, procura imóvel para mudança em 3 meses',
    createdAt: new Date('2024-01-15T10:00:00Z'),
    updatedAt: new Date('2024-01-20T14:30:00Z'),
  },
  {
    id: '2',
    name: 'Maria Santos',
    phone: '(11) 91234-5678',
    email: 'maria.santos@email.com',
    city: 'São Paulo',
    neighborhood: 'Vila Mariana',
    origin: 'indicacao',
    status: 'lead_nutricao',
    tags: ['investidor'],
    notes: 'Interessada em imóveis para investimento',
    createdAt: new Date('2024-01-18T09:00:00Z'),
    updatedAt: new Date('2024-01-18T09:00:00Z'),
  },
  {
    id: '3',
    name: 'Pedro Oliveira',
    phone: '(11) 99876-5432',
    email: 'pedro.oliveira@email.com',
    city: 'São Paulo',
    origin: 'google',
    status: 'cliente_comprador',
    tags: ['primeira_compra'],
    createdAt: new Date('2023-12-10T08:00:00Z'),
    updatedAt: new Date('2024-01-10T16:00:00Z'),
  },
];

// Imóveis de exemplo
export const mockProperties: Property[] = [
  {
    id: '1',
    code: 'AP-001',
    title: 'Apartamento Luxuoso nos Jardins',
    type: 'apartamento',
    purpose: 'venda',
    status: 'divulgacao',
    address: 'Rua Augusta, 1500',
    neighborhood: 'Jardins',
    city: 'São Paulo',
    state: 'SP',
    characteristics: {
      builtArea: 120,
      totalArea: 150,
      bedrooms: 3,
      suites: 2,
      bathrooms: 3,
      parkingSpaces: 2,
    },
    salePrice: 1200000,
    owner: {
      name: 'Carlos Proprietário',
      contact: '(11) 98888-7777',
      commissionPercentage: 6,
    },
    documents: [],
    photos: [],
    internalNotes: 'Imóvel em ótimo estado, aceita permuta',
    createdAt: new Date('2024-01-10T10:00:00Z'),
    updatedAt: new Date('2024-01-15T11:00:00Z'),
  },
  {
    id: '2',
    code: 'CS-002',
    title: 'Casa Moderna em Condomínio Fechado',
    type: 'casa',
    purpose: 'venda',
    status: 'negociacao',
    address: 'Rua das Flores, 250',
    neighborhood: 'Morumbi',
    city: 'São Paulo',
    state: 'SP',
    characteristics: {
      builtArea: 250,
      totalArea: 400,
      bedrooms: 4,
      suites: 3,
      bathrooms: 5,
      parkingSpaces: 4,
    },
    salePrice: 2500000,
    owner: {
      name: 'Ana Proprietária',
      contact: '(11) 97777-6666',
      commissionPercentage: 5,
    },
    documents: [],
    photos: [],
    createdAt: new Date('2024-01-05T09:00:00Z'),
    updatedAt: new Date('2024-01-20T15:00:00Z'),
  },
  {
    id: '3',
    code: 'AP-003',
    title: 'Apartamento Compacto Vila Madalena',
    type: 'apartamento',
    purpose: 'venda',
    status: 'divulgacao',
    address: 'Rua Harmonia, 800',
    neighborhood: 'Vila Madalena',
    city: 'São Paulo',
    state: 'SP',
    characteristics: {
      builtArea: 65,
      totalArea: 65,
      bedrooms: 2,
      suites: 1,
      bathrooms: 2,
      parkingSpaces: 1,
    },
    salePrice: 650000,
    owner: {
      name: 'Carlos Proprietário',
      contact: '(11) 98888-7777',
      commissionPercentage: 6,
    },
    documents: [],
    photos: [],
    createdAt: new Date('2024-01-12T10:00:00Z'),
    updatedAt: new Date('2024-01-12T10:00:00Z'),
  },
];

// Oportunidades no funil
export const mockOpportunities: Opportunity[] = [
  {
    id: '1',
    clientId: '1',
    propertyId: '1',
    stage: 'proposta_enviada',
    estimatedValue: 1200000,
    probability: 70,
    origin: 'instagram',
    enteredAt: new Date('2024-01-15T10:00:00Z'),
    lastInteraction: new Date('2024-01-20T14:30:00Z'),
    nextStep: 'Aguardar resposta da proposta',
    nextStepDate: new Date('2024-01-25T10:00:00Z'),
    notes: 'Cliente muito interessado, enviou proposta de R$ 1.150.000',
    createdAt: new Date('2024-01-15T10:00:00Z'),
    updatedAt: new Date('2024-01-20T14:30:00Z'),
  },
  {
    id: '2',
    clientId: '2',
    stage: 'primeiro_contato',
    estimatedValue: 800000,
    probability: 30,
    origin: 'indicacao',
    enteredAt: new Date('2024-01-18T09:00:00Z'),
    lastInteraction: new Date('2024-01-18T09:00:00Z'),
    nextStep: 'Enviar catálogo de imóveis',
    nextStepDate: new Date('2024-01-22T14:00:00Z'),
    createdAt: new Date('2024-01-18T09:00:00Z'),
    updatedAt: new Date('2024-01-18T09:00:00Z'),
  },
];

// Atendimentos
export const mockAttendances: Attendance[] = [
  {
    id: '1',
    clientId: '1',
    propertyId: '1',
    date: new Date('2024-01-20T14:30:00Z'),
    contactType: 'whatsapp',
    description: 'Cliente demonstrou muito interesse no apartamento. Discutimos valores e condições de pagamento.',
    nextStep: 'Agendar visita presencial',
    nextStepDate: new Date('2024-01-25T10:00:00Z'),
    responsible: 'Corretor Principal',
    createdAt: new Date('2024-01-20T14:30:00Z'),
    updatedAt: new Date('2024-01-20T14:30:00Z'),
  },
  {
    id: '2',
    clientId: '1',
    propertyId: '1',
    date: new Date('2024-01-18T10:00:00Z'),
    contactType: 'ligacao',
    description: 'Primeiro contato. Cliente busca apartamento de 3 quartos nos Jardins.',
    nextStep: 'Enviar opções de imóveis',
    responsible: 'Corretor Principal',
    createdAt: new Date('2024-01-18T10:00:00Z'),
    updatedAt: new Date('2024-01-18T10:00:00Z'),
  },
];

// Visitas
export const mockVisits: Visit[] = [
  {
    id: '1',
    propertyId: '1',
    clientId: '1',
    brokerId: '1',
    requestedDate: new Date('2024-01-22T14:00:00Z'),
    scheduledDate: new Date('2024-01-25T10:00:00Z'),
    status: 'pendente',
    notes: 'Cliente prefere visitar pela manhã',
    createdAt: new Date('2024-01-20T15:00:00Z'),
    updatedAt: new Date('2024-01-20T15:00:00Z'),
  },
  {
    id: '2',
    propertyId: '2',
    clientId: '2',
    brokerId: '1',
    requestedDate: new Date('2024-01-23T16:00:00Z'),
    scheduledDate: new Date('2024-01-23T16:00:00Z'),
    status: 'aprovada',
    notes: 'Visita confirmada para terça-feira',
    sellerNotes: 'Aprovado. Imóvel estará disponível.',
    createdAt: new Date('2024-01-19T10:00:00Z'),
    updatedAt: new Date('2024-01-19T14:00:00Z'),
  },
  {
    id: '3',
    propertyId: '3',
    clientId: '3',
    brokerId: '1',
    requestedDate: new Date('2024-01-24T11:00:00Z'),
    status: 'recusada',
    notes: 'Cliente solicitou visita urgente',
    sellerNotes: 'Imóvel em manutenção nesta data',
    createdAt: new Date('2024-01-21T09:00:00Z'),
    updatedAt: new Date('2024-01-21T10:00:00Z'),
  },
];

// Notificações
export const mockNotifications: Notification[] = [
  {
    id: '1',
    userId: '2',
    type: 'nova_visita',
    title: 'Nova Solicitação de Visita',
    message: 'João Silva solicitou visita para o Apartamento Luxuoso nos Jardins',
    relatedId: '1',
    read: false,
    createdAt: new Date('2024-01-20T15:00:00Z'),
  },
  {
    id: '2',
    userId: '1',
    type: 'visita_aprovada',
    title: 'Visita Aprovada',
    message: 'Sua visita à Casa Moderna em Condomínio Fechado foi aprovada',
    relatedId: '2',
    read: false,
    createdAt: new Date('2024-01-19T14:00:00Z'),
  },
  {
    id: '3',
    userId: '1',
    type: 'visita_recusada',
    title: 'Visita Recusada',
    message: 'Sua visita ao Apartamento Compacto Vila Madalena foi recusada. Motivo: Imóvel em manutenção',
    relatedId: '3',
    read: true,
    createdAt: new Date('2024-01-21T10:00:00Z'),
  },
];

// Vendas
export const mockSales: Sale[] = [
  {
    id: '1',
    clientId: '3',
    propertyId: '2',
    saleDate: new Date('2024-01-10T10:00:00Z'),
    propertyValue: 2500000,
    commissionPercentage: 5,
    commissionValue: 125000,
    paymentCondition: 'entrada_parcelas',
    paymentSource: 'Construtora XYZ',
    status: 'parcialmente_recebida',
    notes: 'Venda concluída com sucesso. Comissão será paga em 3 parcelas.',
    attachments: [],
    createdAt: new Date('2024-01-10T10:00:00Z'),
    updatedAt: new Date('2024-01-15T11:00:00Z'),
  },
];

// Contratos
export const mockContracts: Contract[] = [
  {
    id: '1',
    saleId: '1',
    propertyId: '2',
    buyerId: '3',
    sellerId: '3',
    brokerId: '1',
    status: 'assinado',
    contractUrl: 'https://example.com/contrato-001.pdf',
    signedByBuyer: true,
    signedBySeller: true,
    signedByBroker: true,
    createdAt: new Date('2024-01-10T10:00:00Z'),
    updatedAt: new Date('2024-01-12T15:00:00Z'),
  },
  {
    id: '2',
    saleId: '1',
    propertyId: '1',
    buyerId: '1',
    sellerId: '2',
    brokerId: '1',
    status: 'aguardando_assinatura',
    contractUrl: 'https://example.com/contrato-002.pdf',
    signedByBuyer: false,
    signedBySeller: true,
    signedByBroker: true,
    createdAt: new Date('2024-01-20T10:00:00Z'),
    updatedAt: new Date('2024-01-20T10:00:00Z'),
  },
];

// Parcelas/Recebimentos
export const mockInstallments: Installment[] = [
  {
    id: '1',
    saleId: '1',
    installmentNumber: 1,
    dueDate: new Date('2024-01-15T10:00:00Z'),
    amount: 41666.67,
    status: 'recebido',
    paymentDate: new Date('2024-01-15T10:00:00Z'),
    paymentMethod: 'pix',
    amountReceived: 41666.67,
    notes: 'Primeira parcela recebida',
    createdAt: new Date('2024-01-10T10:00:00Z'),
    updatedAt: new Date('2024-01-15T10:00:00Z'),
  },
  {
    id: '2',
    saleId: '1',
    installmentNumber: 2,
    dueDate: new Date('2024-02-15T10:00:00Z'),
    amount: 41666.67,
    status: 'pendente',
    createdAt: new Date('2024-01-10T10:00:00Z'),
    updatedAt: new Date('2024-01-10T10:00:00Z'),
  },
  {
    id: '3',
    saleId: '1',
    installmentNumber: 3,
    dueDate: new Date('2024-03-15T10:00:00Z'),
    amount: 41666.66,
    status: 'pendente',
    createdAt: new Date('2024-01-10T10:00:00Z'),
    updatedAt: new Date('2024-01-10T10:00:00Z'),
  },
];

// Estatísticas do Dashboard
export const mockDashboardStats: DashboardStats = {
  totalClients: 48,
  activeOpportunities: 12,
  salesThisMonth: 3,
  commissionReceived: 85000,
  commissionPending: 215000,
  conversionRate: 28.5,
  averageTicket: 1350000,
  propertiesAvailable: 23,
};

// Receita mensal
export const mockMonthlyRevenue: MonthlyRevenue[] = [
  { month: 'Jan', received: 85000, pending: 40000 },
  { month: 'Fev', received: 120000, pending: 83000 },
  { month: 'Mar', received: 95000, pending: 92000 },
  { month: 'Abr', received: 150000, pending: 0 },
  { month: 'Mai', received: 110000, pending: 0 },
  { month: 'Jun', received: 0, pending: 0 },
];

// Top performers
export const mockTopProperties: TopPerformer[] = [
  { id: '1', name: 'Apartamento Jardins', value: 125000, count: 1 },
  { id: '2', name: 'Casa Morumbi', value: 95000, count: 1 },
  { id: '3', name: 'Cobertura Itaim', value: 180000, count: 1 },
];

export const mockTopOrigins: TopPerformer[] = [
  { id: '1', name: 'Instagram', value: 280000, count: 8 },
  { id: '2', name: 'Indicação', value: 195000, count: 5 },
  { id: '3', name: 'Google', value: 125000, count: 3 },
];
