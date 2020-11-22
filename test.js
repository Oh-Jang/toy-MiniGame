let count = 100;
console.log(count)
function timer() {
  count = setInterval(() => {
    console.log(count)
  }, 1000);
};
timer();
console.log(count)