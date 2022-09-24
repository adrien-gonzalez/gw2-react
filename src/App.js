import './App.css';
import Header from './components/header';
// Background image
import background from './img/background/background.png';
import {Provider, connect } from 'react-redux';
import Store from './store/configureStore';

import Worldboss from './pages/Worldboss';
import Characters from './pages/Characters';


// Router for navigation
import {
  BrowserRouter,
  Routes, //replaces "Switch" used till v5
  Route,
} from "react-router-dom";

const App = (props) => {
 

  return (
    <Provider store={Store}>

      <BrowserRouter>
        <div className="App" style={{backgroundImage: 'url('+background+')'}} >
          <Header/>
          
          <Routes>
            <Route exact path="/pages" element={<Worldboss/>}/>
            <Route exact path="pages/Characters" element={<Characters/>}/>
            <Route exact path="pages/Worldboss" element={<Worldboss/>}/>
          </Routes>


        </div>
      </BrowserRouter>
    </Provider>
    
  );
}


export default App;
// export default connect(mapStateToProps, mapDispatchToProps)(App);
