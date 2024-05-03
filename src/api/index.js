// src/api/index.js
import axios from "axios";

const apiLocation = "bdpback.ias.xinnos.com";
// const apiLocation = "192.168.0.73:9999";
export const cctvUrl = `http://${apiLocation}/stream/index.m3u8`;

// 취소 토큰 생성
let cancelTokenSource = axios.CancelToken.source();

// 로그인
export const checkLogin = async (data) => {
  try {
    const response = await axios.post(
      `http://${apiLocation}/auth/login`,
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

// 회원가입
export const createMineData = async (data) => {
  try {
    const response = await axios.post(`http://${apiLocation}/auth/join`, data, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};

// 비밀번호 확인
export const readPwData = async (tokenid, pw) => {
  try {
    const response = await axios.post(
      `http://${apiLocation}/admin/check`,
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

// 비밀번호 확인
export const resetPwData = async (tokenid, pw) => {
  try {
    const response = await axios.post(
      `http://${apiLocation}/admin/set/initialpassword`,
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

// 개인정보 가져오기
export const readMineData = async (tokenid) => {
  try {
    const response = await axios.post(
      `http://${apiLocation}/auth/userinfo/mine`,
      {},
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

// 개인정보 변경
export const updateMineData = async (tokenid, data) => {
  try {
    const response = await axios.post(
      `http://${apiLocation}/auth/userinfo/update/mine`,
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

// 비밀번호 업데이트
export const updatePassword = async (tokenid, data) => {
  try {
    const response = await axios.post(
      `http://${apiLocation}/auth/userinfo/update/password`,
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

// 비밀번호 업데이트
export const resetPassword = async (tokenid, data) => {
  try {
    const response = await axios.post(
      `http://${apiLocation}/admin/auth/userinfo/initialize/password`,
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

// 사용자 데이터 받아오기
export const readUserData = async (tokenid) => {
  try {
    const response = await axios.post(
      `http://${apiLocation}/admin/auth/userinfo/all`,
      {},
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

// 사용자 데이터 수정하기
export const updateUserData = async (tokenid, data) => {
  try {
    const response = await axios.post(
      `http://${apiLocation}/admin/auth/userinfo/update`,
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

// 사용자 데이터 삭제하기
export const deleteUserData = async (tokenid, data) => {
  try {
    const response = await axios.post(
      `http://${apiLocation}/admin/auth/userinfo/delete`,
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

// 웹 로그 가져오기
export const readWebLogData = async (tokenid) => {
  try {
    const response = await axios.post(
      `http://${apiLocation}/admin/get/log/webapp`,
      {},
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

// 웹 로그 가져오기
export const readAppLogData = async (tokenid) => {
  try {
    const response = await axios.post(
      `http://${apiLocation}/admin/get/log/winapp`,
      {},
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

// 실시간 데이터 주기
export const updateSetTime = async (tokenid, data) => {
  try {
    const response = await axios.post(
      `http://${apiLocation}/auth/userinfo/update/lamptime`,
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

// 데이터 별 소실주기 읽기
export const readLossTimeData = async (tokenid) => {
  try {
    const response = await axios.post(
      `http://${apiLocation}/auth/userinfo/get/losstime`,
      {},
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
    const response = await axios.post(
      `http://${apiLocation}/auth/userinfo/update/losstime`,
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

// 데이터 주기 읽기
export const readTimeData = async (tokenid) => {
  try {
    const response = await axios.post(
      `http://${apiLocation}/info/get/settime`,
      {},
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

// 데이터 주기 읽기
export const readLampTimeData = async (tokenid) => {
  try {
    const response = await axios.post(
      `http://${apiLocation}/auth/userinfo/get/lamptime`,
      {},
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

// 데이터 소실 빈도 확인
export const readlossData = async (
  tokenid,
  endpoint,
  trialnum,
  settingtime
) => {
  try {
    const response = await axios.post(
      `http://${apiLocation}/info/lossdata/${endpoint}/${trialnum}/${settingtime}`,
      {},
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

// 항차 데이터 가져오기
export const readTrialData = async (tokenid) => {
  try {
    const response = await axios.post(
      `http://${apiLocation}/info/seatrial`,
      {},
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

// 항차 데이터 추가하기
export const createTrialData = async (tokenid, data) => {
  try {
    const response = await axios.post(
      `http://${apiLocation}/admin/set/info/seatrial`,
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

// 항차 데이터 수정하기
export const updateTrialData = async (tokenid, data) => {
  try {
    const response = await axios.post(
      `http://${apiLocation}/admin/update/info/seatrial`,
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

// 항차 데이터 삭제하기
export const deleteTrialData = async (tokenid, data) => {
  try {
    const response = await axios.post(
      `http://${apiLocation}/admin/delete/info/seatrial`,
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

// 데이터 조회하기
export const readDataTrial = async (tokenid, data, type) => {
  try {
    const response = await axios.post(
      `http://${apiLocation}/data/${type}`,
      data,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${tokenid}`,
        },
      }
    );
    console.log("EEE");
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};

// 데이터 조회하기 (날짜)
export const readDataDate = async (
  tokenid,
  subComponunt,
  content,
  searchStart,
  searchEnd
) => {
  try {
    const response = await axios.post(
      `http://${apiLocation}/data/period`,
      {},
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${tokenid}`,
          subcomp: `${subComponunt}`,
          content: `${content}`,
          start: `${searchStart}`,
          end: `${searchEnd}`,
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};

// 데이터 다운로드
export const downloadDataFile = async (tokenid, data) => {
  try {
    const response = await axios.post(
      `http://${apiLocation}/data/download`,
      data,
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

// (Echart 도넛) 전체 데이터 저장 용량 비교
export const readDataStorage = async (tokenid) => {
  try {
    const response = await axios.post(
      `http://${apiLocation}/info/storage/table`,
      {},
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

// (Echart 도넛) 항차별 데이터 저장 용량 비교
export const readDataTrialStorage = async (tokenid, trialnum) => {
  try {
    const response = await axios.post(
      `http://${apiLocation}/info/storage/subcomp/${trialnum}`,
      {},
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

// (Echart 반도넛) 서버 저장 공간 현황
export const serverStorage = async (tokenid) => {
  try {
    const response = await axios.post(
      `http://${apiLocation}/info/storage/db`,
      {},
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

// 웨이포인트 가져오기
export const readWaypoint = async (tokenid, trial) => {
  try {
    const response = await axios.post(
      `http://${apiLocation}/info/waypoints/${trial}`,
      {},
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

// 항적 가져오기
export const readAis = async (tokenid, trial) => {
  try {
    const response = await axios.post(
      `http://${apiLocation}/info/ais/${trial}`,
      {},
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
