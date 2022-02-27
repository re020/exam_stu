/**
 * @param {any[]} arr
 */
export function countOf(arr, func) {
  if (!Array.isArray(arr) || typeof func !== 'function') {
    throw new TypeError('countOf 参数错误');
  }
  let acc = 0;
  arr.forEach(value => {
    if (func(value)) acc += 1;
  });
  return acc;
}

export function getIDStringByTypeIndexAndQuestionIndex(typeIndex, questionIndex) {
  if (typeof typeIndex !== 'number' || typeof questionIndex !== 'number') {
    throw new TypeError('getIDStringByTypeIndexAndQuestionIndex  参数错误');
  }

  return `id-type${typeIndex}-question${questionIndex}`;
}
