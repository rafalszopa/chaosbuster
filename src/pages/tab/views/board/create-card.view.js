import Moon from 'moon';
import { action, actionButtons } from '../shared';

const { div, input } = Moon.view.m;

export default () => {
    return (
        <div class="card__create">
            <div class="card__create__header">Create board</div>
            <div class="card__create__input">
                <input class="sidebar__create__input" type="text" placeholder="New card" />
                <actionButtons />
            </div>
        </div>
    );
}
