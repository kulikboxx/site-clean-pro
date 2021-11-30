function sliderBeforeAfter(sliderSelector, inputSelector, dragLineSelector, imgSelector) {
    try {
        const slider = document.querySelector(sliderSelector),
            inputRange = slider.querySelector(inputSelector),
            dragLine = slider.querySelector(dragLineSelector),
            imgBefore = slider.querySelector(imgSelector);

        inputRange.addEventListener('input', () => {
            dragLine.style.left = inputRange.value + '%';
            imgBefore.style.width = inputRange.value + '%';
        });
    } catch (e) {}
}

export default sliderBeforeAfter;
