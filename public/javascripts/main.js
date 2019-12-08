import {getQueryString, $} from './utils.js'

// alert(decodeURI(getQueryString().name))

const timeDisplay=$('.wave-text')[0]

let tid;

tid=setInterval(()=>{
    +timeDisplay.innerText--;
    if(+timeDisplay.innerText<=0){
        clearInterval(tid);
    }
},1000)