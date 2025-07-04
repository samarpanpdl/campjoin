import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from 'react-router-dom';
import RegisterForm from './RegisterForm';
import LoginForm from './LoginForm';
import HomePage from './HomePage';
import axios from 'axios';

function AppWrapper() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    delete axios.defaults.headers.common['Authorization'];
    navigate('/login'); // ✅ this works now
  };

  return (
    <>
      <nav style={{ display: 'flex', gap: '1rem' }}>
        <Link to="/register">Register</Link>
        <Link to="/login">Login</Link>
        <button onClick={handleLogout}>Logout</button>
      </nav>

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/register" element={<RegisterForm />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/home" element={<HomePage />} />
      </Routes>
    </>
  );
}

// ✅ Wrap with Router only once here
function App() {
  return (
    <Router>
      <AppWrapper />
    </Router>
  );
}

export default App;
