import React from 'react'
import { FaTrashAlt, FaInfoCircle } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

import "../styles/Task.scss";

const Task = ({ task, OnTaskRemove, ToggleReminder }) => {

  return (
    <motion.div 
      className={`task ${task.reminder ? "reminder" : "" }`}
      onDoubleClick={ () => ToggleReminder(task.id) }
      whileHover={{ scale: 1.05, backgroundColor: "#3500D3" }}
      transition={{ duration: .3, type: 'spring', stiffness: 50 }}
    > 
      <div className='task-left'>
        <h3> {task.text} </h3>
        <p> {task.day} </p>
      </div>
      <div className='task-right'>
        <Link to={`/task/${task.id}`}>
          <FaInfoCircle 
            size="25px"
            className='info-icon'
          />
        </Link> 
        <FaTrashAlt
          size="25px"
          className='delete-icon' 
          onClick={ () => OnTaskRemove(task.id) } 
        />
      </div>
    </motion.div>
  )
}

export default Task

