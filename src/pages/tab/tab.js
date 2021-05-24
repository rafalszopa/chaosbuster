import Moon from "moon";
import main from "./views";
import storage from './drivers';
import "./main.css";

const { div, pre } = Moon.view.m;

Moon.use({
	storage,
	data: Moon.data.driver,
	view: Moon.view.driver("#root")
});

const init = ({ storage }) => {
	console.log(storage);

	let boards = [];
	if (storage?.boards) {
		boards = storage.boards;
	}

	const data = {
		sidebar: {},
		boards: storage?.boards ? storage.boards : [],
	};

	return {
		data,
		view: <main data=data />
	};
}

// is it possible to use this mediator pattern in order to animate and
Moon.run(() => {
	// Token get coin { get, onLoad } or { set } requests (kind of CQS?)
	const storageToken = {
		get: "boards",
		onLoad: init,
	};

	return { 
		storage: storageToken,
		view: <pre>Loading</pre>
	 };
})
