function cookie() {
    const popup = document.createElement('div');
    popup.classList.add('consent__popup');
    popup.innerHTML = `
    <div class="consent__wrapper">
      <p class="consent__text">Ta strona używa ciasteczek (cookies). Szczegółowe informacje na podstronie 
        <a class="consent__link" href="polityka-prywatnosci.html">polityka prywatności</a>
      </p>
      <div class="consent__buttons">
        <a href="" class="accept button-link">Akceptuj</a>
        <a href="" class="decline button-link">Odrzuć</a>
      </div>
    </div>
  `;
    document.body.append(popup);

    const cookieStorage = {
        getItem: (key) => {
            const cookies = document.cookie
                .split(';')
                .map((cookie) => cookie.split('='))
                .reduce(
                    (acc, [key, value]) => ({
                        ...acc,
                        [key.trim()]: value,
                    }),
                    {}
                );

            return cookies[key];
        },

        setItem: (key, value) => {
            let date = new Date(new Date().getTime() + 2592000000).toUTCString();

            document.cookie = `${key}=${value};expires=${date}`;
        },
    };

    const storageType = cookieStorage;
    const consentName = 'site_consent';

    const hasConsented = () => (storageType.getItem(consentName) === 'true' ? true : false);
    const toggleStorage = (value) => storageType.setItem(consentName, value);

    if (!hasConsented()) {
        setTimeout(() => popup.classList.add('show'), 1000);
    }

    popup.querySelector('.accept').addEventListener('click', () => {
        toggleStorage(true);
        popup.classList.remove('show');
    });

    popup.querySelector('.decline').addEventListener('click', () => {
        toggleStorage(false);
        popup.classList.remove('show');
    });
}

export default cookie;
