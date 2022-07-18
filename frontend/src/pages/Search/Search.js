//CSS
import './Search.css'

//hooks
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { useResetComponentMessage } from '../../hooks/useResetComponentMessage'
import { useQuery } from '../../hooks/useQuery'

//components
import { Link } from 'react-router-dom'
import PhotoItem from '../../components/PhotoItem'
import LikeContainer from '../../components/LikeContainer'

//redux
import { searchPhotos, likePhoto } from '../../slices/photoSlice'

const Search = () => {

  const query = useQuery()
  const search = query.get('q')

  const dispatch = useDispatch()
  const resetMessage = useResetComponentMessage(dispatch)

  const { user } = useSelector((state) => state.auth)
  const { photos, loading } = useSelector((state) => state.photo)

  //load search
  useEffect(() => {
    dispatch(searchPhotos(search))
  }, [dispatch, search])

  //like
  const handleLike = (photo = null) => {
    dispatch(likePhoto(photo._id))

    resetMessage()
  }

  //load state
  if (loading) {
    return <p>Carregando...</p>
  }

  return (
    <div id='search'>
      <h2>Voce está buscando por: {search}</h2>
      {photos &&
        photos.map((photo) => (
          <div key={photo._id}>
            <PhotoItem 
              photo={photo} 
            />
            <LikeContainer 
              user={user} 
              photo={photo}
              handleLike={handleLike}
            />
            <Link className='btn' to={`/photos/${photo._id}`}>
              Ver mais
            </Link>
          </div>
        ))
      }
      {photos.length === 0 &&
        <h2 className='no_search'>
          Não foram encontrados resultados.
        </h2>
      }
    </div>
  )
}

export default Search