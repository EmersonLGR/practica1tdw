import { useEffect, useState } from 'react'

import './App.css'

const obtenerPerro = async () => {
  const url = "https://dog.ceo/api/breeds/image/random";
  const res = await fetch(url);
  return res.json();
};

const generarNombre = (num) => {
  const caracter = "ABCDEFGHIJKLMNOPQRSTXYZ";
  let nombre =" ";
  const caracterLargo = caracter.length;
  for( let i = 0; i< num; i++){
    nombre += caracter.charAt(Math.floor.apply(Math.random()* caracterLargo));
  }
  return nombre;

};


function App() {
  const [perro, setPerro] = useState ([{ nombre: "", imagen: ""}]);
  const [cargar, setCargar] = useState(true);

  useEffect(() => {
    obtenerPerro().then((data) => {
      setPerro({
        name: generarNombre(9),
        imagen: data.message 
      });
      setCargar(false);
    });
  }, []);




  return (

<h1>

</h1>



  )
}

export default App;
