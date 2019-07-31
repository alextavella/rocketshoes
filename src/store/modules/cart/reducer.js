import produce from 'immer';

export default function cart(state = { loading: false, items: [] }, action) {
  switch (action.type) {
    case '@cart/ADD_REQUEST':
    case '@cart/UPDATE_AMOUNT_REQUEST':
      return produce(state, draft => {
        draft.loading = true;
      });
    case '@cart/ADD_SUCCESS':
      return produce(state, draft => {
        const { product } = action;
        draft.loading = false;
        draft.items.push(product);
      });
    case '@cart/REMOVE':
      return produce(state, draft => {
        const productIndex = draft.items.findIndex(
          item => item.id === action.id
        );

        if (productIndex >= 0) {
          draft.items.splice(productIndex, 1);
        }
      });
    case '@cart/UPDATE_AMOUNT_SUCCESS':
      return produce(state, draft => {
        const productIndex = draft.items.findIndex(
          item => item.id === action.id
        );

        if (productIndex >= 0) {
          draft.items[productIndex].amount = Number(action.amount);
        }
        draft.loading = false;
      });
    case '@cart/ADD_ERROR':
      return produce(state, draft => {
        draft.loading = false;
      });
    default:
      return state;
  }
}
