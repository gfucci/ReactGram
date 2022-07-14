import './EditProfile.css'

//components
import Message from '../../components/Message'

//hooks
import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

//redux


const EditProfile = () => {

    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [bio, setBio] = useState("")
    const [profileImage, setProfileImage] = useState("")

    //const { error, loading } = useSelector((state) => state.user)

    const dispatch = useDispatch()

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
                placeholder='Nome'
                value={name || ""}
                onChange={(e) => setName(e.target.value)}
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