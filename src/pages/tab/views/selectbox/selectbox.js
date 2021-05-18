import Moon from 'moon';

const { div, ul, li } = Moon.view.m;

let callback;

const onSelected = ({ view }) => {
    const item = view.target.dataset.item;
    document.getElementsByClassName('selecbox__selected')[0].innerText = item;
    callback(view.target.dataset.item);
    return {};
}

export default ({ options, onSelectedCallback }) => {
    let selectedItem = options[0];
    callback = onSelectedCallback;

    return <div class="selectbox">
        <div class="selecbox__selected">
            { selectedItem.name }
        </div>
        <div class="selectbox__dropdown">
            <ul class="selectbox__dropdown__list" children=(options.map(option => 
                <li class="selectbox__dropdown__item" attributes={ "data-item": option.name } @click=onSelected >{ option.name }</li>)) />
        </div>
    </div>;
}
