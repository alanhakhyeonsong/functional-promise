let Fromise9 = function Fromise9(callback) {
  let _success;
  let _error;
  let _nextResolve;
  let _nextReject;

  let _resolve = function (value) {
    queueMicrotask(() => {
      let result = _success && _success(value);
      _nextResolve && _nextResolve(result);
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

    return new Fromise9((resolve, reject) => {
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

let getBuyCount = function (resolve) {
  setTimeout(() => {
    resolve(3);
  }, 1000);
};

let getPoint = function (buyCount, resolve) {
  setTimeout(() => {
    resolve(buyCount * 3000);
  }, 1000);
};

// 예제 출력
console.log("Promise:", 1);
let promise = new Promise((resolve, reject) => {
  console.log("Promise:", 2);
  //throw new Error('에러야');
  // resolve(3);
  // reject(3);
  getBuyCount(resolve);
  console.log("Promise:", 4);
});
console.log("Promise:", 5);
promise.then((value) => {
  console.log("Promise:", "then1", value);
  return new Promise((resolve, reject) => {
    getPoint(value, resolve);
  });
}).then((value) => {
  console.log("Promise:", "then2", value);
}).catch(error => {
  console.error("Promise:", "error", error);
});
console.log("Promise:", 6);


// 직접 만든 Fromise9 출력
console.log("Fromise9:", 1);
let fromise9 = new Fromise9((resolve, reject) => {
  console.log("Fromise9:", 2);
  // throw new Error("에러야");
  resolve(3);
  // reject(3);
  console.log("Fromise9:", 4);
});
console.log("Fromise9:", 5);
fromise9.then((value) => {
  console.log("Fromise9:", "then1", value);
}).then((value) => {
  console.log("Fromise9:", "then2", value);
}).catch(error => {
  console.error("Fromise9", "error", error);
});
console.log("Fromise9:", 6);