const grid = document.querySelector('.grid');
const spanPlayer = document.querySelector('.player');
const timer = document.querySelector('.timer');

 characters = [
  'portugal',
  'russia',
  'japao',
  'turquia',
  'holanda',
  'italia',
  'coreiadosul',
  'luxemburgo',
  'china',
  'franca',
  'chipre',
  'angola',
];

const createElement = (tag, className) => {
  const element = document.createElement(tag);
  element.className = className;
  return element;
}

let firstCard = ''; 
let secondCard = '';

const checkEndGame = () => {
  const disabledCards = document.querySelectorAll('.disabled-card');
  console.log('Cartas desativadas:', disabledCards.length);

  if (disabledCards.length === 24) {
    clearInterval(this.loop);
  }

if (disabledCards.length === 24) {
  clearInterval(this.loop);

  const name = spanPlayer.innerHTML;
  const time = timer.innerHTML;

  // Salva o ranking
  const ranking = JSON.parse(localStorage.getItem('ranking')) || [];
  ranking.push({ name, time: Number(time) });

  // Ordena do menor para o maior tempo
  ranking.sort((a, b) => a.time - b.time);

  // Salva os 10000 melhores
  localStorage.setItem('ranking', JSON.stringify(ranking.slice(0, 10000)));

  alert(`🎉 Parabéns, ${name}! Você venceu o jogo em ${time} segundos!`);
}}




const checkCards = () => {
  const firstCharacter = firstCard.getAttribute('data-character');
  const secondCharacter = secondCard.getAttribute('data-character');

  if (firstCharacter === secondCharacter) {

    firstCard.firstChild.classList.add('disabled-card');
    secondCard.firstChild.classList.add('disabled-card');

    firstCard = '';
    secondCard = '';

    checkEndGame();

  } else {
    setTimeout(() => {

      firstCard.classList.remove('reveal-card');
      secondCard.classList.remove('reveal-card');

      firstCard = '';
      secondCard = '';

    }, 500);
  }

}


const revealCard = ({ target }) => {

  if (target.parentNode.className.includes('reveal-card')) {
    return;
  }

  if (firstCard === '') {

    target.parentNode.classList.add('reveal-card');
    firstCard = target.parentNode;

  } else if (secondCard === '') {

    target.parentNode.classList.add('reveal-card');
    secondCard = target.parentNode;

    checkCards();

  }
}

const createCard = (character) => {

  const card = createElement('div', 'card');
  const front = createElement('div', 'face front');
  const back = createElement('div', 'face back');

  front.style.backgroundImage = `url('${character}.png')`;

  card.appendChild(front);
  card.appendChild(back);

  card.addEventListener('click', revealCard);
  card.setAttribute('data-character', character)

  return card;
}

const loadGame = () => {
  const duplicateCharacters = [...characters, ...characters];

  const shuffledArray = duplicateCharacters.sort(() => Math.random() - 0.5);

  shuffledArray.forEach((character) => {
    const card = createCard(character);
    grid.appendChild(card);
  });
}

const startTimer = () => {

  this.loop = setInterval(() => {                             
    const currentTime = +timer.innerHTML;
    timer.innerHTML = currentTime + 1;
  }, 1000);

}


window.onload = () => {
  spanPlayer.innerHTML = localStorage.getItem('player');
  loadGame(); // Apenas carrega o jogo
};



const revealAllButton = document.querySelector('.reveal-all-button');

revealAllButton.addEventListener('click', () => {
  const cards = document.querySelectorAll('.card');

  // Revela todas as cartas
  cards.forEach(card => {
    card.classList.add('reveal-card');
  });

  // Após 3 segundos, esconde as cartas e inicia o timer
  setTimeout(() => {
    cards.forEach(card => {
      if (!card.firstChild.classList.contains('disabled-card')) {
        card.classList.remove('reveal-card');
      }
    });

    // Esconde o botão e inicia o timer
    revealAllButton.style.display = 'none';
    startTimer(); // <-- Inicia o timer só agora
  }, 3000);
});

revealAllButton.addEventListener('click', () => {
  const cards = document.querySelectorAll('.card');

  // Revela todas as cartas
  cards.forEach(card => {
    card.classList.add('reveal-card');
  });

  // Esconde todas após 3 segundos, exceto as acertadas
  setTimeout(() => {
    cards.forEach(card => {
      if (!card.firstChild.classList.contains('disabled-card')) {
        card.classList.remove('reveal-card');
      }
    });
  }, 4000);

  // Esconde o botão após o uso
  revealAllButton.style.display = 'none';
});
