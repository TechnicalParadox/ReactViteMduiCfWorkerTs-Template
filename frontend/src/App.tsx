import { useEffect, useState } from 'react';
import { setTheme } from 'mdui';
import { Theme } from 'mdui/internal/theme';
import { baseUrl } from './helpers/EnvironmentDetection.ts';

function App() {
  const [themeMode, setThemeMode] = useState<Theme>("auto")
  const [workerResponse, setWorkerResponse] = useState<string>("untested")

  useEffect(() => {
    setTheme(themeMode)
    console.log("Set theme to", themeMode)
  }, [themeMode]);

  const toggleTheme = (currentTheme: Theme) => {
    const newTheme = currentTheme === "auto" ? "light" : currentTheme === "light" ? "dark" : "auto";
    setThemeMode(newTheme);
    setTheme(newTheme);
  }

  const testWorker = async () => {
    try {
      const response = await fetch(`${baseUrl}/test`);
      const data = await response.text();
      setWorkerResponse(`Worker is functional :) - ${data}`)
    } catch (error) {
      setWorkerResponse(`Worker is not functional :( - ${error}`)
    }
  }

  return (
    <>
      <mdui-button-icon onClick={() => toggleTheme(themeMode)}>
        { // A dynamic theme indicator
          themeMode === "auto" ?  <mdui-icon name="brightness_auto"/>
          : themeMode === "light" ?  <mdui-icon name="light_mode"/>
          : <mdui-icon name="dark_mode"/>
        }
      </mdui-button-icon>
      <br/>
      <mdui-button onClick={testWorker}>Test Worker</mdui-button>
      <p>Worker Status: {workerResponse}</p>
    </>
  );
}

export default App;
