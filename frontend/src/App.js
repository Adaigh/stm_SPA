import { BrowserRouter, Route, Routes } from 'react-router-dom'

// Pages and Components
import UserHome from './pages/UserHome.js'
import NavBar from './components/NavBar.js';
import Login from './pages/Login.js';
import SelfSignup from './pages/SelfSignup.js';


function App() {
  return (
    <div className="App">
      
      <BrowserRouter>

      <NavBar />
        <div className="pages">
            <Routes>
              <Route
                path="/"
                element={<UserHome />}
                />
              <Route
                path="/login"
                element={<Login />}
                />
              <Route
                path="/selfsignup"
                element={<SelfSignup />}
                />
            </Routes>
        </div>      
      </BrowserRouter>

    </div>
  );
}

export default App;
