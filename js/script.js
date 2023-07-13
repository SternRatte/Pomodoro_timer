import {initApp} from "./app.js";
import {initTasks} from "./tasks.js";
import {printModal} from "./ModalWindow.js";

const init = () => {
    initApp();
    initTasks();
    printModal();
}

init();