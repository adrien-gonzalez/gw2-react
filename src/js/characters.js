import $ from 'jquery';
import { getCharacters, getInfoGuild } from '../services/gw2API';


// Image of craft
import Armorsmith from '../img/craft/Armorsmith.png';
import Artificer from '../img/craft/Artificer.png';
import Chef from '../img/craft/Chef.png';
import Huntsman from '../img/craft/Huntsman.png';
import Jeweler from '../img/craft/Jeweler.png';
import Leatherworker from '../img/craft/Leatherworker.png';
import Scribe from '../img/craft/Scribe.png';
import Tailor from '../img/craft/Tailor.png';
import Weaponsmith from '../img/craft/Weaponsmith.png';

// Image of character
import Elementalist from '../img/personnages/Elementalist.png';
import Guardian from '../img/personnages/Guardian.png';
import Mesmer from '../img/personnages/Mesmer.png';
import Necromancer from '../img/personnages/Necromancer.png';
import Ranger from '../img/personnages/Ranger.png';
import Revenant from '../img/personnages/Revenant.png';
import Thief from '../img/personnages/Thief.png';
import Warrior from '../img/personnages/Warrior.png';

 //All character informations
 export function characters(apiKey) {

    var self = this;

    // self.tradCraft = [
    //     {nom: 'Armorsmith', trad: "Forgeron d'armures"},
    //     {nom: 'Artificer', trad: "Artificier"},
    //     {nom: 'Chef', trad: "Chef"},
    //     {nom: 'Huntsman', trad: "Chasseur"},
    //     {nom: 'Jeweler', trad: "Bijoutier"},
    //     {nom: 'Leatherworker', trad: "Travailleur du cuir"},
    //     {nom: 'Scibe', trad: "Scribe"},
    //     {nom: 'Tailor', trad: "Tailleur"},
    //     {nom: 'Weaponsmith', trad: "Forgeron d'armes"},

    // ];

    // self.tradClass = [
    //     {nom: 'Elementalist', trad: "Élémentaliste"},
    //     {nom: 'Guardian', trad: "Gardien"},
    //     {nom: 'Mesmer', trad: "Envoûteur"},
    //     {nom: 'Necromancer', trad: "Nécromancien"},
    //     {nom: 'Ranger', trad: "Rodeur"},
    //     {nom: 'Revenant', trad: "Revenant"},
    //     {nom: 'Thief', trad: "Voleur"},
    //     {nom: 'Warrior', trad: "Guerrier"},
    // ];

    // self.tradRace = [
    //     {nom: 'Human', trad: "Humain"},
    //     {nom: 'Charr', trad: "Charr"},
    //     {nom: 'Norn', trad: "Norn"},
    //     {nom: 'Asura', trad: "Asura"},
    //     {nom: 'Sylvari', trad: "Sylvari"},

    // ]

    getCharacters(apiKey).then(data=> 
    { 
        $(".characterForm").remove()
        if(data){
            Object.keys(data).forEach(function (key, index) {
                $("#characters").append("<div class='characterForm "+data[key].profession+"' id='characterForm_"+key+"'><div class='nameAndProfession'><div class='name' id='character_"+key+"'>"+data[key].name+" - Lv. "+data[key].level+" - "+data[key].race+"</div><div>"+data[key].profession+"</div></div></div>")

                switch (data[key].profession) {
                    case "Elementalist": 
                        $("#characterForm_"+key).append("<div class='picture' id='picture"+key+"' style='background-image:url("+Elementalist+"); background-size: cover;'></div>")
                    break;
                    case "Guardian": 
                        $("#characterForm_"+key).append("<div class='picture' id='picture"+key+"' style='background-image:url("+Guardian+"); background-size: cover;'></div>")
                    break;
                    case "Mesmer": 
                        $("#characterForm_"+key).append("<div class='picture' id='picture"+key+"' style='background-image:url("+Mesmer+"); background-size: cover;'></div>")
                    break;
                    case "Necromancer": 
                        $("#characterForm_"+key).append("<div class='picture' id='picture"+key+"' style='background-image:url("+Necromancer+"); background-size: cover;'></div>")
                    break;
                    case "Ranger": 
                        $("#characterForm_"+key).append("<div class='picture' id='picture"+key+"' style='background-image:url("+Ranger+"); background-size: cover;'></div>")
                    break;
                    case "Revenant": 
                        $("#characterForm_"+key).append("<div class='picture' id='picture"+key+"' style='background-image:url("+Revenant+"); background-size: cover;'></div>")
                    break;
                    case "Thief": 
                        $("#characterForm_"+key).append("<div class='picture' id='picture"+key+"' style='background-image:url("+Thief+"); background-size: cover;'></div>")
                    break;
                    case "Warrior": 
                        $("#characterForm_"+key).append("<div class='picture' id='picture"+key+"' style='background-image:url("+Warrior+"); background-size: cover;'></div>")
                    break;
                }
                // Get infor guild
                getInfoGuild(data[key].guild, apiKey)

                // Div for Craft List
                $("#characterForm_"+key).append("<div class='craftList' id='craftList_"+key+"'></div>")
                $("#craftList_"+key).append("<div class='craftListActive crafting' id='craftListActive"+key+"'></div>")

    
                // List name of crafting and level
                Object.keys(data[key].crafting).forEach(function (key2, index2) {
                    if (data[key].crafting[key2].active === true) {
                        switch (data[key].crafting[key2].discipline) {
                            case "Artificer": 
                                $("#craftListActive"+key).append("<div class='crafting' id='crafting"+key+key2+"'><img src='"+Artificer+"'><span>"+data[key].crafting[key2].discipline+" - lv. "+data[key].crafting[key2].rating+"</span></div>")
                            break;
                            case "Armorsmith": 
                                $("#craftListActive"+key).append("<div class='crafting' id='crafting"+key+key2+"'><img src='"+Armorsmith+"'><span>"+data[key].crafting[key2].discipline+" - lv. "+data[key].crafting[key2].rating+"</span></div>")
                            break;
                            case "Chef": 
                                $("#craftListActive"+key).append("<div class='crafting' id='crafting"+key+key2+"'><img src='"+Chef+"'><span>"+data[key].crafting[key2].discipline+" - lv. "+data[key].crafting[key2].rating+"</span></div>")
                            break;
                            case "Huntsman": 
                                $("#craftListActive"+key).append("<div class='crafting' id='crafting"+key+key2+"'><img src='"+Huntsman+"'><span>"+data[key].crafting[key2].discipline+" - lv. "+data[key].crafting[key2].rating+"</span></div>")
                            break;
                            case "Jeweler": 
                                $("#craftListActive"+key).append("<div class='crafting' id='crafting"+key+key2+"'><img src='"+Jeweler+"'><span>"+data[key].crafting[key2].discipline+" - lv. "+data[key].crafting[key2].rating+"</span></div>")
                            break;
                            case "Leatherworker": 
                                $("#craftListActive"+key).append("<div class='crafting' id='crafting"+key+key2+"'><img src='"+Leatherworker+"'><span>"+data[key].crafting[key2].discipline+" - lv. "+data[key].crafting[key2].rating+"</span></div>")
                            break;
                            case "Scribe": 
                                $("#craftListActive"+key).append("<div class='crafting' id='crafting"+key+key2+"'><img src='"+Scribe+"'><span>"+data[key].crafting[key2].discipline+" - lv. "+data[key].crafting[key2].rating+"</span></div>")
                            break;
                            case "Tailor": 
                                $("#craftListActive"+key).append("<div class='crafting' id='crafting"+key+key2+"'><img src='"+Tailor+"'><span>"+data[key].crafting[key2].discipline+" - lv. "+data[key].crafting[key2].rating+"</span></div>")
                            break;
                            case "Weaponsmith": 
                                $("#craftListActive"+key).append("<div class='crafting' id='crafting"+key+key2+"'><img src='"+Weaponsmith+"'><span>"+data[key].crafting[key2].discipline+" - lv. "+data[key].crafting[key2].rating+"</span></div>")
                            break;

                        }



                        // $("#craftListActive"+key).append("<div class='crafting' id='crafting"+key+key2+"'><img src='../img/Craft/"+data[key].crafting[key2].discipline+".png'><span>"+data[key].crafting[key2].discipline+" - lv. "+data[key].crafting[key2].rating+"</span></div>")
                    }
                })
            })

            $(".loader").fadeOut()
        } else {
            alert("error")
        }
    })

}    

    
   