let all_cards;
let majors;

function drawRandom(cards) {
  const card = cards[Math.floor(Math.random() * cards.length)];
  console.log(card);
  const { name, name_short } = card;
  const position = ['upright', 'reversed'][Math.round(Math.random())];
  const meaning = position === 'upright' ? card.meaning_up : card.meaning_rev;

  $('#container').fadeOut(1000, function () {
    $('#tarot-image')
      .attr('src', `./images/${name_short}.png`)
      .attr('class', position);

    $('#tarot-name').html(name);
    $('#tarot-meaning').html(meaning);
    $('#tarot-position').html(`(${position})`);

    $('#container').fadeIn(1500);
  });
}

fetch('card_data.json')
  .then((response) => response.json())
  .then((data) => {
    all_cards = data.cards;
    majors = all_cards.filter((card) => card.type === 'major');
  });

document.addEventListener('DOMContentLoaded', function () {
  // Check if data is loaded before setting up the click listener
  const checkDataAndSetup = () => {
    if (all_cards) {
      document
        .getElementById('container')
        .addEventListener('click', () => drawRandom(majors));
    } else {
      // If data is not yet loaded, try again after a short delay
      setTimeout(checkDataAndSetup, 500);
    }
  };

  checkDataAndSetup();
});
