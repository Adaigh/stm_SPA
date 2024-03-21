import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom'
import { useAuthContext } from './hooks/useAuthContext'

// Pages and Components
import STMHome from './pages/STMHome.js'
import UserHome from './pages/UserHome.js'
import NavBar from './components/NavBar.js';
import Login from './pages/Login.js';
import SelfSignup from './pages/SelfSignup.js';

function App() {

  const {user} = useAuthContext()

  return (
    <div className="App">
      
      <BrowserRouter>

      <NavBar/>
        <div className="pages">
        <Routes>
              <Route
                path="/"
                element={<STMHome />}
                />
              <Route
                path="/users"
                element={user ? <UserHome /> : <Navigate to="/login"/>}
                />
              <Route
                path="/login"
                element={!user ? <Login /> : <Navigate to="/"/>}
                />
              <Route
                path="/selfsignup"
                element={!user ? <SelfSignup /> : <Navigate to="/"/>}
                />
            </Routes>
        </div>      
      </BrowserRouter>
    </div>
  );
}

export default App;
