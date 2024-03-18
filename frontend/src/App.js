import { BrowserRouter, Route, Routes } from 'react-router-dom'

// Pages and Components
import STMHome from './pages/STMHome.js'
import UserHome from './pages/UserHome.js'
import NavBar from './components/NavBar.js';
import Login from './pages/Login.js';
import SelfSignup from './pages/SelfSignup.js';
import ContactInfo from './components/ContactInfo.js';

function App() {

  

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
      <ContactInfo/>

    </div>
  );
}

export default App;
