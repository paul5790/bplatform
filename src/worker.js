// // worker.js
// import * as XLSX from "xlsx";
// import JSZip from "jszip";
// import Papa from "papaparse";
// // worker.js
// self.onmessage = async (event) => {
//   const { selectedData, selectDownlodFormat, downloadData, daterange } = event.data;
//   const zip = new JSZip();
//   const dataValues = Object.values(selectedData);

//   if (selectDownlodFormat === "xlsx") {
//     // xlsx 선택 시
//     const workbook = XLSX.utils.book_new();
//     for (let i = 0; i < downloadData.length; i++) {
//       const worksheet = XLSX.utils.json_to_sheet(downloadData[i]);
//       XLSX.utils.book_append_sheet(workbook, worksheet, dataValues[i]);
//     }
//     // 파일 다운로드
//     const blob = await new Response(XLSX.write(workbook, { bookType: "xlsx", type: "blob" })).blob();
//     self.postMessage({ blob, fileName: `${daterange}_xlsx.xlsx` });
//   } else {
//     for (let i = 0; i < downloadData.length; i++) {
//       let content, fileName;

//       if (selectDownlodFormat === "csv") {
//         // csv 선택 시
//         content = Papa.unparse(downloadData[i]);
//         fileName = `${dataValues[i]}_csv.csv`;
//       } else if (selectDownlodFormat === "txt") {
//         // txt 선택 시
//         content = JSON.stringify(downloadData[i], null, 2);
//         fileName = `${dataValues[i]}_txt.txt`;
//       }

//       // xlsx가 아닌 경우 파일을 zip에 추가
//       if (selectDownlodFormat !== "xlsx") {
//         zip.file(fileName, content);
//       }
//     }
//     // zip 파일 다운로드
//     const zipBlob = await zip.generateAsync({ type: "blob" });
//     self.postMessage({ blob: zipBlob, fileName: `${daterange}_${selectDownlodFormat}.zip` });
//   }
// };


// worker.js
import JSZip from "jszip";
import * as XLSX from "xlsx";
import Papa from "papaparse";
onmessage = function (event) {
  const { downloadData, dataValues1, selectDownlodFormat, daterange } = event.data;
  try {
    const zip = new JSZip();
    const dataValues = Object.values(downloadData);

    if (selectDownlodFormat === "xlsx") {
      const workbook = XLSX.utils.book_new();
      for (let i = 0; i < downloadData.length; i++) {
        const worksheet = XLSX.utils.json_to_sheet(downloadData[i].value);
        XLSX.utils.book_append_sheet(workbook, worksheet, dataValues1[i]);
      }
      const xlsxBlob = XLSX.write(workbook, { bookType: "blob", type: "blob" });
      postMessage({ blob: xlsxBlob, fileName: `${daterange}_xlsx.xlsx` });
    } else {
      for (let i = 0; i < downloadData.length; i++) {
        let content, fileName;

        if (selectDownlodFormat === "csv") {
          content = Papa.unparse(downloadData[i].value);
          fileName = `${dataValues[i]}_csv.csv`;
        } else if (selectDownlodFormat === "txt") {
          content = JSON.stringify(downloadData[i].value, null, 2);
          fileName = `${dataValues[i]}_txt.txt`;
        }

        zip.file(fileName, content);
      }

      const zipBlob = zip.generateAsync({ type: "blob" });
      postMessage({ blob: zipBlob, fileName: `${daterange}_${selectDownlodFormat}.zip` });
    }
  } catch (error) {
    postMessage({ error: `다운로드 할 데이터가 존재하지 않습니다. 선택한 형식: ${selectDownlodFormat}`, fileName: null });
  }
};
