function callback(parentSelector) {
    const callbackElement = document.createElement('div');
    callbackElement.classList.add('callback');
    callbackElement.innerHTML = `
        <button class="callback__phone">
            <i class="fas fa-phone-alt"></i>
        </button>
        <button class="callback__close">
            <i class="fas fa-times"></i>
        </button>
    `;

    document.querySelector(parentSelector).append(callbackElement);

    const toggleVisibility = () => (localStorage.getItem('visible') === 'false' ? true : false);
    const toggleStorage = (value) => localStorage.setItem('visible', value);

    if (!toggleVisibility()) {
        setTimeout(() => callbackElement.classList.add('show'), 1000);
    }

    document.querySelector('.callback__close').addEventListener('click', () => {
        callbackElement.classList.remove('show');
        toggleStorage(false);
    });
}

export default callback;
