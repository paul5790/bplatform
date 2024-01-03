// worker.js
import JSZip from "jszip";
import Papa from "papaparse";
onmessage = async function (event) {
  const {
    downloadData,
    sheetName,
    selectDownlodFormat,
    daterange,
    dataValues,
  } = event.data;

  try {
    const zip = new JSZip();

    if (selectDownlodFormat === "xlsx") {
      // xlsx 선택 시
      // XLSX 관련 코드를 여기에 추가할 수 없음 (웹 워커에서 직접 사용 불가)
    } else {
      for (let i = 0; i < downloadData.length; i++) {
        let content, fileName;

        if (selectDownlodFormat === "csv") {
          // csv 선택 시
          content = Papa.unparse(downloadData[i].value);
          fileName = `${dataValues[i]}_csv.csv`;
        } else if (selectDownlodFormat === "txt") {
          // txt 선택 시
          content = JSON.stringify(downloadData[i].value, null, 2);
          fileName = `${dataValues[i]}_txt.txt`;
        }

        zip.file(fileName, content);
      }
      // zip 파일 다운로드
      const zipBlob = await zip.generateAsync({ type: "blob" });
      postMessage({ blob: zipBlob });
    }
  } catch (error) {
    postMessage({
      error: `다운로드 할 데이터가 존재하지 않습니다. 선택한 형식: ${selectDownlodFormat}`,
      blob: null,
    });
  }
};
