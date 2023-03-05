const body = document.querySelector('body');
const word = document.getElementById('word-input');
const searchButton = document.getElementById('search-button');

const URL = 'https://api.dictionaryapi.dev/api/v2/entries/en/';

searchButton.onclick = e => {
    fetch(`${URL}${word.value}`)
        .then(res => {
            return res.json();
        })
        .then(data => {
            console.log(data);
            wordContainer.innerHTML = `
            <h1>${data[0].word}</h1>
            <p>${data[0].phonetic}</p>
            <p>${data[0].meanings[0].partOfSpeech}</p>
            <p>definition</p>
            <p>example</p>`
        })
    const wordContainer = document.createElement('div');
    wordContainer.setAttribute('id', 'word-container');

    body.appendChild(wordContainer);
}
