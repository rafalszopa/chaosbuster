import Moon from "moon";
import main from "./views";
import drivers from './drivers';
import "./main.css";

const { div, pre } = Moon.view.m;

Moon.use({
	route:		drivers.route,
	storage:	drivers.storage,
	data:		Moon.data.driver,
	view:		Moon.view.driver("#root")
});

const init = ({ storage }) => {
	const data = {
		boards: storage?.boards ? storage.boards : [],
	};

	return {
		route: "/",
		data,
		view: <main data=data route="/" />
	};
}

// is it possible to use this mediator pattern in order to animate 
Moon.run(() => {
	// Token get coin { get, onLoad } or { set } requests (kind of CQS?)
	const token = {
		action: "get",
		key: "boards",
		callback: init, 
	};

	return { 
		storage: token,
		view: <pre>Loading</pre>
	 };
})
