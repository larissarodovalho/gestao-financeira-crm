'use client';

import { useState } from 'react';
import { 
  Bell, 
  Check, 
  X,
  Calendar,
  FileText,
  Home,
  TrendingUp,
  Filter
} from 'lucide-react';
import { mockNotifications, mockProperties, mockClients } from '@/lib/mock-data';
import { formatDateTime } from '@/lib/constants';

type NotificationFilter = 'todas' | 'nao_lidas' | 'lidas';

export default function NotificacoesPage() {
  const [filter, setFilter] = useState<NotificationFilter>('todas');
  const [notifications, setNotifications] = useState(mockNotifications);

  const filteredNotifications = notifications.filter(notif => {
    if (filter === 'nao_lidas') return !notif.read;
    if (filter === 'lidas') return notif.read;
    return true;
  });

  const handleMarkAsRead = (id: string) => {
    setNotifications(prev =>
      prev.map(notif =>
        notif.id === id ? { ...notif, read: true } : notif
      )
    );
  };

  const handleMarkAllAsRead = () => {
    setNotifications(prev =>
      prev.map(notif => ({ ...notif, read: true }))
    );
  };

  const getNotificationIcon = (type: string) => {
    const icons = {
      nova_visita: Calendar,
      visita_aprovada: Check,
      visita_recusada: X,
      visita_confirmada: Calendar,
      nova_proposta: FileText,
      proposta_aceita: Check,
      proposta_recusada: X,
      novo_imovel: Home,
      mudanca_status: TrendingUp,
    };
    return icons[type as keyof typeof icons] || Bell;
  };

  const getNotificationColor = (type: string) => {
    const colors = {
      nova_visita: 'from-blue-500 to-cyan-500',
      visita_aprovada: 'from-green-500 to-emerald-500',
      visita_recusada: 'from-red-500 to-pink-500',
      visita_confirmada: 'from-purple-500 to-indigo-500',
      nova_proposta: 'from-orange-500 to-yellow-500',
      proposta_aceita: 'from-green-500 to-emerald-500',
      proposta_recusada: 'from-red-500 to-pink-500',
      novo_imovel: 'from-blue-500 to-cyan-500',
      mudanca_status: 'from-purple-500 to-pink-500',
    };
    return colors[type as keyof typeof colors] || 'from-gray-500 to-gray-600';
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Notificações</h1>
          <p className="mt-2 text-gray-600">
            Acompanhe todas as atualizações importantes
          </p>
        </div>
        {unreadCount > 0 && (
          <button
            onClick={handleMarkAllAsRead}
            className="flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 transition-colors"
          >
            <Check className="h-4 w-4" />
            Marcar todas como lidas
          </button>
        )}
      </div>

      {/* Stats */}
      <div className="grid gap-4 sm:grid-cols-3">
        <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-100">
              <Bell className="h-5 w-5 text-blue-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">{notifications.length}</p>
              <p className="text-sm text-gray-600">Total</p>
            </div>
          </div>
        </div>

        <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-orange-100">
              <Bell className="h-5 w-5 text-orange-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">{unreadCount}</p>
              <p className="text-sm text-gray-600">Não Lidas</p>
            </div>
          </div>
        </div>

        <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-100">
              <Check className="h-5 w-5 text-green-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">
                {notifications.filter(n => n.read).length}
              </p>
              <p className="text-sm text-gray-600">Lidas</p>
            </div>
          </div>
        </div>
      </div>

      {/* Filtros */}
      <div className="rounded-2xl border border-gray-200 bg-white p-4 shadow-sm">
        <div className="flex items-center gap-4">
          <Filter className="h-5 w-5 text-gray-400" />
          <div className="flex gap-2">
            <button
              onClick={() => setFilter('todas')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                filter === 'todas'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Todas
            </button>
            <button
              onClick={() => setFilter('nao_lidas')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                filter === 'nao_lidas'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Não Lidas ({unreadCount})
            </button>
            <button
              onClick={() => setFilter('lidas')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                filter === 'lidas'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Lidas
            </button>
          </div>
        </div>
      </div>

      {/* Lista de Notificações */}
      <div className="space-y-3">
        {filteredNotifications.length > 0 ? (
          filteredNotifications.map((notification) => {
            const Icon = getNotificationIcon(notification.type);
            const colorClass = getNotificationColor(notification.type);

            return (
              <div
                key={notification.id}
                className={`rounded-2xl border bg-white p-6 shadow-sm transition-all hover:shadow-md ${
                  notification.read
                    ? 'border-gray-200'
                    : 'border-blue-200 bg-blue-50/30'
                }`}
              >
                <div className="flex items-start gap-4">
                  {/* Ícone */}
                  <div className={`flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${colorClass} flex-shrink-0`}>
                    <Icon className="h-6 w-6 text-white" />
                  </div>

                  {/* Conteúdo */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <h3 className="font-bold text-gray-900">
                          {notification.title}
                        </h3>
                        <p className="mt-1 text-sm text-gray-600">
                          {notification.message}
                        </p>
                        <p className="mt-2 text-xs text-gray-500" suppressHydrationWarning>
                          {formatDateTime(notification.createdAt)}
                        </p>
                      </div>

                      {/* Ação */}
                      {!notification.read && (
                        <button
                          onClick={() => handleMarkAsRead(notification.id)}
                          className="flex items-center gap-2 rounded-lg bg-blue-600 px-3 py-2 text-xs font-medium text-white hover:bg-blue-700 transition-colors flex-shrink-0"
                        >
                          <Check className="h-4 w-4" />
                          Marcar como lida
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <div className="rounded-2xl border border-gray-200 bg-white p-12 text-center shadow-sm">
            <Bell className="mx-auto h-12 w-12 text-gray-400 mb-4" />
            <p className="text-lg font-medium text-gray-900 mb-2">
              Nenhuma notificação encontrada
            </p>
            <p className="text-sm text-gray-600">
              {filter === 'nao_lidas'
                ? 'Você não possui notificações não lidas.'
                : filter === 'lidas'
                ? 'Você não possui notificações lidas.'
                : 'Você ainda não recebeu notificações.'}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
