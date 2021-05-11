import Moon from 'moon';
import board from './board';
import sidebar from './sidebar';
import topbar from './topbar';

const { div, h2 } = Moon.view.m;

export default () => 
    <div>
        <topbar />
        <sidebar />
        <board />
    </div>;
