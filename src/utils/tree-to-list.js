import _get from 'lodash.get';

/**
 * Преобразование иерархии в список
 * @param node {Array} Узел дерева
 * @param childrenKey {String} Свойство-массив, от куда брать отношения на подчиенные объекты
 * @returns {Array} Корневые узлы
 */
export default function treeToList(node, childrenKey = 'children') {
  let list = [node];
  const children = _get(node, childrenKey, []);
  for (const child of children) {
    list = list.concat(treeToList(child, childrenKey));
  }
  return list;
}
