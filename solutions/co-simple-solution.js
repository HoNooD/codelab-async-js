function deferred(val) {
  return new Promise((resolve, reject) => resolve(val));
}

co(function* asyncAdds() {
  console.log(yield deferred(1)); // 1
  console.log(yield deferred(2)); // 2
  console.log(yield deferred(3)); // 3
  return 4;
}).then(function (result) {
  console.log(result); // 4
});

function co(generator) {
  return new Promise((resolve, reject) => {
    const g = generator();

    function next(nextVal) {
      const ret = g.next(nextVal);
      if (ret.done) {
        return resolve(ret.value);
      }

      ret.value.then(next);
    }
    next();
  });
}
