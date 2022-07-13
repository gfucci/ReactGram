import './Navbar.css'

//components
import { NavLink, Link } from 'react-router-dom'
import {
    BsSearch,
    BsHouseDoorFill,
    BsFillPersonFill,
    BsFillCameraFill
} from 'react-icons/bs'

//hooks
import { useAuth } from '../hooks/useAuth'

const NavBar = () => {

    const { auth, user } = useAuth

  return (
    <nav id="navbar">
        <Link to="/">ReactGram</Link>
        <form id='search_form'>
            <BsSearch />
            <input type="text" placeholder='Pesquisar'/>
        </form>
        <ul id='nav_links'>
            {auth ? (
                <>
                    <li>
                        <NavLink to="/">
                            <BsHouseDoorFill />
                        </NavLink>
                    </li>   
                    {user && (
                        <li>
                            <NavLink to={`/users/${user._id}`}>
                                <BsFillCameraFill />
                            </NavLink>
                        </li>
                    )}
                    <li>
                        <NavLink to="/profile">
                            <BsFillPersonFill />
                        </NavLink>
                    </li>
                    <li>
                        <span>Sair</span>
                    </li>
                </>
            ) : (
                <>
                    <li>
                        <NavLink to="/login">
                            Entrar
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/register">
                            Cadastrar
                        </NavLink>
                    </li>
                </>
            )}
            
        </ul>
    </nav>
  )
}

export default NavBar