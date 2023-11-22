// 예제 출력
console.log("Promise:", 1);
let promise = new Promise((resolve, reject) => {
  console.log("Promise:", 2);
  //throw new Error('에러야');
  resolve(3);
  console.log("Promise:", 4);
});
console.log("Promise:", 5);
promise.then((value) => {
  console.log("Promise:", "then1", value);
});

console.log("Promise:", 6);