const body = document.querySelector('body');
const word = document.getElementById('word-input');
const searchButton = document.getElementById('search-button');
const wordContainer = document.createElement('div');

const URL = 'https://api.dictionaryapi.dev/api/v2/entries/en/';

searchButton.onclick = e => {

    wordContainer.setAttribute('id', 'word-container');
    wordContainer.innerHTML = '';
    console.log(word.value);

    fetch(`${URL}${word.value}`)
        .then(res => {
            return res.json();
        })
        .then(data => {
            if (data.title) {
                wordContainer.innerHTML = `<h1>That's not a word, retard.</h1>`
            } else {
                console.log(data);
                wordContainer.innerHTML = `
                <h1>${data[0].word}</h1>
                <p>${data[0].phonetic || ''}</p>
                <p>${data[0].meanings[0].partOfSpeech || ''}</p>
                <p>${data[0].meanings[0].definitions[0].definition || ''}</p>
                <p>${data[0].meanings[0].definitions[0].example || ''}</p>`
            }
        })
        .catch(err => {
            wordContainer.innerHTML = `<h1>Please enter a word.</h1>`;
        })

    body.appendChild(wordContainer);
}
