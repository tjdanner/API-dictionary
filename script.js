const body = document.querySelector('body');
const wordInput = document.getElementById('word-input');
const searchButton = document.getElementById('search-button');
const wordContainer = document.createElement('div');
const container = document.getElementById('container');

const URL = 'https://api.dictionaryapi.dev/api/v2/entries/en/';

searchButton.onclick = e => {

    wordContainer.setAttribute('id', 'word-container');
    wordContainer.innerHTML = '';
    console.log(wordInput.value);

    fetch(`${URL}${wordInput.value}`)
        .then(res => {
            return res.json();
        })
        .then(data => {
            if (data.title) {
                wordContainer.innerHTML = `<h1>Please enter a valid word.</h1>`
            } else {
                console.log(data);
                wordContainer.innerHTML = `
                <h1 id='word'>${data[0].word}</h1>
                <div id='phonetics'>
                <p>${data[0].phonetic || ''} • ${data[0].meanings[0].partOfSpeech || ''}</p>
                </div>
                <p>${data[0].meanings[0].definitions[0].definition || ''}</p>
                <p id='example'>${data[0].meanings[0].definitions[0].example || ''}</p>`
            }
        })
        .catch(err => {
            wordContainer.innerHTML = `<h1>Please enter a word.</h1>`;
        })

    container.appendChild(wordContainer);
}

searchButton.onmouseover = e => {
    searchButton.style.boxShadow = 'black -0.25rem 0.25rem';
    searchButton.onmouseleave = e => {
        searchButton.style.boxShadow = '';
    }
}

searchButton.onfocus = e => {
    searchButton.style.boxShadow = 'black -0.25rem 0.25rem';
    searchButton.onblur = e => {
        searchButton.style.boxShadow = '';
    }
}

wordInput.onmouseover = e => {
    wordInput.style.boxShadow = 'black -0.25rem 0.25rem';
    wordInput.onmouseleave = e => {
        wordInput.style.boxShadow = '';
    }
}

wordInput.onfocus = e => {
    wordInput.style.boxShadow = 'black -0.25rem 0.25rem';
    wordInput.onblur = e => {
        wordInput.style.boxShadow = '';
    }
}