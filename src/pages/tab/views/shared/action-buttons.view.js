import Moon from 'moon';

const { button, div, img } = Moon.view.m;

export default ({ ok, cancel }) => {
    return <div class="actions">
        <button @click=ok class="actions__button">
            <img src="./assets/icons/tick-sign.svg" />
        </button>
        <button @click=cancel class="actions__button">
            <img src="./assets/icons/close.svg" />
        </button>
    </div>;
}
