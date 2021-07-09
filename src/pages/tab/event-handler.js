const handlers = [];

// function ClickHandler() {

// }

// ClickHandler.prototype.add = function(element) {
//     console.log('Adding element', element);
//     handlers.push(element);
//     console.log(elements);
// }

function handle(event) {
    // console.log(event);
    if (handlers.length) {
        handlers.forEach(handler => handler(event));
    }
}

const body = document.getElementsByTagName('body')[0];
body.addEventListener('click', handle);

export default function add(handler) {
    handlers.push(handler);
}
