import Moon from 'moon';
import uuid from 'uuid';
import { cloneDeep } from 'lodash';
import main from '../main';
import { actionButtons } from '../shared';
import createCardView from './create-card.view';

const { div, h1, h2, p, img, input, ul, li, text, button, span } = Moon.view.m;

const noBoards = () =>
    <div class="board__no-content">
        <div class="board__no-content__wrapper">
            <img class="icon" src="./assets/icons/empty-white-box.svg" />
            <h1 class="board__no-content__head">No boards to display</h1>
            <p class="board__no-content__text">Currently no user defined boards are available. Create the first one and start organizing your references.</p>
        </div>
    </div>;

const columnComponent = (column, columnIndex, boardIndex)  => {
    return <div class="board__column">
        <createCardView columnIndex=columnIndex boardIndex=boardIndex />
        <div children=(column.cards.map((card) => <div><h2>{ card.name }</h2></div>)) />
    </div>
}

const boardView = index => ({ data }) => {
    const boardIndex = index;
    const columns = data.boards[index].columns.map((column, index) => columnComponent(column, index, boardIndex));
    
    return <div class="board__columns" children=columns />
}

const onCreateCard = (index, columnIndex) => ({ data, route }) => {
    const board = cloneDeep(data.boards[index]);
    board.columns[columnIndex].cards.push({
        id: uuid(),
        name: "test card",
        color: "",
        links: []
    });

    const dataNew = { ...data };
    dataNew.boards[index] = board;

    return {
        data: dataNew,
        storage: { action: "set", data: { boards: dataNew.boards } },
        view: <main data=dataNew route=route />
    }
}

export default ({ data, route }) => {
    const routeParts = route.split("/");
    const index = +routeParts[routeParts.length - 1];
    
    const board = data.boards[index];
    const partView = boardView(index);

    return (
        <div class="board">
            <h1>{ board?.name }</h1>
            <partView data=data />
        </div>
    );
}
