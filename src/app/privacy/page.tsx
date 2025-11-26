import React from 'react';

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <div className="max-w-4xl mx-auto px-4 py-16">
        <div className="bg-slate-800/50 rounded-lg p-8 border border-slate-700">
          <h1 className="text-3xl font-bold text-white mb-8 text-center">
            Política de Privacidade - FitAI Coach
          </h1>

          <div className="prose prose-invert max-w-none">
            <p className="text-gray-300 mb-6">
              <strong>Última atualização:</strong> {new Date().toLocaleDateString('pt-BR')}
            </p>

            <h2 className="text-xl font-semibold text-white mb-4">1. Informações que Coletamos</h2>
            <p className="text-gray-300 mb-4">
              O FitAI Coach coleta apenas informações necessárias para o funcionamento do aplicativo:
            </p>
            <ul className="text-gray-300 mb-6 list-disc list-inside">
              <li>Dados de avaliação física (armazenados localmente no dispositivo)</li>
              <li>Progresso dos treinos (armazenado localmente)</li>
              <li>Preferências do usuário (armazenadas localmente)</li>
            </ul>

            <h2 className="text-xl font-semibold text-white mb-4">2. Uso das Informações</h2>
            <p className="text-gray-300 mb-4">
              Utilizamos suas informações para:
            </p>
            <ul className="text-gray-300 mb-6 list-disc list-inside">
              <li>Gerar treinos personalizados com IA</li>
              <li>Acompanhar seu progresso fitness</li>
              <li>Melhorar a experiência do usuário</li>
            </ul>

            <h2 className="text-xl font-semibold text-white mb-4">3. Compartilhamento de Dados</h2>
            <p className="text-gray-300 mb-4">
              Não vendemos, alugamos ou compartilhamos suas informações pessoais com terceiros,
              exceto quando necessário para o funcionamento do app (como integração com IA).
            </p>

            <h2 className="text-xl font-semibold text-white mb-4">4. Anúncios</h2>
            <p className="text-gray-300 mb-4">
              Utilizamos anúncios do Google AdMob para manter o app gratuito. Os anúncios podem
              coletar dados de uso para personalização, conforme a política de privacidade do Google.
            </p>

            <h2 className="text-xl font-semibold text-white mb-4">5. Segurança</h2>
            <p className="text-gray-300 mb-4">
              Todas as comunicações com nossos servidores são criptografadas. Seus dados pessoais
              são armazenados localmente no seu dispositivo sempre que possível.
            </p>

            <h2 className="text-xl font-semibold text-white mb-4">6. Seus Direitos</h2>
            <p className="text-gray-300 mb-4">
              Você pode excluir seus dados a qualquer momento através das configurações do app
              ou excluindo o aplicativo do seu dispositivo.
            </p>

            <h2 className="text-xl font-semibold text-white mb-4">7. Contato</h2>
            <p className="text-gray-300 mb-4">
              Para dúvidas sobre privacidade, entre em contato através do GitHub:
              <a href="https://github.com/MrJCRJ/fitai-coach" className="text-blue-400 hover:text-blue-300 ml-1">
                https://github.com/MrJCRJ/fitai-coach
              </a>
            </p>

            <h2 className="text-xl font-semibold text-white mb-4">8. Alterações</h2>
            <p className="text-gray-300 mb-4">
              Podemos atualizar esta política periodicamente. Notificaremos sobre mudanças significativas.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}