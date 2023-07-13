import {state} from "./state.js";
import {stop} from "./app.js";

const btnModal = document.querySelector("*[data-modal-btn]");
const modal = document.querySelector("*[data-modal-window]");
const timeSet = document.querySelectorAll('.time_input_modal');
const btnSubmit = document.querySelector('.submit_btn_modal');

export const printModal = () => {
    btnModal.addEventListener('click', () => {
        modal.style.display = 'block';
        let close = modal.querySelector(".close_modal_window");
        close.addEventListener('click', () => {
            if (!isEmptyInput()) {
                modal.style.display = 'none';
            }
        })
    })

    window.onclick = (e) => {
        if (e.target.hasAttribute('data-modal-window')) {
            if (!isEmptyInput()) {
                modal.style.display = 'none';
            }
        }
    }

    SetTime();
}

const isEmptyInput = () => {
    let emptyInputs = Array.from(timeSet).filter(input => input.value === '')
    timeSet.forEach((input) => {
        if (input.value === '') {
            input.classList.add('error');
        } else{
            input.classList.remove('error');
        }
    })
    if (emptyInputs.length > 0){
        return true;
    }
    return false;
}
const getInputValues = () => {
    let valuesInput = [];
    timeSet.forEach(data => valuesInput.push(data.value));
    return valuesInput;
}
const SetTime = () => {
    btnSubmit.addEventListener('click', () => {
        if (!isEmptyInput()){
            let values = getInputValues();
            state.pomodoro = values[0];
            state.shortBreak = values[1];
            state.longBreak = values[2];
            state.count = values[3];
            localStorage.setItem('time', JSON.stringify(values));
            stop();
            modal.style.display = 'none';
        }
    })
}


