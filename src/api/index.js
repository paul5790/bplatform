// src/api/index.js
import axios from "axios";

const apiLocation = "192.168.0.73:8080";

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

// 데이터 소실주기
export const updateSetTime = async (tokenid, data) => {
  try {
    const response = await axios.post(
      `http://${apiLocation}/info/update/settime`,
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

// 데이터 소실 빈도 확인
export const readlossData = async (tokenid, endpoint, trialnum, settingtime) => {
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


// 데이터 조회하기 (항차)
export const readDataTrial = async (tokenid, data, selectedtrialNum) => {
  try {
    const response = await axios.post(
      `http://${apiLocation}/data/${data}/${selectedtrialNum}`,
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
