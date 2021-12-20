
import {Home} from './components/pages/home';
import {Login} from './components/pages/login';
import {MyAccount} from './components/pages/myAccount';
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

            <Route path="/me" element={<MyAccount/>}/>
          </Routes>
      </Router>
    </div>
  );
}

export default App;
