import {getQueryString, $} from './utils.js'
import {getAllCards} from './card.js'
import {COLOR} from './const.js'
// alert(decodeURI(getQueryString().name))

const timeDisplay=$('.wave-text')[0];

let tid;
let active=-1;

const cards=getAllCards();
const cardObjects=$('.card');
const stack=$('.stack-container')[0];

$('.card-container')[0].addEventListener('click',(e)=>{
    if(e.target.classList[0]!=='card')return;
    switch(e.target.classList.length){
        case 1:{
            e.target.classList.toggle('lock',true);
            e.target.style.backgroundColor="gray";
            e.target.style.backgroundImage=`url(../images/lock.png)`;
            e.target.style.backgroundSize="5rem"
            e.target.style.backgroundRepeat="no-repeat"
            e.target.style.backgroundPosition="50%"
            active=-1;
            break;
        }
        case 2:{
            if(e.target.classList[1]!=='lock')return;
            if(active==-1){
                e.target.classList.toggle('lock',false);
                active=+e.target.value
                e.target.style.backgroundColor=cards[+e.target.value].color;
                e.target.style.backgroundImage=`url(${cards[+e.target.value].img})`;
                e.target.style.backgroundSize="5rem"
                e.target.style.backgroundRepeat="no-repeat"
                e.target.style.backgroundPosition="50%"
                return;
            }
            if(cards[active]===cards[+e.target.value]){
                e.target.classList.toggle('lock',false);
                e.target.style.backgroundColor=cards[+e.target.value].color;
                e.target.style.backgroundImage=`url(${cards[+e.target.value].img})`;
                e.target.style.backgroundSize="5rem"
                e.target.style.backgroundRepeat="no-repeat"
                e.target.style.backgroundPosition="50%"
                cardObjects[active].classList.add('matched')
                e.target.classList.add('matched')
                stack.innerHTML+=`
                    <li class="stack" value="${cards[active].score}" 
                    style="background-color:${cards[active].color}">
                        ${cards[active].name}
                    </li>`
                active=-1;

            }
            else{
                cardObjects[active].classList.toggle('lock',true);
                cardObjects[active].style.backgroundColor="gray";
                cardObjects[active].style.backgroundImage=`url(../images/lock.png)`;
                cardObjects[active].style.backgroundSize="5rem"
                cardObjects[active].style.backgroundRepeat="no-repeat"
                cardObjects[active].style.backgroundPosition="50%"
                active=-1;
            }
            break;
        }
    }
});

tid=setInterval(()=>{
    +timeDisplay.innerText--;
    if(+timeDisplay.innerText<=0){
        clearInterval(tid);
    }
},1000)