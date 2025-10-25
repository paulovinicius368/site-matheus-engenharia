
import React from 'react';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-800 text-slate-300">
      <div className="container mx-auto px-6 py-6 text-center">
        <div className="flex flex-col items-center space-y-3">
          <p>&copy; {currentYear} MGL engenharia mecânica. Todos os direitos reservados.</p>
          <img 
            src="/images/mgl engenharia.png" 
            alt="MGL Engenharia - Logo" 
            className="h-16 w-auto object-contain"
          />
        </div>
      </div>
    </footer>
  );
};

export default Footer;
