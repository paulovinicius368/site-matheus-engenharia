
import React from 'react';

const Hero: React.FC = () => {
  const handleLinkClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    const href = event.currentTarget.getAttribute('href');
    if (!href) return;
    const targetId = href.substring(1);
    const targetElement = document.getElementById(targetId);

    if (targetElement) {
      targetElement.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }
  };
  
  return (
    <section 
      id="home" 
      className="relative bg-slate-900 text-white overflow-hidden"
    >
      {/* SVG Background Pattern */}
      <div className="absolute inset-0 opacity-20">
        <svg className="w-full h-full" viewBox="0 0 1200 800" preserveAspectRatio="xMidYMid slice">
          <defs>
            <linearGradient id="heroGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#1e40af" stopOpacity="0.8"/>
              <stop offset="50%" stopColor="#3b82f6" stopOpacity="0.6"/>
              <stop offset="100%" stopColor="#60a5fa" stopOpacity="0.4"/>
            </linearGradient>
            <pattern id="engineeringPattern" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
              <circle cx="50" cy="50" r="2" fill="#3b82f6" opacity="0.3"/>
              <circle cx="25" cy="25" r="1.5" fill="#60a5fa" opacity="0.2"/>
              <circle cx="75" cy="75" r="1.5" fill="#60a5fa" opacity="0.2"/>
              <path d="M20,20 L80,80 M80,20 L20,80" stroke="#1e40af" strokeWidth="0.5" opacity="0.1"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#heroGradient)"/>
          <rect width="100%" height="100%" fill="url(#engineeringPattern)"/>
          {/* Geometric shapes representing engineering */}
          <g opacity="0.1">
            <circle cx="200" cy="150" r="80" fill="none" stroke="#3b82f6" strokeWidth="2"/>
            <rect x="800" y="400" width="120" height="120" fill="none" stroke="#60a5fa" strokeWidth="2" transform="rotate(45 860 460)"/>
            <polygon points="1000,200 1100,300 1000,400 900,300" fill="none" stroke="#1e40af" strokeWidth="2"/>
          </g>
        </svg>
      </div>
      <div className="container mx-auto px-6 py-24 md:py-32 lg:py-40 relative z-10 text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-slate-100 tracking-tight">
          Engenharia Mecânica
        </h1>
        <p className="text-5xl md:text-6xl lg:text-7xl font-extrabold text-blue-400 leading-tight mt-2 mb-4">
          Responsável
        </p>
        <p className="text-lg md:text-xl text-slate-200 max-w-3xl mx-auto mb-8">
          Compromisso, expertise e segurança em cada projeto.
        </p>
        <div className="flex justify-center flex-wrap gap-4">
          <a
            href="#servicos"
            onClick={handleLinkClick}
            className="bg-blue-600 text-white font-semibold py-3 px-8 rounded-lg text-lg hover:bg-blue-700 transition-all duration-300 transform hover:scale-105"
          >
            Nossos Serviços
          </a>
          <a
            href="#contato"
            onClick={handleLinkClick}
            className="bg-transparent border-2 border-white text-white font-semibold py-3 px-8 rounded-lg text-lg hover:bg-white hover:text-slate-900 transition-all duration-300"
          >
            Solicite um Orçamento
          </a>
        </div>
      </div>
    </section>
  );
};

export default Hero;