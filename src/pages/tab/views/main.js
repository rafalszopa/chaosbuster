import Moon from 'moon';
import board from './board';
import sidebar from './sidebar';
import topbar from './topbar';

const { div, main, h1 } = Moon.view.m;

export default ({ data }) => 
    <main class="main">
        <topbar />
        <sidebar />
        <board data=data />
    </main>;
