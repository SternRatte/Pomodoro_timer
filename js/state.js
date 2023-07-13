let timeList
const getTime = () => {
    if (localStorage.getItem("time") === null) {
        localStorage.setItem('time', JSON.stringify([25,5,15,4]));
    }
    timeList = JSON.parse(localStorage.getItem('time'));
}

getTime();
export const state = {
    timeLeft: timeList[0] * 60,
    isActive: false,
    timerId: 0,
    pomodoro:timeList[0],
    shortBreak: timeList[1],
    longBreak: timeList[2],
    status: 'pomodoro',
    count: timeList[3],
}