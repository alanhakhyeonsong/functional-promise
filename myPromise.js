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

      if (result instanceof Fromis9) {
        result.then(value => {
          _nextReject && _nextReject(value);
        });
      } else {
        if (!_error) {
          if (_nextReject) {
            _nextReject && _nextReject(value);
          } else {
            console.error(value);
          }
        }
      }
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

    return new Fromis9((resolve, reject) => {
      _nextResolve = resolve;
      _nextReject = reject;
    });
  }
  
  try {
    callback(_resolve, _reject);
  } catch (e) {
    _reject(e);
  }
};

/* -------------------------------------------- */

let getBuyCount = function () {
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

let getBuyCountFromis9 = function () {
  console.log("Fromis9:", 2);

  let fromis9 = new Fromis9((resolve, reject) => {
    console.log("Fromis9:", 3);
    setTimeout(() => {
      resolve(4);
    }, 1000);
    console.log("Fromis9:", 5);
  });
  console.log("Fromis9:", 6);
  return fromis9;
};

let getPointFromis9 = function (buyCount) {
  return new Fromis9((resolve, reject) => {
    setTimeout(() => {
      resolve(buyCount * 3000);
    }, 1000);
  });
};

/* -------------------------------------------- */

// 예제 출력
// console.log("Promise:", 1);
// getBuyCount()
//   .then(getPoint)
//   .then((value) => {
//     console.log("Promise:", "then2", value);
//   }).catch(error => {
//     console.error("Promise:", "error", error);
//   });
// console.log("Promise:", 7);

let promise = function() {
  return new Promise((resolve, reject) => {
    reject(undefined);
  });
};

promise().then(value => {
  console.log('Promise then', value);
}).catch(error => {
  console.log('Promise catch', error);
}).catch(error => {
  console.log('Promise catch2', error);
});


// 직접 만든 Fromis9 출력
// console.log("Fromis9:", 1);
// getBuyCountFromis9()
//   .then(getPointFromis9)
//   .then((value) => {
//     console.log("Fromis9:", "then2", value);
//   }).catch(error => {
//     console.error("Fromis9", "error", error);
//   });
// console.log("Fromis9:", 7);

let fromis9 = function() {
  return new Fromis9((resolve, reject) => {
    reject(undefined);
  });
};

fromis9().then(value => {
  console.log('Fromis9 then', value);
}).catch(error => {
  console.log('Fromis9 catch', error);
}).catch(error => {
  console.log('Fromis9 catch2', error);
});