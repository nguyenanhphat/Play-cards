import { LIST_JQK, BLACK_JACK } from './../constants/index'

export function isBaCao(cards) {
    let result = true;
    for (let i = 0; i < cards.length; i++) {
        const card = cards[i];
        if (card && LIST_JQK.indexOf(card.value) === -1) {
            result = false;
        }
    }
    return result;
}

export function calculatePoints(cards) {
    if (isBaCao(cards)) {
        return 100;
    } else {
        let total = 0;
        cards.forEach(card => {
            const { value } = card;
            if (LIST_JQK.indexOf(value) > -1) {
                total += 10;
            } else if (BLACK_JACK.indexOf(value) > -1) {
                total += 1;
            } else {
                total += +value;
            }
        });
        return total % 10;
    }
};