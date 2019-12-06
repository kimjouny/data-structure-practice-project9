import {$} from './utils.js'

$('.start-btn')[0].addEventListener('click',(evt)=>{
    const name=$('.name-form')[0].value;
    if(!name){
        alert('이름을 입력해주세요');
        return;
    }
    window.location.href=`/start?name=${name}`
})