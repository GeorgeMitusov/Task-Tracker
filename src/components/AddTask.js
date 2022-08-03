import React, { useState } from 'react';
import { motion } from 'framer-motion'

import Checkbox from './Checkbox';
import DatePicker from './DatePicker';

import '../styles/AddTask.scss';

const AddTask = ({ OnTaskAdd }) => {

    const [ text, setText ] = useState("");
    const [ day, setDay ] = useState('');
    const [ reminder, setReminder ] = useState(false);
    const [ startDate, setStartDate ] = useState(new Date());

    const OnSubmit = e => {
        e.preventDefault();

        if ( !text || !day )
        {
            if ( !text && !day )  {
                alert("Please add task and set the day");
            } else if (!text) {
                alert("Please add task");
            } else if (!day) {
                alert("Please set the day");
            }

        }  else {
            
            OnTaskAdd({ text, day, reminder });
            
            setText("");
            setDay("");
            setReminder(false);
        }
    }

    const addFormVariant = {
        hidden: {
          opacity: 0, scale: 0,
        }, 
        visible: {
          opacity: 1, scale: 1,
          transition: {
            duration: 1,
            type: "spring",
            damping: 20
          }
        },
        exit: {
            opacity: 0,
            scale: 0,
            transition: {
                duration: 1,
                type: "spring",
                damping: 20
            }
        },
        hover: {
            backgroundColor: "#89CFF0",
            scale: 1.05
        },
        focus: {
            backgroundColor: "#1781b2",
            scale: .95, 
            // color: 'white'
        },
        transition: {
            transition: {
                duration: .5
            }
        }
    }

    const setDateTime = date => {
        setStartDate(date)

        setDay(startDate)
    }

    return (
        <motion.form 
            className="add-form" 
            onSubmit={OnSubmit}
            variants={addFormVariant}
            initial="hidden"
            animate="visible"
            exit="exit"
        >
            <div className="form-control">
                <label> Task </label>
                <motion.input 
                    type="text"
                    placeholder="Add Task"
                    value={text}
                    onChange={ e => setText(e.target.value) }
                    whileHover={{ 
                        scale: 1.025, 
                        backgroundColor: "#3500D3",
                        borderColor: "#190061",
                    }}
                    whileFocus={{ 
                        scale: .95, 
                        backgroundColor: "#240090", 
                        borderColor: "#190061",
                        color: 'white'
                    }}
                    transition={{ duration: 1, type: 'spring', damping: 10 }}
                />
            </div>
            <div className="form-control">
                <label> Day & Time </label>
                <DatePicker 
                    date={startDate} 
                    setDate={setDateTime} 
                />
            </div>
            <div className="form-control form-control-check">
                <label> Set Reminder </label>
                <Checkbox 
                    reminder={reminder}
                    setReminder={setReminder}
                />
            </div>

            <div className='add-btn-wrap'>
                <motion.input 
                    type="submit"
                    value="Save Task" 
                    className="btn btn-block" 
                    whileHover={{ 
                        scale: 1.1,
                        backgroundColor: "#240090",
                    }}
                    whileTap={{ 
                        scale: 0.9,
                        backgroundColor: "#240090",
                    }}
                    whileFocus={{ 
                        scale: 1,
                    }}
                    transition={{ 
                        duration: 1,
                        type: "spring",
                        damping: 10
                    }}
                />
            </div>
        </motion.form>
    )
}

export default AddTask;