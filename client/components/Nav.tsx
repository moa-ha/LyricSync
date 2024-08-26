import { Link } from 'react-router-dom'
import '../styles/nav.css'
import { useEffect, useRef, useState } from 'react'
import { useCollections } from '../hooks/useCollections'
import logo from '../styles/images/LyricSync-logo-B.png'
import { IfAuthenticated, IfNotAuthenticated } from './Authenticated'
import { useAuth0 } from '@auth0/auth0-react'
import { useAddUser } from '../hooks/useUsers'

interface Props {
  openMobile: React.Dispatch<React.SetStateAction<boolean>>
}
export default function Nav({ openMobile }: Props) {
  const [isShow, setIsShow] = useState(false)
  const { data } = useCollections()

  const { user, logout, loginWithRedirect, isAuthenticated } = useAuth0()
  const mutation = useAddUser()
  const hasRunEffect = useRef(false)

  useEffect(() => {
    if (!hasRunEffect.current && isAuthenticated && user && user.sub) {
      mutation.mutate({
        id: user.sub,
        nickname: user.nickname || '',
      })
      hasRunEffect.current = true
    }
  }, [isAuthenticated, user, mutation])

  function handleClick() {
    setIsShow(!isShow)
  }

  const handleSignOut = () => {
    logout()
  }

  const handleSignIn = () => {
    loginWithRedirect()
  }

  return (
    <nav>
      <Link to="/">
        <img src={logo} alt="logo" className="logo" />
      </Link>

      <IfAuthenticated>
        <button onClick={handleSignOut}>Sign out</button>
        {user && <p>Signed in as: {user?.nickname}</p>}
      </IfAuthenticated>
      <IfNotAuthenticated>
        <button onClick={handleSignIn}>Sign in</button>
      </IfNotAuthenticated>

      <div>
        <h2>
          <Link to="collections" onClick={() => openMobile(false)}>
            My Collections
          </Link>
        </h2>
        <button id="button" onClick={handleClick} data-testid="button">
          {isShow ? '▲' : '▼'}
        </button>
        {isShow && (
          <ul className="nav-items">
            {data?.map((collection) => (
              <li
                id={String(collection.id)}
                key={collection.id}
                className="collection-list"
                data-testid={collection.id}
              >
                <Link
                  to={`/collections/${collection.id}`}
                  onClick={() => openMobile(false)}
                >
                  {collection.name}
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>

      <div>
        <Link to="collections/new-collection" onClick={() => openMobile(false)}>
          Create a New Collection
        </Link>
      </div>
      <div className="demo-info">
        <p>Please sign in to try LyricSync!</p>
        <p>
          <strong>Demo Account:</strong>
          <br />
          Email: test@gmail.com <br />
          Password: Test001!
        </p>
      </div>
    </nav>
  )
}
