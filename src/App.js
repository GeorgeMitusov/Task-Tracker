import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router} from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'

import Header from './components/Header';
import Footer from './components/Footer';
import AnimatedRoutes from './components/AnimatedRoutes';
import Background from './components/Background';

import './styles/App.scss'; 

const App = () => {
  
  const [ tasks, setTasks ] = useState([]);

  const [ title, setTitle ] = useState("Task Tracker");

  const [ addForm, setAddForm ] = useState(false);

  const [ isAbout, setIsAbout ] = useState(false);

  const [ textEditMode, setTextEditMode ] = useState(false);
  
  const [ dayEditMode, setDayEditMode ] = useState(false);

  useEffect(() => {
    const getTasks = async () => {
      const tasksFromServer = await fetchTasks();
      setTasks(tasksFromServer);
    }

    getTasks()
  }, [])

  const fetchTasks = async () => {
    const res = await fetch(`http://localhost:5000/tasks`)
    const data = await res.json()

    return data;
  }
  
  const fetchTask = async id => {
    const res = await fetch(`http://localhost:5000/tasks/${id}
    `)
    const data = await res.json()

    return data;
  } 

  const OnTaskRemove = async (id) => {
    await fetch(`http://localhost:5000/tasks/${id}`, {
      method: "DELETE"
    })

    setTasks( tasks.filter( task => task.id !== id ))
  }

  const ToggleReminder = async id => {

    const taskToToggle = await fetchTask(id);
    const updTask = { ...taskToToggle, 
      reminder: !taskToToggle.reminder }
    
    const res = await fetch(`http://localhost:5000/tasks/${id}`, {
      method: "PUT",
      headers: {
        "Content-type": "application/json" 
      },
      body: JSON.stringify(updTask)
    });
  
    const data = await res.json();

    setTasks( 
      tasks.map(task => 
        task.id === id ?
        { ...task, reminder: data.reminder } :
        { ...task }
      )
    )
  } 

  const OnTaskAdd = async task => {

    const res = await fetch(`http://localhost:5000/tasks`, {
      method: "POST",
      headers: {
        "Content-type": "application/json"
      },
      body: JSON.stringify(task)
    })

    const data = await res.json();

    setTasks([ ...tasks, data ]);
  }

  const ToggleAddForm = () => {
   setAddForm(!addForm);
  }

  const ToggleAbout = () => {
    setIsAbout(!isAbout)
  }

  const TextEdit = async (id, text) => {

    const initialTask = await fetchTask(id);
    const updTask = { ...initialTask, text };

    const res = await fetch(`http://localhost:5000/tasks/${id}`, {
      method: "PUT",
      headers: {
        "Content-type": "application/json"
      },
      body: JSON.stringify(updTask)
    })

    const data = await res.json();

    setTasks(
      tasks.map( task => task.id === id ?
        { ...task, text: data.text } :
        { ...task }
      )
    );

    setTextEditMode(false);
  }

  const TextEditModeOn = () => setTextEditMode(true);

  const DayEdit = async (id, day) => {

    const initialTask = await fetchTask(id);
    const updTask = { ...initialTask, day };

    const res = await fetch(`http://localhost:5000/tasks/${id}`, {
      method: "PUT",
      headers: {
        "Content-type": "application/json"
      },
      body: JSON.stringify(updTask)
    })

    const data = await res.json();

    setTasks(
      tasks.map( task => task.id === id ?
        { ...task, day: data.day } :
        { ...task }
      )
    );

    setDayEditMode(false);
  }

  const DayEditModeOn = () => setDayEditMode(true);

  const appVariant = {
    hidden: {
      opacity: 0, scale: 0,
    }, 
    visible: {
      opacity: 1, scale: 1,
      transition: {
        duration: 2,
        type: "spring",
        damping: 10
      }
    }
  }

  const textVariant = {
    hidden: {
      opacity: 0, x: -250,
    }, 
    visible: {
      opacity: 1, x: 0,
      transition: {
        duration: 1,
        type: "spring",
        damping: 20
      }
    },
    exit: {
        opacity: 0,
        x: 250,
        transition: {
            duration: 1,
            type: "spring",
            damping: 20
        }
    }
  }

  const componentVariant = {
    hidden: {
      opacity: 0, scale: 0,
    }, 
    visible: {
      opacity: 1, scale: 1,
      transition: {
        duration: 2,
        type: "spring",
        damping: 10
      }
    },
    exit: {
      opacity: 0, scale: 0,
      transition: {
        duration: 2,
        type: "spring",
        damping: 10
      }
    }
  }

  return (
    <AnimatePresence>
      <div className='app-wrap'>
        <Router>
          <motion.div 
            className="App"
            variants={appVariant}
            initial="hidden"
            animate="visible"
          >
            <Header title={title} ToggleAddForm={ToggleAddForm} addForm={addForm} />
            <AnimatedRoutes 
              addForm={addForm}
              OnTaskAdd={OnTaskAdd}
              tasks={tasks}
              OnTaskRemove={OnTaskRemove}
              textVariant={textVariant}
              ToggleAbout={ToggleAbout}
              TextEdit={TextEdit} 
              textEditMode={textEditMode} 
              TextEditModeOn={TextEditModeOn}
              DayEdit={DayEdit} 
              dayEditMode={dayEditMode} 
              DayEditModeOn={DayEditModeOn}
              ToggleReminder={ToggleReminder}
              componentVariant={componentVariant}
            />
            { !isAbout && <Footer ToggleAbout={ToggleAbout} /> }
          </motion.div>
        </Router>
        <Background/>
      </div>
    </AnimatePresence>
  )
}

export default App;