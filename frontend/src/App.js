import { BrowserRouter, Route, Routes } from 'react-router-dom'

// Pages and Components
import STMHome from './pages/STMHome.js'
import UserHome from './pages/UserHome.js'
import NavBar from './components/NavBar.js'
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
{/* 
      <NewCarousel>
        <div className='infopane' style={{ background: 'red', height: '200px' }}>Slide 1</div>
        <div className='infopane' style={{ background: 'blue', height: '200px' }}>Slide 2</div>
        <div className='infopane' style={{ background: 'green', height: '200px' }}>Slide 3</div>
      </NewCarousel> */}
      

    </div>
  );
}

export default App;
