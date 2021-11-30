import { formValidation } from './formValidation';
import { postData } from '../services/requests';

function forms(formSelector, inputSelector, url) {
    const form = document.querySelector(formSelector);

    const statusMessage = {
        sending: 'Trwa wysyłanie...',
        failed: 'Wystąpił jakiś błąd! Odśwież stronę i spróbuj jeszcze raz...',
        loading: 'assets/img/form/spinner.gif',
        successfull: 'assets/img/form/success.png',
        failure: 'assets/img/form/failure.png',
    };

    if (form) {
        const inputs = [...form.querySelectorAll(inputSelector)];

        formValidation(form, inputSelector, false);

        function bindForm(form) {
            form.addEventListener('submit', (e) => {
                e.preventDefault();

                formValidation(form, inputSelector, true);

                if (inputs.every((input) => !input.classList.contains('error'))) {
                    if (!form.hasAttribute('data-modal-form')) {
                        document.documentElement.scrollTo({
                            top: window.pageYOffset + form.getBoundingClientRect().top - 200,
                            left: 0,
                            behavior: 'smooth',
                        });
                    }

                    const statusImage = document.createElement('img');
                    statusImage.classList.add('status__image');
                    statusImage.src = statusMessage.loading;

                    const statusText = document.createElement('p');
                    statusText.classList.add('status__text');
                    statusText.textContent = statusMessage.sending;

                    form.firstElementChild.style.display = 'none';

                    form.append(statusImage);
                    form.append(statusText);

                    const formData = new FormData(form);

                    if (form.hasAttribute('data-calculator')) {
                        formData.append('total', form.querySelector('input[name="total"]').value);
                    }

                    postData(url, formData)
                        .then((response) => {
                            statusImage.src = statusMessage.successfull;
                            statusText.textContent = response.message;
                        })
                        .catch((err) => {
                            statusImage.src = statusMessage.failure;
                            statusText.textContent = statusMessage.failed;
                        })
                        .finally(() => {
                            form.reset();
                            setTimeout(() => {
                                statusImage.remove();
                                statusText.remove();
                                form.firstElementChild.style.display = '';

                                if (form.hasAttribute('data-modal-form')) {
                                    document.querySelector('.modal').classList.remove('show');
                                    document.body.style.overflow = '';
                                    document.body.style.paddingRight = '0px';
                                }
                            }, 4000);
                        });
                }
            });
        }

        bindForm(form);
    }
}

export default forms;
