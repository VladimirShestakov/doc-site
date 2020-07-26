import store from '@store';
import * as api from '@api';
import listToTree from '@utils/list-to-tree';
import mc from 'merge-change';
import treeToList from '@utils/tree-to-list';
import {content as apiContent} from '@api';

export const types = {
  SET: Symbol('SET'),
};

/**
 * Начальное состояние
 * @type {Object}
 */
export const initState = {
  items: [],
  roots: [],
  wait: false,
  errors: null,
};

const actions = {
  /**
   * Сброс состояния к начальному
   */
  reset: () => {
    store.dispatch({ type: types.SET, payload: initState });
  },

  /**
   * Загрузка списка из апи
   * @param params Параметры запроса
   * @returns {Promise<*>}
   */
  load: async params => {
    store.dispatch({ type: types.SET, payload: { wait: true, errors: null } });
    try {
      //const result = await import(/* webpackChunkName: "menu.left" */ `@content/menu.left.json`);
      const result = await apiContent.getOne({path: 'menu.left.json'});
      store.dispatch({
        type: types.SET,
        payload: {
          roots: [result.data],
          items: treeToList(result.data),
          wait: false,
          errors: null,
        },
      });
      return result;
    } catch (e) {
      if (e.response?.data?.error?.data) {
        store.dispatch({
          type: types.SET,
          payload: { wait: false, errors: e.response.data.error.data.issues },
        });
      } else {
        throw e;
      }
    }
  },
};

export default actions;
