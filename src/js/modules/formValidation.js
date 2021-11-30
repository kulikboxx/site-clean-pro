import { checkRadioInputs } from './checkRadioInputs';
import { emailValidation } from './emailValidation';
import { hideAlertError } from './hideAlertError';
import { showAlertError } from './showAlertError';
import { trimInputValue } from './trimInputValue';

function formValidation(form, inputSelector, submit = false) {
    const inputs = [...form.querySelectorAll(inputSelector)];

    const errorMessages = {
        required: 'To pole jest wymagane',
        phone: 'Wpisz 9-cyfrowy numer telefonu',
        email: 'Wpisz poprawny adres e-mail',
        select: 'Wybierz jakąś opcję z listy',
    };

    if (submit) {
        inputs.forEach((input) => {
            if (input.type === 'radio') {
                checkRadioInputs(form);
            }

            if (
                (input.type === 'text' && input.value === '') ||
                (input.type === 'tel' && input.value === '') ||
                (input.type === 'email' && input.value === '')
            ) {
                showAlertError(input, errorMessages.required);
                return;
            }

            if ((input.name === 'agreement' && !input.checked) || (input.name === 'consent' && !input.checked)) {
                showAlertError(input);
                return;
            }
        });
    } else {
        checkInputs(inputs, 'input');
    }

    function checkInputs(inputs, event) {
        inputs.forEach((input) => {
            input.addEventListener(event, () => {
                trimInputValue(input);

                if (input.type === 'radio') {
                    checkRadioInputs(form);
                }

                if (input.name === 'name') {
                    input.value = input.value.replace(/[а-яёі&\/\\#,+()$~%.'-=":*?!@<>{}\[\]\^\&\_\|']+/gi, '');
                }

                if (input.name === 'phone') {
                    input.value = input.value.replace(/\D/gi, '');
                }

                if (input.type === 'text' && input.value.length < 3) {
                    showAlertError(input, errorMessages.required);
                    return;
                }

                if (input.type === 'tel' && (input.value.length < 9 || input.value.length > 9)) {
                    showAlertError(input, errorMessages.phone);
                    return;
                }

                if (input.type === 'email' && !emailValidation(input)) {
                    showAlertError(input, errorMessages.email);
                    return;
                }

                if ((input.name === 'agreement' && !input.checked) || (input.name === 'consent' && !input.checked)) {
                    showAlertError(input);
                    return;
                }

                hideAlertError(input);
            });
        });
    }
}

export { formValidation };
