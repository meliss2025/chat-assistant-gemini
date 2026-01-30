# Chat Assistant Gemini

⚠️ **IMPORTANTE: Este módulo está diseñado para SolidJS, NO para React**

Módulo de chat asistente con Gemini AI para aplicaciones SolidJS. Sin backend requerido, se conecta directamente a la API de Google Gemini.

## ⚡ Framework

Este paquete usa **SolidJS** con las siguientes primitivas:
- `createSignal` - Estado reactivo
- `createEffect` - Efectos secundarios
- `For` - Renderizado de listas
- `Show` - Renderizado condicional

**NO es compatible con React**. Para React, necesitarías adaptar el código.

## 🚀 Instalación

Instala directamente desde GitHub:

```bash
npm install meliss2025/chat-assistant-gemini
```

o con pnpm:

```bash
pnpm add meliss2025/chat-assistant-gemini
```

Para instalar una versión o rama específica:

```bash
npm install meliss2025/chat-assistant-gemini#main
pnpm add meliss2025/chat-assistant-gemini#v1.2.0
```

## 📋 Requisitos Previos

1. **API Key de Google Gemini**: Obtén tu clave en [Google AI Studio](https://makersuite.google.com/app/apikey)
2. **SolidJS**: El módulo requiere SolidJS ^1.9.0 como peer dependency

## ⚙️ Configuración Inicial (IMPORTANTE)

Después de instalar el módulo, **debes configurar Vite** para que procese correctamente los archivos JSX del módulo:

### 1. Configurar vite.config.js/ts

Abre tu archivo `vite.config.js` o `vite.config.ts` y aplica la siguiente configuración:

```javascript
import { defineConfig } from 'vite';
import solidPlugin from 'vite-plugin-solid';

export default defineConfig({
  plugins: [
    solidPlugin({
      // Permitir que el plugin procese todas las extensiones JSX/JS
      extensions: ['.jsx', '.tsx', '.js', '.ts']
    })
  ],
  
  // Configuración para manejar el módulo desde node_modules
  optimizeDeps: {
    // Previene el pre-bundling del módulo
    exclude: ['chat-assistant-gemini']
  },
  
  // Forzar a Vite a procesar el módulo como ESM
  ssr: {
    noExternal: ['chat-assistant-gemini']
  },
  
  // Priorizar las condiciones de Solid
  resolve: {
    conditions: ['solid', 'browser', 'development']
  }
});
```

**⚠️ Sin esta configuración verás el error:** `Uncaught ReferenceError: React is not defined`

### 2. Posicionar el componente correctamente

Para que el botón flotante **siempre esté visible**, colócalo **fuera de cualquier renderizado condicional** en tu componente principal:

```jsx
import FloatingChat, { ChatConfig } from 'chat-assistant-gemini';

function App() {
  const [ready, setReady] = createSignal(false);
  
  const chatConfig: ChatConfig = {
    useBackend: false,
    apiKey: 'TU_API_KEY',
    model: 'gemini-2.5-flash',
    position: 'right',
    buttonColor: '#6366f1'
  };

  return (
    <>
      {/* ✅ CORRECTO: El componente siempre está visible */}
      <FloatingChat config={chatConfig} />
      
      {/* Contenido condicional de tu app */}
      {!ready() ? (
        <div>Cargando...</div>
      ) : (
        <div>Tu aplicación</div>
      )}
    </>
  );
}
```

❌ **INCORRECTO** - El botón desaparecerá:
```jsx
// ❌ NO hagas esto
return (
  <>
    {!ready() ? (
      <div>
        <div>Cargando...</div>
        <FloatingChat config={chatConfig} />  {/* Se oculta cuando ready es true */}
      </div>
    ) : (
      <div>Contenido</div>
    )}
  </>
);
```

### 3. Reiniciar el servidor de desarrollo

Después de modificar `vite.config.js`:

```bash
# Detén el servidor actual (Ctrl+C)
pnpm dev  # o npm run dev
```

## 💻 Uso Básico

```jsx
import FloatingChat, { ChatConfig } from 'chat-assistant-gemini';

function App() {
  const chatConfig: ChatConfig = {
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
import FloatingChat, { ChatConfig } from 'chat-assistant-gemini';
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

### Error de TypeScript con módulos sin declaraciones de tipos

Si encuentras un error similar a:
```
No se encontró ningún archivo de declaración para el módulo 'chat-assistant-gemini'
```

**Solución:**

1. Intenta instalar los tipos oficiales desde DefinitelyTyped:
   ```bash
   pnpm add -D @types/chat-assistant-gemini
   ```

2. Si no existen tipos oficiales (el comando falla), crea un archivo de declaración de tipos:
   
   - Crea un archivo `chat-assistant-gemini.d.ts` en la carpeta `src/`
   - Agrega la declaración básica del módulo:
     ```typescript
     declare module 'chat-assistant-gemini' {
       import { Component } from 'solid-js';
       
       export interface ChatConfig {
         useBackend?: boolean;
         backendUrl?: string;
         apiKey?: string;
         model?: 'gemini-2.5-flash' | 'gemini-2.5-pro' | 'gemini-1.5-flash' | 'gemini-1.5-pro' | 'gemini-pro';
         position?: 'left' | 'right';
         buttonColor?: string;
       }
       
       export interface FloatingChatProps {
         config: ChatConfig;
       }
       
       const FloatingChat: Component<FloatingChatProps>;
       export default FloatingChat;
     }
     ```

**Nota:** Los archivos `.d.ts` en la carpeta `src/` son incluidos automáticamente por TypeScript según la configuración del `tsconfig.json`.

### Error de tipos incompatibles en objetos de configuración

Si encuentras un error similar a:
```
El tipo 'string' no se puede asignar al tipo '"left" | "right" | undefined'
```

Este error ocurre cuando TypeScript infiere un tipo más general (como `string`) en lugar del tipo literal específico que espera la interfaz.

**Solución:**

1. **Opción 1 (Recomendada):** Añade el tipo explícito al objeto:
   ```typescript
   import FloatingChat, { ChatConfig } from 'chat-assistant-gemini';
   
   const config: ChatConfig = {
     useBackend: false,
     apiKey: 'TU_API_KEY',
     model: 'gemini-2.5-flash',
     position: 'right', // Ahora TypeScript sabe que es 'left' | 'right'
     buttonColor: '#6366f1'
   };
   
   <FloatingChat config={config} />
   ```

2. **Opción 2:** Usa `as const` para el valor específico:
   ```typescript
   const config = {
     useBackend: false,
     apiKey: 'TU_API_KEY',
     model: 'gemini-2.5-flash' as const,
     position: 'right' as const,
     buttonColor: '#6366f1'
   };
   ```

### Error "No se puede encontrar el archivo de definición de tipo"

Si encuentras errores como:
```
No se puede encontrar el archivo de definición de tipo para 'solid-js/jsx'
No se puede encontrar el archivo de definición de tipo para 'nombre-paquete'
```

Este error ocurre cuando la propiedad `types` en `tsconfig.json` está limitando qué tipos TypeScript puede incluir automáticamente.

**Solución:**

1. Abre el archivo `tsconfig.json`
2. Elimina las referencias innecesarias del array `types`:
   ```json
   {
     "compilerOptions": {
       "types": ["vite/client"]
     }
   }
   ```
   
3. **Regla general:** Solo incluye en `types` los paquetes que NO se importan explícitamente en tu código:
   - ❌ No incluyas: `"solid-js"`, `"solid-js/jsx"`, `"react"`, etc. (se importan en el código)
   - ✅ Sí incluye: `"vite/client"`, `"node"`, etc. (tipos ambientales/globales)

**Por qué funciona:** Cuando especificas el array `types`, TypeScript solo incluye esos tipos específicos y deshabilita la inclusión automática. Al eliminar referencias como `"solid-js/jsx"`, permites que TypeScript las resuelva automáticamente desde los paquetes instalados.

### Error "React is not defined" con módulos de SolidJS desde node_modules

Si encuentras un error en la consola:
```
Uncaught ReferenceError: React is not defined
    at FloatingChat (chat-assistant-gemini.js:...)
```

Este error ocurre cuando el módulo construido con SolidJS (archivos `.jsx`) no está siendo procesado correctamente por Vite, y Vite lo interpreta como JSX de React.

**Solución:**

1. Abre el archivo `vite.config.ts` o `vite.config.js`
2. Configura `vite-plugin-solid` para incluir los archivos JSX del módulo:
   ```typescript
   import { defineConfig } from 'vite';
   import solidPlugin from 'vite-plugin-solid';
   
   export default defineConfig({
     plugins: [
       solidPlugin({
         extensions: ['.jsx', '.tsx', '.js', '.ts']
       })
     ],
     optimizeDeps: {
       exclude: ['chat-assistant-gemini']
     },
     ssr: {
       noExternal: ['chat-assistant-gemini']
     },
     resolve: {
       conditions: ['solid', 'browser', 'development']
     }
   });
   ```
   
   **Claves importantes:**
   - `extensions`: Permite que el plugin procese todas las extensiones JSX/JS
   - `optimizeDeps.exclude`: Previene el pre-bundling del módulo
   - `ssr.noExternal`: Fuerza a Vite a procesar el módulo como ESM
   - `resolve.conditions`: Prioriza las condiciones de Solid

3. Reinicia el servidor de desarrollo:
   ```bash
   # Detener el servidor actual (Ctrl+C)
   pnpm dev
   ```

**Por qué funciona:** Por defecto, Vite no procesa archivos en `node_modules` con el plugin de Solid. Al configurar estas opciones, Vite procesa los archivos JSX del módulo como SolidJS en lugar de React. El `exclude` en `optimizeDeps` previene que Vite pre-bundle el módulo, permitiendo que sea transformado correctamente.

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
- **Instalación**: `npm install meliss2025/chat-assistant-gemini`
- **Google AI Studio**: https://makersuite.google.com/app/apikey
- **SolidJS**: https://www.solidjs.com/

## 💬 Soporte

Si encuentras algún problema o tienes preguntas:

- Abre un [Issue](https://github.com/meliss2025/chat-assistant-gemini/issues)
- Revisa la [documentación](https://github.com/meliss2025/chat-assistant-gemini#readme)

---

Hecho con ❤️ para la comunidad SolidJS
