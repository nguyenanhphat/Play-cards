import * as types from "../constants";
import callApi from './../utils/apiCaller';
export const suffleCard = (deck_id) => {
  return (dispatch) => {
    return callApi(`/deck/${deck_id}/shuffle/`, 'GET', null).then(res => {
      if (res.data) {
        dispatch(suffleCardSuccessfully());
      }
    });
  }
};

export const suffleCardSuccessfully = () => {
  return {
    type: types.SUFFLE_CARD_SUCCESSFULLY,
  }
}


export const loadDesk = () => {
  return (dispatch) => {
    return callApi('/deck/new/shuffle/?deck_count=1', 'GET', null).then(res => {
      if (res.data) {
        const { deck_id } = res.data;
        dispatch(loadDeskSuccessfully(deck_id));
      }
    });
  }
};

export const loadDeskSuccessfully = (deck_id) => {
  return {
    type: types.LOAD_DECK_SUCCESSFULLY,
    deck_id
  }
}

export const drawCard = (deck_id) => {
  return (dispatch) => {
    return callApi(`/deck/${deck_id}/draw/?count=12`, 'GET', null).then(res => {
      dispatch(drawCardSuccessfully(res.data));
    });
  }
};

export const drawCardSuccessfully = (result) => {
  return {
    type: types.DRAW_CARD_SUCCESSFULLY,
    result
  }
}

export const revealCard = () => {
  return {
    type: types.REVEAL_CARD
  }
}

export const closeModal = () => {
  return {
    type: types.CLOSE_MODAL
  }
}



