import React from 'react';
import { motion } from 'framer-motion';
import '../styles/Loader.scss';

const loaderVariant = {
    animationOne: {
        x: [ -20, 20 ],
        y: [ 0, -30 ],
        transition: {
            x: { 
                yoyo: Infinity,
                duration: .5
            },
            y: { 
                yoyo: Infinity,
                duration: .25
            }
        }
    }
}

const Loader = () => {
  return (
    <>
        <motion.div 
            className='loader'
            variants={loaderVariant}
            animate='animationOne'
        >

        </motion.div>
    </>
  )
}

export default Loader
