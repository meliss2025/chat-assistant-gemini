import axios from 'axios';

/**
 * Cliente API de Gemini - Funciona SIN servidor backend
 * Se conecta directamente a la API de Google Gemini
 * 
 * IMPORTANTE: La API key debe ser proporcionada por el cliente
 */

/**
 * Enviar prompt a Gemini API directamente
 * @param {string} prompt - El texto a enviar
 * @param {string} apiKey - API Key de Google Gemini
 * @param {string} model - Modelo a usar (gemini-1.5-flash, gemini-1.5-pro, gemini-pro, etc.)
 * @returns {Promise<object>} Respuesta de Gemini
 */
export const sendPromptDirect = async (prompt, apiKey, model = 'gemini-1.5-flash') => {
  if (!apiKey) {
    throw new Error('🔑 API Key no configurada. Por favor, proporciona tu GEMINI_API_KEY.');
  }

  if (!prompt || !prompt.trim()) {
    throw new Error('❌ El prompt no puede estar vacío.');
  }

  try {
    const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;

    const response = await axios.post(
      url,
      {
        contents: [{
          parts: [{
            text: prompt
          }]
        }]
      },
      {
        headers: { 'Content-Type': 'application/json' },
        timeout: 60000
      }
    );

    if (response.status !== 200) {
      throw new Error(`Error HTTP: ${response.status}`);
    }

    const text = response.data?.candidates?.[0]?.content?.parts?.[0]?.text || '';
    
    if (!text) {
      throw new Error('No se recibió respuesta del modelo');
    }

    return { text };

  } catch (err) {
    console.error('Error en sendPromptDirect:', err?.response?.data || err.message);
    console.error('URL intentada:', `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent`);
    console.error('Código de estado:', err?.response?.status);
    
    // Manejo de errores específicos
    if (err?.response?.status === 404) {
      throw new Error(`❌ Modelo "${model}" no encontrado. Usa: gemini-1.5-flash, gemini-1.5-pro, o gemini-pro`);
    }
    
    if (err?.response?.status === 429) {
      throw new Error('⚠️ Límite de solicitudes excedido. Espera unos minutos e intenta de nuevo.');
    }
    
    if (err?.response?.status === 403 || err?.response?.status === 401) {
      const errorDetail = err?.response?.data?.error?.message || 'Sin detalles';
      throw new Error(`🔑 API Key sin permisos. Detalle: ${errorDetail}. Verifica en Google AI Studio que la API key esté activa y tenga habilitada la Generative Language API.`);
    }
    
    if (err?.response?.status === 400) {
      const errorMsg = err?.response?.data?.error?.message || 'Solicitud inválida';
      throw new Error(`❌ Error: ${errorMsg}`);
    }

    throw new Error(err.message || 'Error desconocido al comunicarse con Gemini');
  }
};

/**
 * Enviar prompt a través del backend del cliente (si existe)
 * @param {string} prompt - El texto a enviar
 * @param {string} model - Modelo a usar
 * @param {string} backendUrl - URL del backend del cliente
 * @returns {Promise<object>} Respuesta del backend
 */
export const sendPromptToBackend = async (prompt, model = 'gemini-2.5-flash', backendUrl = '/api/gemini') => {
  try {
    const res = await axios.post(backendUrl, { prompt, model }, {
      timeout: 60000
    });
    return res.data;
  } catch (err) {
    console.error('Error en sendPromptToBackend:', err?.response?.data || err.message);
    
    if (err?.response?.status === 429) {
      throw new Error('⚠️ Límite de solicitudes excedido. Espera unos minutos e intenta de nuevo.');
    }
    
    if (err?.response?.status === 403) {
      throw new Error('🔑 API Key inválida o sin permisos en el servidor.');
    }
    
    if (err?.response?.status === 500) {
      const errorMsg = err?.response?.data?.error || 'Error interno del servidor';
      throw new Error(`❌ Error del servidor: ${JSON.stringify(errorMsg)}`);
    }
    
    throw new Error(err?.response?.data?.error || err.message || 'Error desconocido');
  }
};

/**
 * Función inteligente que decide cómo enviar el prompt
 * @param {string} prompt - El texto a enviar
 * @param {object} config - Configuración {apiKey, model, backendUrl, useBackend}
 * @returns {Promise<object>} Respuesta de Gemini
 */
export const sendPrompt = async (prompt, config = {}) => {
  const {
    apiKey = null,
    model = 'gemini-2.5-flash',
    backendUrl = '/api/gemini',
    useBackend = false // Si true, usa backend del cliente; si false, usa API directa
  } = config;

  if (useBackend) {
    // Usar el backend del cliente
    return sendPromptToBackend(prompt, model, backendUrl);
  } else {
    // Conectar directamente a Gemini API
    return sendPromptDirect(prompt, apiKey, model);
  }
};

/**
 * Subir archivo y procesarlo con Gemini
 * Solo funciona si hay backend, ya que Gemini File API requiere upload
 * @param {File} file - Archivo a subir
 * @param {string} promptText - Prompt para analizar el archivo
 * @param {object} config - Configuración
 * @returns {Promise<object>} Respuesta con el análisis
 */
export const uploadAndProcess = async (file, promptText, config = {}) => {
  const {
    apiKey = null,
    model = 'gemini-2.5-flash',
    backendUrl = '/api/upload',
    useBackend = false
  } = config;

  if (!file) {
    throw new Error('No se proporcionó ningún archivo');
  }

  // La funcionalidad de upload REQUIERE backend
  if (!useBackend) {
    throw new Error('⚠️ La funcionalidad de subida de archivos requiere un backend. Configura useBackend: true');
  }

  try {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('prompt', promptText || 'Analiza este archivo y proporciona un resumen.');
    formData.append('model', model);

    const res = await axios.post(backendUrl, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
      timeout: 120000
    });

    return { summary: res.data?.summary || res.data?.text || JSON.stringify(res.data) };
  } catch (err) {
    console.error('Error en uploadAndProcess:', err?.response?.data || err.message);
    throw new Error(err?.response?.data?.error || err.message || 'Error al procesar el archivo');
  }
};
