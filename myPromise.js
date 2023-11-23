let Fromis9 = function Fromis9(callback) {
  let _success;
  let _error;
  let _nextResolve;
  let _nextReject;

  let _resolve = function (value) {
    queueMicrotask(() => {
      let result = _success && _success(value);

      if (result instanceof Fromis9) {
        result.then(value => {
          _nextResolve && _nextResolve(value);
        });
      } else {
        _nextResolve && _nextResolve(result);
      }
    })
  }

  let _reject = function (value) {
    queueMicrotask(() => {
      let result = _error && _error(value);
      _nextReject && _nextReject(result);
    })
  };

  this.then = function(success, error) {
    _success = success;
    _error = error;

    return new Fromis9((resolve, reject) => {
      _nextResolve = resolve;
      _nextReject = reject;
    });
  }

  this.catch = function(error) {
    _error = error;

    return this;
  }
  
  try {
    callback(_resolve, _reject);
  } catch (e) {
    _reject(e);
  }
};

/* -------------------------------------------- */

let getBuyCount = function (resolve) {
  console.log('Promise:', 2);
  
  let promise = new Promise((resolve, reject) => {
    console.log('Promise:', 3);
    setTimeout(() => {
      resolve(4);
    }, 1000);
    console.log('Promise:', 5);
  })
  console.log('Promise:', 6);
  return promise;
};

let getPoint = function (buyCount) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(buyCount * 3000);
    }, 1000);
  });
};

/* -------------------------------------------- */

let getBuyCountFromis9 = function (resolve) {
  setTimeout(() => {
    resolve(3);
  }, 1000);
};

let getPointFromis9 = function (buyCount, resolve) {
  setTimeout(() => {
    resolve(buyCount * 3000);
  }, 1000);
};

/* -------------------------------------------- */

// 예제 출력
console.log("Promise:", 1);
getBuyCount()
  .then(getPoint)
  .then((value) => {
    console.log("Promise:", "then2", value);
  }).catch(error => {
    console.error("Promise:", "error", error);
  });
console.log("Promise:", 7);


// 직접 만든 Fromis9 출력
console.log("Fromis9:", 1);
let fromis9 = new Fromis9((resolve, reject) => {
  console.log("Fromis9:", 2);
  // throw new Error("에러야");
  // resolve(3);
  // reject(3);
  getBuyCountFromis9(resolve);
  console.log("Fromis9:", 4);
});
console.log("Fromis9:", 5);
fromis9.then((value) => {
  console.log("Fromis9:", "then1", value);
  return new Fromis9((resolve, reject) => {
    getPointFromis9(value, resolve);
  });
}).then((value) => {
  console.log("Fromis9:", "then2", value);
}).catch(error => {
  console.error("Fromis9", "error", error);
});
console.log("Fromis9:", 6);