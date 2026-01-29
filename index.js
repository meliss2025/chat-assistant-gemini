/**
 * Chat Assistant Module
 * Módulo de chat con IA Gemini para integrar en aplicaciones SolidJS
 * 
 * @author meliss2025
 * @version 1.2.0
 */

// Componentes principales
export { default as ChatAssistant } from './components/ChatAssistant.jsx';
export { default as FloatingChat } from './components/FloatingChat.jsx';
export { default } from './components/FloatingChat.jsx';

// Hook personalizado
export { default as useGeminiChat } from './hooks/useGeminiChat.js';

// Utilidades de API
export { sendPrompt, sendPromptDirect, sendPromptToBackend, uploadAndProcess } from './utils/geminiApi.js';

// Configuración por defecto
export { default as defaultConfig } from './config.js';

// Los estilos se importan automáticamente
import './styles/ChatAssistant.css';
import './styles/FloatingChat.css';
