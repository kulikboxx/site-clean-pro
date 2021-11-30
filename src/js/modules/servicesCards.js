import { getResources } from '../services/requests';

function servicesCards(parentSelector, url) {
    const parentsCards = document.querySelector(parentSelector);

    function renderCards(data, parent) {
        data.forEach(({ id, icon, title, description, link }) => {
            const card = document.createElement('div');
            card.classList.add('services-section__card', 'card');
            card.setAttribute('id', +id + 1);
            card.innerHTML = `
            <div class="card__icon">${icon}</div>
            <h3 class="card__title">${title}</h3>
            <p class="card__description">${description}</p>
            <a class="card__link button-link" href="${link}">Zobacz więcej...</a>
        `;
            parent.append(card);
        });
    }

    if (window.location.pathname === '/') {
        getResources(url)
            .then((res) => renderCards(res.services.cards, parentsCards))
            .catch((err) => console.log(err));
    }
}

export default servicesCards;
