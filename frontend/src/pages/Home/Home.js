//CSS
import './Home.css'

//components
import LikeContainer from '../../components/LikeContainer'
import PhotoItem from '../../components/PhotoItem'
import { Link } from 'react-router-dom'

//hooks
import { useEffect } from 'react'
import { useResetComponentMessage } from '../../hooks/useResetComponentMessage'
import { useDispatch, useSelector } from 'react-redux'

//redux
import { getPhotos, likePhoto } from '../../slices/photoSlice'

const Home = () => {

  const dispatch = useDispatch()
  const resetMessage = useResetComponentMessage(dispatch)

  const { user } = useSelector((state) => state.auth)
  const { photos, loading } = useSelector((state) => state.photo)

  //loading photos
  useEffect(() => {
    dispatch(getPhotos())
  }, [dispatch])

  //like a photo
  const handleLike = (photo) => {
    dispatch(likePhoto(photo._id))

    resetMessage()
  }

  //loadind state
  if (loading) {
    return <p>Carregando...</p>
  }

  return (
    <div id='home'>
      {photos && photos.map((photo) => (
        <div key={photo._id}>
          <PhotoItem photo={photo} />
          <LikeContainer 
            photo={photo} 
            user={user} 
            handleLike={handleLike} 
          />
          <Link className='btn' to={`/photos/${photo._id}`}>Ver mais</Link>
        </div>
      ))}
      {photos.length === 0 && (
        <h2 className="no_photos">
          Não há fotos publicadas, <Link to={`/users/${user._id}`}>Clique aqui</Link>
        </h2>
        
      )}
    </div>
  )
}

export default Home