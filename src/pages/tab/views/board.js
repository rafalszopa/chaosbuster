import Moon from 'moon';

const { div, h1, h2, p, img } = Moon.view.m;

const noBoards = () =>
    <div class="board__no-content">
        <div class="board__no-content__wrapper">
            <img class="icon" src="./assets/icons/empty-white-box.svg" />
            <h1 class="board__no-content__head">No boards to display</h1>
            <p class="board__no-content__text">Currently no user defined boards are available. Create the first one and start organizing your references.</p>
        </div>
    </div>;

const board = () =>
    <h2 @click=click>Board</h2>;

export default ({ data }) =>
    <div class="board">
        <(
            data.boards.length ?
                <noBoards /> :
                <board /> 
        )*>
    </div>;

const click = ({data}) => console.log(data);