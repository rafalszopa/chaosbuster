import Moon from "moon";
import main from "./views";
import "./main.css";

Moon.use({
	data: Moon.data.driver,
	view: Moon.view.driver("#root")
});

Moon.run(() => {
	const data = {
		name: "Moon",
		hello: "Hello world!",
		boards: [],
	};

	return {
		data,
		view: <main data=data />
	};
});
