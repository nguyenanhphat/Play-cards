import * as types from './../constants';
import { cloneDeep } from 'lodash';
import { calculatePoints } from './../helpers/common';
var initialState = {
    round: 0,
    shuffled: false,
    isDrawing: false,
    deck_id: null,
    finished: false,
    players: [
        {
            id: 1,
            name: "Teo",
            point: 20000,
            cards: [],
            position: 'top'
        },
        {
            id: 2,
            name: "Ti",
            point: 20000,
            cards: [],
            position: 'right'
        },
        {
            id: 3,
            name: "Phat",
            point: 20000,
            isMe: true,
            cards: [],
            position: 'bottom'
        },
        {
            id: 4,
            name: "Tan",
            point: 20000,
            cards: [],
            position: 'left'
        }
    ]

};
const card = (state = initialState, action) => {
    switch (action.type) {
        case types.CLOSE_MODAL: {
            let data = cloneDeep(state);
            data = Object.assign(data, {}, { finished: false })
            return data;
        }

        case types.SUFFLE_CARD_SUCCESSFULLY: {
            let data = cloneDeep(state);
            let { players } = data;
            players.forEach(player => {
                if (player.cards && player.cards.length > 0) {
                    player.cards[0].isUpSideDown = true;
                }
            });
            data = Object.assign(data, {}, { shuffled: true });
            return data;
        }


        case types.LOAD_DECK_SUCCESSFULLY: {
            let data = cloneDeep(state);
            const { deck_id } = action;
            data = Object.assign(data, {}, { deck_id });
            return data;
        }
        case types.DRAW_CARD_SUCCESSFULLY: {
            let data = cloneDeep(state);
            let players = cloneDeep(data.players);
            let { cards } = action.result;

            let indexOfCards = 0;
            let indexCard = 0;
            players.forEach(player => {
                player.cards[indexCard] = cards[indexOfCards];
                player.cards[indexCard + 1] = cards[indexOfCards + 1];
                player.cards[indexCard + 2] = cards[indexOfCards + 2];
                player.cards[indexCard].isUpSideDown = player.isMe ? false : true;
                indexOfCards += 2;
            });
            data = Object.assign(data, {}, {
                players,
                isDrawing: true,
                round: data.round + 1
            });
            return data;
        }

        case types.REVEAL_CARD: {
            let data = cloneDeep(state);
            const { players, round } = data;

            let maxPoint = null;
            let totalBet = 0;
            let arrPlayersWin = [];
            let finished = false;

            players.forEach(player => {
                player.cards[0].isUpSideDown = false;
                if (player.point > 0) {
                    const totalValue = calculatePoints(player.cards);
                    player.value = totalValue;
                    if (maxPoint === null) {
                        maxPoint = totalValue;
                    } else {
                        if (totalValue > maxPoint) {
                            maxPoint = totalValue;
                        }
                    }
                }
            });

            players.forEach(player => {
                const point = player.value
                if (point < maxPoint) {
                    player.point -= 5000;
                    totalBet += 5000;
                } else if (point === maxPoint) {
                    arrPlayersWin = [...arrPlayersWin, player.id];
                }
            });

            players.forEach(player => {
                const { id } = player;
                if (arrPlayersWin.indexOf(id) > -1) {
                    player.point += totalBet / arrPlayersWin.length;
                }
            });

            if (round === 5) {
                finished = true;
            }
            data = Object.assign(data, {}, {
                shuffled: false,
                isDrawing: false,
                finished: finished
            })

            return data;
        }

        default:
            return state;
    }
}

export default card;
