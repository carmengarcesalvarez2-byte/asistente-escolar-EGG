
import React, { useState, useRef, useEffect } from 'react';
import { GeminiService } from './services/geminiService';
import { Message } from './types';
import { SCHOOL_DATA } from './constants';

const App: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'model',
      text: `¡Bienvenido a la Secretaría Virtual de la Unidad Educativa '${SCHOOL_DATA.name}'! 🎓\n\nEstoy aquí para ayudarte con información sobre matrículas, horarios y la solicitud de certificados oficiales. ¿En qué puedo asistirte hoy?`,
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const geminiRef = useRef<GeminiService | null>(null);

  useEffect(() => {
    geminiRef.current = new GeminiService();
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  const handleSend = async (textOverride?: string) => {
    const textToSend = textOverride || input;
    if (!textToSend.trim() || !geminiRef.current || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      text: textToSend,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    const responseText = await geminiRef.current.sendMessage(textToSend);

    const botMessage: Message = {
      id: (Date.now() + 1).toString(),
      role: 'model',
      text: responseText,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, botMessage]);
    setIsLoading(false);

    // Si el mensaje del bot indica que ya tiene los datos, mostramos el botón de acción
    if (responseText.includes("botón verde de abajo")) {
      setTimeout(() => {
        setMessages(prev => [...prev, {
          id: (Date.now() + 2).toString(),
          role: 'model',
          text: "¡Listo! Todo está preparado. Haz clic abajo para enviar los datos a la oficina de Secretaría.",
          timestamp: new Date(),
          isAction: true
        }]);
      }, 1000);
    }
  };

  const sendToWhatsApp = () => {
    // Buscamos el último mensaje del usuario para extraer los datos o simplemente enviamos el historial relevante
    const lastUserMsgs = messages.filter(m => m.role === 'user').slice(-4);
    const summary = lastUserMsgs.map(m => m.text).join('\n');
    
    const messageToSecretary = `*SOLICITUD DE CERTIFICADO - E.G.G.*\n\nUn representante ha solicitado un trámite a través de la Secretaría Virtual.\n\n*Detalles recopilados:*\n${summary}\n\n_Enviado desde el ChatBot de Tesis_`;
    
    const encodedMessage = encodeURIComponent(messageToSecretary);
    window.open(`https://wa.me/${SCHOOL_DATA.phone}?text=${encodedMessage}`, '_blank');
  };

  const quickActions = [
    { label: 'Requisitos de Matrícula', icon: 'fa-user-plus' },
    { label: 'Solicitar Certificado', icon: 'fa-file-contract', action: () => handleSend("Necesito solicitar un certificado.") },
    { label: 'Horarios', icon: 'fa-clock' },
  ];

  return (
    <div className="flex flex-col h-screen max-w-2xl mx-auto shadow-2xl bg-white border-x border-slate-200">
      {/* Header */}
      <header className="bg-[#1e3a8a] text-white p-5 flex items-center justify-between shadow-lg relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-full bg-green-600 opacity-20 -skew-x-12 translate-x-16"></div>
        <div className="flex items-center gap-4 z-10">
          <div className="bg-white p-1 rounded-lg w-12 h-12 flex items-center justify-center border-2 border-green-500">
             <div className="flex flex-col items-center leading-none">
                <span className="text-[#1e3a8a] font-bold text-lg">EGG</span>
             </div>
          </div>
          <div>
            <h1 className="font-extrabold text-sm md:text-base uppercase tracking-tight">
              {SCHOOL_DATA.name}
            </h1>
            <p className="text-[10px] font-medium text-green-300 uppercase tracking-widest">En Línea • Asistente IA</p>
          </div>
        </div>
        <button onClick={() => window.location.reload()} className="p-2 hover:bg-white/10 rounded-full transition-all">
          <i className="fa-solid fa-sync-alt"></i>
        </button>
      </header>

      {/* Chat Area */}
      <main className="flex-1 overflow-y-auto p-4 bg-[#f1f5f9] space-y-4">
        {messages.map((msg) => (
          <div key={msg.id} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[90%] rounded-2xl px-4 py-3 ${
              msg.role === 'user' 
                ? 'bg-[#1e3a8a] text-white rounded-tr-none shadow-md' 
                : 'bg-white text-slate-800 border border-slate-200 rounded-tl-none shadow-sm'
            }`}>
              <div className="text-sm leading-relaxed whitespace-pre-line">{msg.text}</div>
              
              {msg.isAction && (
                <button 
                  onClick={sendToWhatsApp}
                  className="mt-4 w-full bg-green-600 text-white px-4 py-3 rounded-xl font-bold flex items-center justify-center gap-3 hover:bg-green-700 transition-all shadow-lg transform active:scale-95"
                >
                  <i className="fa-brands fa-whatsapp text-xl"></i>
                  ENVIAR A WHATSAPP
                </button>
              )}
              
              <p className="text-[8px] mt-1.5 opacity-40 text-right uppercase font-bold">
                {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </p>
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-white px-4 py-3 rounded-2xl border border-slate-200 shadow-sm rounded-tl-none">
              <div className="flex gap-1">
                <div className="w-1.5 h-1.5 bg-blue-600 rounded-full animate-bounce"></div>
                <div className="w-1.5 h-1.5 bg-blue-600 rounded-full animate-bounce delay-75"></div>
                <div className="w-1.5 h-1.5 bg-blue-600 rounded-full animate-bounce delay-150"></div>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </main>

      {/* Acciones Rápidas */}
      <div className="px-4 py-2 bg-white flex gap-2 overflow-x-auto border-t border-slate-100">
        {quickActions.map((action, idx) => (
          <button
            key={idx}
            onClick={() => action.action ? action.action() : handleSend(action.label)}
            className="flex-shrink-0 bg-slate-50 border border-slate-200 text-slate-700 px-4 py-2 rounded-full text-xs font-bold hover:bg-blue-50 transition-colors flex items-center gap-2"
          >
            <i className={`fa-solid ${action.icon} text-blue-600`}></i>
            {action.label}
          </button>
        ))}
      </div>

      {/* Input */}
      <footer className="p-4 bg-white border-t border-slate-200">
        <form onSubmit={(e) => { e.preventDefault(); handleSend(); }} className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Escribe aquí tu consulta..."
            className="flex-1 bg-slate-100 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-blue-500 outline-none transition-all"
            disabled={isLoading}
          />
          <button
            type="submit"
            disabled={!input.trim() || isLoading}
            className="w-12 h-12 bg-[#1e3a8a] text-white rounded-xl flex items-center justify-center hover:bg-blue-900 transition-all disabled:bg-slate-300 shadow-lg"
          >
            <i className="fa-solid fa-paper-plane"></i>
          </button>
        </form>
        <p className="text-[8px] text-center text-slate-400 mt-4 uppercase font-bold tracking-widest">
          Propuesta Tecnológica: U.E. Enrique Gil Gilbert
        </p>
      </footer>
    </div>
  );
};

export default App;
