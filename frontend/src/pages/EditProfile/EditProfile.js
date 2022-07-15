//CSS
import './EditProfile.css'

//api
import { uploads } from '../../utils/config'

//components
import Message from '../../components/Message'

//hooks
import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

//redux
import { profile, resetMessage } from "../../slices/userSlice"


const EditProfile = () => {

    //states
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [bio, setBio] = useState("")
    const [profileImage, setProfileImage] = useState("")
    const [previewImage, setPreviewImage] = useState("")

    const { user, message, error, loading } = useSelector((state) => state.user)

    const dispatch = useDispatch()

    //load user data
    useEffect(() => {
        dispatch(profile());
      }, [dispatch]);

    //fill data form
    useEffect(() => {
        if (user) {
          setName(user.name);
          setEmail(user.email);
          setBio(user.bio);
        }
      }, [user]);

    const handleSubmit = (e) => {
        e.preventDefault()
    } 

  return (
    <div id='edit_profile'>
        <h2>Edite seu Perfil</h2>
        <p className="subtitle">Adicione uma imagem de perfil, e atualize seus dados...</p>
        {/**PREVIE DA IMAGEM */}
        <form onSubmit={handleSubmit}>
            <input 
                type="text"
                placeholder="Nome"
                onChange={(e) => setName(e.target.value)}
                value={name || ""}
            />
            <input 
                type="email"
                placeholder='E-mail' 
                disabled
                value={email || ""}
            />
            <label>
                <span>Imagem de Perfil:</span>
                <input 
                    type="file" 
                />
            </label>
            <label>
                <span>Bio:</span>
                <input 
                    type="text" 
                    placeholder='Descrição do perfil'
                    value={bio || ""}
                    onChange={(e) => setBio(e.target.value)}
                />
            </label>
            <label>
                <span>Quer alterar sua senha?</span>
                <input 
                    type="password" 
                    placeholder='Digite sua nova senha'
                    value={password || ""}
                    onChange={(e) => setPassword(e.target.value)}
                />
            </label>
            <input type="submit" value="Enviar" />
            {/*{!loading && <input type="submit" value="Cadastrar" />}
            {loading && <input type="submit" disabled value="Aguarde..." />}
            {error && <Message msg={error} type="error" />}*/}
        </form>
    </div>
  )
}

export default EditProfile