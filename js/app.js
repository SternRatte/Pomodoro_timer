import {state} from "./state.js";
import {decreaseTime} from "./timerWork.js";
import {printTime} from "./timerWork.js";

const navBtns = document.querySelectorAll('.nav-btn')
const btnStart = document.querySelector('.btn_start')
const btnReset = document.querySelector('.btn_reset')


export const initApp = () => {

    printTime(state.timeLeft)

    btnStart.addEventListener('click', () =>{
        if (state.isActive){
            clearTimeout(state.timerId);
            state.isActive = false;
            btnStart.textContent = "Start"
        } else {
            state.isActive = true;
            btnStart.textContent = "Stop";
            decreaseTime();
        }
    })

    btnReset.addEventListener('click', () => stop())

    for (let i=0; i< navBtns.length; i++){
        navBtns[i].addEventListener('click', () => {
            changeActiveBtn(navBtns[i].dataset.use);
            state.status = navBtns[i].dataset.use;
            stop();
        })
    }

}

export const changeActiveBtn = (data) => {

    console.log(data);

    for (let i=0; i<navBtns.length; i++){
        if(navBtns[i].dataset.use === data){
            navBtns[i].classList.add('nav-active');
        } else {
            navBtns[i].classList.remove('nav-active')
        }
    }

}

export const stop = () => {
    clearTimeout(state.timerId);
    state.isActive = false;
    btnStart.textContent = 'Start';
    state.timeLeft = state[state.status] * 60;
    printTime(state.timeLeft);
}


