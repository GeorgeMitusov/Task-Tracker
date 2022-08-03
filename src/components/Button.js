import { motion } from 'framer-motion';
import '../styles/Button.scss';

const Button = ({ ToggleAddForm, text }) => {

    return (
        <motion.button 
            className='btn'
            onClick={ ToggleAddForm }
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
        >
            
            {text}
        </motion.button>
    )
} 

export default Button;