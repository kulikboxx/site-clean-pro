function filters(filtersSelector, imagesSelector, activeClass, disabledClass, duration) {
    try {
        const filters = document.querySelectorAll(filtersSelector),
            images = document.querySelectorAll(imagesSelector);

        const toggleElemenStyle = (elements, prop, value) => elements.forEach((elem) => (elem.style[prop] = value));
        const removeClass = (elements, currentClass) => elements.forEach((elem) => elem.classList.remove(currentClass));
        const addClass = (elements, currentClass, method = false, i = 0) => {
            if (method) {
                elements.forEach((elem) => elem.classList.add(currentClass));
                return;
            }

            elements[i].classList.add(currentClass);
        };

        removeClass(filters, activeClass);
        addClass(filters, activeClass);

        filters.forEach((filter, index) => {
            filter.addEventListener('click', (e) => {
                let showClass = filter.classList[1];
                const filteredImages = [...images].filter((img) => img.classList.contains(showClass));

                if (e.target && e.target === filter.parentElement) return;
                if (e.target && e.target === filter && !filter.classList.contains(activeClass)) {
                    removeClass(filters, activeClass);

                    if (showClass !== 'all') {
                        addClass(filters, activeClass, false, index);

                        removeClass(images, activeClass);
                        addClass(images, disabledClass, true);

                        setTimeout(() => {
                            toggleElemenStyle(images, 'display', 'none');
                            setTimeout(() => {
                                removeClass(images, disabledClass);
                                toggleElemenStyle(filteredImages, 'display', 'block');
                                addClass(filteredImages, activeClass, true);
                            });
                        }, duration);
                    } else {
                        addClass(filters, activeClass);

                        removeClass(images, activeClass);
                        addClass(images, disabledClass, true);

                        setTimeout(() => {
                            toggleElemenStyle(images, 'display', 'none');
                            setTimeout(() => {
                                removeClass(images, disabledClass);
                                toggleElemenStyle(images, 'display', 'block');
                                addClass(images, activeClass, true);
                            });
                        }, duration);
                    }
                }
            });
        });
    } catch (e) {}
}

export default filters;
