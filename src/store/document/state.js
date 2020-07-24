export const types = {
  SET: Symbol('SET'),
};

/**
 * Начальное состояние
 * @type {Object}
 */
export default {
  data: '',
  params: {
    path: 'index.md',
  },
  wait: false,
  errors: null,
};
