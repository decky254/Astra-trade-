import { defineConfig } from 'vite'

// Smart adaptive loader to handle standard React or SWC compilation setups
export default defineConfig(async () => {
  let reactPlugin;
  
  try {
    // 1. Try loading the standard compiler plugin
    const standardModule = await import('@vitejs/plugin-react');
    reactPlugin = standardModule.default();
  } catch (err) {
    try {
      // 2. Fall back to the SWC compiler plugin if that's what the workspace has
      const swcModule = await import('@vitejs/plugin-react-swc');
      reactPlugin = swcModule.default();
    } catch (fallbackErr) {
      console.warn("No explicit React bundler engine detected. Initializing bare compilation context.");
    }
  }

  return {
    plugins: reactPlugin ? [reactPlugin] : [],
  }
})
