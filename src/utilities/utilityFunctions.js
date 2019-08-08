/**
 *
 * @param {function} func
 * @param {milliseconds} time
 *
 * @description: debounce takes in a function to run after a specified time.
 */

const debounce = (func, time) => {
  let timeout;
  return function() {
    const functionCall = () => func.apply(this, arguments);

    clearTimeout(timeout);
    timeout = setTimeout(functionCall, time);
  };
};

export default debounce;
