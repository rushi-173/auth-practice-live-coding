import "./styles.css";
import {
  BrowserRouter as Router,
  Link,
  Routes,
  Route,
  Navigate,
  useNavigate,
  useParams,
  useLocation
} from "react-router-dom";
import { useState } from "react";

const Home = () => {
  return <div>Home</div>;
};
function LoginPage(props) {
  console.log(props);
  const navigate = useNavigate();
  const params = useLocation();
  console.log(params);

  return (
    <div>
      <h1>Login</h1>
      <button
        onClick={() => {
          props.setUser((prev) => !prev);
          if (!props.user) {
            navigate(params.state.from);
          }
        }}
      >
        {props.user ? "LogOut" : "Login"}
      </button>
    </div>
  );
}
const Videos = () => {
  return <div>Videos</div>;
};
const Playlist = () => {
  return <div>Playlist</div>;
};
const PrivateRoute = ({ path, element, isLoggedIn }) => {
  if (isLoggedIn == true) {
    return element;
  } else {
    return <Navigate to="/login" state={{ from: path }} />;
  }
};
export default function App() {
  const [user, setUser] = useState(false);
  return (
    <div className="App">
      <Router>
        <h1>Hello CodeSandbox</h1>
        <Link to="/">Home</Link> &nbsp;
        <Link to="/videos">Videos</Link> &nbsp;
        <Link to="/login">Login</Link> &nbsp;
        <Link to="/playlist">Playlist</Link>
        <br />
        <br />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/videos" element={<Videos />} />
          <Route
            path="/login"
            element={<LoginPage user={user} setUser={setUser} />}
          />
          <PrivateRoute
            path="/playlist"
            element={<Playlist />}
            isLoggedIn={user}
          />
        </Routes>
      </Router>
    </div>
  );
}
