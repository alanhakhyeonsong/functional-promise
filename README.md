# functional-promise
JavaScript의 Promise를 단계별로 직접 만들어보자. (feat. Geomma)

- `Promise`의 내부 스펙을 모른 채로 입출력을 보고 이를 역추적한 결과로 구현합니다.
  - then, catch
  - 내부 예외 처리
  - Promise 체이닝
  - 정적 메서드들
- 각 Step은 branch로 분리하였으니 세부 commit 기록을 보면 됩니다.
- `Fromis9`이 직접 만든 Promise 입니다. (팬은 아니고 드립임...)
- 함수형으로 구현하였기에 내부에 들어가는 callback, 비동기 처리의 로직 흐름을 잘 이해해야 합니다.
  - JavaScript의 Call Stack, Microtask Queue의 동작 원리와 순서를 이해해야 함.
  - 동기식 flow와 비동기식 flow가 혼재되어 있으므로 디버그를 해보는 것을 추천함.
