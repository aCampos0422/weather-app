import './App.css'
import CardClima from './components/CardClima'
import { useState, useEffect } from 'react';
import Loader from './components/Loader';

function App() {
 
  const [isloading, setIsLoading] = useState(true)

  useEffect(() => {
    // Simulación de carga asincrónica
    setTimeout(() => {
      setIsLoading(false);
    }, 500);
  }, []);

  return (
    <>
      {isloading && <Loader />}
      <CardClima/>
    </>
  )
}

export default App
