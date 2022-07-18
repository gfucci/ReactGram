//CSS
import './Photo.css'

//api
import { uploads } from '../../utils/config'

//components
import Message from '../../components/Message'
import { Link } from 'react-router-dom'
import PhotoItem from '../../components/PhotoItem'
import LikeContainer from '../../components/LikeContainer'

//hooks
import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useResetComponentMessage } from '../../hooks/useResetComponentMessage'

//redux
import { 
    commentPhoto, 
    getPhoto, 
    likePhoto 
} from '../../slices/photoSlice'

const Photo = () => {

    const { id } = useParams()
    const dispatch = useDispatch()
    const resetMessage = useResetComponentMessage(dispatch)

    const { user } = useSelector((state) => state.auth)
    const { 
        photo, 
        loading, 
        error, 
        message
    } = useSelector((state) => state.photo)

    const [commentText, setCommentText] = useState("")

    //load photo data
    useEffect(() => {
        dispatch(getPhoto(id))
    }, [dispatch, id])

    //like
    const handleLike = () => {
        dispatch(likePhoto(photo._id))

        resetMessage()
    }

    //comments
    const handleComment = (e) => {
        e.preventDefault()

        const commentData = {
            comment: commentText,
            id: photo._id
        }

        dispatch(commentPhoto(commentData))
        setCommentText("")
        resetMessage()
    }

    //load state
    if (loading) {
        return <p>Carregando...</p>
    }

  return (
    <div id='photo'>
        <PhotoItem photo={photo} />
        <LikeContainer 
            photo={photo}
            user={user}
            handleLike={handleLike}
        />
        <div className="message_container">
            {error && <Message msg={error} type='error' />}
            {message && <Message msg={message} type='success' />}
        </div>
        <div className="comments">
            {photo.comments && (
                <>
                    <h2>Comentarios: ({photo.comments.length})</h2>
                    <form onSubmit={handleComment}>
                        <input 
                            type="text" 
                            placeholder='Insira seu comentário'
                            value={commentText || ""}
                            onChange={(e) => setCommentText(e.target.value)}
                        />
                        <input 
                            type="submit" 
                            value="Comentar" 
                        />
                    </form>
                    {photo.comments.length === 0 && <p>Não há comentários...</p> }
                    {photo.comments.map((comment) => (
                        <div className="comment">
                            <div className="author" key={comment.comment}>
                                {comment.userImage && (
                                    <img 
                                        src={`${uploads}/users/${comment.userImage}`} 
                                        alt={comment.userName} 
                                    />
                                )}
                                <Link to={`/users/${comment.userId}`}>
                                    <p>{comment.userName}</p>
                                </Link>
                            </div>
                            <p>{comment.comment}</p>
                        </div>
                    ))}
                </>
            )}
        </div>
    </div>
  )
}

export default Photo