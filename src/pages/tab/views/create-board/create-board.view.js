import Moon from 'moon';
import colors from '../color-picker/colors';
import actions from '../actions';
import main from '../main';
import colorPicker from '../color-picker';

const { div, h3, input, span } = Moon.view.m;
let colorPickerOpened = false;
let createCallback;
let cancelCallback;

const getInput = () => document.querySelector('.sidebar__create__input').value;

const emptyInput = () => document.querySelector('.sidebar__create__input').value = "";

const toggleColorPicker = () => {
    const popup = document.getElementsByClassName('sidebar__create__color-picker')[0];
    if (colorPickerOpened) {
        popup.classList.remove('sidebar__create__color-picker--opened');
    } else {
        popup.classList.add('sidebar__create__color-picker--opened');
    }

    colorPickerOpened = !colorPickerOpened;
}

const getColor = () => {
    return document.getElementsByClassName('sidebar__create__color')[0].style.backgroundColor;
}
const setColor = (color) => {
    const popup = document.getElementsByClassName('sidebar__create__color')[0];
    popup.style.backgroundColor = color;
}

const hidePopup = () => {
    const popup = document.getElementsByClassName('sidebar__create__color-picker')[0];
    popup.classList.remove('sidebar__create__color-picker--opened');
}

const showPopup = () => {
    const popup = document.getElementsByClassName('sidebar__create__color-picker')[0];
    popup.classList.add('sidebar__create__color-picker--opened');
}

const onEscape = (data) => {
    const { view } = data;
    let output;

    if (view.keyCode === 27) {
        output = onCancel(data);
    } else if (view.keyCode === 13) {
        output = onCreate(data)
    }

    if (output) {
        return output;
    }
}

const onCreate = (data) => {
    const input = getInput();

    if (!input) {
        return;
    }

    const output = createCallback(data, { name: input, color: getColor() });
    clear();

    return output ? output : {};
}

const clear = () => {
    const input = document.querySelector('.sidebar__create__input');
    input.value = "";
    input.focus();
    hidePopup();
}

const onCancel = (data) => {
    const output = cancelCallback(data);
    clear();

    return output ? output : {};
}

export default ({ create, cancel }) => {
    createCallback = create;
    cancelCallback = cancel;

    const defaultColor = colors[0];

    return <div class="sidebar__create">
            <h3 class="sidebar__create__title">Creat new board</h3>
            <div class="sidebar__create__input-wrapper">
                <input @keydown=onEscape class="sidebar__create__input" type="text" placeholder="Name" focus="true" />
                <span style={ backgroundColor: defaultColor } @click=toggleColorPicker class="sidebar__create__color"></span>
                <div class="sidebar__create__color-picker">
                    <colorPicker callback=setColor />
                </div>
            </div>
            <actions ok=onCreate cancel=onCancel />
        </div>;
}

