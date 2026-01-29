import { createSignal, createEffect, For, Show } from 'solid-js';
import useGeminiChat from '../hooks/useGeminiChat';
import { marked } from 'marked';
import '../styles/ChatAssistant.css';

// Configurar marked
marked.setOptions({ breaks: true, gfm: true });

const AI_MODELS = [
  { id: 'gemini-2.5-flash', name: 'Gemini 2.5 Flash', description: 'Rápido y eficiente' },
  { id: 'gemini-2.5-pro', name: 'Gemini 2.5 Pro', description: 'Más potente y preciso' },
  { id: 'gemini-2.0-flash-lite', name: 'Gemini 2.0 Flash Lite', description: 'Ligero y rápido' }
];

/**
 * Componente principal del chat
 * @param {object} props.config - Configuración {apiKey, useBackend, backendUrl}
 * @param {string} props.initialModel - Modelo inicial
 * @param {boolean} props.darkMode - Tema oscuro
 * @param {function} props.toggleTheme - Función para cambiar tema
 */
const ChatAssistant = (props) => {
  // Hook de Gemini con configuración
  const { messages, loading, error, send } = useGeminiChat(props.config || {});
  
  const [input, setInput] = createSignal('');
  const [copiedIndex, setCopiedIndex] = createSignal(null);
  const [selectedModel, setSelectedModel] = createSignal(
    props.initialModel || 'gemini-2.5-flash'
  );
  
  let chatEndRef;
  let textareaRef;

  const scrollToBottom = () => {
    if (chatEndRef?.scrollIntoView) {
      chatEndRef.scrollIntoView({ behavior: 'smooth' });
    }
  };

  createEffect(() => {
    messages();
    loading();
    scrollToBottom();
  });

  createEffect(() => {
    if (textareaRef) {
      textareaRef.style.height = 'auto';
      textareaRef.style.height = textareaRef.scrollHeight + 'px';
    }
  });

  const handleModelChange = (e) => {
    const newModel = e.target.value;
    setSelectedModel(newModel);
    localStorage.setItem('gemini-selected-model', newModel);
  };

  const handleSend = async () => {
    if (!input().trim() || loading()) return;
    const message = input().trim();
    setInput('');
    await send(message, selectedModel());
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleCopyToClipboard = async (text, index) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedIndex(index);
      setTimeout(() => setCopiedIndex(null), 2000);
    } catch (err) {
      console.error('Error al copiar:', err);
    }
  };

  const suggestions = [
    { icon: '✨', text: '¿Qué puedes hacer?' },
    { icon: '💡', text: 'Dame una idea creativa' },
    { icon: '🚀', text: 'Ayúdame con código' },
    { icon: '📝', text: 'Explícame un concepto' }
  ];

  return (
    <div class="chat-assistant-container" classList={{ 'dark-mode': props.darkMode }}>
      {/* Header */}
      <Show when={!props.isFullScreen}>
        <div class="chat-header">
          <div class="header-left">
            <div class="logo">
              <span class="logo-icon">✨</span>
              <span class="logo-text">Asistente IA</span>
            </div>
            <div class="model-info">
              {AI_MODELS.find(m => m.id === selectedModel())?.description}
            </div>
          </div>
          
          <div class="header-right">
            <select 
              class="model-selector"
              value={selectedModel()}
              onChange={handleModelChange}
            >
              <For each={AI_MODELS}>
                {(model) => (
                  <option value={model.id}>{model.name}</option>
                )}
              </For>
            </select>
            
            <Show when={props.toggleTheme}>
              <button 
                class="theme-toggle"
                onClick={props.toggleTheme}
                title="Cambiar tema"
              >
                {props.darkMode ? '☀️' : '🌙'}
              </button>
            </Show>
          </div>
        </div>
      </Show>

      {/* Messages Area */}
      <div class="messages-area">
        <Show
          when={messages().length > 0}
          fallback={
            <div class="welcome-screen">
              <h1>¿Cómo puedo ayudarte?</h1>
              <div class="suggestions">
                <For each={suggestions}>
                  {(s) => (
                    <button
                      class="suggestion-card"
                      onClick={() => setInput(s.text)}
                    >
                      <span class="icon">{s.icon}</span>
                      <span class="text">{s.text}</span>
                    </button>
                  )}
                </For>
              </div>
            </div>
          }
        >
          <div class="messages-list">
            <For each={messages()}>
              {(m, i) => (
                <div class={`message ${m.role}`} classList={{ 'error': m.isError }}>
                  <div class="avatar">
                    {m.role === 'user' ? '👤' : '🤖'}
                  </div>
                  <div class="content">
                    <div class="author">{m.role === 'user' ? 'Tú' : 'Asistente'}</div>
                    <div class="text" innerHTML={marked(m.text)} />
                    <Show when={m.role === 'assistant' && !m.isError}>
                      <button
                        class="copy-btn"
                        onClick={() => handleCopyToClipboard(m.text, i())}
                      >
                        {copiedIndex() === i() ? '✓ Copiado' : '📋 Copiar'}
                      </button>
                    </Show>
                  </div>
                </div>
              )}
            </For>
            
            <Show when={loading()}>
              <div class="message assistant">
                <div class="avatar">🤖</div>
                <div class="content">
                  <div class="author">Asistente</div>
                  <div class="typing">
                    <span></span><span></span><span></span>
                  </div>
                </div>
              </div>
            </Show>
            
            <div ref={chatEndRef} />
          </div>
        </Show>
      </div>

      {/* Error Banner */}
      <Show when={error()}>
        <div class="error-banner">
          ⚠️ {error().message}
        </div>
      </Show>

      {/* Input Area */}
      <div class="input-area">
        <div class="input-wrapper">
          <textarea
            ref={textareaRef}
            value={input()}
            onInput={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyPress}
            placeholder="Escribe tu mensaje..."
            disabled={loading()}
            rows="1"
            class="input"
          />
          
          <button
            class="send-btn"
            classList={{ 'active': input().trim() && !loading() }}
            onClick={handleSend}
            disabled={loading() || !input().trim()}
          >
            {loading() ? '⏳' : '➤'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatAssistant;
