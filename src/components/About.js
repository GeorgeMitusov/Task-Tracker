import { Link } from 'react-router-dom';
import { motion } from 'framer-motion'

import '../styles/About.scss';

const About = ({ ToggleAbout }) => {
  
  const aboutVariant = {
    hidden: {
      opacity: 0, scale: 0,
    }, 
    visible: {
      opacity: 1, scale: 1,
      transition: {
        delay: .5,
        duration: 1,
        type: "spring",
        damping: 5
      }
    },
    exit: {
      opacity: 0, scale: 0,
    }
  }

  return (
    <motion.div 
      className="about"
      variants={aboutVariant}
    >
      <h4> Version 1.0.0 </h4>
      <Link to={`/`}> 
        <motion.p 
          onClick={ToggleAbout} 
          whileHover={{ 
            scale: 1.5,
            color: "#3500D3",
            transition: {
              duration: .5,
              ease: "easeOut"
            }
          }}
        >
          Go back
        </motion.p>
      </Link> 
    </motion.div>
  )
}

export default About
