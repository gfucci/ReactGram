//CSS
import './Profile.css'

//Components
import Message from '../../components/Message'
import { Link } from 'react-router-dom'
import { BsFillEyeFill, BsPencilFill, BsXLg } from 'react-icons/bs'

//hooks
import { useState, useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { uploads } from '../../utils/config'

//redux
import { getUserDetails } from '../../slices/userSlice'
import { publishPhoto, resetMessage, getUserPhotos, deletePhoto, updatePhoto } from '../../slices/photoSlice'

const Profile = () => {

  const { id } = useParams()

  const dispatch = useDispatch()

  const { user, loading } = useSelector((state) => state.user)
  const { user: userAuth } = useSelector((state) => state.auth) 
  const { 
    photos, 
    loading: loadingPhoto, 
    error: errorPhoto, 
    message: messagePhoto 
  } = useSelector((state) => state.photo)

  //load user data
  useEffect(() => {

    dispatch(getUserDetails(id))
    dispatch(getUserPhotos(id))

  }, [dispatch, id])

  //photo states and form refs
  const newPhotoForm = useRef()
  const editPhotoForm = useRef()

  const [title, setTitle] = useState("")
  const [image, setImage] = useState("")

  const [editId, setEditId] = useState("")
  const [editTitle, setEditTitle] = useState("")
  const [editImage, setEditImage] = useState("")

  //change image state
  const handleFile = (e) => {

    const image = e.target.files[0]

    setImage(image)
  }

  //reset messages
  const resetComponentMessage = () => {
    setTimeout(() => {
      dispatch(resetMessage())
    }, 2000)
  }

  //publish a new photo
  const handleSubmit = (e) => {
    e.preventDefault();

    const photoData = {
      title,
      image,
    };

    // build form data
    const formData = new FormData();

    const photoFormData = Object.keys(photoData).forEach((key) =>
      formData.append(key, photoData[key])
    );

    formData.append("photo", photoFormData);

    dispatch(publishPhoto(formData));

    //reset title
    setTitle("")

    resetComponentMessage()
  }

  //edit a photo
  function hideOrShowForms() {
    newPhotoForm.current.classList.toggle("hide")
    editPhotoForm.current.classList.toggle("hide")
  }


  const handleEdit = (photo) => {
    hideOrShowForms()

    setEditId(photo._id)
    setEditImage(photo.image)
    setEditTitle(photo.title)
  }

  const handleCancelEdit = () => {
    hideOrShowForms()
  }

  const handleUpdate = (e) => {
    e.preventDefault()

    const photoData = {
      title: editTitle,
      id: editId
    }

    dispatch(updatePhoto(photoData))

    resetComponentMessage()
  }

  //delete photo
  const handleDelete = (id) => {
    
    dispatch(deletePhoto(id))
    resetComponentMessage()
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
                  value={title || ""}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </label>
              <label>
                <span>Imagem:</span>
                <input 
                  type="file"
                  onChange={handleFile}
                />
              </label>
              {!loadingPhoto && <input type="submit" value="Postar" />}
              {loadingPhoto && <input type="submit" disabled value="Aguarde..." />}
            </form>
          </div>
          <div className="edit_photo hide" ref={editPhotoForm}>
            <p>Editando:</p>
            {editImage && (
              <img src={`${uploads}/photos/${editImage}`} alt="" />
            )}
            <form onSubmit={handleUpdate}>
              <input 
                type="text" 
                value={editTitle || ""} 
                onChange={(e) => setEditTitle(e.target.value)} 
              />
              <input type="submit" value="Atualizar" />
              <button className='cancel_btn' onClick={handleCancelEdit}>
                Cancelar edição
              </button>
            </form>
          </div>
          {errorPhoto && <Message msg={errorPhoto} type="error" />}
          {messagePhoto && <Message msg={messagePhoto} type="success" />}
        </>
      )}
      <div className="user_photos">
        <h2>Fotos publicadas:</h2>
        <div className="photos_container">
          {photos &&
            photos.map((photo) => (
              <div className="photo" key={photo._id}>
                {photo.image && (
                  <img
                    src={`${uploads}/photos/${photo.image}`}
                    alt={photo.title}
                  />
                )}
                {id === userAuth._id ? (
                  <div className="actions">
                    <Link to={`/photos/${photo._id}`}>
                      <BsFillEyeFill />
                    </Link>
                    <BsPencilFill 
                      onClick={() => handleEdit(photo)}
                    />
                    <BsXLg 
                      onClick={() => handleDelete(photo._id)}
                    />
                  </div>
                ) : (
                  <Link className='btn' to={`/photos/${photo._id}`}>
                    <BsFillEyeFill />
                  </Link>
                )}
              </div>
            ))
          }
          {photos.length === 0 && <p>Não há fotos publicadas.</p>}
        </div>
      </div>
    </div>
  )
}

export default Profile