import {getQueryString, $} from './utils.js'
import {getAllCards} from './card.js'

// alert(decodeURI(getQueryString().name))

const timeDisplay=$('.wave-text')[0];

let tid;
let active=-1;

const cards=getAllCards();
const cardObjects=$('.card');
const stack=$('.stack-container')[0];
let calcStack=[];

const clickHandler=(e)=>{
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
}

$('.card-container')[0].addEventListener('click',clickHandler);



const popStack= async()=>{
    const stacks=$('.stack')
    if(!stacks.length)return;
    let idx=stacks.length-1;
    let t;
    t=await setInterval(()=>{
        stacks[idx].style.backgroundColor="gray";
        stacks[idx].style.color="#2dc14f";
        stacks[idx].innerText=`+${+stacks[idx].value}`;
        calcStack.push(parseInt(stacks[idx].value));
        idx--;
        if(idx<0){
            clearInterval(t);
            const summ=calcStack.reduce((acc,v)=>{
                return acc+v;
            },0)
            console.log(summ)
        }
        
    },1000)
}

tid=setInterval(async ()=>{
    +timeDisplay.innerText--;
    if(+timeDisplay.innerText<=0){
        const container=$('.card-container')[0]
        container.removeEventListener('click',clickHandler,false)
        container.style.opacity="0.2"
        clearInterval(tid);
        await popStack();
    }
},1000)

const showScore=()=>{
    
}