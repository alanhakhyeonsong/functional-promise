// Step 5 예제
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
getBuyCountFromis9()
  .then(getPointFromis9)
  .then((value) => {
    console.log("Fromis9:", "then2", value);
  }).catch(error => {
    console.error("Fromis9", "error", error);
  });
console.log("Fromis9:", 7);