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


// 직접 만든 Fromise9 출력
console.log("Fromise9:", 1);
let fromise9 = new Fromise9((resolve, reject) => {
  console.log("Fromise9:", 2);
  // throw new Error("에러야");
  resolve(3);
  console.log("Fromise9:", 4);
});
console.log("Fromise9:", 5);
fromise9.then((value) => {
  console.log("Fromise9:", "then1", value);
})
console.log("Fromise9:", 6);