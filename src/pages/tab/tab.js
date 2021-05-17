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
		activeBoard: "Electronics",
		boards: [
			{ name: 'Physics', color: '#BE6FE5' },
			{ name: 'Math fundamentals', color: '#9EE56F' },
			{ name: 'Electronics', color: '#E5AA6F' },
			{ name: '.NET', color: '#E56F6F' },
			{ name: 'Java Script', color: '#6FDDE5' },
		],
		sidebar: {
			
		}
	};

	return {
		data,
		view: <main data=data />
	};
});
