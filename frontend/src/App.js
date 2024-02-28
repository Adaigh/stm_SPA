import { BrowserRouter, Route, Routes } from 'react-router-dom'

// Pages and Components
import UserHome from './pages/UserHome.js'
import NavBar from './components/NavBar.js';


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
            </Routes>
        </div>      
      </BrowserRouter>

    </div>
  );
}

export default App;
