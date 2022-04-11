import './App.css';
import React, { /*useState,*/ useEffect } from 'react';
import {fetchBosses} from './js/worldsboss';
import Header from './components/header';

// Background image
import background from './img/background/background.png';



const App = () => {


// const [account, setAccount] = useState([]);



useEffect(() => {
  fetchBosses()
  setInterval(function() {
		// $("#nowtime").html(getnowtime());
		var rn = new Date();
		var rs = rn.getSeconds();
		// auto refresh table at 0 second
		if (rs == 0)fetchBosses()
	},1000);
})


  return (
    <div className="App" style={{backgroundImage: 'url('+background+')'}} >
      <Header/>
      <div className="worldbosses">
        <table className="table table-bordered" id="output" ></table>
      </div>
    </div>
  );
}

export default App;
