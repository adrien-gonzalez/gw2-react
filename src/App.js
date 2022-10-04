import './App.css';
import Header from './components/header';
// Background image
import background from './img/background/background.png';
import {Provider, connect } from 'react-redux';
import Store from './store/configureStore';

import Worldboss from './pages/Worldboss';
import Characters from './pages/Characters';
import Inventory from './pages/Inventory';



// Router for navigation
import {
  BrowserRouter,
  Routes, //replaces "Switch" used till v5
  Route,
  Navigate
} from "react-router-dom";

const App = (props) => {
 

  return (
    <Provider store={Store}>

      <BrowserRouter>
        <div className="App" style={{backgroundImage: 'url('+background+')'}} >
          <Header/>
          <Routes>
            <Route path="/gw2-react" element={<Navigate to="/pages/Worldboss" />} />
            <Route path="/" element={<Navigate to="/pages/Worldboss" />} />
            <Route exact path="pages/characters" element={<Characters/>}/>
            <Route exact path="pages/worldboss" element={<Worldboss/>}/>
            <Route exact path="pages/inventory" element={<Inventory/>}/>
          </Routes>
        </div>
      </BrowserRouter>
    </Provider>
    
  );
}

export default App;