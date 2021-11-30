function toggleVisibilityItems(toggleItemsSelector, contentItemsSelector, activeClass, event) {
    try {
        const toggleItems = document.querySelectorAll(toggleItemsSelector),
            contentItems = document.querySelectorAll(contentItemsSelector);

        const hideElements = (items) => items.forEach((item) => item.classList.remove(activeClass));
        const showElements = (items, index = 0) => items[index].classList.add(activeClass);

        hideElements(toggleItems);
        hideElements(contentItems);
        showElements(toggleItems);
        showElements(contentItems);

        toggleItems.forEach((item, i) => {
            item.addEventListener(event, (e) => {
                if (event === 'click') {
                    hideElements(toggleItems);
                    hideElements(contentItems);

                    if (e.target && e.target === item) {
                        showElements(toggleItems, i);
                        showElements(contentItems, i);
                    }
                } else {
                    hideElements(contentItems);
                    showElements(contentItems, item.selectedIndex);

                    contentItems.forEach((content) => {
                        content.querySelectorAll('input[type="radio"]').forEach((input) => {
                            input.checked = false;
                            input.classList.remove('error');
                        });
                    });
                }
            });
        });
    } catch (e) {}
}

export default toggleVisibilityItems;
