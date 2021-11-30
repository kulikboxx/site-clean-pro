function navbar(
    navbarSelector,
    navigationSelector,
    chevronSelector,
    barsSelector,
    activeClass,
    showClass,
    rotateClass,
    dataSection
) {
    const navbarParent = document.querySelector(navbarSelector),
        navigation = navbarParent.querySelector(navigationSelector),
        chevronButton = navbarParent.querySelector(chevronSelector),
        barsButton = navbarParent.querySelector(barsSelector),
        navigationLinks = navigation.querySelectorAll('a'),
        sections = document.querySelectorAll(dataSection);

    const addActiveClass = (element, activeClass) => element.classList.add(activeClass);
    const removeActiveClass = (element, activeClass) => element.classList.remove(activeClass);
    const changeElementStyle = (element, prop, value) => (element.style[prop] = value);

    try {
        navigationLinks.forEach((link) => {
            if (link.getAttribute('data-current') === sections[0].getAttribute('data-section')) {
                addActiveClass(link, activeClass);
            }
        });
    } catch (e) {}

    document.documentElement.style.scrollPaddingTop = navbarParent.offsetHeight - 1 + 'px';

    window.addEventListener('scroll', () => {
        if (document.documentElement.scrollTop >= navbarParent.previousElementSibling.offsetHeight) {
            changeElementStyle(navbarParent.parentElement, 'position', 'sticky');
            changeElementStyle(
                navbarParent.parentElement,
                'top',
                `-${navbarParent.previousElementSibling.offsetHeight}px`
            );
        } else {
            changeElementStyle(navbarParent.parentElement, 'position', 'relative');
            changeElementStyle(navbarParent.parentElement, 'top', '');
        }

        let navbarEl = navbarParent.getBoundingClientRect(),
            current,
            sectionEl;

        sections.forEach((section) => {
            sectionEl = section.getBoundingClientRect();

            if (sectionEl.top <= navbarEl.height) {
                current = section.getAttribute('data-section');
            }
        });

        navigationLinks.forEach((link) => {
            removeActiveClass(link, activeClass);

            if (link.getAttribute('data-current') === current) {
                addActiveClass(link, activeClass);
            }

            try {
                if (sectionEl.bottom <= navbarEl.bottom) {
                    removeActiveClass(link, activeClass);
                }
            } catch (e) {}
        });
    });

    barsButton.addEventListener('click', () => {
        if (barsButton.classList.contains(rotateClass)) {
            removeActiveClass(navigation, showClass);
            removeActiveClass(barsButton, rotateClass);
            removeActiveClass(chevronButton, rotateClass);
            removeActiveClass(chevronButton.parentElement, activeClass);
            removeActiveClass(chevronButton.nextElementSibling, activeClass);
        } else {
            addActiveClass(navigation, showClass);
            addActiveClass(barsButton, rotateClass);
        }
    });

    chevronButton.addEventListener('click', (e) => {
        e.preventDefault();

        if (chevronButton.classList.contains(rotateClass)) {
            removeActiveClass(chevronButton, rotateClass);
            removeActiveClass(chevronButton.parentElement, activeClass);
            removeActiveClass(chevronButton.nextElementSibling, activeClass);
        } else {
            addActiveClass(chevronButton, rotateClass);
            addActiveClass(chevronButton.parentElement, activeClass);
            addActiveClass(chevronButton.nextElementSibling, activeClass);
        }
    });

    navigationLinks.forEach((link) => {
        link.addEventListener('click', (e) => {
            if (e.target === link) {
                setTimeout(() => {
                    removeActiveClass(navigation, showClass);
                    removeActiveClass(barsButton, rotateClass);
                }, 400);
            }
        });
    });

    window.addEventListener('resize', () => {
        const navbar = document.querySelector(navbarSelector);
        document.documentElement.style.scrollPaddingTop = navbar.offsetHeight - 1 + 'px';

        if (window.innerWidth >= 992) {
            removeActiveClass(navigation, showClass);
            removeActiveClass(barsButton, rotateClass);
            removeActiveClass(chevronButton, rotateClass);
            removeActiveClass(chevronButton.parentElement, activeClass);
            removeActiveClass(chevronButton.nextElementSibling, activeClass);
        }
    });
}

export default navbar;
