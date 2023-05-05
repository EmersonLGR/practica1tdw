import { useEffect, useState } from 'react';
import {  Grid, Card, CardMedia, CardContent, Typography, CardActions, IconButton, CircularProgress, Box} from  "@mui/material";
import Tooltip from "@mui/material/Tooltip";
import AddReactionIcon from '@mui/icons-material/AddReaction';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import HeartBrokenIcon from '@mui/icons-material/HeartBroken';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { LoremIpsum } from 'lorem-ipsum';
import { styled } from '@mui/material/styles';
import Collapse from '@mui/material/Collapse';
import './App.css'


const obtenerPerro = async () => {
  const url = "https://dog.ceo/api/breeds/image/random";
  const res = await fetch(url);
  return res.json();
};

const generarNombre = (num) => {
  const caracter = "ABCDEFGHIJKLMNOPQRSTXYZabcdefghijklmnopqrstuvwxyz";
  let nombre =" ";
  const caracterLargo = caracter.length;
  for( let i = 0; i< num; i++){
    nombre += caracter.charAt(Math.floor(Math.random()* caracterLargo));
  }
  return nombre;

};

const styles = {
  paperContainer: {
      height: 1356,
      backgroundImage: `url(${"../public/Fondo.jpg"})`
  }
 };

 const lorem = new LoremIpsum({
  sentencesPerParagraph: {
    max: 4,
    min: 3
  },
  wordsPerSentence: {
    max: 8,
    min: 3
  }
});

const Mostrar = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(0deg)',
}));





function App() {
  const [perro, setPerro] = useState ([{ nombre: "", imagen: "", descripcion: ""}]);
  const [cargar, setCargar] = useState(true);
  const [aceptar, setAceptar]= useState ([]);
  const [rechazar, setRechazar] = useState ([]);
  const [desc, setDesc] = useState(false)



  const expandir = () => {
    setDesc(!desc);
  };

  useEffect(() => {
    obtenerPerro().then((data) => {
      setPerro({
        nombre: generarNombre(6),
        imagen: data.message,
        descripcion: lorem.generateParagraphs(1)
      });
      setCargar(false);
    });
  }, []);

const aceptarPerro = () => {
  setCargar(true);
  setAceptar((perroAnterior) => [perro, ...perroAnterior]);

  obtenerPerro().then((data) => {
    setPerro({
      nombre: generarNombre(6),
      imagen: data.message,
      descripcion:lorem.generateParagraphs(1)
    });
    setCargar(false);
  });
};

const rechazarPerro = () => {
  setCargar(true);
  setRechazar((perroAnterior) => [perro, ...perroAnterior]);

  obtenerPerro().then((data) => {
  setPerro({
    nombre: generarNombre (6),
    imagen: data.message,
    descripcion: lorem.generateParagraphs(1)
  });
  setCargar(false);
  })

}

const cambiarAceptar= (perro) => {
  const newAceptar = rechazar.filter((perro2) => perro2.nombre!== perro.nombre);
  setRechazar(newAceptar);
  setAceptar((previo) => [perro, ...previo]);
  setCargar(false);
};

const cambiarRechazar = (perro) => {
  const newRechazar = aceptar.filter((perro2) => perro2.nombre !== perro.nombre);
  setAceptar(newRechazar);
  setRechazar((previo) => [perro, ...previo]);
  setCargar(false);
};




  return (
    <Grid container spacing={10}  style={styles.paperContainer}>
      

      <Grid item xs={12} md={4} >

        {cargar ? (
          <Card>
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                <CircularProgress />
              </Typography>
            </CardContent>
            <CardActions>
              <Tooltip title="Aceptar">
                <span>
                  <IconButton
                    disabled={cargar}
                    color="success"
                    onClick={aceptarPerro}
                  >
                    <AddReactionIcon />
                  </IconButton>
                </span>
              </Tooltip>
              <Tooltip title="Rechazar">
                <span>
                  <IconButton
                    disabled={cargar}
                    color="error"
                    onClick={rechazarPerro}
                  >
                    <HighlightOffIcon />
                  </IconButton>
                </span>
              </Tooltip>
            </CardActions>
          </Card>
        ) : (
          <Card >
            <CardMedia
              component="img"
              height="300"
              width={"100%"}
              image={perro.imagen}
              alt="nuevo_perro"
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                {perro.nombre}
              </Typography>
              <Typography variant="h6" align="justify" color="text.secondary">
                    {perro.descripcion}
                </Typography>
            </CardContent>
            <CardActions>
              <Tooltip title="Aceptar">
                <span>
                  <IconButton color="success" onClick={aceptarPerro}>
                    <AddReactionIcon />
                  </IconButton>
                </span>
              </Tooltip>
              <Tooltip title="Rechazar">
                <span>
                  <IconButton color="error" onClick={rechazarPerro}>
                    <HighlightOffIcon />
                  </IconButton>
                </span>
              </Tooltip>
            </CardActions>
          </Card>
        )}
      </Grid>


     
      <Grid item xs={6} md={4}  sx={{overflowY: "scroll", height: '800px' }} justifyContent="space-between">
      <h2
      style={{
      backdropFilter: "blur(1px)",
      backgroundColor: "rgba(255, 255, 255, 0.5)",
      padding: "10px",
      borderRadius: "2px",
      textAlign: "center",
      position: "absolute",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      
      }}
    >
     Aceptados
    </h2>
        <br />
        {aceptar.map((aceptado) => (
          <Card
            key={aceptado.nombre}
            sx={{
              backgroundColor: "lightblue",
              boxShadow: 1,
              borderRadius: 2,
              p: 2,
              minWidth: 100,
              margin: 1,
              
            }}
          >
            <CardMedia
              component="img"
              height="300"
              image={aceptado.imagen}
              alt={aceptado.nombre}
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                {aceptado.nombre}
              </Typography>
              <CardActions>
                <Tooltip title="Cambiar">
                  <span>
                    <IconButton
                      disabled={cargar}
                      color="info"
                      onClick={() => cambiarRechazar(aceptado)}
                    >
                      <HeartBrokenIcon />
                    </IconButton>
                  </span>
                </Tooltip>
                <Mostrar
                    expand={desc}
                    onClick={expandir}
                  >
                <h5>info</h5>
                  </Mostrar>
                  <Collapse in={desc} >
                    <CardContent>
                      <h3> Descripcion:</h3>
                      <Typography paragraph>
                        {aceptado.descripcion}
                      </Typography>
                    </CardContent>
                  </Collapse>
              </CardActions>
            </CardContent>
          </Card>
        ))}
      </Grid>
   
      
      <Grid item xs={6} md={4}  sx={{overflowY: "scroll", height: '800px'  }} justifyContent="space-between">
      <h2
      style={{
      backdropFilter: "blur(1px)",
      backgroundColor: "rgba(255, 255, 255, 0.5)",
      padding: "10px",
      borderRadius: "2px",
      textAlign: "center",
      position: "absolute",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      
      }}
    >
      Rechazados 
      </h2>
        <br />
        {rechazar.map((rechazado) => (
          <Card
            key={rechazado.nombre}
            sx={{
              backgroundColor: "pink",
              boxShadow: 1,
              borderRadius: 2,
              p: 2,
              minWidth: 100,
              margin: 1 
            }}
          >
            <CardMedia
              component="img"
              height="300"
              width="100%"
              image={rechazado.imagen}
              alt={rechazado.nombre}
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                {rechazado.nombre}
              </Typography>
              <CardActions>
                <Tooltip title="Cambiar">
                  <span>
                    <IconButton
                      disabled={cargar}
                      color="info"
                      onClick={() => cambiarAceptar(rechazado)}
                    >
                      <FavoriteIcon />
                    </IconButton>
                  </span>
                </Tooltip>
                <Mostrar
                    expand={desc}
                    onClick={expandir}
                  >
                  <h5>info</h5>
                  </Mostrar>
                  <Collapse in={desc} >
                    <CardContent>
                      <h3> Descripcion:</h3>
                      <Typography paragraph>
                        {rechazado.descripcion}
                      </Typography>
                    </CardContent>
                  </Collapse>
              </CardActions>
            </CardContent>
          </Card>
        ))}
      </Grid>
    </Grid>
  );
}


export default App;
