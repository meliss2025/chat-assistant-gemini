/**
 * FloatingChat Component - SolidJS
 * Este componente usa SolidJS, NO React
 * Primitivas: createSignal, Show
 */
import { createSignal, Show } from 'solid-js';
import ChatAssistant from './ChatAssistant';
import '../styles/FloatingChat.css';

/**
 * Componente de chat flotante con múltiples pantallas
 * @param {object} props.config - Configuración de conexión a Gemini
 * @param {string} props.position - 'right' o 'left'
 * @param {string} props.buttonColor - Color del botón flotante
 */
const FloatingChat = (props) => {
  const [isOpen, setIsOpen] = createSignal(false);
  const [activeScreen, setActiveScreen] = createSignal('home'); // 'home', 'chat', 'help', 'settings'
  const [darkMode, setDarkMode] = createSignal(false);
  
  // Inicializar modelo - ejecutar función inmediatamente
  const savedModel = localStorage.getItem('selectedAIModel');
  const [selectedModel, setSelectedModel] = createSignal(
    savedModel || props.config?.model || 'gemini-2.5-flash'
  );

  const position = props.position || props.config?.position || 'right';
  const buttonColor = props.buttonColor || props.config?.buttonColor || '#0072ff';

  const toggleChat = () => {
    setIsOpen(!isOpen());
    if (!isOpen()) {
      setActiveScreen('home'); // Reset to home when opening
    }
  };

  const toggleTheme = () => {
    setDarkMode(!darkMode());
  };

  const handleModelChange = (e) => {
    const newModel = e.target.value;
    setSelectedModel(newModel);
    localStorage.setItem('selectedAIModel', newModel);
  };

  const handleChatFocus = () => {
    setActiveScreen('chat');
  };

  const handleBackToHome = () => {
    setActiveScreen('home');
  };

  return (
    <>
      {/* Botón flotante */}
      <button 
        class="floating-chat-btn"
        classList={{ [position]: true }}
        style={{ background: buttonColor }}
        onClick={toggleChat}
        aria-label="Abrir chat"
      >
        <Show when={!isOpen()} fallback={
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <line x1="18" y1="6" x2="6" y2="18"/>
            <line x1="6" y1="6" x2="18" y2="18"/>
          </svg>
        }>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
          </svg>
        </Show>
      </button>

      {/* Overlay y ventana del chat */}
      <Show when={isOpen()}>
        <div class="floating-chat-overlay" onClick={toggleChat}>
          <div 
            class="floating-chat-window"
            classList={{ 
              [position]: true,
              [`screen-${activeScreen()}`]: true
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div class="widget-new-header">
              <Show when={activeScreen() === 'chat'}>
                <button class="header-back-btn" onClick={handleBackToHome}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M19 12H5M12 19l-7-7 7-7"/>
                  </svg>
                </button>
              </Show>
              <Show when={activeScreen() === 'home'}>
                <h2 class="widget-new-title">Asistente Virtual</h2>
              </Show>
              <Show when={activeScreen() === 'help'}>
                <h2 class="widget-new-title">Centro de Ayuda</h2>
              </Show>
              <Show when={activeScreen() === 'settings'}>
                <h2 class="widget-new-title">Ajustes</h2>
              </Show>
              <button class="header-close-btn" onClick={toggleChat}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <line x1="18" y1="6" x2="6" y2="18"/>
                  <line x1="6" y1="6" x2="18" y2="18"/>
                </svg>
              </button>
            </div>

            {/* Home Screen */}
            <Show when={activeScreen() === 'home'}>
              <div class="home-screen">
                <div class="home-top-section">
                  {/* Contenido del área azul */}
                </div>
                <div class="home-bottom-section">
                  <div class="home-input-wrapper">
                    <input 
                      type="text" 
                      class="home-chat-input" 
                      placeholder="Escribe tu mensaje..."
                      onFocus={handleChatFocus}
                    />
                  </div>
                </div>
              </div>
            </Show>

            {/* Chat Screen */}
            <Show when={activeScreen() === 'chat'}>
              <div class="chat-screen">
                <ChatAssistant 
                  config={props.config}
                  darkMode={darkMode()}
                  toggleTheme={toggleTheme}
                  initialModel={selectedModel()}
                  isFullScreen={true}
                />
              </div>
            </Show>

            {/* Help Screen */}
            <Show when={activeScreen() === 'help'}>
              <div class="help-screen">
                <div class="help-section">
                  <div class="help-card">
                    <div class="help-card-icon">💬</div>
                    <div class="help-card-content">
                      <h3>Cómo chatear</h3>
                      <p>Escribe tu pregunta en el campo de texto y presiona Enter o el botón de enviar. Puedes hacer preguntas sobre cualquier tema.</p>
                    </div>
                  </div>

                  <div class="help-card">
                    <div class="help-card-icon">📎</div>
                    <div class="help-card-content">
                      <h3>Adjuntar archivos</h3>
                      <p>Haz clic en el botón + para adjuntar documentos, imágenes o PDFs. El asistente los analizará por ti.</p>
                    </div>
                  </div>

                  <div class="help-card">
                    <div class="help-card-icon">⚡</div>
                    <div class="help-card-content">
                      <h3>Acceso rápido</h3>
                      <p>En la pantalla de inicio encontrarás sugerencias rápidas. Solo haz clic en una para comenzar.</p>
                    </div>
                  </div>

                  <div class="help-card">
                    <div class="help-card-icon">🎯</div>
                    <div class="help-card-content">
                      <h3>Consejos útiles</h3>
                      <ul class="help-tips">
                        <li>Sé específico en tus preguntas</li>
                        <li>Puedes pedir que reformule respuestas</li>
                        <li>Usa el botón 📋 para copiar respuestas</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </Show>

            {/* Settings Screen */}
            <Show when={activeScreen() === 'settings'}>
              <div class="settings-screen">
                <div class="settings-section">
                  <div class="settings-item">
                    <div class="settings-item-header">
                      <div class="settings-item-icon">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                          <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/>
                          <polyline points="3.27 6.96 12 12.01 20.73 6.96"/>
                          <line x1="12" y1="22.08" x2="12" y2="12"/>
                        </svg>
                      </div>
                      <div class="settings-item-info">
                        <h3>Modelo de IA</h3>
                        <p>Selecciona el modelo de Gemini a utilizar</p>
                      </div>
                    </div>
                    <select class="settings-select" value={selectedModel()} onChange={handleModelChange}>
                      <option value="gemini-2.5-pro">Gemini 2.5 Pro</option>
                      <option value="gemini-2.5-flash">Gemini 2.5 Flash</option>
                      <option value="gemini-2.0-flash-lite">Gemini 2.0 Flash Lite</option>
                    </select>
                  </div>

                  <div class="settings-item">
                    <div class="settings-item-header">
                      <div class="settings-item-icon">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                          <circle cx="12" cy="12" r="3"/>
                          <path d="M12 1v6m0 6v6m6.364-15.364l-4.243 4.243m0 6.364l4.243 4.243M23 12h-6m-6 0H1m15.364 6.364l-4.243-4.243m0-6.364l4.243-4.243"/>
                        </svg>
                      </div>
                      <div class="settings-item-info">
                        <h3>Tema</h3>
                        <p>Personaliza la apariencia del chat</p>
                      </div>
                    </div>
                    <div class="theme-toggle-container">
                      <button 
                        class="theme-option theme-light"
                        classList={{ active: !darkMode() }}
                        onClick={toggleTheme}
                      >
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                          <circle cx="12" cy="12" r="5"/>
                          <line x1="12" y1="1" x2="12" y2="3"/>
                          <line x1="12" y1="21" x2="12" y2="23"/>
                          <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/>
                          <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
                          <line x1="1" y1="12" x2="3" y2="12"/>
                          <line x1="21" y1="12" x2="23" y2="12"/>
                          <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/>
                          <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
                        </svg>
                        <span>Claro</span>
                      </button>
                      <button 
                        class="theme-option theme-dark"
                        classList={{ active: darkMode() }}
                        onClick={toggleTheme}
                      >
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
                        </svg>
                        <span>Oscuro</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </Show>

            {/* Bottom Navigation - Solo visible en home, help y settings */}
            <Show when={activeScreen() !== 'chat'}>
              <div class="bottom-navigation">
                <button 
                  class="nav-btn"
                  classList={{ active: activeScreen() === 'home' }}
                  onClick={() => setActiveScreen('home')}
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
                    <polyline points="9 22 9 12 15 12 15 22"/>
                  </svg>
                  <span>Inicio</span>
                </button>
                <button 
                  class="nav-btn"
                  classList={{ active: activeScreen() === 'help' }}
                  onClick={() => setActiveScreen('help')}
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <circle cx="12" cy="12" r="10"/>
                    <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/>
                    <line x1="12" y1="17" x2="12.01" y2="17"/>
                  </svg>
                  <span>Ayuda</span>
                </button>
                <button 
                  class="nav-btn"
                  classList={{ active: activeScreen() === 'settings' }}
                  onClick={() => setActiveScreen('settings')}
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <circle cx="12" cy="12" r="3"/>
                    <path d="M12 1v6m0 6v6m6.22-13.22l-4.25 4.25m-7.94 7.94l-4.25 4.25M23 12h-6m-6 0H1m17.78 6.22l-4.25-4.25m-7.94-7.94l-4.25-4.25"/>
                  </svg>
                  <span>Ajustes</span>
                </button>
              </div>
            </Show>
          </div>
        </div>
      </Show>
    </>
  );
};

export default FloatingChat;
