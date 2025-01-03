// tailwind.config.d.ts
declare const config: {
    content: string[];
    theme: {
      extend: Record<string, unknown>;
    };
    plugins: any[];
  };
  
  export default config;