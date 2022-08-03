import React, { useState } from 'react';
import { motion } from 'framer-motion';

import '../styles/Checkbox.scss';

const Checkbox = ({ reminder, setReminder }) => {

    const [ isChecked, setIsChecked ] = useState(false);
    
    const OnCheckboxChange = e => {
        setReminder(!isChecked);
        setIsChecked(!isChecked);
    }

    const spring = {
        type: 'spring',
        stiffness: 700, 
        damping: 30
    }

    return (
        <div className='switch' data-isOn={isChecked} onClick={OnCheckboxChange}>
            <motion.div className='handle' layout transition={spring} />
        </div>
    )
}

export default Checkbox