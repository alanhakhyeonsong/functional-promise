let Fromis9 = function Fromis9(callback) {
  let _state = 'pending';
  let _success;
  let _error;
  let _nextResolve;
  let _nextReject;

  let _resolve = function (value) {
    _state = 'fulfilled';
    
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
    _state = 'rejected';

    queueMicrotask(() => {
      try {
        let result = _error && _error(value);
  
        if (result instanceof Fromis9) {
          result.then(
            value => { _nextResolve && _nextResolve(value); },
            error => { _nextReject && _nextReject(error); }
          );
        } else {
          if (_error) {
            _nextResolve(result);
          } else {
            if (_nextReject) {
              _nextReject(value);
            } else {
              console.error('Uncaught (in Fromis9)', value);
            }
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

Fromis9.resolve = function (value) {
  return new Fromis9(resolve => resolve(value));
};

Fromis9.reject = function (value) {
  return new Fromis9((resolve, reject) => reject(value));
};

Fromis9.all = function (fromis9s) {
  let result = [];
  let count = 0;

  return new Fromis9((resolve, reject) => {
    fromis9s.forEach((fromis9, index) => {
      fromis9.then(
        value => {
          result[index] = value;
          (++count == fromis9s.length) && resolve(result);
        },
        reject
      )
    });
  });
};

Fromis9.race = function (fromis9s) {
  let result = [];
  let count = 0;

  return new Fromis9((resolve, reject) => {
    fromis9s.forEach((fromis9, index) => {
      fromis9 = (fromis9 instanceof Fromis9) ? fromis9 : Fromis9.resolve(fromis9);

      fromis9.then(
        value => {
          if (++count === 1) resolve(value);
        },
        error => {
          if (++count === 1) reject(error);
        },
      );
    });
  });
};

Fromis9.allSettled = function (fromis9s) {
  let result = [];
  let count = 0;
  
  return new Fromis9((resolve, reject) => {
    fromis9s.forEach((fromis9, index) => {
      fromis9.then(
        value => {
          result[index] = {status: 'fulfilled', value: value};
          (++count == fromis9s.length) && resolve(result);
        },
        error => {
          result[index] = {status: 'rejected', value: error};
          (++count == fromis9s.length) && resolve(error);
        },
      );
    });
  });
};