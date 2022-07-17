//CSS
import './PhotoItem.css'

//api
import { uploads } from '../utils/config'

//components
import { Link } from 'react-router-dom'

const PhotoItem = ({photo}) => {
  return (
    <div className='photo_item'>
        {photo.image && (
            <img 
                src={`${uploads}/photos/${photo.image}`} 
                alt={photo.title} 
            />
        )}
        <h2>{photo.title}</h2>
        <p className='photo_autor'>Postado por: <Link to={`/users/${photo.userId}`}>{photo.userName}</Link></p>
    </div>
  )
}

export default PhotoItem