import React, { useState } from 'react';

const ContactForm: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
    serviceType: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Função para formatar nome (primeira letra maiúscula)
  const formatName = (name: string) => {
    return name
      .toLowerCase()
      .split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  // Função para formatar telefone
  const formatPhone = (phone: string) => {
    const numbers = phone.replace(/\D/g, '');
    if (numbers.length === 0) return '';
    if (numbers.length <= 2) return `(${numbers}`;
    if (numbers.length <= 7) return `(${numbers.slice(0, 2)}) ${numbers.slice(2)}`;
    if (numbers.length <= 11) return `(${numbers.slice(0, 2)}) ${numbers.slice(2, 7)}-${numbers.slice(7)}`;
    return phone.slice(0, 15); // Limita o tamanho
  };

  // Função para corrigir acentuação e capitalização básica
  const formatMessage = (message: string) => {
    // Não formatar se estiver vazio
    if (!message.trim()) return message;
    
    let formatted = message;
    
    // Capitalizar primeira letra de cada sentença
    formatted = formatted.replace(/(^|[.!?]\s+)([a-z])/g, (match, p1, p2) => {
      return p1 + p2.toUpperCase();
    });
    
    // Capitalizar primeira letra se for o início
    formatted = formatted.charAt(0).toUpperCase() + formatted.slice(1);
    
    return formatted;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    let formattedValue = value;

    // Aplicar formatação baseada no campo
    switch (name) {
      case 'name':
        // Só formatar quando o usuário parar de digitar (onBlur seria melhor, mas vamos usar um delay)
        formattedValue = formatName(value);
        break;
      case 'phone':
        formattedValue = formatPhone(value);
        break;
      case 'message':
        // Formatação mais sutil para mensagem
        if (value.endsWith('. ') || value.endsWith('! ') || value.endsWith('? ')) {
          formattedValue = formatMessage(value);
        } else {
          formattedValue = value;
        }
        break;
      default:
        formattedValue = value;
    }

    setFormData(prevState => ({
      ...prevState,
      [name]: formattedValue,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email || !formData.message || !formData.serviceType) {
      setError('Por favor, preencha todos os campos obrigatórios.');
      setSubmitted(false);
      return;
    }

    setError('');
    setIsLoading(true);

    try {
      // Formatando a data no formato dd/mm/aaaa
      const currentDate = new Date();
      const formattedDate = `${currentDate.getDate().toString().padStart(2, '0')}/${(currentDate.getMonth() + 1).toString().padStart(2, '0')}/${currentDate.getFullYear()}`;

      console.log('Enviando dados para webhook:', {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        message: formData.message,
        serviceType: formData.serviceType,
        data: formattedDate,
      });

      const response = await fetch('https://hook.us2.make.com/hpkim8vusj5poghuxwae3lq1pxa27o64', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          message: formData.message,
          serviceType: formData.serviceType,
          data: formattedDate,
        }),
      });

      console.log('Resposta do webhook:', {
        status: response.status,
        statusText: response.statusText,
        ok: response.ok
      });

      if (response.ok) {
        console.log('Mensagem enviada com sucesso!');
        setSubmitted(true);
        setFormData({ name: '', email: '', phone: '', message: '', serviceType: '' });
        
        // Hide success message after 5 seconds
        setTimeout(() => {
          setSubmitted(false);
        }, 5000);
      } else {
        const errorText = await response.text();
        console.error('Erro na resposta do webhook:', errorText);
        throw new Error(`Erro ${response.status}: ${response.statusText}`);
      }
    } catch (error) {
      console.error('Erro ao enviar formulário:', error);
      
      // Melhor tratamento de erro
      if (error instanceof TypeError && error.message.includes('fetch')) {
        setError('Erro de conexão. Verifique sua internet e tente novamente.');
      } else if (error instanceof Error) {
        setError(`Erro ao enviar: ${error.message}`);
      } else {
        setError('Erro desconhecido. Tente novamente mais tarde.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section id="contato" className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <div className="lg:grid lg:grid-cols-2 lg:gap-12 items-center">
            <div className="mb-10 lg:mb-0">
                 <h2 className="text-3xl md:text-4xl font-bold text-slate-800">Entre em Contato</h2>
                 <p className="text-lg text-slate-600 mt-4 max-w-xl">
                    Preencha o formulário ou envie uma mensagem, estamos ansiosos para atendê-lo.
                 </p>
                 <div className="mt-8 space-y-4 text-slate-700">
                    <p className="flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6 mr-3 text-blue-600"><path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" /></svg>
                        contato@engmecanica.com
                    </p>
                    <p className="flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6 mr-3 text-blue-600"><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" /></svg>
                        (44) 99945-2738
                    </p>
                 </div>
            </div>
            <div className="bg-slate-50 p-8 rounded-xl shadow-lg">
                <form onSubmit={handleSubmit} noValidate>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                        <div>
                            <label htmlFor="name" className="block text-sm font-medium text-slate-700 mb-1">Nome*</label>
                            <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} required className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 transition bg-white text-slate-900"/>
                        </div>
                        <div>
                            <label htmlFor="phone" className="block text-sm font-medium text-slate-700 mb-1">Telefone</label>
                            <input 
                              type="tel" 
                              id="phone" 
                              name="phone" 
                              value={formData.phone} 
                              onChange={handleChange} 
                              placeholder="(00) 00000-0000"
                              maxLength={15}
                              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 transition bg-white text-slate-900"
                            />
                        </div>
                    </div>
                    <div className="mb-6">
                        <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-1">Email*</label>
                        <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 transition bg-white text-slate-900"/>
                    </div>
                    <div className="mb-6">
                        <label htmlFor="serviceType" className="block text-sm font-medium text-slate-700 mb-1">Tipo de Serviço*</label>
                        <select 
                          id="serviceType" 
                          name="serviceType" 
                          value={formData.serviceType} 
                          onChange={handleChange} 
                          required 
                          className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 transition bg-white text-slate-900"
                        >
                          <option value="">Selecione um serviço</option>
                          <option value="ASSINATURA DE RT'S">ASSINATURA DE RT'S</option>
                          <option value="ANÁLISE DE PROJETOS">ANÁLISE DE PROJETOS</option>
                          <option value="OUTROS SERVIÇOS">OUTROS SERVIÇOS</option>
                        </select>
                    </div>
                    <div className="mb-6">
                        <label htmlFor="message" className="block text-sm font-medium text-slate-700 mb-1">Mensagem*</label>
                        <textarea id="message" name="message" value={formData.message} onChange={handleChange} rows={4} required className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 transition bg-white text-slate-900"></textarea>
                    </div>
                    <div>
                        <button 
                          type="submit" 
                          disabled={isLoading}
                          className={`w-full font-bold py-3 px-6 rounded-lg transition-colors duration-300 ${
                            isLoading 
                              ? 'bg-gray-400 text-gray-600 cursor-not-allowed' 
                              : 'bg-blue-600 text-white hover:bg-blue-700'
                          }`}
                        >
                          {isLoading ? (
                            <span className="flex items-center justify-center">
                              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-gray-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                              </svg>
                              Enviando...
                            </span>
                          ) : (
                            'Enviar Mensagem'
                          )}
                        </button>
                    </div>
                    {error && <p className="mt-4 text-sm text-red-600">{error}</p>}
                    {submitted && <p className="mt-4 text-sm text-green-600">Obrigado pelo seu contato! Responderemos em breve.</p>}
                </form>
            </div>
        </div>
      </div>
    </section>
  );
};

export default ContactForm;