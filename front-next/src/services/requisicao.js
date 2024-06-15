

export async function requisicao(url, config, parse) {
    return fetch(url, config)
        .then((response) => response.json()
        )
        .then((response) => response);
}