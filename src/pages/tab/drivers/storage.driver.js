import { run } from "moon";

let storage;

export default {
  input() {
    return storage;
  },
  output(token) {
    if (token.action === "get") {
      chrome.storage.sync.get(token.key, function (result) {
        storage = result;
        run(token.callback);
      });
    } else if (token.action === "set") {
      chrome.storage.sync.set(token.data, function () {
        console.log("Storage saved");
      });
    }
  },
};
