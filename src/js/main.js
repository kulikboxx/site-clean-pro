import callback from './modules/callback';
import cookie from './modules/cookie';
import modal from './modules/modal';
import accordions from './modules/accordions';
import calculator from './modules/calculator';
import counters from './modules/counters';
import filters from './modules/filters';
import Lightbox from './modules/Lightbox';
import navbar from './modules/navbar';
import servicesCards from './modules/servicesCards';
import slider from './modules/slider';
import sliderBeforeAfter from './modules/sliderBeforeAfter';
import toggleVisibilityItems from './modules/toggleVisibilityItems';
import forms from './modules/forms';

document.addEventListener('DOMContentLoaded', () => {
    callback('.header');
    cookie();
    modal('.callback .callback__phone', 'show');
    new Lightbox('.portfolio-section__gallery').init();
    accordions('.faq-section__accordion .accordion__title', 'active');
    calculator('.order__form');
    counters('.aboutus-section__counters', 'span[data-count]', 'data-count', 1500, 3);
    filters('.portfolio-section__tab', '.portfolio-section__item', 'active', 'disabled', 500);
    navbar('.header__navbar', '.nav', '.nav__chevron', '.header__bars', 'active', 'show', 'rotate', '[data-section]');
    servicesCards('.services-section__container', 'assets/db.json');
    slider('.slider', '.slider__item', 'active', 8000);
    sliderBeforeAfter(
        '.service__slider-before',
        '.slider-before__range',
        '.slider-before__drag-line',
        '.slider-before__resize'
    );
    toggleVisibilityItems('.choose-section__tab', '.choose-section__card', 'active', 'click');
    toggleVisibilityItems(
        '.order__form .form__box.services .form__input',
        '.order__form .form__box.spaces',
        'show',
        'change'
    );
    forms('.contact__form', '.form__input', 'assets/contact.php');
    forms('.modal__form', '.modal__input', 'assets/modal.php');
    forms('.order__form', '.form__input', 'assets/calculator.php');
});
