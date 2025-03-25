// Debounce
let timeout;

function debounce(func, wait = 300, immediate = false) {
  // Clear timer
  if (timeout !== null) {
    clearTimeout(timeout);
  }
  // Immediate execution
  if (immediate) {
    var callNow = !timeout;
    timeout = setTimeout(function () {
      timeout = null;
    }, wait);
    if (callNow) typeof func === "function" && func();
  } else {
    timeout = setTimeout(function () {
      typeof func === "function" && func();
    }, wait);
  }
}

export default debounce;
