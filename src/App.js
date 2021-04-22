//  IMPORTAÇÕES 

import React, { useState, useEffect } from "react";
import "./App.css";
import api from './Services/api';
import './components/Modal'
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';



// COMEÇOS DAS FUNÇÕES QUE TEM QUE SER DEFINIDAS ANTES

function rand() {
  return Math.round(Math.random() * 20) - 10;
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

function getModalStyle() {
  const top = 50 + rand();
  const left = 50 + rand();

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}


// FIM DAS FUNÇÕES QUE TEM QUE SER DEFINIDAS ANTES

export default function App() {

  const classes = useStyles();
  const [modalStyle] = React.useState(getModalStyle);
  const [tasks, setTask] = useState([]);
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };


  async function enviar() {
    const response_get = await api.post('/api/bot/register',
      {
      botName: botNome,
      botTelefone: botTelefone
    }
    )
  }

// FUNCTION PARA RECEBER DADOS DA API
async function receber() {
  const response_get = await api.get('/api/bot')
  const data = response_get.data
  setTask(data)
  console.log(data);
}

// USE EFFECT PARA RECEBER DADOS DA API

useEffect(() => {
  receber()
}, [])


// CÓDIGO QUE APARECE DENTRO DO MODEL APÓS ELE SER ABERTO PELA TAG <Modal>


const [botNome, setBotNome] = useState('');
const [botTelefone, setBotTelefone] = useState('');


  const body = (
    <div style={modalStyle} className={classes.paper}> 
      <input onChange={(texto) => setBotNome(texto.target.value)} placeholder="Digite o nome do bot" />         
        <br></br>
        <br></br> 
        
      <input onChange={(texto) => setBotTelefone(texto.target.value)} placeholder="+55999999999"/>
        <br></br>
        <br></br>    
          
      <button onClick={handleClose}> Fechar </button>  <button onClick={enviar}> Enviar BOT  </button>
       
      
       
    </div>
  );

  //  RETURN DO CÓDIGO QUE SERVE PARA ABRIR O MODEL COM INFORMAÇÕES A SEREM PREENCHIDAS

  return (
    <div>
      <button onClick={handleOpen}>Adicionar  </button>
        <Modal open={open} onClose={handleClose} aria-labelledby="simple-modal-title" aria-describedby="simple-modal-description"
        >
        {body}
      </Modal>
      <div className="App">
        <List tasks={tasks} />
      </div>
    </div>
  );
}


function List(props) {
  const { tasks } = props;

  return (
    <div className="App">
      {tasks.map((task, index) => {
        return (
          <div className="caixa" key={index}>

            <h2> {task.botName} </h2>
          </div>
        );
      })}
    </div>
  );
}

