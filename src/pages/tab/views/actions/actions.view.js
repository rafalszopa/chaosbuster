import Moon from 'moon';

const { button, div, h1, img } = Moon.view.m;

let okCallback;
let cancelCallback;

const onOk = (data) => {
    if (okCallback) {
        okCallback(data);
    }
}

const onCancel = (data) => {
    if (cancelCallback) {
        cancelCallback(data);
    }
}

export default ({ ok, cancel }) => {
    okCallback = ok;
    cancelCallback = cancel;

    return <div class="actions">
        <button @click=ok class="actions__button">
            <img src="./assets/icons/tick-sign.svg" />
        </button>
        <button @click=cancel class="actions__button">
            <img src="./assets/icons/close.svg" />
        </button>
    </div>;
}
