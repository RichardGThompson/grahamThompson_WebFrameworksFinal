
import {Home} from './components/pages/home';
import {Login} from './components/pages/login';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Router>
          <Routes>
            <Route exact path="/" element={<Home/>}/>

            <Route path="/login" element={<Login/>}/>
          </Routes>
      </Router>
    </div>
  );
}

export default App;
