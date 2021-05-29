import Moon from 'moon';
import board from './board';
import sidebar from './sidebar';
import topbar from './topbar';

const { div, main, h1 } = Moon.view.m;

const router = Moon.route.router;

const home = () => () => <h1>Home</h1>;

const routesFactory = () => ({
    "/": [home(), {}],
    "/board": [data => board(data), {}]
});

export default ({ data, route }) => {
    console.log('Data ', data)
    const routes = routesFactory();

    return (
        <main class="main">
            <topbar />
            <sidebar data=data />
            <router data=data route=route routes=routes />
        </main>
    );
}
