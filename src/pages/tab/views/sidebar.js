import Moon from 'moon';
import main from './main';
import colorPicker from './color-picker';
import selectbox from './selectbox';
import actions from './actions';

const { a, button, div, input, ul, li, h3, span, text, small, select, option } = Moon.view.m;

let createNew = false;
let inputText = '';
let colorPicked = '';
let colorPickerOpened = false;

let createBoardPopupOpened = false;

const getInput = () => document.querySelector('.sidebar__create__input').value;
const getColor = () => colorPicked;

const onEnter = ({ data, view }) => {
    createNew = false;

    const dataNew = {
        ...data,
    }

    return {
        data,
        view: <main data=data />
    }
}

const onKeyPress = ({ data, view }) => {
    if (view.keyCode === 13) {
        createNew = false;
        data.boards.push({ name: inputText, color: 'yellow' });
        inputText = '';
        return {
            data,
            view: <main data=data />
        }
    }

    if (view.keyCode === 27) {
        createNew = false;

        return {
            view: <main data=data />
        }
    }
}

const onInput = ({ view }) => {
    inputText = view.target.value
    return {}
};

const onEscape = ({ data }) => {
    createNew = false;
    console.log('dindi')

    return {
        view: <main data=data />
    }
}

const boardsComponent = (data) => {
    const create = createNewComponent(data);
    const header = headerComponent();
    const list = listComponent(data);

    return div({
        class: "sidebar__boards",
        children: [
            create,
            header,
            list,
        ]
    })
}

const headerComponent = () => {
    const children = 
        [
            h3({
                class: "sidebar__boards__header__title",
                children: [
                    text({
                        data: "Boards"
                    })
                ]
            }),
            button({
                class: "sidebar__boards__header__create-button",
                "@click": onCreateNewClicked,
                children: [
                    text({ data: "+" })
                ]
            })
        ];

    return div({
        class: "sidebar__boards__header",
        children,
    });
}

const listComponent = data => {
    return ul({
        class: "sidebar__boards__list",
        children: data.boards.map(board => li({
            class: data.activeBoard !== board.name ? 
                "sidebar__boards__list__item" : 
                "sidebar__boards__list__item sidebar__boards__list__item--active",
                children: [
                    span({
                        class: "sidebar__boards__list__item__color-icon",
                        style: { backgroundColor: board.color }
                    }),
                    a({
                        href: "/",
                        children: [
                            text({
                            data: board.name
                        })]
                    })
                ]
        }))
    }) 
}

const searchComponent = () =>
    <div class="sidebar__search">
        <input class="sidebar__search__input" type="text" placeholder="Search" />
    </div>;

const onCreateNewClicked = ({ data }) => {
    const popup = document.getElementsByClassName('sidebar__create')[0];
    popup.classList.add('sidebar__create--opened');

    const dataNew = {
        ...data
    };

    dataNew.boards.push({
        name: getInput(),
        color: getColor(),
    })

    return {
        data: dataNew,
        view: <main data=data />
    }
};

const log = () => console.log('Hello world');

const onColorPicked = (color) => {
    colorPicked = color;
    document.getElementsByClassName('sidebar__create__color')[0].style.backgroundColor = color;
}

const onParentSelected = (item) => console.log(item);

const toggleColorPicker = () => {
    const popup = document.getElementsByClassName('sidebar__create__color-picker')[0];
    if (colorPickerOpened) {
        popup.classList.remove('sidebar__create__color-picker--opened');
    } else {
        popup.classList.add('sidebar__create__color-picker--opened');
    }

    colorPickerOpened = !colorPickerOpened;
}

const createNewComponent = ({ data }) => {
        return <div class="sidebar__create">
            <h3 class="sidebar__create__title">Creat new board</h3>
            <div class="sidebar__create__input-wrapper">
                <input class="sidebar__create__input" type="text" placeholder="Name" focus="true" />
                <span @click=toggleColorPicker class="sidebar__create__color"></span>
                <div class="sidebar__create__color-picker">
                    <colorPicker callback=onColorPicked />
                </div>
            </div>
            <actions ok=onCreateNewClicked cancel=onEscape />
        </div>;
}

export default ({ data }) => {
    const boards = boardsComponent(data);
    const search = searchComponent();

    const children = [boards, search];

    return div({
        class: "sidebar",
        children,
    });
}
