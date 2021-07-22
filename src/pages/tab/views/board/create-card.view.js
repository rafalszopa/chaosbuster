import Moon from 'moon';
import uuid from 'uuid';
import { cloneDeep } from 'lodash';
import { action, actionButtons } from '../shared';
import main from '../main';

const { div, input } = Moon.view.m;

const handler = (boardIndex, columnIndex) => ({ data, route }) => {
    // To be reworked
    const name = document.querySelector(`[data-card-input='${columnIndex}']`)?.value;
    
    const board = cloneDeep(data.boards[boardIndex]);
    board.columns[columnIndex].cards.push({
        id: uuid(),
        name,
        color: "",
        links: []
    });

    const dataNew = { ...data };
    dataNew.boards[boardIndex] = board;

    return {
        data: dataNew,
        storage: { action: "set", data: { boards: dataNew.boards } },
        view: <main data=dataNew route=route />
    }
}

export default ({ boardIndex, columnIndex }) => {

    return (
        <div class="card__create">
            <div class="card__create__header">Create board</div>
            <div class="card__create__input">
                <input class="sidebar__create__input" attributes={ "data-card-input": columnIndex } type="text" placeholder="New card" />
                <actionButtons ok=(handler(boardIndex, columnIndex)) />
            </div>
        </div>
    );
}
