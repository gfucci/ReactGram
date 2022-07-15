//CSS
import './App.css';

//Router
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'

//components
import NavBar from './components/Navbar';
import Footer from './components/Footer';

//hooks
import { useAuth } from './hooks/useAuth';

//pages
import Home from './pages/Home/Home';
import Register from './pages/Auth/Register';
import Login from './pages/Auth/Login';
import EditProfile from './pages/EditProfile/EditProfile';
import Profile from './pages/Profile/Profile';

function App() {

  const {loading, auth} = useAuth()

  if (loading) {
    return <p>Carregando...</p>
  }

  return (
    <div className="App">
      <BrowserRouter>
        <NavBar />
        <div className="container">
          <Routes>
            {/**ROTAS AUTENTICADAS */}
            <Route path='/' element={auth ? <Home /> : <Navigate to="/login" />} />
            <Route path='/profile' element={auth ? <EditProfile /> : <Navigate to="/login" />} />
            <Route path='/users/:id' element={auth ? <Profile /> : <Navigate to="/login" />} />
            {/**ROTAS NÃO AUTENTICADAS */}
            <Route path='/register' element={!auth ? <Register /> : <Navigate to="/" />} />
            <Route path='/login' element={!auth ? <Login /> : <Navigate to="/" />} />
          </Routes>
        </div>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
