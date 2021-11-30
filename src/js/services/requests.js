async function getResources(url) {
    try {
        let response = await fetch(url);

        if (!response.ok) {
            throw new Error(`Coś poszło nie tak... błąd ${response.status}! Odśwież stronę i spróbuj jeszcze raz`);
        }

        return await response.json();
    } catch (e) {}
}

async function postData(url, data) {
    try {
        let response = await fetch(url, {
            method: 'POST',
            body: data,
        });

        if (!response.ok) {
            throw new Error(`Coś poszło nie tak... błąd ${response.message}! Odśwież stronę i spróbuj jeszcze raz`);
        }

        return await response.json();
    } catch (e) {}
}

export { getResources };
export { postData };
