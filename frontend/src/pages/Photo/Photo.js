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
import { getPhoto, likePhoto } from '../../slices/photoSlice'

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

    //load photo data
    useEffect(() => {
        dispatch(getPhoto(id))
    }, [dispatch, id])

    //coments


    //like
    const handleLike = () => {
        dispatch(likePhoto(photo._id))

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
    </div>
  )
}

export default Photo