// worker.js
import * as XLSX from "xlsx";
onmessage = function (e) {
  const { downloadData, dataValues1, daterange } = e.data;

  try {
    const workbook = XLSX.utils.book_new();
    console.log(dataValues1);
    for (let i = 0; i < downloadData.length; i++) {
      const worksheet = XLSX.utils.json_to_sheet(downloadData[i].value);
      XLSX.utils.book_append_sheet(workbook, worksheet, dataValues1[i]);
    }
    XLSX.writeFile(workbook, daterange);
  } catch (error) {
    alert("다운로드 할 데이터가 존재하지 않습니다.");
    console.log(error);
  }

  postMessage("download completed");
};
