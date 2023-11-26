// Step 3 예제
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


// 직접 만든 Fromis9 출력
console.log("Fromis9:", 1);
let fromis9 = new Fromis9((resolve, reject) => {
  console.log("Fromis9:", 2);
  // throw new Error("에러야");
  resolve(3);
  // reject(3);
  console.log("Fromis9:", 4);
});
console.log("Fromis9:", 5);
fromis9.then((value) => {
  console.log("Fromis9:", "then1", value);
}).then((value) => {
  console.log("Fromis9:", "then2", value);
}).catch(error => {
  console.error("Fromis9", "error", error);
});
console.log("Fromis9:", 6);