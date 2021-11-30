function hideAlertError(input) {
    input.classList.remove('error');

    try {
        if (input.type !== 'checkbox' && input.type !== 'radio') {
            input.nextElementSibling.textContent = '';
        }
    } catch (e) {}
}

export { hideAlertError };
