import { motion, AnimatePresence } from 'framer-motion';
import Task from './Task'; 

const Tasks = ({ tasks, OnTaskRemove, ToggleReminder }) => {

    const taskVariant = {
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

    return (
        <>
            <AnimatePresence exitBeforeEnter={true}>
                { tasks.map(( task, index ) => (
                    <motion.div
                        key={index} 
                        variants={taskVariant}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                    >
                        <Task 
                            task={task} 
                            OnTaskRemove={OnTaskRemove} 
                            ToggleReminder={ToggleReminder}
                        />
                    </motion.div>
                ))}
            </AnimatePresence> 
        </>    
    )
}

export default Tasks;
