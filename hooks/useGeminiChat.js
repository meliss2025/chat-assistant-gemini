import { createSignal } from 'solid-js';
import { sendPrompt } from '../utils/geminiApi';

/**
 * Hook personalizado para interactuar con Gemini
 * Funciona tanto con API directa como con backend del cliente
 * 
 * @param {object} config - Configuración inicial
 * @returns {object} Estado y funciones del chat
 */
const useGeminiChat = (config = {}) => {
  const [messages, setMessages] = createSignal([]); // { role: 'user'|'assistant', text }
  const [loading, setLoading] = createSignal(false);
  const [error, setError] = createSignal(null);

  /**
   * Enviar un mensaje a Gemini
   * @param {string} text - Texto del mensaje
   * @param {string} model - Modelo a usar
   */
  const send = async (text, model = 'gemini-2.5-flash') => {
    if (!text || !text.trim()) return;
    
    setError(null);
    setMessages(prev => [...prev, { role: 'user', text }]);
    setLoading(true);

    try {
      // Usar la configuración pasada al hook
      const result = await sendPrompt(text, {
        ...config,
        model
      });
      
      const reply = result.text ?? result.output ?? JSON.stringify(result);
      setMessages(prev => [...prev, { role: 'assistant', text: reply }]);
    } catch (err) {
      console.error('Error en useGeminiChat.send:', err);
      setError(err);
      
      // Añadir mensaje de error a la conversación
      setMessages(prev => [
        ...prev, 
        { 
          role: 'assistant', 
          text: `Error: ${err.message}`,
          isError: true 
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  /**
   * Limpiar todos los mensajes
   */
  const clearMessages = () => {
    setMessages([]);
    setError(null);
  };

  /**
   * Eliminar el último mensaje
   */
  const deleteLastMessage = () => {
    setMessages(prev => prev.slice(0, -1));
  };

  return { 
    messages, 
    loading, 
    error, 
    send,
    clearMessages,
    deleteLastMessage
  };
};

export default useGeminiChat;
