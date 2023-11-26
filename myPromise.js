let Fromis9 = function Fromis9(callback) {
  let _success;
  let _error;
  let _nextResolve;
  let _nextReject;

  let _resolve = function (value) {
    queueMicrotask(() => {
      try {
        let result = _success && _success(value);
        
        if (result instanceof Fromis9) {
          result.then(
            value => { _nextResolve && _nextResolve(value); },
            error => { _nextReject && _nextReject(error); }
          );
        } else {
          result = _success ? result : value;
          _nextResolve && _nextResolve(result);
        }
      } catch (e) {
        _nextReject && _nextReject(e);
      }
    });
  }
  
  let _reject = function (value) {
    queueMicrotask(() => {
      try {
        let result = _error && _error(value);
  
        if (result instanceof Fromis9) {
          result.then(
            value => { _nextResolve && _nextResolve(value); },
            error => { _nextReject && _nextReject(error); }
          );
        } else {
          if (!_error) {
            if (_nextReject) {
              _nextReject(value);
            } else {
              console.error('Uncaught (in Fromis9)', value);
            }
          } else {
            _nextResolve(result);
          }
        }
      } catch (e) {
        _nextReject && _nextReject(e);
      }
    });
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

// 예제 출력
let promise = function() {
  return new Promise((resolve, reject) => {
    // throw new Error('throw Error');
    // reject(new Error('reject Error'));
    resolve(3);
  });
};

promise().then(value => {
  console.log('Promise then', value);
  throw new Error('then error');
  // return new Promise((resolve, reject) => {
    // new Error('promise then new Error')
    // reject(new Error('promise then new Error'));
  // });
}).catch(error => {
  console.log('Promise catch', error);
  throw new Error('catch error');
  return 'catch';
  // return new Promise((resolve, reject) => {
  //   reject('catchResolve');
  // });
}).catch(error => {
  console.log('Promise catch2', error);
  return 'catch2';
}).then(value => {
  console.log('Promise then2', value);
});


// 직접 만든 Fromis9 출력
let fromis9 = function() {
  return new Fromis9((resolve, reject) => {
    // throw new Error('throw Error');
    // reject(new Error('reject Error'));
    resolve(3);
  });
};

fromis9().then(value => {
  console.log('Fromis9 then', value);
  throw new Error('then error');
  // return new Fromis9((resolve, reject) => {
    // new Error('fromis9 then new Error')
    // reject(new Error('fromis9 then new Error'));
  // });
}).catch(error => {
  console.log('Fromis9 catch', error);
  throw new Error('catch error');
  return 'catch';
  // return new Fromis9((resolve, reject) => {
  //   reject('catchResolve');
  // });
}).catch(error => {
  console.log('Fromis9 catch2', error);
  return 'catch2'
}).then(value => {
  console.log('Fromis9 then2', value);
});