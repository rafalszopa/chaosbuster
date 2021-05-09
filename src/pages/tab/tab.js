import Moon from "moon";
import "./main.css";

Moon.use({
	data: Moon.data.driver,
	view: Moon.view.driver("#root")
});

const { h1 } = Moon.view.m;
const main = () =>
	<h1>Hello world!</h1>;

Moon.run(() => {
	const data = {
		name: "Moon"
	};

	return {
		data,
		view: <main></main>
	};
});
