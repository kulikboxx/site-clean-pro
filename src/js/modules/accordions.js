function accordions(accordionsSelector, activeClass) {
    const accordions = document.querySelectorAll(accordionsSelector);

    const hideAccordions = (items) => {
        items.forEach((item) => {
            item.classList.remove(activeClass);
            item.nextElementSibling.style.maxHeight = '0px';
        });
    };

    const showAccordions = (items) => {
        items.forEach((item) => {
            item.addEventListener('click', function () {
                let height = this.nextElementSibling.firstElementChild.offsetHeight;

                if (this.classList.contains(activeClass)) {
                    this.classList.remove(activeClass);
                    this.nextElementSibling.style.maxHeight = '0px';
                } else if (this) {
                    hideAccordions(items);
                    this.classList.add(activeClass);
                    this.nextElementSibling.style.maxHeight = height + 'px';
                }
            });
        });
    };

    showAccordions(accordions);
}

export default accordions;
