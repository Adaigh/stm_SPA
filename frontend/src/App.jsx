import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom'
import { useAuthContext } from './hooks/useAuthContext'

// Pages and Components
import STMHome from './pages/STMHome'
import CustomerHome from './pages/CustomerHome'
import NavBar from './components/ui/NavBar'
import Login from './pages/Login'
import SelfSignup from './pages/SelfSignup'
import Calendar from './pages/Calendar'
import Schedule from './pages/Schedule'
import AccountDetail from './pages/AccountDetail'
import Administration from './pages/Administration'


function App() {

  const { user } = useAuthContext()

  return (
    <div className="App">

      <BrowserRouter>

        <NavBar />
        <div className="pages">
          <Routes>
            <Route
              path="/"
              element={<STMHome />}
            />
            <Route
              path="/calendar"
              element={<Calendar />}
            />
            <Route
              path="/schedule"
              element={user && user.access > 0 ? <Schedule /> : <Navigate to="/login" />}
            />
            <Route
              path="/customers"
              element={user && user.access > 0 ? <CustomerHome /> : <Navigate to="/login" />}
            />
            <Route
              path="/admin"
              element={user && user.access > 0 ? <Administration /> : <Navigate to="/login" />}
            />
            <Route
              path="/details"
              element={user ? <AccountDetail /> : <Navigate to="/login" />}
            />
            <Route
              path="/login"
              element={!user ? <Login /> : <Navigate to="/" />}
            />
            <Route
              path="/selfsignup"
              element={!user ? <SelfSignup /> : <Navigate to="/" />}
            />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
