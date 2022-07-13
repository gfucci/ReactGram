//CSS
import './Auth.css'

//components
import { Link } from 'react-router-dom'

//hooks
import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from "react-redux";

//redux
import { reset, register } from '../../slices/authSlice'

const Register = () => {

  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")

  const dispatch = useDispatch() // serve para conseguir usar o redux

  const { loading, error } = useSelector((state) => state.auth)

  const handleSubmit = (e) => {
    e.preventDefault()
  
    const user = {
      name,
      email,
      password,
      confirmPassword
    }
  
    console.log(user)

    dispatch(register(user))
  }

  //clean auth states
  useEffect(() => {

    dispatch(reset())

  }, [dispatch])

  return (
    <div id='register'>
      <h2>ReactGram</h2>
      <p className="subtitle">Cadastre-se para ver as fotos de seus amigos.</p>
      <form onSubmit={handleSubmit}>
        <input 
          type="text" 
          placeholder='Nome' 
          value={name || ""} 
          onChange={(e) => setName(e.target.value)} 
        />
        <input 
          type="email" 
          placeholder='E-mail' 
          value={email || ""} 
          onChange={(e) => setEmail(e.target.value)} 
        />
        <input 
          type="password" 
          placeholder='Senha' 
          value={password || ""} 
          onChange={(e) => setPassword(e.target.value)} 
        />
        <input 
          type="password" 
          placeholder='Confirme sua senha' 
          value={confirmPassword || ""} 
          onChange={(e) => setConfirmPassword(e.target.value)} 
        />
        <input 
          type="submit" 
          value="Cadastrar" 
        />
      </form>
      <p>
        Já possuí conta? <Link to="/login">Clique Aqui</Link>
      </p>
    </div>
  )
}

export default Register