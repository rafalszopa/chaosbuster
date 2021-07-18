import Moon from 'moon';
import uuid from 'uuid';

import colors from '../color-picker/colors';
import { actionButtons } from '../shared';
import main from '../main';
import colorPicker from '../color-picker';
import add from '../../event-handler';

const { div, h3, input, button } = Moon.view.m;
let colorPickerOpened = false;
let createCallback;
let cancelCallback;

const getInputElement = () => document.querySelector('.sidebar__create__input'); 

const getInput = () => getInputElement().value;

const setEmptyInput = () => getInputElement().value = "";

const focusInput = () => getInputElement().focus();

const toggleColorPicker = ({ view }) => {
    view.stopPropagation();
    
    colorPickerOpened ? 
        hidePopup() :
        showPopup() ;
}

const closeColorPicker = (event) => {
    if (!colorPickerOpened) {
        return;
    }

    hidePopup();
}

const getColor = () => {
    return document.getElementsByClassName('sidebar__create__color')[0].style.backgroundColor;
}

const setColor = (color) => {
    const popup = document.getElementsByClassName('sidebar__create__color')[0];
    popup.style.backgroundColor = color;

    focusInput();
}

const onColorPicked = (color) => {
    setColor(color);
}

const hidePopup = () => {
    const popup = document.getElementsByClassName('sidebar__create__color-picker')[0];
    popup.classList.remove('sidebar__create__color-picker--opened');

    colorPickerOpened = false;
}

const showPopup = () => {
    const popup = document.getElementsByClassName('sidebar__create__color-picker')[0];
    popup.classList.add('sidebar__create__color-picker--opened');

    colorPickerOpened = true;
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

    const output = createCallback(data, { id: uuid(), name: input, color: getColor(), columns: [{ cards: [] }, { cards: [] }, { cards: [] }] });
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
    add(closeColorPicker);

    return <div class="sidebar__create">
            <h3 class="sidebar__create__title">Creat new board</h3>
            <div class="sidebar__create__input-wrapper">
                <input @keydown=onEscape class="sidebar__create__input" type="text" placeholder="Name" focus="true" />
                <button style={ backgroundColor: defaultColor } @click=toggleColorPicker class="sidebar__create__color"></button>
                <div class="sidebar__create__color-picker">
                    <colorPicker callback=setColor />
                </div>
            </div>
            <actionButtons ok=onCreate cancel=onCancel />
        </div>;
}

