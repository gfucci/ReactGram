//CSS
import './Profile.css'

//Components
import Message from '../../components/Message'
import { Link } from 'react-router-dom'
import { bsFillEyerFill, BsPencilFill, BsXLg } from 'react-icons/bs'

//hooks
import { useState, useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { uploads } from '../../utils/config'

//redux
import { getUserDetails } from '../../slices/userSlice'

const Profile = () => {

  const { id } = useParams()

  const dispatch = useDispatch()

  const { user, loading } = useSelector((state) => state.user)
  const { user: userAuth } = useSelector((state) => state.auth) 

  //load user data
  useEffect(() => {

    dispatch(getUserDetails(id))

  }, [dispatch, id])

  //photo states and form refs
  const newPhotoForm = useRef()
  const editPhotoForm = useRef()

  const [title, setTitle] = useState("")
  const [image, setImage] = useState("")

  const handleSubmit = (e) => {
    e.preventDefault()
  }

  //loading state
  if (loading) {
    return <p>Carregando...</p>
  }

  return (
    <div id="profile">
      <div className="profile_header">
        {user.profileImage && (
          <img src={`${uploads}/users/${user.profileImage}`} alt={user.name} />
        )}
        <div className="profile_description">
          <h2>{user.name}</h2>
          <p>{user.bio}</p>
        </div>
      </div>
      {(id === userAuth._id) && (
        <>
          <div className='new_photo' ref={newPhotoForm}>
            <form onSubmit={handleSubmit}>
              <h3>Compartilhe algum momento seu:</h3>
              <label>
                <span>Titulo da foto:</span>
                <input 
                  type="text" 
                  placeholder='Nome da foto'
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </label>
              <label>
                <span>Imagem:</span>
                <input 
                  type="file"
                  value={image}
                  onChange={(e) => setImage(e.target.value)}
                />
              </label>
              <input type="submit" value="Postar" />
            </form>
          </div>
        </>
      )}
    </div>
  )
}

export default Profile