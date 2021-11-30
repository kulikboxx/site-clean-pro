import { showAlertError } from './showAlertError';

function checkRadioInputs(form) {
    const parentEl = form.querySelector('.spaces.show'),
        inputs = [...parentEl.getElementsByTagName('input')];

    inputs.forEach((input) => {
        if (!input.checked) {
            showAlertError(input);
        }

        if (inputs.some((input) => input.checked)) {
            inputs.forEach((input) => input.classList.remove('error'));
        }
    });
}

export { checkRadioInputs };
