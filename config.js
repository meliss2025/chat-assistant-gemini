/**
 * Configuración del Chat Assistant
 * 
 * IMPORTANTE: Copia este archivo a tu proyecto y ajusta los valores
 */

const chatConfig = {
  // ===== OPCIÓN 1: Conexión directa a Gemini API (SIN servidor backend) =====
  // Usa esto si NO tienes un servidor backend
  useBackend: false,
  apiKey: 'AIzaSyCfVXmvrmNouXOMc6bsqRRoCsFph8uVzC0', // Obtener en: https://makersuite.google.com/app/apikey
  
  // ===== OPCIÓN 2: Usar el backend del cliente =====
  // Usa esto si YA TIENES un servidor backend que maneja Gemini
  // useBackend: true,
  // backendUrl: '/api/gemini', // URL de tu endpoint
  
  // ===== Configuración general =====
  model: 'gemini-2.5-flash', // Modelo por defecto
  position: 'right', // Posición del botón flotante: 'right' o 'left'
  buttonColor: '#0072ff', // Color del botón flotante
};

export default chatConfig;
export { chatConfig };

/**
 * IMPORTANTE SOBRE LA API KEY:
 * 
 * 1. Si usas conexión directa (useBackend: false):
 *    - La API key estará en el código del frontend
 *    - Solo para desarrollo o apps internas
 *    - NO recomendado para producción pública
 * 
 * 2. Si usas backend (useBackend: true):
 *    - La API key está segura en el servidor
 *    - Recomendado para producción
 *    - El cliente debe implementar el endpoint /api/gemini
 * 
 * Endpoint esperado en el backend:
 * POST /api/gemini
 * Body: { prompt: string, model: string }
 * Response: { text: string }
 */
