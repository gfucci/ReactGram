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
import { useSelector, useDispatch } from 'react-redux'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

//redux
import { reset, logout } from '../slices/authSlice'

const NavBar = () => {

    const { auth } = useAuth()
    const { user } = useSelector((state) => state.auth)

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const handleLogout = () => {
        dispatch(logout())
        dispatch(reset())

        navigate("/login")
    }

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
                        <span onClick={handleLogout}>Sair</span>
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