//CSS
import './Auth.css'

//components
import Message from '../../components/Message'

//Hooks
import { Link } from 'react-router-dom'
import {useState, useEffect} from 'react'
import { useSelector, useDispatch } from 'react-redux'

//redux
import { reset, login } from '../../slices/authSlice'

const Login = () => {

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const dispatch = useDispatch()
  const { loading, error } = useSelector((state) => state.auth)

  const handleSubmit = (e) => {
    e.preventDefault()

    const user = {
      email,
      password
    }

    dispatch(login(user))
  }

  //clean all auth states
  useEffect(() => {
    dispatch(reset())
  }, [dispatch])

  return (
    <div id='login'>
      <h2>ReactGram</h2>
      <p className='subtitle'>Faça o login para ver as fotos de seus amigos.</p>
      <form onSubmit={handleSubmit}>
        <input 
          type="email" 
          placeholder='Email'
          value={email || ""}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input 
          type="password" 
          placeholder='Senha'
          value={password || ""}
          onChange={(e) => setPassword(e.target.value)}
        />
        {!loading && <input type="submit" value="Entrar" />}
        {loading && <input type="submit" disabled value="Aguarde..." />}
        {error && <Message msg={error} type="error" />}
      </form>
      <p>
        Não tem uma conta? <Link to="/register">Clique aqui</Link>
      </p>
    </div>
  )
}

export default Login