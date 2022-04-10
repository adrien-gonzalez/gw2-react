import './App.css';
import React, { /*useState,*/ useEffect } from 'react';
import {Alert, Button} from '@mui/material';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import AccessTimeOutlinedIcon from '@mui/icons-material/AccessTimeOutlined';
import $ from 'jquery';

import ChamanedeSvanir from './img/bosses/Chamane de Svanir.png';
import Drakkar from './img/bosses/Drakkar.png';
import Béhémotdesombres from './img/bosses/Béhémoth des ombres.png';
import Élémentairedefeu from './img/bosses/Élémentaire de feu.png';
import TaidhaCovington from './img/bosses/Taidha Covington.png';
import LeDestructeur from './img/bosses/Le Destructeur.png';
import Mégadestructeur from './img/bosses/Mégadestructeur.png';
import Guivredelajungle from './img/bosses/Guivre de la jungle.png';
import UlgothleModniir from './img/bosses/Ulgoth le Modniir.png';
import TequatlleSanssoleil from './img/bosses/Tequatl le Sans-soleil.png';
import GriffedeJormag from './img/bosses/Griffe de Jormag.png';
import Tripleterreur from './img/bosses/Triple terreur.png';
import Reinekarka from './img/bosses/Reine karka.png';
import GolemMarqueII from './img/bosses/Golem Marque II.png';

import background from './img/background/background.png';











const App = () => {





// const [account, setAccount] = useState([]);

// const fetchAccount = async () => {
  // try {
  //   const data = await getAccount();
  //   // setAccount(data.id)


  // } catch (error) {
  //   console.log(error);
  // }
// };

function BossTimer() {
  var self = this;

  // List of events (UTC)
  self.events = {
      "Drakkar": { repeat: { start: [1, 5], interval: 2 } },
      "Taidha Covington": { repeat: { start: [0, 0], interval: 3 } },
      "Chamane de Svanir": { repeat: { start: [0, 15], interval: 2 } },
      "Mégadestructeur": { repeat: { start: [0, 30], interval: 3 } },
      "Élémentaire de feu": { repeat: { start: [0, 45], interval: 2 } },
      "Le Destructeur": { repeat: { start: [1, 0], interval: 3 } },
      "Guivre de la jungle": { repeat: { start: [1, 15], interval: 2 } },
      "Ulgoth le Modniir": { repeat: { start: [1, 30], interval: 3 } },
      "Béhémoth des ombres": { repeat: { start: [1, 45], interval: 2 } },
      "Élémentaire de feu": { repeat: { start: [2, 45], interval: 2 } },
      "Tequatl le Sans-soleil": { fixed: [[23, 55], [2, 55], [6, 55], [11, 25], [15, 55], [18, 55]] },
      "Griffe de Jormag": { repeat: { start: [2, 30], interval: 3 } },
      "Triple terreur": { fixed: [[0, 55], [3, 55], [7, 55], [12, 25], [16, 55], [19, 55]] },
      "Reine karka": { fixed: [[1, 55], [5, 55], [10, 25], [14, 55], [17, 55], [22, 55]] },
      "Golem Marque II": { repeat: { start: [2, 0], interval: 3 } },
  }

  // Generate schedule
  self.schedule = [];
  Object.keys(self.events).forEach(function (key, index) {

      // Events that repeats every X hours
      if (self.events[key].repeat !== undefined) {
          var event = self.events[key].repeat.start;
          while (event[0] < 24) {
              self.schedule.push([(event[0] * 60) + event[1], key]);
              event[0] += self.events[key].repeat.interval;
          }
      }

      // // Fixed events
      if (self.events[key].fixed !== undefined) {

        self.events[key].fixed.map(event =>
          self.schedule.push([(event[0]) * 60 + event[1], key])
        )
          // for (i = 0; i < self.events[key].fixed.length; i++) self.schedule.push([(self.events[key].fixed[i][0]) * 60 + self.events[key].fixed[i][1], key]);
      }
  });

  // Sort and return current events
  self.getSchedule = function (offset) {
      var now = new Date();
      var retval = [];

      self.schedule.map(sch => 
      // for (i = 0; i < self.schedule.length; i++) {
          {
            var entry = {
              key: sch[1],
              remaining: sch[0] - ((now.getUTCHours() * 60) + now.getUTCMinutes()),
              stamp: new Date(Date.UTC(now.getFullYear(), now.getMonth(), now.getDate(), Math.floor(sch[0] / 60), (sch[0] - (Math.floor(sch[0] / 60) * 60)) % 60, 0))
            };

            if (entry.remaining < offset) {
                entry.remaining += 1440;
                entry.stamp.setDate(entry.stamp.getDate() + 1);
            }
        
            retval.push(entry);
          }
      )
      // }
      return retval.sort(function (a, b) { return a.remaining - b.remaining });
  };
};

var bossTimer = new BossTimer();

function formatRemaining(remaining) {
  if (remaining < 0) remaining = 0;
  var h = Math.floor(remaining / 60);
  var m = remaining - (h * 60);
  return (("0" + h).slice(-2) + ":" + ("0" + m).slice(-2));
}


const fetchBossess = async () => {

  var current = bossTimer.getSchedule(-15);
  var htmlOutput = "";

  if(localStorage.getItem('bossesKilled') != null){
      var bossesKilled = localStorage.getItem('bossesKilled').split(',');
  } else {
      var bossesKilled = []
  }
 
        htmlOutput += "<tr class='row'><td class='bossname'>Nom du Boss</td><td class='cell timestamp'>Heure</td><td class='cell remaining'></td></tr>";


          // for (i = 0; i < current.length; i++) {
        current.map((curr, id) =>

        {
          switch (curr.key) {
            case "Béhémoth des ombres": 
              htmlOutput += "<tr class='row' id='bosse_"+id+"'><td class='cell flex-picture'><img class='bossesPicture' src='"+Béhémotdesombres+"'>" + curr.key + "</td><td class='cell timestamp'>" + curr.stamp.toLocaleTimeString() + "</td><td class='cell remaining' id='remaining_"+id+"'>dans: " + formatRemaining(curr.remaining) + "</td></tr>"
              break;
            case "Chamane de Svanir":
              htmlOutput += "<tr class='row' id='bosse_"+id+"'><td class='cell flex-picture'><img class='bossesPicture' src='"+ChamanedeSvanir+"'>" + curr.key + "</td><td class='cell timestamp'>" + curr.stamp.toLocaleTimeString() + "</td><td class='cell remaining' id='remaining_"+id+"'>dans: " + formatRemaining(curr.remaining) + "</td></tr>"
              break;
            case "Drakkar":
              htmlOutput += "<tr class='row' id='bosse_"+id+"'><td class='cell flex-picture'><img class='bossesPicture' src='"+Drakkar+"'>" + curr.key + "</td><td class='cell timestamp'>" + curr.stamp.toLocaleTimeString() + "</td><td class='cell remaining' id='remaining_"+id+"'>dans: " + formatRemaining(curr.remaining) + "</td></tr>"
              break;
            case "Élémentaire de feu":
              htmlOutput += "<tr class='row' id='bosse_"+id+"'><td class='cell flex-picture'><img class='bossesPicture' src='"+Élémentairedefeu+"'>" + curr.key + "</td><td class='cell timestamp'>" + curr.stamp.toLocaleTimeString() + "</td><td class='cell remaining' id='remaining_"+id+"'>dans: " + formatRemaining(curr.remaining) + "</td></tr>"
              break;
            case "Golem Marque II":
              htmlOutput += "<tr class='row' id='bosse_"+id+"'><td class='cell flex-picture'><img class='bossesPicture' src='"+GolemMarqueII+"'>" + curr.key + "</td><td class='cell timestamp'>" + curr.stamp.toLocaleTimeString() + "</td><td class='cell remaining' id='remaining_"+id+"'>dans: " + formatRemaining(curr.remaining) + "</td></tr>"
              break;
            case "Griffe de Jormag":
              htmlOutput += "<tr class='row' id='bosse_"+id+"'><td class='cell flex-picture'><img class='bossesPicture' src='"+GriffedeJormag+"'>" + curr.key + "</td><td class='cell timestamp'>" + curr.stamp.toLocaleTimeString() + "</td><td class='cell remaining' id='remaining_"+id+"'>dans: " + formatRemaining(curr.remaining) + "</td></tr>"
              break;
            case "Guivre de la jungle":
              htmlOutput += "<tr class='row' id='bosse_"+id+"'><td class='cell flex-picture'><img class='bossesPicture' src='"+Guivredelajungle+"'>" + curr.key + "</td><td class='cell timestamp'>" + curr.stamp.toLocaleTimeString() + "</td><td class='cell remaining' id='remaining_"+id+"'>dans: " + formatRemaining(curr.remaining) + "</td></tr>"
              break;
            case "Le Destructeur":
              htmlOutput += "<tr class='row' id='bosse_"+id+"'><td class='cell flex-picture'><img class='bossesPicture' src='"+LeDestructeur+"'>" + curr.key + "</td><td class='cell timestamp'>" + curr.stamp.toLocaleTimeString() + "</td><td class='cell remaining' id='remaining_"+id+"'>dans: " + formatRemaining(curr.remaining) + "</td></tr>"
              break;
            case "Mégadestructeur":
              htmlOutput += "<tr class='row' id='bosse_"+id+"'><td class='cell flex-picture'><img class='bossesPicture' src='"+Mégadestructeur+"'>" + curr.key + "</td><td class='cell timestamp'>" + curr.stamp.toLocaleTimeString() + "</td><td class='cell remaining' id='remaining_"+id+"'>dans: " + formatRemaining(curr.remaining) + "</td></tr>"
              break;
            case "Reine karka":
              htmlOutput += "<tr class='row' id='bosse_"+id+"'><td class='cell flex-picture'><img class='bossesPicture' src='"+Reinekarka+"'>" + curr.key + "</td><td class='cell timestamp'>" + curr.stamp.toLocaleTimeString() + "</td><td class='cell remaining' id='remaining_"+id+"'>dans: " + formatRemaining(curr.remaining) + "</td></tr>"
              break;
            case "Taidha Covington":
              htmlOutput += "<tr class='row' id='bosse_"+id+"'><td class='cell flex-picture'><img class='bossesPicture' src='"+TaidhaCovington+"'>" + curr.key + "</td><td class='cell timestamp'>" + curr.stamp.toLocaleTimeString() + "</td><td class='cell remaining' id='remaining_"+id+"'>dans: " + formatRemaining(curr.remaining) + "</td></tr>"
              break;
            case "Tequatl le Sans-solel":
              htmlOutput += "<tr class='row' id='bosse_"+id+"'><td class='cell flex-picture'><img class='bossesPicture' src='"+TequatlleSanssoleil+"'>" + curr.key + "</td><td class='cell timestamp'>" + curr.stamp.toLocaleTimeString() + "</td><td class='cell remaining' id='remaining_"+id+"'>dans: " + formatRemaining(curr.remaining) + "</td></tr>"
              break;
            case "Triple terreur":
              htmlOutput += "<tr class='row' id='bosse_"+id+"'><td class='cell flex-picture'><img class='bossesPicture' src='"+Tripleterreur+"'>" + curr.key + "</td><td class='cell timestamp'>" + curr.stamp.toLocaleTimeString() + "</td><td class='cell remaining' id='remaining_"+id+"'>dans: " + formatRemaining(curr.remaining) + "</td></tr>"
              break;
            case "Ulgoth le Modniir":
              htmlOutput += "<tr class='row' id='bosse_"+id+"'><td class='cell flex-picture'><img class='bossesPicture' src='"+UlgothleModniir+"'>" + curr.key + "</td><td class='cell timestamp'>" + curr.stamp.toLocaleTimeString() + "</td><td class='cell remaining' id='remaining_"+id+"'>dans: " + formatRemaining(curr.remaining) + "</td></tr>"
              break;
          }
        }

         // htmlOutput += "<tr class='row' id='bosse_"+id+"'><td class='cell flex-picture'><img class='bossesPicture' src='"+IMG+"'>" + curr.key + "</td><td class='cell timestamp'>" + curr.stamp.toLocaleTimeString() + "</td><td class='cell remaining' id='remaining_"+id+"'>dans: " + formatRemaining(curr.remaining) + "</td></tr>"
        )
          // }
        

        document.getElementById("output").innerHTML = htmlOutput;

        console.log(htmlOutput)
        current.map((curr2, id2) => 
        // for (i = 0; i < current.length; i++) {
            bossesKilled.map((boss, id3) => 
            // for(j = 0; j < bossesKilled.length; j++ ) {
                {
                  if(boss == curr2.key){
                      $("#bosse_"+id2).addClass("kill");
                      $("#remaining_"+id2).remove()
                      $("#bosse_"+id2).append("<td class='cell remaining' id='remaining_"+id2+"'>Fait</td>")
                  }
                  if(formatRemaining(curr2.remaining) == '00:00') {
                      $("#bosse_"+id2).addClass("inprogress");
                      $("#remaining_"+id2).remove()
                      $("#bosse_"+id2).append("<td class='cell remaining' id='remaining_"+id2+"'>En cours</td>")

                  }
                }
            // }
            )
        // }
        )
     
}

useEffect(() => {
  fetchBossess()
  setInterval(function() {
		// $("#nowtime").html(getnowtime());
		var rn = new Date();
		var rs = rn.getSeconds();
		// auto refresh table at 0 second
		if (rs == 0)fetchBossess()
	},1000);
})


  return (
    <div className="App" style={{backgroundImage: 'url('+background+')'}} >
      <header className="App-header">
        <Button className="menuButton" variant="contained"><AccessTimeOutlinedIcon style={{ color: "white" }}></AccessTimeOutlinedIcon></Button>
        <Button className="menuButton" variant="contained"><PersonOutlineOutlinedIcon style={{ color: "white" }}></PersonOutlineOutlinedIcon></Button>
        {/* {alert(account)} */}
      </header>

      <div className="worldbosses">
        <table className="table table-bordered" id="output" ></table>
      </div>
      

    </div>
  );
}

export default App;
