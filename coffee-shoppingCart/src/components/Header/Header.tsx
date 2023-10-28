import { Link } from 'react-router-dom'
import logoCoffe from '../../assets/Logo.svg'
import logoLocal from '../../assets/Icon.svg'
import logoCar from '../../assets/car.svg'
import styles from './styles.module.css'

function Header() {

    return(
        <header className={styles.headerCoffe}>
          <img src={logoCoffe} alt="logoCoffe" />
        <div className={styles.containerLocal}>
            <div className={styles.local}>
              <img src={logoLocal} alt="#" />
              <p>Porto Alegre, Rs</p>
             </div>
             <Link to="checkout">
               <img src={logoCar} alt="" />
             </Link>
        </div>
        </header>
        )
    }
    
    
    export default Header;