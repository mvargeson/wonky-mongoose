import Cards from '../../../dev/server/models/cards.js';
import Plays from '../../../dev/server/models/plays.js';

// query the database
const queryDb = () => {
  // given a deck id, get all the cards in that deck
  const getDeck = (deckId) => {
    return Cards.find({ deckId: deckId });
  };

  // given a deck id and user id, get the plays for that deck
  const getPlays = (deckId, userId) => {
    return Plays.find({ deckId: deckId }); //, userId: userId });
  };

  const getCardPlays = (cardId, deckId, userId) => {
    return Plays.find({ cardId: cardId, deckId: deckId }); //, userId: userId});
  };

  return ({
    getDeck: getDeck,
    getPlays: getPlays,
    getCardPlays: getCardPlays
  });
};

let getRandom = {
  probability: () => Math.random() * 0.5,
  cardIndex: n => Math.floor(Math.random() * n),
  cardId: (deck, cardIndex) => deck[cardIndex]._id,
  trio: (deck) => {
    let cardIndex = getRandom.cardIndex(deck.length);
    return ({
      p: getRandom.probability(),
      cardIndex: cardIndex,
      cardId: getRandom.cardId(deck, cardIndex)
    });
  }
};

// given a deck id, retrieve a card
const getCard = (deckId) => {
  // get the deck 
  return queryDb().getDeck(deckId).then( deck => {

    // intitialize random card index and tries
    let randCardIndex = 0;
    let tries = 0;
    const maxTries = 10;

    // get a random real number
    let p, cardIndex, cardId;
    ({ p, cardIndex, cardId } = getRandom.trio(deck));

    const findCard = () => {
      // find all plays that match card id
      return queryDb().getCardPlays(cardId, deckId, 0).then( plays => {
        // get total rating for that card
        let totalRating = 0;
        if (plays.length) {
          totalRating = plays.reduce((sum, play) => sum + Number(play.rating), 0);
        } else {
          return deck[cardIndex]
        }
        // get a random real number based on card's total rating
        let randCardProbability = Math.random() * Math.pow(2, totalRating);

        // decide whether to show card based on the randomly generated numbers
        if (p > randCardProbability && tries < maxTries) {
          ({ p, cardIndex, cardId } = getRandom.trio(deck));          
          tries++;
          return findCard();          
        } else {
          return deck[cardIndex];
        }
      });
    };

    return findCard();
  });
};


export default getCard;

