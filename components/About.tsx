import React from 'react';

const About: React.FC = () => {
  // Componente para a foto do engenheiro com fallback para SVG
  const EngineerPhoto: React.FC = () => {
    const [imageError, setImageError] = React.useState(false);
    
    // SVG de fallback caso a imagem não carregue
    const FallbackAvatar = () => (
      <svg 
        className="w-48 h-48 md:w-52 md:h-52 rounded-full shadow-xl border-4 md:border-8 border-slate-100 bg-gradient-to-br from-blue-500 to-blue-700"
        viewBox="0 0 200 200" 
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="avatarGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#3b82f6" />
            <stop offset="100%" stopColor="#1e40af" />
          </linearGradient>
        </defs>
        <circle cx="100" cy="100" r="100" fill="url(#avatarGradient)" />
        <circle cx="100" cy="85" r="35" fill="#fbbf24" opacity="0.9" />
        <circle cx="90" cy="80" r="3" fill="#1f2937" />
        <circle cx="110" cy="80" r="3" fill="#1f2937" />
        <path d="M95 95 Q100 100 105 95" stroke="#1f2937" strokeWidth="2" fill="none" strokeLinecap="round" />
      </svg>
    );

    if (imageError) {
      return <FallbackAvatar />;
    }

    return (
      <img
        src="/images/engenheiro.jpg"
        alt="Foto do Engenheiro Responsável - Matheus Henrique Garcia Lima"
        className="w-48 h-48 md:w-52 md:h-52 rounded-full object-cover shadow-xl border-4 md:border-8 border-slate-100 bg-slate-200"
        onError={() => setImageError(true)}
        loading="lazy"
      />
    );
  };

  return (
    <section id="sobre" className="py-20 bg-slate-100">
      <div className="container mx-auto px-6">
        <div className="bg-white rounded-2xl shadow-xl p-8 lg:p-12 max-w-4xl mx-auto relative mt-24">
          <div className="absolute -top-24 left-1/2 -translate-x-1/2">
            <EngineerPhoto />
          </div>
          <div className="text-center pt-28">
            <h3 className="text-2xl md:text-3xl font-bold text-slate-900">
              Matheus Henrique Garcia Lima
            </h3>
            <p className="text-blue-600 font-semibold text-lg mt-1">
              CREA-PR 98765/D
            </p>
          </div>
          <div className="mt-8 text-center text-slate-600 space-y-4 leading-relaxed max-w-2xl mx-auto">
             <p>
              Engenheiro Mecânico com vasta experiência em projetos industriais e comerciais. Minha paixão é transformar desafios complexos em soluções seguras e eficientes, sempre focado em superar as expectativas dos clientes e garantir a total conformidade com as normas técnicas.
            </p>
            <p>
              Estou comprometido em ser um parceiro confiável para o seu negócio, oferecendo expertise em laudos técnicos, responsabilidade técnica (ART) e consultoria para otimizar seus processos e garantir a segurança operacional.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;