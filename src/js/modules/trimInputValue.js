function trimInputValue(input) {
    if (input.type !== 'radio' && input.type !== 'email' && input.type !== 'select-one') {
        input.value = input.value.trimStart();
    }
}

export { trimInputValue };
