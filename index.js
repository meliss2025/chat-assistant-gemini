/**
 * Chat Assistant Module
 * Módulo de chat con IA Gemini para integrar en aplicaciones SolidJS
 * 
 * @author Tu Nombre
 * @version 1.0.0
 */

// Componentes principales
export { default as ChatAssistant } from './components/ChatAssistant';
export { default as FloatingChat } from './components/FloatingChat';

// Hook personalizado
export { default as useGeminiChat } from './hooks/useGeminiChat';

// Utilidades de API
export { sendPrompt, sendPromptDirect, sendPromptToBackend, uploadAndProcess } from './utils/geminiApi';

// Estilos (deben ser importados manualmente en el proyecto)
// import './chat-assistant-module/styles/ChatAssistant.css';
// import './chat-assistant-module/styles/FloatingChat.css';
