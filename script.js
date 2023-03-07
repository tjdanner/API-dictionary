const body = document.querySelector('body');
const wordInput = document.getElementById('word-input');
const searchButton = document.getElementById('search-button');
const wordContainer = document.createElement('div');
const container = document.getElementById('container');
const soundIcon = document.getElementById('sound-icon');

const URL = 'https://api.dictionaryapi.dev/api/v2/entries/en/';

const sound = new Audio();

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
                wordContainer.innerHTML = `<h1>Could not find word.</h1>`
            } else {
                console.log(data);
                wordContainer.innerHTML = `
                <div id='word-icon-container'>
                <h1 id='word'>${data[0].word}</h1>
                <svg id='sound-icon' onclick='playSound()' width="800px" height="800px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M3 11V13M6 8V16M9 10V14M12 7V17M15 4V20M18 9V15M21 11V13" stroke="#000000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
                </div>
                <div id='phonetics'>
                <p>${data[0].phonetic || ''} • ${data[0].meanings[0].partOfSpeech || ''}</p>
                </div>
                <p>${data[0].meanings[0].definitions[0].definition || ''}</p>
                <p id='example'>${data[0].meanings[0].definitions[0].example || ''}</p>`

                sound.src = data[0].phonetics[0].audio;
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

const playSound = () => {
    sound.play();
}

