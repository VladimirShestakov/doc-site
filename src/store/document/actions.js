import store from '@store';
import mc from 'merge-change';
import initState, { types } from './state.js';
import {content as apiContent} from '@api';

const actions = {
  /**
   * Инициализация параметров и данных
   * К начальным параметрам сливаются сохраненные из location.search и переданные в params
   * @param params {Object} Новые параметры. Переопределяют начальные и сохраненные параметры
   * @returns {Promise}
   */
  init: async (params = {}) => {
    // В основе начальные параметры
    let newParams = { ...initState.params };
    // Сливаем новые параметры
    newParams = mc.merge(newParams, params);
    // Установка параметров и загрузка данных по ним
    return actions.set(newParams, { mergeParams: false, loadData: true, clearData: true });
  },

  /**
   * Сброс состояния
   * @param params {Object} Новые параметры. Переопределяют начальные параметры
   * @param options {Object} Опции, влияющие на логику смены параметров и загрузки новых данных
   *   loadData {Boolean} Загружать данные по новым параметрам
   *   clearData {Boolean} Сбросить текущие данные
   * @returns {Promise}
   */
  reset: async (params = {}, options = {}) => {
    options = Object.assign({ loadData: false, clearData: true, mergeParams: false }, options);
    // Сливаем начальные и новые параметры
    let newParams = mc.merge(initState.params, params);
    return actions.set(newParams, options);
  },

  /**
   * Установка новых параметров и загрузка данных по ним
   * @param params {Object} Новые параметры. Переопределяют текущие если mergeParams или полностью заменяют их
   * @param options {Object} Опции, влияющие на логику смены параметров и загрузки новых данных
   *  loadData {Boolean} Загружать данные по новым параметрам
   *  clearData {Boolean} Сбросить текущие данные
   *  mergeParams {Boolean} Объединять новые параметры с текущим. Иначе полная замена на новые.
   * @returns {Promise}
   */
  set: async (params = {}, options = {}) => {
    options = Object.assign({ mergeParams: true, loadData: true, clearData: false }, options);
    try {
      // Учитывая текущие параметры, установить новые.
      let prevState = store.getState().document;
      let newParams = options.mergeParams ? mc.merge(prevState.params, params) : params;

      // Установка параметров, ожидания и сброс данных, если нужно
      if (options.clearData) {
        // Пока загружаются данные, текущие сбросить
        store.dispatch({
          type: types.SET,
          payload: mc.merge(initState, { params: newParams, wait: options.loadData }),
        });
      } else {
        // Пока загружаются данные, чтобы показывались текущие
        store.dispatch({
          type: types.SET,
          payload: { wait: options.loadData, params: newParams, errors: null },
        });
      }

      // Загрузка данные по новым параметрам
      if (options.loadData) {
        // console.log('load', newParams.path);
        const page = await apiContent.getOne({path: newParams.path});
        // console.log(page);
        // const page = await import(/* webpackChunkName: "content" */`@content/${newParams.path}`);
        // Установка полученных данных в состояние
        store.dispatch({
          type: types.SET,
          payload: { data: page.data, wait: false, errors: null },
        });
      }
      return true;
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
