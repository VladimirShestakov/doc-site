import store from '@store'
import * as api from '@api';

export const types = {
  RESET: Symbol('RESET'),
  LOAD: Symbol('LOAD'),
};

export default {
  /**
   * Сброс состояния к начальному
   */
  reset: () => {
    store.dispatch({type: types.RESET});
  },

  /**
   * Загрузка списка из апи
   * @param params Параметры запроса
   * @returns {Promise<*>}
   */
  load: async params => {
    store.dispatch({type: types.LOAD, payload: {wait: true, errors: null}});
    try {
      const response = await api.articles.getList(params);
      const result = response.data.result;
      store.dispatch({type: types.LOAD, payload: {...result, wait: false, errors: null}});
      return result;
    } catch (e) {
      if (e.response?.data?.error?.data) {
        store.dispatch({
          type: types.LOAD,
          payload: {wait: false, errors: e.response.data.error.data.issues}
        });
      } else {
        throw e;
      }
    }
  },
};
