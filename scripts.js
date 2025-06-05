document.addEventListener("DOMContentLoaded", () => {
    const characters = [
        { name: 'brasil', img: 'brasil.png' },
        { name: 'argentina', img: 'argentina.png' },
        { name: 'colombia', img: 'colombia.png' },
        { name: 'chipre', img: 'chipre.png' },
        { name: 'angola', img: 'angola.png' },
        { name: 'franca', img: 'franca.png.' },
        { name: 'china', img: 'china.png' },
        { name: 'luxemburgo', img: 'luxemburgo.png' },
        { name: 'coreiadosul', img: 'coreiadosul.png' },
        { name: 'italia', img: 'italia.png' },
        { name: 'holanda', img: 'holanda.png' },
        { name: 'turquia', img: 'turquia.png.' },
        { name: 'japao', img: 'japao.png' },
        { name: 'russia', img: 'russia.png' },
        { name: 'portugal', img: 'portugal.png' },
    ];

    // Embaralhar cartas
    cards.sort(() => 0.5 - Math.random());

    const board = document.querySelector('.board');
    const resultView = document.querySelector('#result');
    let cardsChosen = [];  // Cartas escolhidas
    let cardsChosenId = [];  // IDs das cartas escolhidas
    let cardsWon = [];  // Cartas combinadas

    // Criar quadro de cartas
    function createBoard() {
        for (let i = 0; i < cards.length; i++) {
            const card = document.createElement('img');
            card.setAttribute('src', 'board.png');
            card.setAttribute('data-id', i);
            card.addEventListener('click', flipCard);
            board.appendChild(card);
        }
    }

    // Virar carta
    function flipCard() {
        let cardId = this.getAttribute('data-id');
        cardsChosen.push(cards[cardId].name);
        cardsChosenId.push(cardId);
        this.setAttribute('src', cards[cardId].img);  // Alterei 'img' para 'id'
        
        if (cardsChosen.length === 2) {
            setTimeout(checkMatch, 500);  // Checar se as cartas combinam
        }
    }

    // Checar se as cartas combinam
    function checkMatch() {
        const cards = document.querySelectorAll('img');
        const [firstCardId, secondCardId] = cardsChosenId;
        
        if (cardsChosen[0] === cardsChosen[1]) {
            cardsWon.push(cardsChosen);  // Cartas combinadas
        } else {
            cards[firstCardId].setAttribute('src', 'images/board.png');
            cards[secondCardId].setAttribute('src', 'images/board.png');
        }

        cardsChosen = [];
        cardsChosenId = [];
        resultView.textContent = cardsWon.length;  // Mostrar número de combinações

        if (cardsWon.length === cards.length / 2) {
            alert("Parabéns, você ganhou!");
        }
    }

    // Chamar a função para criar o quadro de cartas
    createBoard();
});

const saveRanking = (name, time) => {
  const ranking = JSON.parse(localStorage.getItem('ranking')) || [];

  ranking.push({ name, time: Number(time) });

  // Ordena pelo tempo (menor é melhor)
  ranking.sort((a, b) => a.time - b.time);

  // Limita a 10000 jogadores (opcional)
  const topRanking = ranking.slice(0, 10000);

  localStorage.setItem('ranking', JSON.stringify(topRanking));
};