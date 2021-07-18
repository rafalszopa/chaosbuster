import Moon from 'moon';
import main from './main';
import createBoard from './create-board';

const { a, button, div, input, ul, li, h3, span, text, small, select, option } = Moon.view.m;

const boardsComponent = (data) => {
    const create = viewCreate(data);
    const list = listComponent(data);
    const header = headerComponent();

    return div({
        class: "sidebar__boards",
        children: [
            header,
            create,
            list,
        ]
    })
}

const onColorPicked = (color) => {
    colorPicked = color;
    document.getElementsByClassName('sidebar__create__color')[0].style.backgroundColor = color;
}

const onCreateNewClicked = ({ data }) => {
    const popup = document.getElementsByClassName('sidebar__create')[0];
    popup.classList.add('sidebar__create--opened');
    
    const input = document.getElementsByClassName('sidebar__create__input')[0];
    input.focus();
};

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
                class: "btn-add",
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

const onBoardClicked = index => ({ data, route }) => {
    const routeNew = `/board/${index}`;

    return {
        route: routeNew,
        view: <main data=data route=routeNew />
    }
}

const listComponent = data => {
    return ul({
        class: "sidebar__boards__list",
        children: data.boards?.map((board, index) => li({
            "@click": onBoardClicked(index),
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


const onCreate = ({ data, storage }, board) => {
    const dataNew = {
        ...data,
        boards: [
            ...data.boards,
            board
        ],
    }

    const token = {
        action: "set",
        data: { boards: dataNew.boards },
    }
    
    hideCreatePopup();

    return {
        data: dataNew,
        storage: token,
        view: <main route="/" data=dataNew />
    }
}

const showCreatePopup = () => {
    const popup = document.getElementsByClassName('sidebar__create')[0];
    popup.classList.add('sidebar__create--opened');
}

const hideCreatePopup = () => {
    const popup = document.getElementsByClassName('sidebar__create')[0];
    popup.classList.remove('sidebar__create--opened');
}

const onCancel = () => {
    hideCreatePopup();
}

const viewCreate = () => <createBoard create=onCreate cancel=onCancel />;

const searchComponent = () =>
    <div class="sidebar__search">
        <input class="sidebar__search__input" type="text" placeholder="Search" />
    </div>;


export default ({ data }) => {
    const boards = boardsComponent(data);
    const search = searchComponent();

    const children = [boards, search];

    return div({
        class: "sidebar",
        children,
    });
}
