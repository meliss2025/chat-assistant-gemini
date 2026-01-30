# Archivos de ejemplo

Este directorio contiene archivos de ejemplo para ayudarte a configurar correctamente tu proyecto que usa `chat-assistant-gemini`.

## 📁 Archivos incluidos

### `vite.config.example.js`
Configuración de ejemplo para Vite que soluciona el error "React is not defined".

**Cómo usar:**
1. Copia el contenido a tu `vite.config.js` o `vite.config.ts`
2. Reinicia el servidor de desarrollo

### `chat-assistant-gemini.d.ts.example`
Archivo de declaración de tipos TypeScript.

**Cómo usar:**
1. Si encuentras errores de tipos TypeScript
2. Copia este archivo a `src/chat-assistant-gemini.d.ts` en tu proyecto
3. TypeScript reconocerá automáticamente los tipos del módulo

**NOTA:** Este archivo normalmente no es necesario ya que el módulo incluye `index.d.ts`, pero está disponible si necesitas personalizarlo.

## 🔧 Cuándo usar estos archivos

### Usa `vite.config.example.js` si:
- Ves el error: `Uncaught ReferenceError: React is not defined`
- El módulo no se renderiza correctamente
- Hay problemas con JSX en node_modules

### Usa `chat-assistant-gemini.d.ts.example` si:
- Ves errores de TypeScript sobre tipos faltantes
- El autocompletado no funciona en tu IDE
- TypeScript no reconoce el módulo

## 📚 Más información

Para más detalles sobre solución de problemas, consulta la sección "Solución de Problemas" en el README principal.
