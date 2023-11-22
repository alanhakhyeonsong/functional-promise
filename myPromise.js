let Fromise9 = function Fromise9(callback) {
  let _resolve = function (value) {
    queueMicrotask(() => {
      _success(value);
    })
  }

  let _reject = function (value) {
    queueMicrotask(() => {
      _error(value);
    })
  };

  let _success;
  let _error;

  this.then = function(success, error) {
    _success = success;
    _error = error;

    return this;
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

// 예제 출력
console.log("Promise:", 1);
let promise = new Promise((resolve, reject) => {
  console.log("Promise:", 2);
  //throw new Error('에러야');
  resolve(3);
  // reject(3);
  console.log("Promise:", 4);
});
console.log("Promise:", 5);
promise.then((value) => {
  console.log("Promise:", "then1", value);
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