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
            <Route path='/' element={auth ? <Home /> : <Navigate to="/login" />} />
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
