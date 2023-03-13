// DOM elements.
const body = document.querySelector('body');
const wordInput = document.getElementById('word-input');
const searchButton = document.getElementById('search-button');
const wordContainer = document.createElement('div');
const container = document.getElementById('container');
const soundIcon = document.getElementById('sound-icon');

// Setting URL for API call.
const URL = 'https://api.dictionaryapi.dev/api/v2/entries/en/';

// Audio object for word pronunciations.
const sound = new Audio();

searchButton.onclick = e => {

    wordContainer.setAttribute('id', 'word-container');
    wordContainer.innerHTML = '';

    // Fetching the data from the API and updating the word container accordingly.
    fetch(`${URL}${wordInput.value}`)
        .then(res => {
            return res.json();
        })
        .then(data => {
            // I logged the data in order to determine where certain attributes were.
            console.log(data);
            if (data.title) {
                wordContainer.innerHTML = `<h1>${data.message}</h1>`
            } else {
                // If data exists, sets innerHTML of wordContainer.
                wordContainer.innerHTML = `
                <div id='word-icon-container'>
                <h1 id='word'>${data[0].word || ''}</h1>
                <svg id='sound-icon' onclick='playSound()' width="800px" height="800px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M3 11V13M6 8V16M9 10V14M12 7V17M15 4V20M18 9V15M21 11V13" stroke="#000000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
                </div>
                <div id='phonetics'>
                <p>${data[0].phonetic || ''} • ${data[0].meanings[0].partOfSpeech || ''}</p>
                </div>
                <p>${data[0].meanings[0].definitions[0].definition || ''}</p>
                <p id='example'>${data[0].meanings[0].definitions[0].example || ''}</p>`

                // Sets sound source to pronunciation audio file.
                for (let i = 0; i < data[0].phonetics.length; i++) {
                    sound.src = data[0].phonetics[i].audio;
                }
            }
        })
        .catch(err => {
            // Handles errors and updates word container accordingly.
            wordContainer.innerHTML = `<h1>Please enter a word.</h1>`;
        })
    // Appends wordContainer to main container
    container.appendChild(wordContainer);
}


// Event listeners for focus and hover effects on search button and input.
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

// Function to play when soundIcon is clicked.
const playSound = () => {
    sound.play();
}

