import { Link } from "react-router-dom"
import "../styles/error-page.css"

function ErrorPage() {
  const [loggedIn, setLoggedIn] = useState(true);

  useEffect(() => {
  axios.get(`${import.meta.env.VITE_BASE_URL}/api/auth/check`, {
    withCredentials: true
  })
  .then(() => setLoggedIn(true))
  .catch(() => setLoggedIn(false));
}, []); 

  return (
    <>
    {!loggedIn && (
      <div className="error-page">

      <div className="error-card">

        <svg
          className="error-icon"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="12" cy="12" r="10" />
          <line x1="12" y1="8" x2="12" y2="12" />
          <line x1="12" y1="16" x2="12.01" y2="16" />
        </svg>

        <h1 className="error-title">401 - Unauthorized</h1>

        <p className="error-message">
          You must login first to access this page.
        </p>

        <div className="error-buttons">
          <Link to="/" className="error-btn">
            Login
          </Link>
           
        </div>

      </div>

    </div>
    )}
    </>
  )
}

export default ErrorPage