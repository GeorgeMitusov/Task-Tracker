import { useState, useEffect }  from 'react';
import { useParams, Link }  from 'react-router-dom';
import { FaArrowLeft, FaPen, FaCheck, FaPenSquare } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';

import Loader from './Loader';
import DatePicker from './DatePicker';

import '../styles/TaskDetails.scss';

const TaskDetails = ({ TextEdit, textEditMode, TextEditModeOn, 
                        DayEdit, dayEditMode, DayEditModeOn }) => { 

    const [ text, setText ] = useState("");
    const [ day, setDay ] = useState("");
    const [ loading, setLoading ] = useState(true);
    const [ task, setTask ] = useState({});

    const params = useParams();

    useEffect(() => {
        const fetchTask = async () => {
            const res = await fetch(`http://localhost:5000/tasks/${params.id}`);
            const data = await res.json();

            setTask(data);
            setLoading(false);
        }

        fetchTask();
    })

    const inputVar = {
        hidden: {
            opacity: 0, 
            scale: 0,
            y: '-50vh'
        }, 
        visible: {
            opacity: 1, scale: 1, y: 0,
            transition: {
                delay: .2,
                duration: .3,
                type: "spring",
                stiffness: 40
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

    return (
        <motion.div 
            variants={inputVar}
            initial="hidden"
            animate="visible"
            exit="exit"
        >
            { loading ? (
                <Loader/> 
            ) : (
                <AnimatePresence exitBeforeEnter>
                    <motion.div 
                        className='takeDetails'
                        variants={inputVar}
                        whileHover={{ backgroundColor: '#240090' }}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                    >
                        <div className='link-wrap'>
                            <motion.i
                                whileHover={{
                                    scale: 1.5,
                                }}
                                transition={{ duration: .7, ease: 'easeOut' }}
                                >
                                <Link to="/"> 
                                    <FaArrowLeft
                                        className='link-back'
                                        size="35px"
                                    />
                                </Link> 
                            </motion.i>
                        </div>
                        <div className='details-wrap'>
                            <div className='detail-name-wrap'>
                                { textEditMode ? (
                                    <div style={{ display: "flex"}}>
                                        <motion.div 
                                            className='input-wrap'
                                            variants={inputVar}
                                        >
                                            <motion.input 
                                                className='input'
                                                value={text}
                                                placeholder={task.text} 
                                                onChange={ e => setText(e.target.value) }
                                                onBlur={() => TextEdit(task.id, text) }
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
                                        </motion.div>
                                        <div className='btn-wrap'>
                                            <FaCheck 
                                                size="25px" 
                                                className='text-btn' 
                                                onClick={() => TextEdit(task.id, text)} 
                                            />
                                        </div>
                                    </div>
                                    ) : (
                                    <div style={{ display: "flex"}}>
                                        <div className='input-wrap'>
                                            <h3> {task.text} </h3>
                                        </div>
                                        <div className='btn-wrap'>
                                            <FaPenSquare 
                                                size="25px" 
                                                className='text-btn'
                                                onClick={TextEditModeOn}
                                            />
                                        </div>
                                    </div>
                                )}
                            </div>

                            <div className='detail-day-wrap'>
                                { dayEditMode ? (
                                    <div style={{ display: "flex"}}>
                                        <motion.div 
                                            className='input-wrap'
                                            variants={inputVar}
                                        >
                                            <DatePicker date={day} setDate={setDay}/>
                                        </motion.div>
                                        <div className='btn-wrap'>
                                            <FaCheck 
                                                size="25px" 
                                                className='day-btn'
                                                onClick={() => DayEdit(task.id, day) }
                                            />
                                        </div>
                                    </div>
                                    ) : (
                                    <div style={{ display: "flex"}}>
                                        <div className='input-wrap'>
                                            <h3> {task.day} </h3>
                                        </div>
                                        <div className='btn-wrap'>
                                            <FaPenSquare 
                                                className='day-btn' 
                                                size="25px" 
                                                onClick={DayEditModeOn}
                                            />
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </motion.div>
                </AnimatePresence>
            )}
        </motion.div>
    )
}

export default TaskDetails;