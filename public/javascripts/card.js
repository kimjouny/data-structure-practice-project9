import {CARD_NUM} from './const.js';

const cards=[
    {
        name:"C",
        color:"pink",
        img:"../images/c.png",
        score:100
    },
    {
        name:"JAVA",
        color:"orange",
        img:"../images/java.png",
        score:200
    }
];

export const getAllCards=()=>{
    const arr=[];
    for(let idx=0;idx<CARD_NUM;idx++){
        const cardindex=Math.floor(Math.random()*cards.length);
        arr.push(cards[cardindex])
    }
    
    return arr;
} 