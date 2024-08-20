// src/api/index.js
import axios from "axios";

// const apiLocation = "bdpback.ias.xinnos.com";
// const apiLocation = "10.16.152.120:9999";
// const apiLocation = "192.168.0.32:9998";
// import { apiLocation } from "../../public/api.js";
// 전역 변수를 선언
let apiLocation = "";

// config.json 파일을 로드하고 apiLocation 값을 설정
const loadConfig = async () => {
  try {
    const response = await fetch('/config.json');
    const config = await response.json();
    apiLocation = config.apiLocation;
  } catch (error) {
    console.error('Error loading config:', error);
  }
};

// 앱이 실행될 때 config를 로드
await loadConfig();

export const cctvUrl = `http://${apiLocation}/api/v1/stream/index.m3u8`;


// 취소 토큰 생성
let cancelTokenSource = axios.CancelToken.source();

// 로그인 v1
export const checkLogin = async (data) => {
  try {
    const response = await axios.post(
      `http://${apiLocation}/api/v1/login`,
      data,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};

// 회원가입 v1
export const createMineData = async (data) => {
  try {
    const response = await axios.post(
      `http://${apiLocation}/api/v1/join`,
      data,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};

// 비밀번호 확인 v1
export const readPwData = async (tokenid, pw) => {
  try {
    const response = await axios.post(
      `http://${apiLocation}/api/v1/auth/admin/admin_check`,
      pw,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${tokenid}`,
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};

// 초기 비밀번호 수정 v1
export const resetPwData = async (tokenid, pw) => {
  try {
    const response = await axios.put(
      `http://${apiLocation}/api/v1/auth/admin/initial_password`,
      pw,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${tokenid}`,
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};

// 개인정보 가져오기 v1
export const readMineData = async (tokenid) => {
  try {
    const response = await axios.get(`http://${apiLocation}/api/v1/auth/user`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${tokenid}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};

// 개인정보 변경 v1
export const updateMineData = async (tokenid, data) => {
  try {
    const response = await axios.put(
      `http://${apiLocation}/api/v1/auth/user`,
      data,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${tokenid}`,
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};

// 비밀번호 업데이트 v1
export const updatePassword = async (tokenid, data) => {
  try {
    const response = await axios.put(
      `http://${apiLocation}/api/v1/auth/user/password`,
      data,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${tokenid}`,
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};

// 비밀번호 초기화 v1
export const resetPassword = async (tokenid, data) => {
  try {
    const response = await axios.put(
      `http://${apiLocation}/api/v1/auth/admin/user/password`,
      data,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${tokenid}`,
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};

// 사용자 데이터 받아오기 v1
export const readUserData = async (tokenid) => {
  try {
    const response = await axios.get(
      `http://${apiLocation}/api/v1/auth/admin/user`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${tokenid}`,
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};

// 사용자 데이터 수정하기 v1
export const updateUserData = async (tokenid, data) => {
  try {
    const response = await axios.put(
      `http://${apiLocation}/api/v1/auth/admin/user`,
      data,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${tokenid}`,
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};

// 사용자 데이터 삭제하기 v1
export const deleteUserData = async (tokenid, data) => {
  try {
    const response = await axios.delete(
      `http://${apiLocation}/api/v1/auth/admin/user`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${tokenid}`,
        },
        data: data, // data를 옵션 객체 내에 포함시킵니다.
      }
    );

    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};

// 웹 로그 가져오기
export const readWebLogData = async (tokenid, filter) => {
  try {
    const response = await axios.get(
      `http://${apiLocation}/api/v1/log/${filter}`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${tokenid}`,
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};

// 앱 로그 가져오기
export const readAppLogData = async (tokenid) => {
  try {
    const response = await axios.get(
      `http://${apiLocation}/api/v1/log/winapp`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${tokenid}`,
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};

// 데이터 별 소실주기 읽기 v1
export const readLossTimeData = async (tokenid) => {
  try {
    const response = await axios.get(
      `http://${apiLocation}/api/v1/lossfreq`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${tokenid}`,
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};

// 데이터 별 소실주기 수정
export const updateLossTimeData = async (tokenid, data) => {
  try {
    const response = await axios.put(
      `http://${apiLocation}/api/v1/lossfreq`,
      data,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${tokenid}`,
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};

// 실시간 모니터링의 데이터 주기 읽기 v1
export const readLampTimeData = async (tokenid) => {
  try {
    const response = await axios.get(
      `http://${apiLocation}/api/v1/lamptime`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${tokenid}`,
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};

// 실시간 모니터링의 데이터 주기 수정 v1
export const updateSetTime = async (tokenid, data) => {
  try {
    const response = await axios.put(
      `http://${apiLocation}/api/v1/lamptime`,
      data,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${tokenid}`,
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};

// 실시간 모니터링의 데이터 min max값 읽어오기 v1  readRealtimeMinMax
export const readRealtimeMinMax = async (tokenid) => {
  try {
    const response = await axios.get(
      `http://${apiLocation}/api/v1/realtime_signal_info`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${tokenid}`,
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};

// 실시간 모니터링의 데이터 주기 수정 v1
export const updateRealtimeMinMax = async (tokenid, data) => {
  try {
    const response = await axios.put(
      `http://${apiLocation}/api/v1/realtime_signal_info`,
      data,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${tokenid}`,
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};


// 데이터 소실 빈도 확인 v1
export const readlossData = async (
  tokenid, testName
) => {
  try {
    const response = await axios.get(
      `http://${apiLocation}/api/v1/lossfreq/all?test_name=${testName}`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${tokenid}`,
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};

// 항차 데이터 가져오기 v1
export const readTrialData = async (tokenid) => {
  try {
    const response = await axios.get(
      `http://${apiLocation}/api/v1/test`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${tokenid}`,
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};

// 항차 데이터 추가하기 v1
export const createTrialData = async (tokenid, data) => {
  try {
    const response = await axios.post(
      `http://${apiLocation}/api/v1/test`,
      data,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${tokenid}`,
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};

// 항차 데이터 수정하기 v1
export const updateTrialData = async (tokenid, data) => {
  try {
    const response = await axios.put(
      `http://${apiLocation}/api/v1/test`,
      data,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${tokenid}`,
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};

// 항차 데이터 삭제하기 v1
export const deleteTrialData = async (tokenid, data) => {
  try {
    const response = await axios.delete(`http://${apiLocation}/api/v1/test`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${tokenid}`,
      },
      data: data, // data를 옵션 객체 내에 포함시킵니다.
    });

    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};

// 데이터 조회하기 v1 (테이블)
export const readDataTrial = async (tokenid, data) => {
  try {
    const response = await axios.get(
      `http://${apiLocation}/api/v1/${data}`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${tokenid}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};

// 데이터 다운로드 v1
export const downloadDataFile = async (tokenid, data) => {
  try {
    const response = await axios.get(
      `http://${apiLocation}/api/v1/${data}`,
      {
        responseType: "blob",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${tokenid}`,
        },
        cancelToken: cancelTokenSource.token,
      }
    );
    console.log(response.headers);
    sessionStorage.setItem("downloading", false);
    return response;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};

export const downloadDataFileXml = async (tokenid, formData) => {
  const response = await axios.post(
    `http://${apiLocation}/api/v1/table_data/batch_download`,
    formData,
    {
      responseType: "blob",
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${tokenid}`,
      },
    }
  );
  return response;
};

// (Echart 도넛) 전체 데이터 저장 용량 비교 v1
export const readDataStorage = async (tokenid) => {
  try {
    const response = await axios.get(
      `http://${apiLocation}/api/v1/db/status/tables`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${tokenid}`,
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};

// (Echart 도넛) 항차별 데이터 저장 용량 비교 v1
export const readDataTrialStorage = async (tokenid, trialname) => {
  try {
    const response = await axios.get(
      `http://${apiLocation}/api/v1/db/status/tables/test?test_name=${trialname}`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${tokenid}`,
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};

// (Echart 반도넛) 서버 저장 공간 현황 v1
export const serverStorage = async (tokenid) => {
  try {
    const response = await axios.get(`http://${apiLocation}/api/v1/db/status`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${tokenid}`,
      },
    });

    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};

// 웨이포인트 가져오기 v1
export const readWaypoint = async (tokenid, trial) => {
  try {
    const response = await axios.get(
      `http://${apiLocation}/api/v1/waypoint?test_name=${trial}`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${tokenid}`,
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};

// 항적 가져오기 v1
export const readAis = async (tokenid, trial) => {
  try {
    const response = await axios.get(
      `http://${apiLocation}/api/v1/trajectory?test_name=${trial}`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${tokenid}`,
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};

// 요청 취소 함수
export const cancelDownload = () => {
  cancelTokenSource.cancel("요청이 사용자에 의해 취소되었습니다.");
  // 새로운 cancelTokenSource 생성
  cancelTokenSource = axios.CancelToken.source();
};
