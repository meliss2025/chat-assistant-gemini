/**
 * Type definitions for chat-assistant-gemini
 * @author meliss2025
 * @version 1.2.0
 */

import { Component, JSX } from 'solid-js';

/**
 * Configuración del chat asistente
 */
export interface ChatConfig {
  /**
   * Si usar un backend propio o llamar directamente a Gemini
   * @default false
   */
  useBackend?: boolean;

  /**
   * URL del backend personalizado (solo si useBackend es true)
   * @example 'https://tu-backend.com/api/chat'
   */
  backendUrl?: string;

  /**
   * API Key de Google Gemini (solo si useBackend es false)
   * Obtener en: https://makersuite.google.com/app/apikey
   */
  apiKey?: string;

  /**
   * Modelo de Gemini a usar
   * @default 'gemini-2.5-flash'
   */
  model?: 'gemini-2.5-flash' | 'gemini-2.5-pro' | 'gemini-1.5-flash' | 'gemini-1.5-pro' | 'gemini-pro';

  /**
   * Posición del botón flotante
   * @default 'right'
   */
  position?: 'left' | 'right';

  /**
   * Color del botón flotante en formato hexadecimal o rgb
   * @default '#6366f1'
   * @example '#6366f1' | '#667eea' | 'rgb(102, 126, 234)'
   */
  buttonColor?: string;
}

/**
 * Props para el componente FloatingChat
 */
export interface FloatingChatProps {
  /**
   * Configuración del chat
   */
  config: ChatConfig;
}

/**
 * Props para el componente ChatAssistant
 */
export interface ChatAssistantProps {
  /**
   * Configuración del chat
   */
  config: ChatConfig;

  /**
   * Función callback cuando se cierra el chat
   */
  onClose?: () => void;
}

/**
 * Estado del mensaje
 */
export interface Message {
  /**
   * ID único del mensaje
   */
  id: string;

  /**
   * Tipo de mensaje
   */
  role: 'user' | 'assistant';

  /**
   * Contenido del mensaje
   */
  content: string;

  /**
   * Timestamp del mensaje
   */
  timestamp: number;
}

/**
 * Resultado del hook useGeminiChat
 */
export interface GeminiChatHook {
  /**
   * Lista de mensajes
   */
  messages: () => Message[];

  /**
   * Estado de carga
   */
  loading: () => boolean;

  /**
   * Mensaje de error (si existe)
   */
  error: () => string | null;

  /**
   * Enviar un mensaje al chat
   */
  sendMessage: (message: string) => Promise<void>;

  /**
   * Limpiar el historial de mensajes
   */
  clearMessages: () => void;
}

/**
 * Respuesta de la API de Gemini
 */
export interface GeminiResponse {
  /**
   * Texto de la respuesta
   */
  text: string;
}

/**
 * Componente de chat flotante con botón
 */
export const FloatingChat: Component<FloatingChatProps>;

/**
 * Componente principal de chat
 */
export const ChatAssistant: Component<ChatAssistantProps>;

/**
 * Hook para integración con Gemini
 */
export function useGeminiChat(config: ChatConfig): GeminiChatHook;

/**
 * Enviar un prompt a Gemini (modo automático)
 */
export function sendPrompt(prompt: string, config: ChatConfig): Promise<GeminiResponse>;

/**
 * Enviar un prompt directamente a la API de Gemini
 */
export function sendPromptDirect(prompt: string, config: ChatConfig): Promise<GeminiResponse>;

/**
 * Enviar un prompt a través del backend
 */
export function sendPromptToBackend(prompt: string, config: ChatConfig): Promise<GeminiResponse>;

/**
 * Subir y procesar un documento con Gemini
 */
export function uploadAndProcess(file: File, prompt: string, config: ChatConfig): Promise<GeminiResponse>;

/**
 * Configuración por defecto
 */
export const defaultConfig: ChatConfig;

/**
 * Export por defecto - FloatingChat
 */
export default FloatingChat;
