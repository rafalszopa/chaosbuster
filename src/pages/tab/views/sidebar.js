import Moon from 'moon';

const { a, button, div, input, ul, li, h3, span, text } = Moon.view.m;

const boardsComponent = (data) => {
    const header = headerComponent();
    const list = listComponent(data);

    return div({
        class: "sidebar__boards",
        children: [
            header,
            list,
        ]
    })
}

const headerComponent = () => {
    return div({
        class: "sidebar__boards__header",
        children: [
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
                children: [
                    text({ data: "+" })
                ]
            })
        ]
    })
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

export default ({ data }) => {
    const boards = boardsComponent(data);
    const search = searchComponent();

    return div({
        class: "sidebar",
        children: [
            boards,
            search
        ]
    });
}
