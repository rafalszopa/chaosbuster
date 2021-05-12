import Moon from 'moon';

const { div, h2 } = Moon.view.m;

const noBoards = () =>
    <h2>No boards :-(</h2>;

const board = () =>
    <h2 @click=click>Board</h2>;

export default ({ data }) =>
    <div>
        <(
            data.boards.length ?
                <board />  :
                <noBoards />
        )*>
    </div>;

const click = ({data}) => console.log(data);