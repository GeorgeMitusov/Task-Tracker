import '../styles/Footer.scss';
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom';

const Footer = ({ ToggleAbout }) => {
  return (
    <footer>
      <h4> Copyright &copy; 2022 </h4>
      <Link to={`/about`}> 
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
          About
        </motion.p>
      </Link> 
    </footer>
  )
}

export default Footer
