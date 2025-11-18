'use client';

import { useState } from 'react';
import { mockOpportunities, mockClients, mockProperties } from '@/lib/mock-data';
import { Opportunity, FunnelStage } from '@/lib/types';
import { 
  Users, 
  Phone, 
  Calendar, 
  FileText, 
  Handshake, 
  CheckCircle2, 
  XCircle,
  Building2,
  TrendingUp,
  Clock,
  DollarSign,
  ArrowRight
} from 'lucide-react';

// Configuração das etapas do funil
const funnelStages: { 
  value: FunnelStage; 
  label: string; 
  color: string;
  icon: React.ElementType;
}[] = [
  { value: 'novo_lead', label: 'Novo Lead', color: 'bg-gray-100 text-gray-700 border-gray-300', icon: Users },
  { value: 'primeiro_contato', label: 'Primeiro Contato', color: 'bg-blue-100 text-blue-700 border-blue-300', icon: Phone },
  { value: 'em_atendimento', label: 'Em Atendimento', color: 'bg-purple-100 text-purple-700 border-purple-300', icon: FileText },
  { value: 'visita_agendada', label: 'Visita Agendada', color: 'bg-yellow-100 text-yellow-700 border-yellow-300', icon: Calendar },
  { value: 'proposta_enviada', label: 'Proposta Enviada', color: 'bg-orange-100 text-orange-700 border-orange-300', icon: FileText },
  { value: 'em_negociacao', label: 'Em Negociação', color: 'bg-indigo-100 text-indigo-700 border-indigo-300', icon: Handshake },
  { value: 'aprovado_financiamento', label: 'Aprovado', color: 'bg-teal-100 text-teal-700 border-teal-300', icon: CheckCircle2 },
  { value: 'venda_concluida', label: 'Venda Concluída', color: 'bg-green-100 text-green-700 border-green-300', icon: CheckCircle2 },
];

export default function FunilPage() {
  const [opportunities, setOpportunities] = useState<Opportunity[]>(mockOpportunities);
  const [draggedCard, setDraggedCard] = useState<string | null>(null);

  // Função para obter dados do cliente
  const getClient = (clientId: string) => {
    return mockClients.find(c => c.id === clientId);
  };

  // Função para obter dados do imóvel
  const getProperty = (propertyId?: string) => {
    if (!propertyId) return null;
    return mockProperties.find(p => p.id === propertyId);
  };

  // Função para formatar valor em reais
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(value);
  };

  // Função para formatar data - Corrigida para evitar erro de Intl.DateFormat
  const formatDate = (date: Date | string) => {
    const d = new Date(date);
    const day = String(d.getDate()).padStart(2, '0');
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const year = d.getFullYear();
    return `${day}/${month}/${year}`;
  };

  // Função para calcular dias desde última interação
  const getDaysSinceLastInteraction = (date?: Date) => {
    if (!date) return null;
    const now = new Date();
    const lastInteraction = new Date(date);
    const diffTime = Math.abs(now.getTime() - lastInteraction.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  // Handlers para drag and drop
  const handleDragStart = (opportunityId: string) => {
    setDraggedCard(opportunityId);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (stage: FunnelStage) => {
    if (!draggedCard) return;

    setOpportunities(prev =>
      prev.map(opp =>
        opp.id === draggedCard
          ? { ...opp, stage, updatedAt: new Date() }
          : opp
      )
    );

    setDraggedCard(null);
  };

  // Filtrar oportunidades por estágio
  const getOpportunitiesByStage = (stage: FunnelStage) => {
    return opportunities.filter(opp => opp.stage === stage);
  };

  // Calcular valor total por estágio
  const getTotalValueByStage = (stage: FunnelStage) => {
    const opps = getOpportunitiesByStage(stage);
    return opps.reduce((sum, opp) => sum + opp.estimatedValue, 0);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Funil de Vendas</h1>
        <p className="mt-2 text-gray-600">
          Gerencie suas oportunidades do primeiro contato até o fechamento
        </p>
      </div>

      {/* Estatísticas Rápidas */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl border border-gray-200 p-4 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total de Oportunidades</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">{opportunities.length}</p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-4 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Valor Total em Negociação</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">
                {formatCurrency(opportunities.reduce((sum, opp) => sum + opp.estimatedValue, 0))}
              </p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <DollarSign className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-4 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Probabilidade Média</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">
                {Math.round(opportunities.reduce((sum, opp) => sum + opp.probability, 0) / opportunities.length)}%
              </p>
            </div>
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-purple-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-4 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Ticket Médio</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">
                {formatCurrency(opportunities.reduce((sum, opp) => sum + opp.estimatedValue, 0) / opportunities.length)}
              </p>
            </div>
            <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
              <DollarSign className="w-6 h-6 text-orange-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Funil Kanban */}
      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6">
        <div className="flex gap-4 overflow-x-auto pb-4">
          {funnelStages.map((stage) => {
            const stageOpportunities = getOpportunitiesByStage(stage.value);
            const stageValue = getTotalValueByStage(stage.value);
            const StageIcon = stage.icon;

            return (
              <div
                key={stage.value}
                className="flex-shrink-0 w-80"
                onDragOver={handleDragOver}
                onDrop={() => handleDrop(stage.value)}
              >
                {/* Cabeçalho da Coluna */}
                <div className={`rounded-xl border-2 ${stage.color} p-4 mb-4`}>
                  <div className="flex items-center gap-2 mb-2">
                    <StageIcon className="w-5 h-5" />
                    <h3 className="font-bold text-sm">{stage.label}</h3>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span>{stageOpportunities.length} oportunidades</span>
                    <span className="font-semibold">{formatCurrency(stageValue)}</span>
                  </div>
                </div>

                {/* Cards das Oportunidades */}
                <div className="space-y-3 min-h-[200px]">
                  {stageOpportunities.map((opportunity) => {
                    const client = getClient(opportunity.clientId);
                    const property = getProperty(opportunity.propertyId);
                    const daysSinceInteraction = getDaysSinceLastInteraction(opportunity.lastInteraction);

                    return (
                      <div
                        key={opportunity.id}
                        draggable
                        onDragStart={() => handleDragStart(opportunity.id)}
                        className="bg-white rounded-xl border-2 border-gray-200 p-4 cursor-move hover:shadow-lg hover:border-blue-300 transition-all duration-200"
                      >
                        {/* Cliente */}
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex-1 min-w-0">
                            <h4 className="font-bold text-gray-900 truncate">{client?.name}</h4>
                            <p className="text-xs text-gray-500 mt-1">{client?.phone}</p>
                          </div>
                          <div className="ml-2 flex-shrink-0">
                            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-700">
                              {opportunity.probability}%
                            </span>
                          </div>
                        </div>

                        {/* Imóvel */}
                        {property && (
                          <div className="flex items-center gap-2 mb-3 p-2 bg-gray-50 rounded-lg">
                            <Building2 className="w-4 h-4 text-gray-400 flex-shrink-0" />
                            <div className="flex-1 min-w-0">
                              <p className="text-xs font-medium text-gray-700 truncate">{property.title}</p>
                              <p className="text-xs text-gray-500">{property.code}</p>
                            </div>
                          </div>
                        )}

                        {/* Valor */}
                        <div className="flex items-center justify-between mb-3">
                          <span className="text-sm text-gray-600">Valor estimado:</span>
                          <span className="text-sm font-bold text-gray-900">
                            {formatCurrency(opportunity.estimatedValue)}
                          </span>
                        </div>

                        {/* Última Interação */}
                        {daysSinceInteraction !== null && (
                          <div className="flex items-center gap-2 text-xs text-gray-500 mb-2">
                            <Clock className="w-3 h-3" />
                            <span suppressHydrationWarning>
                              {daysSinceInteraction === 0 
                                ? 'Hoje' 
                                : daysSinceInteraction === 1 
                                ? 'Ontem' 
                                : `${daysSinceInteraction} dias atrás`}
                            </span>
                          </div>
                        )}

                        {/* Próximo Passo */}
                        {opportunity.nextStep && (
                          <div className="mt-3 pt-3 border-t border-gray-200">
                            <div className="flex items-start gap-2">
                              <ArrowRight className="w-4 h-4 text-blue-500 flex-shrink-0 mt-0.5" />
                              <div className="flex-1 min-w-0">
                                <p className="text-xs text-gray-700 line-clamp-2">{opportunity.nextStep}</p>
                                {opportunity.nextStepDate && (
                                  <p className="text-xs text-gray-500 mt-1" suppressHydrationWarning>
                                    {formatDate(opportunity.nextStepDate)}
                                  </p>
                                )}
                              </div>
                            </div>
                          </div>
                        )}

                        {/* Origem */}
                        <div className="mt-3 pt-3 border-t border-gray-200">
                          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-600">
                            {opportunity.origin}
                          </span>
                        </div>
                      </div>
                    );
                  })}

                  {/* Placeholder quando vazio */}
                  {stageOpportunities.length === 0 && (
                    <div className="border-2 border-dashed border-gray-200 rounded-xl p-8 text-center">
                      <p className="text-sm text-gray-400">Arraste cards aqui</p>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Legenda */}
      <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
        <div className="flex items-start gap-3">
          <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
            <TrendingUp className="w-5 h-5 text-blue-600" />
          </div>
          <div>
            <h4 className="font-semibold text-blue-900 mb-1">Como usar o funil</h4>
            <p className="text-sm text-blue-700">
              Arraste e solte os cards entre as colunas para atualizar o estágio de cada oportunidade. 
              Acompanhe o progresso desde o primeiro contato até o fechamento da venda.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
