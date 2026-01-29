# Chat Assistant Gemini

Módulo de chat asistente con Gemini AI para aplicaciones SolidJS. Sin backend requerido, se conecta directamente a la API de Google Gemini.

## 🚀 Instalación

```bash
npm install chat-assistant-gemini
```

o con pnpm:

```bash
pnpm add chat-assistant-gemini
```

## 📋 Requisitos Previos

1. **API Key de Google Gemini**: Obtén tu clave en [Google AI Studio](https://makersuite.google.com/app/apikey)
2. **SolidJS**: El módulo requiere SolidJS ^1.9.0 como peer dependency

## 💻 Uso Básico

```jsx
import FloatingChat from 'chat-assistant-gemini';

function App() {
  const chatConfig = {
    useBackend: false,
    apiKey: 'TU_API_KEY_DE_GEMINI',
    model: 'gemini-2.5-flash',
    position: 'right', // 'left' o 'right'
    buttonColor: '#6366f1'
  };

  return (
    <div>
      <h1>Mi Aplicación</h1>
      <FloatingChat config={chatConfig} />
    </div>
  );
}
```

## ⚙️ Configuración

### Opciones de `config`

| Opción | Tipo | Default | Descripción |
|--------|------|---------|-------------|
| `useBackend` | boolean | `false` | Si usar un backend propio o llamar directamente a Gemini |
| `apiKey` | string | **requerido** | API Key de Google Gemini |
| `model` | string | `'gemini-2.5-flash'` | Modelo de Gemini a usar |
| `position` | string | `'right'` | Posición del botón flotante: `'left'` o `'right'` |
| `buttonColor` | string | `'#6366f1'` | Color del botón flotante (hex o rgb) |

### Modelos Disponibles

- `gemini-2.5-flash` - Rápido y eficiente (recomendado)
- `gemini-2.5-pro` - Más capacidad y precisión
- `gemini-1.5-flash` - Versión anterior estable
- `gemini-1.5-pro` - Pro anterior
- `gemini-pro` - Modelo clásico

## 🎨 Características

✅ **Sin Backend**: Conexión directa a Google Gemini API  
✅ **Markdown**: Soporte completo de formato markdown  
✅ **Responsivo**: Funciona en móviles, tablets y desktop  
✅ **Personalizable**: Colores, posición y estilos configurables  
✅ **Sugerencias Rápidas**: Botones de inicio de conversación  
✅ **Copiar Respuestas**: Botón para copiar texto de la IA  
✅ **Dark/Light Mode**: Soporte para temas claros y oscuros  
✅ **Animaciones**: Transiciones suaves y profesionales  

## 🔧 Uso Avanzado

### Con Backend Propio

Si prefieres usar tu propio backend:

```jsx
const chatConfig = {
  useBackend: true,
  backendUrl: 'https://tu-backend.com/api/chat',
  model: 'gemini-2.5-flash',
  position: 'left',
  buttonColor: '#10b981'
};

<FloatingChat config={chatConfig} />
```

Tu backend debe exponer un endpoint POST que acepte:

```json
{
  "prompt": "mensaje del usuario",
  "model": "gemini-2.5-flash"
}
```

Y retornar:

```json
{
  "text": "respuesta del asistente"
}
```

## 🎯 Ejemplos

### Integración en Dashboard

```jsx
import { render } from 'solid-js/web';
import FloatingChat from 'chat-assistant-gemini';
import Dashboard from './Dashboard';

function App() {
  return (
    <>
      <Dashboard />
      <FloatingChat config={{
        useBackend: false,
        apiKey: process.env.GEMINI_API_KEY,
        model: 'gemini-2.5-flash',
        position: 'right',
        buttonColor: '#667eea'
      }} />
    </>
  );
}

render(() => <App />, document.getElementById('root'));
```

### Variables de Entorno

Recomendamos usar variables de entorno para la API key:

```env
# .env
VITE_GEMINI_API_KEY=tu_api_key_aqui
```

```jsx
const chatConfig = {
  apiKey: import.meta.env.VITE_GEMINI_API_KEY,
  // ... resto de la config
};
```

## 🔒 Seguridad

⚠️ **IMPORTANTE**: Si usas `useBackend: false`, tu API key será visible en el cliente. Considera:

1. **Usar Backend**: Para producción, implementa un backend que maneje la API key
2. **Restricciones de API Key**: En Google Cloud Console, restringe tu API key por dominio/IP
3. **Rate Limiting**: Implementa límites de uso en tu aplicación

## 🐛 Solución de Problemas

### Error 403: API Key sin permisos

Asegúrate de:
- Habilitar la **Generative Language API** en Google Cloud Console
- Verificar que la API key no tenga restricciones que bloqueen localhost
- La API key esté activa y válida

### Error 404: Modelo no encontrado

Usa uno de los modelos válidos: `gemini-2.5-flash`, `gemini-2.5-pro`, `gemini-1.5-flash`, `gemini-1.5-pro`, o `gemini-pro`

### Los estilos no se aplican

Asegúrate de importar los estilos (se importan automáticamente con el componente)

## 📦 ¿Qué incluye?

```
chat-assistant-gemini/
├── components/
│   ├── ChatAssistant.jsx    # Componente principal de chat
│   └── FloatingChat.jsx      # Widget flotante
├── hooks/
│   └── useGeminiChat.js      # Hook para integración con Gemini
├── utils/
│   └── geminiApi.js          # Utilidades de API
├── styles/
│   ├── ChatAssistant.css     # Estilos del chat
│   └── FloatingChat.css      # Estilos del widget flotante
├── config.js                 # Configuración por defecto
└── index.js                  # Export principal
```

## 🤝 Contribuir

¡Las contribuciones son bienvenidas! 

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add: amazing feature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📄 Licencia

MIT License - ver el archivo [LICENSE](LICENSE) para más detalles.

## 🔗 Links

- **GitHub**: https://github.com/meliss2025/chat-assistant-gemini
- **NPM**: https://www.npmjs.com/package/chat-assistant-gemini
- **Google AI Studio**: https://makersuite.google.com/app/apikey
- **SolidJS**: https://www.solidjs.com/

## 💬 Soporte

Si encuentras algún problema o tienes preguntas:

- Abre un [Issue](https://github.com/meliss2025/chat-assistant-gemini/issues)
- Revisa la [documentación](https://github.com/meliss2025/chat-assistant-gemini#readme)

---

Hecho con ❤️ para la comunidad SolidJS
