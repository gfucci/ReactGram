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

const Search = () => {

  const query = useQuery()
  const search = query.get('q')

  const dispatch = useDispatch()
  const resetMessage = useResetComponentMessage(dispatch)

  const { user } = useSelector((state) => state.auth)
  const { photos, loading } = useSelector((state) => state.photo)

  //load search
  useEffect(() => {
    dispatch(search())
  }, [dispatch, search])

  return (
    <div>Search {search}</div>
  )
}

export default Search