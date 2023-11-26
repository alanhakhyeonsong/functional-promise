// Step 9 예제
Promise.all([
  new Promise((resolve, reject) => setTimeout(() => resolve(1), 1000)),
  new Promise((resolve, reject) => setTimeout(() => resolve(2), 1000)),
  new Promise((resolve, reject) => setTimeout(() => resolve(3), 1000))
]).then(value => console.log("Promise all!", "case1", value))
  .catch(console.error);

Fromis9.all([
  new Fromis9((resolve, reject) => setTimeout(() => resolve(1), 1000)),
  new Fromis9((resolve, reject) => setTimeout(() => resolve(2), 1000)),
  new Fromis9((resolve, reject) => setTimeout(() => resolve(3), 1000))
]).then(value => console.log("New Promise all!", "case1", value))
  .catch(console.error);

Promise.race([
  new Promise((resolve, reject) => setTimeout(() => resolve(1), 1000)),
  new Promise((resolve, reject) => setTimeout(() => resolve(2), 2000)),
  new Promise((resolve, reject) => setTimeout(() => resolve(3), 3000))
]).then(value => console.log("Promise race!", "case1", value))
  .catch(console.error);

Fromis9.race([
  new Fromis9((resolve, reject) => setTimeout(() => resolve(1), 1000)),
  new Fromis9((resolve, reject) => setTimeout(() => resolve(2), 2000)),
  new Fromis9((resolve, reject) => setTimeout(() => resolve(3), 3000))
]).then(value => console.log("New Promise race!", "case1", value))
  .catch(console.error);

Promise.race([
  new Promise((resolve, reject) => {
    resolve(4);
  }),
  5,
  6
]).then(value => console.log("Pormise race!", "case2", value));

Fromis9.race([
  new Fromis9((resolve, reject) => {
    resolve(4);
  }),
  5,
  6
]).then(value => console.log("New Pormise race!", "case2", value));

Promise.allSettled([
  new Promise((resolve, reject) => setTimeout(() => resolve(1), 1000)),
  new Promise((resolve, reject) => setTimeout(() => reject(2), 1000)),
  new Promise((resolve, reject) => setTimeout(() => resolve(3), 1000))
]).then(value => console.log("Promise all!", "case1", value))
  .catch(console.error);

Fromis9.allSettled([
  new Fromis9((resolve, reject) => setTimeout(() => resolve(1), 1000)),
  new Fromis9((resolve, reject) => setTimeout(() => reject(2), 1000)),
  new Fromis9((resolve, reject) => setTimeout(() => resolve(3), 1000))
]).then(value => console.log("New Promise all!", "case1", value))
  .catch(console.error);

Promise.resolve([1,2,3]).then(value => console.log("Promise resolve!", "case1", value));
Promise.resolve(new Error("에라이")).then(value => console.log("Promise resolve!", "case2", value));
Promise.resolve(undefined).then(value => console.log("Promise resolve!", "case3", value));

Fromis9.resolve([1,2,3]).then(value => console.log("Fromis9 resolve!", "case1", value));
Fromis9.resolve(new Error("에라이")).then(value => console.log("Fromis9 resolve!", "case2", value));
Fromis9.resolve(undefined).then(value => console.log("Fromis9 resolve!", "case3", value));

Promise.reject(new Error("에라이")).then(value => console.log("Promise reject!", "case1", value));
Promise.reject(1).then(value => console.log("Promise reject!", "case2", value));
Promise.reject(undefined).then(value => console.log("Promise reject!", "case3", value));

Fromis9.reject(new Error("에라이")).then(value => console.log("Fromis9 reject!", "case1", value));
Fromis9.reject(1).then(value => console.log("Fromis9 reject!", "case2", value));
Fromis9.reject(undefined).then(value => console.log("Fromis9 reject!", "case3", value));