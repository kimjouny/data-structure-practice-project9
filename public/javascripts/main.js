import {getQueryString, $} from './utils.js'
import {getAllCards} from './card.js'
// alert(decodeURI(getQueryString().name))

const timeDisplay=$('.wave-text')[0];

let tid;

const cards=getAllCards();

tid=setInterval(()=>{
    +timeDisplay.innerText--;
    if(+timeDisplay.innerText<=0){
        clearInterval(tid);
    }
},1000)