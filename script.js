const data = [
    {imgSrc: './img/van_gogh_sunflowers.jpg', dataName: 'van gogh sunflowers'},
    {imgSrc: './img/the_scream.jpg', dataName: 'the scream'},
    {imgSrc: './img/starry_night_full.jpg', dataName: 'starry night full'},
    {imgSrc: './img/night_watch.jpg', dataName: 'night watch'},
    {imgSrc: './img/monet_sunrise.jpg', dataName: 'monet sunrise'},
    {imgSrc: './img/jackson-pollock.jpg', dataName: 'jackson pollock'},
    {imgSrc: './img/hokusai_great_wave.jpg', dataName: 'hokusai great wave'},
    {imgSrc: './img/dali-memory.jpg', dataName: 'dali memory'},
    {imgSrc: './img/mona_lisa.jpg', dataName: 'mona lisa'},
    {imgSrc: './img/arshile_gorky.jpg', dataName: 'arshile gorky'},
    {imgSrc: './img/van_gogh_sunflowers.jpg', dataName: 'van gogh sunflowers'},
    {imgSrc: './img/the_scream.jpg', dataName: 'the scream'},
    {imgSrc: './img/starry_night_full.jpg', dataName: 'starry night full'},
    {imgSrc: './img/night_watch.jpg', dataName: 'night watch'},
    {imgSrc: './img/monet_sunrise.jpg', dataName: 'monet sunrise'},
    {imgSrc: './img/jackson-pollock.jpg', dataName: 'jackson pollock'},
    {imgSrc: './img/hokusai_great_wave.jpg', dataName: 'hokusai great wave'},
    {imgSrc: './img/dali-memory.jpg', dataName: 'dali memory'},
    {imgSrc: './img/mona_lisa.jpg', dataName: 'mona lisa'},
    {imgSrc: './img/arshile_gorky.jpg', dataName: 'arshile gorky'},
];

const gameBoard = document.querySelector('.game-board');
const triesLeftCount = document.querySelector('.tries-left-count');
let triesLeft = 10;

triesLeftCount.innerText = triesLeft;

// Data randomize function
const randomize = () => data.sort(() => Math.random() - 0.5);

// Cards renderer function
const cardsRenderer = () => {
    let cardData = randomize();
    cardData.forEach((dataItem) => {
        const card = document.createElement('li');
        const frontFace = document.createElement('img');
        const backFace = document.createElement('span');

        card.classList.add('card-item');
        card.setAttribute('data-name', dataItem.dataName);
        frontFace.classList.add('front-face');
        backFace.classList.add('back-face');

        frontFace.src = dataItem.imgSrc;

        gameBoard.append(card);
        card.append(frontFace);
        card.append(backFace);

        card.addEventListener('click', (e) => {
            card.classList.toggle('card-item--active');
            conditionChecker(e);
        });
    });
}

// Match or not match condition checker
const conditionChecker = (e) => {
    e.target.classList.add('clicked');
    let clickedCards = document.querySelectorAll('.clicked');
    let activeCards = document.querySelectorAll('.card-item--active');

    if (clickedCards.length === 2) {
        if (clickedCards[0].getAttribute('data-name') === clickedCards[1].getAttribute('data-name')) {
            // Match
            clickedCards.forEach(cardItem => {
                cardItem.classList.remove('clicked');
                cardItem.style.pointerEvents = 'none';
            });
        } else {
            // Not match
            clickedCards.forEach(cardItem => {
                cardItem.classList.remove('clicked');
                setTimeout(() => cardItem.classList.remove('card-item--active'), 800);
            });

            triesLeft--;
            triesLeftCount.innerText = triesLeft;

            if (triesLeft === 0) {
                gameRestart('Just try one more time!');
            }
        }
    }

    // Win condition
    if (activeCards.length === 20) {
        gameRestart('Congrats you won!');
    }
}

// Restart the game
const gameRestart = (textMsg) => {
    const cardData = randomize();
    const cards = document.querySelectorAll('li');
    const frontFaces = document.querySelectorAll('img');
    gameBoard.style.pointerEvents = 'none';

    cardData.forEach((dataItem, dataIndex) => {
        cards[dataIndex].classList.remove('card-item--active');

        setTimeout(() => {
            // Randomize
            cards[dataIndex].style.pointerEvents = 'all';
            frontFaces[dataIndex].src = dataItem.imgSrc;
            cards[dataIndex].setAttribute('data-name', dataItem.dataName);
            gameBoard.style.pointerEvents = 'none';
        }, 800);
    });

    triesLeft = 10;
    triesLeftCount.innerText = triesLeft;

    setTimeout(() => {
        document.querySelector('.message-box').classList.add('message-box--active');
        document.querySelector('.message-box-txt').innerText = textMsg;
    }, 200)
}

// Message box button click event listener
document.querySelector('.message-box-btn').addEventListener('click', () => {
    document.querySelector('.message-box').classList.remove('message-box--active');
});

cardsRenderer();
