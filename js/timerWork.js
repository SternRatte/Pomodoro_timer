import {state} from "./state.js";
import {changeActiveBtn} from "./app.js";
import {defaultTask, printTasks, updateTask} from "./tasks.js";

const timeMinutes = document.querySelector('.time_minutes')
const timeSeconds = document.querySelector('.time_seconds')

const audio = new Audio('audio/bells.mp3')


const addZero = (number) =>  number < 10 ? `0${number}` : number;

export const printTime = (number) => {
    timeMinutes.textContent = addZero(Math.floor(number/ 60));
    timeSeconds.textContent = addZero(number % 60);
}

//const title = document.title
export const decreaseTime = () => {

    state.timerId = setInterval(() => {
        state.timeLeft--;
        printTime(state.timeLeft);

        if (state.timeLeft > 0 && state.isActive){
            return;
        }

        clearTimeout(state.timerId);

            if (state.status === 'pomodoro') {
                state.activeTask.pomodoro += 1;
                if (state.activeTask !== defaultTask) {
                    updateTask(state.activeTask);
                }
                //printTasks();
                if (state.activeTask.pomodoro % state.count) {
                    state.status = 'shortBreak'
                } else {
                    state.status = 'longBreak'
                }
            } else {
                state.status = 'pomodoro'
            }

            audio.play();
            state.timeLeft = state[state.status] * 60;
            changeActiveBtn(state.status);
            printTasks();
            decreaseTime();


    }, 1000)


}