import { AnimatePresence } from 'framer-motion';
import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';

import About from './About';
import AddTask from './AddTask';
import EmptyList from './EmptyList';
import TaskDetails from './TaskDetails';
import Tasks from './Tasks';

const AnimatedRoutes = ({ addForm, OnTaskAdd, tasks, OnTaskRemove,
    textVariant,ToggleAbout, TextEdit, textEditMode, TextEditModeOn,
    DayEdit, dayEditMode, DayEditModeOn, ToggleReminder, componentVariant  }) => {

    const location = useLocation();

  return (
    <AnimatePresence>
        <Routes location={location} key={location.pathname}s>
            <Route 
                path="/"
                element = { 
                <>
                    <AnimatePresence
                        initial={false}
                        exitBeforeEnter={true}
                    >
                        { addForm && <AddTask OnTaskAdd={OnTaskAdd} /> }
                    </AnimatePresence>
                    {
                        tasks.length > 0 ?
                            <Tasks 
                                tasks={ tasks } 
                                OnTaskRemove={OnTaskRemove} 
                                ToggleReminder={ToggleReminder} 
                            /> 
                        : 
                            <EmptyList textVariant={textVariant} />
                    }
                </>  
                } 
            />
            <Route 
                path="/about" 
                element={
                    <About 
                        ToggleAbout={ToggleAbout}
                        componentVariant={componentVariant}
                    />
                }
            />
            <Route 
                path="/task/:id"
                element={
                    <>
                        <TaskDetails 
                            TextEdit={TextEdit} 
                            textEditMode={textEditMode} 
                            TextEditModeOn={TextEditModeOn}
                            DayEdit={DayEdit} 
                            dayEditMode={dayEditMode} 
                            DayEditModeOn={DayEditModeOn}
                            componentVariant={componentVariant}
                        />
                    </>
                }
            />
        </Routes>
    </AnimatePresence>
  )
}

export default AnimatedRoutes
