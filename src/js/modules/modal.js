import { getScrollbarWidth } from './getScrollbarWidth';

function modal(triggerSelector, activeClass) {
    function renderModal() {
        const modal = document.createElement('div');
        modal.classList.add('modal');
        modal.innerHTML = `
        <div class="modal__dialog">
            <form class="modal__form" data-modal-form>
                <div class="modal__wrapper">
                    <h2 class="modal__title">Zamów bepłatną rozmowę</h2>
                    <div class="modal__box">
                        <label>Imię i nazwisko</label>
                        <input class="modal__input" type="text" name="name" />
                        <span class="form__error"></span>
                    </div>
                    <div class="modal__box">
                        <label>Telefon</label>
                        <input class="modal__input" type="tel" name="phone" />
                        <span class="form__error"></span>
                    </div>
                    <div class="modal__box">
                        <label>Wybierz godzinę</label>
                        <select class="modal__input" name="time">
                            <option value="09:00">09:00</option>
                            <option value="09:15">09:15</option>
                            <option value="09:30">09:30</option>
                            <option value="09:45">09:45</option>
                            <option value="10:00">10:00</option>
                            <option value="10:15">10:15</option>
                            <option value="10:30">10:30</option>
                            <option value="10:45">10:45</option>
                            <option value="11:00">11:00</option>
                            <option value="11:15">11:15</option>
                            <option value="11:30">11:30</option>
                            <option value="11:45">11:45</option>
                            <option value="12:00">12:00</option>
                            <option value="12:15">12:15</option>
                            <option value="12:30">12:30</option>
                            <option value="12:45">12:45</option>
                            <option value="13:00">13:00</option>
                            <option value="13:15">13:15</option>
                            <option value="13:30">13:30</option>
                            <option value="13:45">13:45</option>
                            <option value="14:00">14:00</option>
                            <option value="14:15">14:15</option>
                            <option value="14:30">14:30</option>
                            <option value="14:45">14:45</option>
                            <option value="15:00">15:00</option>
                            <option value="15:15">15:15</option>
                            <option value="15:30">15:30</option>
                            <option value="15:45">15:45</option>
                            <option value="16:00">16:00</option>
                            <option value="16:15">16:15</option>
                            <option value="16:30">16:30</option>
                            <option value="16:45">16:45</option>
                            <option value="17:00">17:00</option>
                            <option value="17:15">17:15</option>
                            <option value="17:30">17:30</option>
                            <option value="17:45">17:45</option>
                        </select>
                    </div>
                    <div class="modal__box modal__checkbox">
                        <input class="modal__input" type="checkbox" name="consent" id="consent" value="Administratorem danych osobowych jest firma CleanPro, która przetwarza dane osobowe w celach i na zasadach określonych w Polityce prywatności. Wyrażenie zgody jest dobrowolne. Przyjmuję do wiadomości, że przysługuje mi prawo do cofnięcia zgody w dowolnym momencie bez wpływu na zgodność z prawem dotychczasowego przetwarzania.">
                        <label for="consent">Administratorem danych osobowych jest firma CleanPro, która przetwarza dane osobowe w celach i na zasadach określonych w Polityce prywatności. Wyrażenie zgody jest dobrowolne. Przyjmuję do wiadomości, że przysługuje mi prawo do cofnięcia zgody w dowolnym momencie bez wpływu na zgodność z prawem dotychczasowego przetwarzania.*</label>
                    </div>
                    <div class="modal__box modal__buttons">
                        <button class="modal__send button-submit">Wyślij</button>
                        <button class="modal__close button-submit">Zamknij</button>
                    </div>
                </div>
            </form>
        </div>
    `;

        document.body.append(modal);
    }

    renderModal();

    const modal = document.querySelector('.modal'),
        trigger = document.querySelector(triggerSelector);

    function toggleModalVisibility(modal, visibility = false) {
        if (visibility) {
            modal.classList.add(activeClass);
            document.body.style.paddingRight = getScrollbarWidth() + 'px';
            document.body.style.overflow = 'hidden';
            return;
        }

        modal.classList.remove(activeClass);
        document.body.style.paddingRight = '';
        document.body.style.overflow = '';
        document.querySelector('.modal__form').reset();
        modal.querySelectorAll('.modal__input').forEach((input) => {
            input.classList.remove('error');
            if (input.type === 'text' || input.type === 'tel') input.nextElementSibling.textContent = '';
        });
    }

    trigger.addEventListener('click', (e) => {
        if (e.target && e.target.classList.contains('fa-phone-alt')) {
            toggleModalVisibility(modal, true);
            return;
        }

        toggleModalVisibility(modal, false);
    });

    document.querySelector('.modal__close').addEventListener('click', (e) => {
        e.preventDefault();
        toggleModalVisibility(modal, false);
    });

    modal.addEventListener('click', (e) => {
        if (e.target && e.target === modal) toggleModalVisibility(modal, false);
    });

    document.addEventListener('keydown', (e) => e.key === 'Escape' && toggleModalVisibility(modal, false));
}

export default modal;
