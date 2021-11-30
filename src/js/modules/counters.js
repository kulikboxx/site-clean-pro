function counters(parentSelector, countersSelector, dataAttribute, duration, threshold) {
    try {
        const countersParent = document.querySelector(parentSelector),
            counters = countersParent.querySelectorAll(countersSelector);

        function onScroll() {
            function updateCounters(items, attr, duration) {
                items.forEach((item) => {
                    let dataValue = +item.getAttribute(attr),
                        counter = parseInt(item.textContent),
                        num = dataValue / duration;

                    let t = setInterval(() => {
                        item.innerHTML = Math.floor((counter += num)) + '+';

                        if (counter >= dataValue) {
                            clearInterval(t);
                            item.innerHTML = dataValue + '+';
                        }
                    });
                });
            }

            let posY = countersParent.getBoundingClientRect().y;

            if (posY <= window.innerHeight - countersParent.offsetHeight / threshold) {
                updateCounters(counters, dataAttribute, duration);
                window.removeEventListener('scroll', onScroll);
            }
        }

        window.addEventListener('scroll', onScroll);
    } catch (e) {}
}

export default counters;
