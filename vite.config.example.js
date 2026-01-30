/**
 * Ejemplo de configuración de Vite para usar chat-assistant-gemini
 * 
 * Este archivo muestra cómo configurar vite-plugin-solid para que procese
 * correctamente los archivos JSX del módulo desde node_modules.
 * 
 * IMPORTANTE: Copia esta configuración a tu proyecto si encuentras el error:
 * "React is not defined" al usar el módulo.
 */

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
    // Previene el pre-bundling del módulo para que sea transformado correctamente
    exclude: ['chat-assistant-gemini']
  },
  
  // Forzar a Vite a procesar el módulo como ESM
  ssr: {
    noExternal: ['chat-assistant-gemini']
  },
  
  // Priorizar las condiciones de Solid en las resoluciones de módulos
  resolve: {
    conditions: ['solid', 'browser', 'development']
  }
});

/**
 * EXPLICACIÓN DE CADA OPCIÓN:
 * 
 * 1. solidPlugin({ extensions: [...] })
 *    - Permite que vite-plugin-solid procese archivos .jsx y .js del módulo
 *    - Sin esto, Vite interpretará el JSX como React en lugar de SolidJS
 * 
 * 2. optimizeDeps.exclude: ['chat-assistant-gemini']
 *    - Previene que Vite pre-bundle el módulo durante el desarrollo
 *    - Permite que el módulo sea transformado por vite-plugin-solid
 * 
 * 3. ssr.noExternal: ['chat-assistant-gemini']
 *    - Fuerza a Vite a procesar el módulo como ESM
 *    - Asegura que el módulo sea transformado correctamente
 * 
 * 4. resolve.conditions: ['solid', 'browser', 'development']
 *    - Prioriza las condiciones de Solid en las resoluciones de módulos
 *    - Ayuda a resolver correctamente las importaciones de SolidJS
 */
