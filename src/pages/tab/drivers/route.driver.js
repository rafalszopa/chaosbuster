let pathname = location.pathname;
let hash = '';

export default {
    input() {
        return hash;
    },
    output(routeNew) {
        hash = routeNew;
        const url = `${pathname}#${hash}`;
        
        history.pushState(null, '', url);
    }
};
