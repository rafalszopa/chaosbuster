import Moon from 'moon';
import colors from './colors';
import main from '../main';

const { div, input, ul, li, span } = Moon.view.m;

const onInput = () => console.log('on input');

const onClick = ({ data, view }) => {
    const color = view.target.dataset.color;
    const input = document.getElementsByClassName('color-picker__input')[0];
    const preview = document.getElementsByClassName('color-picker__preview')[0];

    input.value = color;
    preview.classList.add('color-picker__preview--picked');
    preview.style.backgroundColor = color;

    callback(color);

    // To be removed
    const dataNew = {
        ...data,
        sidebar: {
            ...data.sidebar,
            boardNew: {
                ...data.sidebar.boardNew,
                color,
            }
        }
    }

    return {
        data: dataNew,
        view: <main data=data />
    }
}

const colorView = ({ data }) => {
    // console.log(data);
    let rows = [];
    let currentRow = [];

    for (let i = 0; i < colors.length; i++) {
        currentRow.push(<span class="color-picker__item"><span @click=onClick attributes={ "data-color": colors[i] } style={ backgroundColor: colors[i] }></span></span>);

        if ((i + 1) % 7 === 0) {
            rows.push(<div class="color-picker__row" children=currentRow></div>);
            currentRow = [];
        }
    }

    return <div class="color-picker__palete" children=rows></div>;
}

let callback;

export default (data) => {
    callback = data.callback;
    // console.log(data)

    return <div class="color-picker">
        <div class="color-picker__input__wrapper">
            <input class="color-picker__input" @input=onInput placeholder="Hex color code" />
            <span class="color-picker__preview"></span>
        </div>
        <colorView data=data />
    </div>
}

