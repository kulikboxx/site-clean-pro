function calculator(formSelector) {
    try {
        const form = document.querySelector(formSelector),
            radioInputs = form.querySelectorAll('input[type="radio"]'),
            numberInputs = form.querySelectorAll('input[type="number"]'),
            total = form.querySelector('.form__total');

        let discount = 1,
            servicePrice = 0,
            numbersPrice = 0,
            numbersValue = [0];

        function getInputsValue(inputs) {
            inputs.forEach((input, index) => {
                input.addEventListener('input', () => {
                    if (input && input.name === 'package') {
                        discount = +input.getAttribute('data-discount');
                    }

                    if (
                        input.name === 'office' ||
                        input.name === 'house' ||
                        input.name === 'apartment' ||
                        input.name === 'repair'
                    ) {
                        servicePrice = +input.getAttribute('data-price');
                    }

                    if (input.type === 'number') {
                        let result = +input.value * +input.getAttribute('data-price');

                        numbersValue.splice(index, 1, result);
                        numbersPrice = numbersValue.reduce((a, b) => a + b);
                    }

                    calculate();
                });
            });
        }

        function calculate() {
            total.value = Math.round(servicePrice + numbersPrice) + ' zł';

            if (discount === 0.9) {
                total.value = Math.round(parseInt(total.value) * 4 * discount) + ' zł';
            }

            if (discount === 0.8) {
                total.value = Math.round(parseInt(total.value) * 48 * discount) + ' zł';
            }
        }

        form.querySelector('select').addEventListener('change', () => {
            numberInputs.forEach((input) => (input.value = 0));
            servicePrice = 0;
            numbersPrice = 0;
            numbersValue = [0];
            total.value = 0 + ' zł';
        });

        getInputsValue(radioInputs);
        getInputsValue(numberInputs);
        calculate();
    } catch (e) {}
}

export default calculator;
