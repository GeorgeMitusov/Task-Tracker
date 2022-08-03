import { motion } from 'framer-motion'
import React from 'react'

const EmptyList = ({ textVariant }) => {

  return (
    <motion.h1
      variants={textVariant}
      initial="hidden"
      animate="visible"
      exit="exit"
    > 
      There are no available tasks here
    </motion.h1>
  )
}

export default EmptyList