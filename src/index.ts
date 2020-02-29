import { LithoHardware } from './litho';
import { Contacts } from './functions/Contacts';
import { Music } from './functions/Music';

let state;

const STEP_SIZE = 0.2;

let litho;

const $button = document.querySelector('button');
const $state = document.querySelector('.state');
const swipe = [];


const functions = [
    new Contacts(),
    new Music(),
];

document.body.onclick = async function () {
    litho = new LithoHardware();

    await litho.connect();
    console.log(`Connected`);

    litho.onStateChangeCallback = function (_state) {
        state = _state;
    }
    requestAnimationFrame(frame);

    $button.onclick = function (ev) {
        ev.preventDefault();
        ev.stopPropagation();
        litho.write([0x01, 0x1, 0x1, 0x1, 0x1]);
    }
}

let functionIndex = 0;

let touchStart = null;
let prevTouch = null;
function frame() {
    if (state) {
        if (state.touch.swipe) {
            handleSwipe(state.touch);
        }
        if (touchStart && !state.touch.isTouching) {
            touchStart = null;
        }

        if (state.touch.singleTap) {
            functions[functionIndex].onTap();
        }

        if (state.touch.isTouching) {
            if (!touchStart) {
                touchStart = Object.assign({}, state.touch);
                prevTouch = Object.assign({}, state.touch);
            }
            functions[functionIndex].onTouchDrag(prevTouch, state.touch);
            prevTouch = Object.assign({}, state.touch);
        }
    }

    $state.textContent = functions[functionIndex].render();
    requestAnimationFrame(frame);
}

const VERTICAL_DIR = ['UP', 'DOWN'];
const HORIZONTAL_DIR = ['LEFT', 'RIGHT'];

const handleSwipe = function _handleSwipe(touch) {
    if (VERTICAL_DIR.includes(touch.swipe)) {
        functions[functionIndex].onSwipe(touch.swipe);
    } else {
        const dIndex = touch.swipe === 'RIGHT' ? 1 : -1;
        functionIndex = (functionIndex + functions.length + dIndex) % functions.length;
        functions[functionIndex].onSelect();
    }
}