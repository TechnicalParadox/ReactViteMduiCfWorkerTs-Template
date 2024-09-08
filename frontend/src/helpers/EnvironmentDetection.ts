export const devMode = import.meta.env.MODE == 'development';
export const baseUrl = devMode ? 'http://localhost:8787' : 'https://myworker.pages.dev'; // TODO: Adjust as needed