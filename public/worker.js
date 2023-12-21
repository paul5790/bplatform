onmessage = function (e) {
  const { data, chunkSize } = e.data;
  let index = 0;
  const dataSet = [];

  const addChunk = () => {
    const chunk = data.slice(index, index + chunkSize);
    dataSet.push(...chunk);

    if (index < data.length) {
      index += chunkSize;

      // 더 이상 추가할 데이터가 없을 때만 postMessage 호출
      if (index >= data.length) {
        postMessage({ dataSet });
      } else {
        requestAnimationFrame(addChunk);
      }
    }
  };

  addChunk();
};

// // web-worker.js
// onmessage = function (e) {
//   const { data, chunkSize } = e.data;
//   let index = 0;
//   const dataSet = [];

//   const addChunk = () => {
//     const chunk = data.slice(index, index + chunkSize);
//     dataSet.push(...chunk);

//     if (index < data.length) {
//       index += chunkSize;
//       postMessage({ dataSet });
//       requestAnimationFrame(addChunk);
//     }
//   };

//   addChunk();
// };
