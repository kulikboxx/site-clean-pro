function showAlertError(input, message = '') {
    input.classList.add('error');

    if (message) {
        input.nextElementSibling.textContent = message;
    }
}

export { showAlertError };
