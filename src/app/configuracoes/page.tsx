'use client';

import { useState } from 'react';
import { 
  User, 
  Building2, 
  Bell, 
  Palette, 
  DollarSign, 
  Shield,
  Save,
  Mail,
  Phone,
  MapPin,
  Globe,
  Percent
} from 'lucide-react';

export default function ConfiguracoesPage() {
  const [activeTab, setActiveTab] = useState('perfil');
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const tabs = [
    { id: 'perfil', name: 'Perfil', icon: User },
    { id: 'empresa', name: 'Empresa', icon: Building2 },
    { id: 'comissoes', name: 'Comissões', icon: DollarSign },
    { id: 'notificacoes', name: 'Notificações', icon: Bell },
    { id: 'aparencia', name: 'Aparência', icon: Palette },
    { id: 'seguranca', name: 'Segurança', icon: Shield },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4 sm:p-6 lg:p-8">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Configurações</h1>
          <p className="mt-2 text-gray-600">Gerencie as configurações do sistema</p>
        </div>

        {/* Save Alert */}
        {saved && (
          <div className="mb-6 rounded-lg bg-green-50 border border-green-200 p-4">
            <p className="text-sm font-medium text-green-800">
              ✓ Configurações salvas com sucesso!
            </p>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar Tabs */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-2">
              <nav className="space-y-1">
                {tabs.map((tab) => {
                  const Icon = tab.icon;
                  const isActive = activeTab === tab.id;
                  
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`
                        w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all
                        ${isActive 
                          ? 'bg-gradient-to-r from-blue-600 to-cyan-600 text-white shadow-md' 
                          : 'text-gray-700 hover:bg-gray-100'
                        }
                      `}
                    >
                      <Icon className="h-5 w-5" />
                      {tab.name}
                    </button>
                  );
                })}
              </nav>
            </div>
          </div>

          {/* Content Area */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 sm:p-8">
              
              {/* Perfil */}
              {activeTab === 'perfil' && (
                <div className="space-y-6">
                  <div>
                    <h2 className="text-xl font-bold text-gray-900 mb-1">Informações do Perfil</h2>
                    <p className="text-sm text-gray-600">Atualize suas informações pessoais</p>
                  </div>

                  <div className="flex items-center gap-6">
                    <div className="flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br from-purple-500 to-pink-500 text-2xl font-bold text-white">
                      CR
                    </div>
                    <div>
                      <button className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors">
                        Alterar Foto
                      </button>
                      <p className="mt-2 text-xs text-gray-500">JPG, PNG ou GIF (máx. 2MB)</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Nome Completo
                      </label>
                      <input
                        type="text"
                        defaultValue="Corretor Principal"
                        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        CRECI
                      </label>
                      <input
                        type="text"
                        defaultValue="12345-F"
                        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                        <Mail className="h-4 w-4" />
                        Email
                      </label>
                      <input
                        type="email"
                        defaultValue="corretor@imobiliaria.com"
                        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                        <Phone className="h-4 w-4" />
                        Telefone
                      </label>
                      <input
                        type="tel"
                        defaultValue="(11) 98765-4321"
                        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Empresa */}
              {activeTab === 'empresa' && (
                <div className="space-y-6">
                  <div>
                    <h2 className="text-xl font-bold text-gray-900 mb-1">Dados da Empresa</h2>
                    <p className="text-sm text-gray-600">Configure as informações da imobiliária</p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Nome da Imobiliária
                      </label>
                      <input
                        type="text"
                        defaultValue="ImobiCRM - Gestão Imobiliária"
                        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        CNPJ
                      </label>
                      <input
                        type="text"
                        defaultValue="12.345.678/0001-90"
                        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        CRECI Empresa
                      </label>
                      <input
                        type="text"
                        defaultValue="CRECI-J 5678"
                        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>

                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                        <MapPin className="h-4 w-4" />
                        Endereço Completo
                      </label>
                      <input
                        type="text"
                        defaultValue="Av. Paulista, 1000 - Bela Vista, São Paulo - SP"
                        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                        <Phone className="h-4 w-4" />
                        Telefone Comercial
                      </label>
                      <input
                        type="tel"
                        defaultValue="(11) 3000-0000"
                        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                        <Globe className="h-4 w-4" />
                        Website
                      </label>
                      <input
                        type="url"
                        defaultValue="www.imobiliaria.com.br"
                        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Comissões */}
              {activeTab === 'comissoes' && (
                <div className="space-y-6">
                  <div>
                    <h2 className="text-xl font-bold text-gray-900 mb-1">Configuração de Comissões</h2>
                    <p className="text-sm text-gray-600">Defina as taxas padrão de comissão</p>
                  </div>

                  <div className="space-y-4">
                    <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                      <div className="flex items-start gap-3">
                        <Percent className="h-5 w-5 text-blue-600 mt-0.5" />
                        <div>
                          <h3 className="font-medium text-blue-900">Comissão Padrão</h3>
                          <p className="text-sm text-blue-700 mt-1">
                            Taxa aplicada automaticamente em novos imóveis
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Comissão Venda (%)
                        </label>
                        <input
                          type="number"
                          defaultValue="6"
                          step="0.5"
                          min="0"
                          max="100"
                          className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Comissão Aluguel (%)
                        </label>
                        <input
                          type="number"
                          defaultValue="10"
                          step="0.5"
                          min="0"
                          max="100"
                          className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Divisão Corretor (%)
                        </label>
                        <input
                          type="number"
                          defaultValue="50"
                          step="5"
                          min="0"
                          max="100"
                          className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Divisão Imobiliária (%)
                        </label>
                        <input
                          type="number"
                          defaultValue="50"
                          step="5"
                          min="0"
                          max="100"
                          className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      </div>
                    </div>

                    <div className="p-4 bg-gray-50 rounded-lg">
                      <h4 className="font-medium text-gray-900 mb-3">Exemplo de Cálculo</h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-gray-600">Valor do Imóvel:</span>
                          <span className="font-medium">R$ 500.000,00</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Comissão Total (6%):</span>
                          <span className="font-medium">R$ 30.000,00</span>
                        </div>
                        <div className="h-px bg-gray-300 my-2"></div>
                        <div className="flex justify-between text-blue-600">
                          <span className="font-medium">Corretor (50%):</span>
                          <span className="font-bold">R$ 15.000,00</span>
                        </div>
                        <div className="flex justify-between text-green-600">
                          <span className="font-medium">Imobiliária (50%):</span>
                          <span className="font-bold">R$ 15.000,00</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Notificações */}
              {activeTab === 'notificacoes' && (
                <div className="space-y-6">
                  <div>
                    <h2 className="text-xl font-bold text-gray-900 mb-1">Preferências de Notificações</h2>
                    <p className="text-sm text-gray-600">Escolha como deseja receber notificações</p>
                  </div>

                  <div className="space-y-4">
                    {[
                      { title: 'Novos Leads', desc: 'Receba notificações quando um novo lead entrar no funil' },
                      { title: 'Mudança de Etapa', desc: 'Seja notificado quando um lead mudar de etapa no funil' },
                      { title: 'Novos Clientes', desc: 'Alerta quando um novo cliente for cadastrado' },
                      { title: 'Vencimento de Parcelas', desc: 'Lembrete de parcelas próximas do vencimento' },
                      { title: 'Novos Imóveis', desc: 'Notificação quando um novo imóvel for cadastrado' },
                      { title: 'Relatórios Semanais', desc: 'Receba resumo semanal de vendas e performance' },
                    ].map((item, index) => (
                      <div key={index} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                        <div className="flex-1">
                          <h4 className="font-medium text-gray-900">{item.title}</h4>
                          <p className="text-sm text-gray-600 mt-1">{item.desc}</p>
                        </div>
                        <div className="flex items-center gap-4">
                          <label className="flex items-center gap-2 cursor-pointer">
                            <input type="checkbox" defaultChecked className="w-4 h-4 text-blue-600 rounded focus:ring-2 focus:ring-blue-500" />
                            <span className="text-sm text-gray-700">Email</span>
                          </label>
                          <label className="flex items-center gap-2 cursor-pointer">
                            <input type="checkbox" defaultChecked className="w-4 h-4 text-blue-600 rounded focus:ring-2 focus:ring-blue-500" />
                            <span className="text-sm text-gray-700">Push</span>
                          </label>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Aparência */}
              {activeTab === 'aparencia' && (
                <div className="space-y-6">
                  <div>
                    <h2 className="text-xl font-bold text-gray-900 mb-1">Personalização</h2>
                    <p className="text-sm text-gray-600">Customize a aparência do sistema</p>
                  </div>

                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-3">
                        Tema
                      </label>
                      <div className="grid grid-cols-3 gap-4">
                        {[
                          { id: 'light', name: 'Claro', bg: 'bg-white', border: 'border-gray-300' },
                          { id: 'dark', name: 'Escuro', bg: 'bg-gray-900', border: 'border-gray-700' },
                          { id: 'auto', name: 'Automático', bg: 'bg-gradient-to-br from-white to-gray-900', border: 'border-gray-400' },
                        ].map((theme) => (
                          <button
                            key={theme.id}
                            className={`p-4 rounded-lg border-2 ${theme.border} hover:border-blue-500 transition-colors`}
                          >
                            <div className={`h-20 rounded ${theme.bg} mb-3`}></div>
                            <p className="text-sm font-medium text-gray-900">{theme.name}</p>
                          </button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-3">
                        Cor de Destaque
                      </label>
                      <div className="grid grid-cols-6 gap-3">
                        {['bg-blue-600', 'bg-purple-600', 'bg-green-600', 'bg-red-600', 'bg-orange-600', 'bg-pink-600'].map((color, index) => (
                          <button
                            key={index}
                            className={`h-12 rounded-lg ${color} hover:scale-110 transition-transform ${index === 0 ? 'ring-2 ring-offset-2 ring-blue-600' : ''}`}
                          />
                        ))}
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-3">
                        Densidade da Interface
                      </label>
                      <div className="space-y-2">
                        {['Compacta', 'Padrão', 'Confortável'].map((density) => (
                          <label key={density} className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50">
                            <input type="radio" name="density" defaultChecked={density === 'Padrão'} className="w-4 h-4 text-blue-600" />
                            <span className="text-sm font-medium text-gray-900">{density}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Segurança */}
              {activeTab === 'seguranca' && (
                <div className="space-y-6">
                  <div>
                    <h2 className="text-xl font-bold text-gray-900 mb-1">Segurança da Conta</h2>
                    <p className="text-sm text-gray-600">Gerencie a segurança e privacidade</p>
                  </div>

                  <div className="space-y-6">
                    <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                      <div className="flex items-start gap-3">
                        <Shield className="h-5 w-5 text-green-600 mt-0.5" />
                        <div>
                          <h3 className="font-medium text-green-900">Conta Protegida</h3>
                          <p className="text-sm text-green-700 mt-1">
                            Sua conta está segura com autenticação de dois fatores ativada
                          </p>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h3 className="font-medium text-gray-900 mb-4">Alterar Senha</h3>
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Senha Atual
                          </label>
                          <input
                            type="password"
                            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Nova Senha
                          </label>
                          <input
                            type="password"
                            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Confirmar Nova Senha
                          </label>
                          <input
                            type="password"
                            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          />
                        </div>
                        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors">
                          Atualizar Senha
                        </button>
                      </div>
                    </div>

                    <div className="border-t border-gray-200 pt-6">
                      <h3 className="font-medium text-gray-900 mb-4">Autenticação de Dois Fatores</h3>
                      <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                        <div>
                          <h4 className="font-medium text-gray-900">2FA via SMS</h4>
                          <p className="text-sm text-gray-600 mt-1">Receba códigos via mensagem de texto</p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input type="checkbox" defaultChecked className="sr-only peer" />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                        </label>
                      </div>
                    </div>

                    <div className="border-t border-gray-200 pt-6">
                      <h3 className="font-medium text-gray-900 mb-4">Sessões Ativas</h3>
                      <div className="space-y-3">
                        {[
                          { device: 'Chrome - Windows', location: 'São Paulo, Brasil', time: 'Agora', current: true },
                          { device: 'Safari - iPhone', location: 'São Paulo, Brasil', time: 'Há 2 horas', current: false },
                        ].map((session, index) => (
                          <div key={index} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                            <div>
                              <h4 className="font-medium text-gray-900">
                                {session.device}
                                {session.current && <span className="ml-2 text-xs text-green-600 font-medium">(Atual)</span>}
                              </h4>
                              <p className="text-sm text-gray-600 mt-1">{session.location} • {session.time}</p>
                            </div>
                            {!session.current && (
                              <button className="text-sm text-red-600 hover:text-red-700 font-medium">
                                Encerrar
                              </button>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Save Button */}
              <div className="mt-8 pt-6 border-t border-gray-200 flex justify-end gap-3">
                <button className="px-6 py-2.5 border border-gray-300 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors">
                  Cancelar
                </button>
                <button 
                  onClick={handleSave}
                  className="px-6 py-2.5 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-lg text-sm font-medium hover:from-blue-700 hover:to-cyan-700 transition-all shadow-md hover:shadow-lg flex items-center gap-2"
                >
                  <Save className="h-4 w-4" />
                  Salvar Alterações
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
