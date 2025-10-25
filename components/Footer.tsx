
import React from 'react';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-800 text-slate-300">
      <div className="container mx-auto px-6 py-6 text-center">
        <p>&copy; {currentYear} MGL engenharia mecânica. Todos os direitos reservados.</p>
      </div>
    </footer>
  );
};

export default Footer;
