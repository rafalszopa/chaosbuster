import { run } from 'moon';

let storage;

export default {
    input() {
        return storage;
    },
    output(request) {
        if (request.get) {
            const key = request.get;
            const action = request.onLoad;

            chrome.storage.sync.get([key], function (result) {
                storage = result;
                run(action);

                return;
            });
        }

        chrome.storage.sync.set(request, function() {
            console.log('Storage saved');
          });
    }
}
