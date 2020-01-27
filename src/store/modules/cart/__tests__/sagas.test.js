import { runSaga } from 'redux-saga';

import MockAdapter from 'axios-mock-adapter';

import api from '~/services/api';

import { addToCart, updateAmount } from '~/store/modules/cart/sagas';

import {
  updateAmountSuccess,
  addToCartError,
  addToCartDefault
} from '~/store/modules/cart/actions';

const apiMock = new MockAdapter(api);

describe('Test cart sagas', () => {
  it('should call addToCartError when there is not stock', async () => {
    const dispatch = jest.fn();
    const getState = jest.fn();

    getState.mockReturnValue({
      cart: {
        items: [
          {
            id: 1,
            amount: 1,
          },
        ],
      },
    });

    apiMock.onGet('/stock/1').reply(200, { amount: 0 });

    await runSaga({ dispatch, getState }, addToCart, {
      id: 1,
    }).toPromise();

    expect(dispatch).toHaveBeenCalledWith(addToCartError());
  });

  it('should call addToCartDefault when amount <= 0', async () => {
    const dispatch = jest.fn();
    await runSaga({ dispatch }, updateAmount, { id: 1, amount: 0 }).toPromise();
    expect(dispatch).toHaveBeenCalledWith(addToCartDefault());
  });

  it('should call updateAmountSuccess when amount > 0 and stock valid', async () => {
    const dispatch = jest.fn();
    apiMock.onGet('/stock/1').reply(200, { amount: 2 });
    await runSaga({ dispatch }, updateAmount, { id: 1, amount: 1 }).toPromise();
    expect(dispatch).toHaveBeenCalledWith(updateAmountSuccess(1, 1));
  });

  it('should call addToCartError when amount > 0 and stock invalid', async () => {
    const dispatch = jest.fn();
    apiMock.onGet('/stock/1').reply(200, { amount: 0 });
    await runSaga({ dispatch }, updateAmount, { id: 1, amount: 2 }).toPromise();
    expect(dispatch).toHaveBeenCalledWith(addToCartError());
  });
});
