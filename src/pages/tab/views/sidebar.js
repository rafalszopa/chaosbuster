import Moon from 'moon';

const { button, div, input, ul, li, h3 } = Moon.view.m;

const search = () =>
    <div>
        <input type="text" placeholder="Search" />
    </div>

const boards = () =>
    <div>
        <div>
            <h3>Boards</h3>
            <button>Add board</button>
        </div>
        <ul>
            <li>Physic</li>
            <li>Math fundamentals</li>
            <li>Electronic</li>
            <li>.NET</li>
            <li>Java Script</li>
        </ul>
    </div>;

export default () => 
    <div class="sidebar">
        <search />
        <boards />
    </div>;
