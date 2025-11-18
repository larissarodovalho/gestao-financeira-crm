'use client';

export default function AtendimentosPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Atendimentos</h1>
        <p className="mt-2 text-gray-600">
          Registre e acompanhe todas as interações com clientes
        </p>
      </div>

      <div className="rounded-2xl border border-gray-200 bg-white p-12 shadow-sm text-center">
        <div className="mx-auto max-w-md">
          <div className="mb-4 text-6xl">💬</div>
          <h3 className="text-xl font-bold text-gray-900 mb-2">Módulo em Desenvolvimento</h3>
          <p className="text-gray-600">
            O sistema de atendimentos será implementado no próximo módulo.
          </p>
        </div>
      </div>
    </div>
  );
}
