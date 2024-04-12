<template>
  <div class="my-app">
    <v-card class="mx-auto">
      <v-list lines="three" select-strategy="classic">
        <v-list-subheader>정보 설정</v-list-subheader>

        <v-list-item @click="privacyDialog = true">
          <v-list-item-title>개인정보 변경</v-list-item-title>

          <v-list-item-subtitle>
            {{ userName }}님의 기본 정보와 연락처 정보를 변경함
          </v-list-item-subtitle>
        </v-list-item>

        <v-list-item @click="passwordchangeDialog = true">
          <v-list-item-title>비밀번호 재설정</v-list-item-title>

          <v-list-item-subtitle>
            {{ userName }}님의 비밀번호를 변경함
          </v-list-item-subtitle>
        </v-list-item>

        <v-list-item v-if="permission === 'ADMIN'" @click="passwordcheckingDialog = true">
          <v-list-item-title>초기 비밀번호 재설정</v-list-item-title>

          <v-list-item-subtitle>
            초기 비밀번호를 변경함 &nbsp;&nbsp;&nbsp;&nbsp;   <span style="font-size: 10px; color: #ff3333;">*ADMIN만 가능</span>
          </v-list-item-subtitle>
        </v-list-item>
      </v-list>

      <v-divider></v-divider>

      <v-list
        v-if="permission === 'ADMIN' || permission === 'USER'"
        lines="three"
        select-strategy="classic"
      >
        <v-list-subheader>주기 설정</v-list-subheader>

        <v-list-item @click="(ALLlosstimeDialog = true), setTimeRefs()">
          <v-list-item-title>데이터 소실 주기 설정</v-list-item-title>

          <v-list-item-subtitle>
            각 장비 별 데이터의 소실 주기를 설정함
          </v-list-item-subtitle>
        </v-list-item>

        <v-list-item @click="realtimeDialog = true">
          <v-list-item-title>실시간 주기 설정</v-list-item-title>

          <v-list-item-subtitle>
            실시간 모니터링에서 들어오는 시간 주기를 설정함
          </v-list-item-subtitle>
        </v-list-item>

        <v-divider></v-divider>

        <v-list-subheader>테마 설정</v-list-subheader>
        <v-list-item>
          <v-btn-toggle
            v-model="themeMode"
            mandatory
            divided
            variant="outlined"
          >
            <v-btn @click="lightMode()" value="light">light mode</v-btn>
            <v-btn @click="darkMode()" value="dark">dark mode</v-btn>
          </v-btn-toggle>
        </v-list-item>
      </v-list>

      <!-- 개인정보 변경 -->
      <v-dialog v-model="privacyDialog" max-width="1024">
        <v-card>
          <v-card-title>개인정보 변경</v-card-title>
          <v-card-text>
            <v-container>
              <v-row>
                <v-col cols="12"><p style="font-size: 13px">기본정보</p></v-col>
                <v-col cols="12" sm="6">
                  <v-text-field
                    label="이름"
                    variant="solo"
                    :rules="rules.Name"
                    persistent-hint
                    v-model="userName"
                    required
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6">
                  <v-text-field
                    label="소속"
                    variant="solo"
                    :rules="rules.Affiliation"
                    type="text"
                    v-model="userDepartment"
                    required
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6">
                  <v-text-field
                    :readonly="true"
                    label="권한"
                    variant="solo"
                    v-model="userGroup"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6">
                  <v-text-field
                    label="설명"
                    variant="solo"
                    v-model="userDescription"
                    hint="선택사항"
                  ></v-text-field>
                </v-col>
                <v-col cols="12"
                  ><p style="font-size: 13px">연락처 정보</p></v-col
                >
                <v-col cols="12">
                  <v-text-field
                    v-model="userEmail"
                    :rules="rules.Email"
                    label="이메일"
                    variant="solo"
                    required
                  ></v-text-field>
                </v-col>
                <v-col cols="12">
                  <v-text-field
                    v-model="userNumber"
                    label="휴대번호"
                    hint="선택사항"
                    variant="solo"
                  ></v-text-field>
                </v-col>
              </v-row>
            </v-container>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              color="blue-darken-1"
              variant="text"
              @click="privacyDialog = false"
              >취소</v-btn
            >
            <v-btn color="blue-darken-1" variant="text" @click="privacypost()"
              >수정</v-btn
            >
          </v-card-actions>
        </v-card>
      </v-dialog>

      <!-- 개인정보 수정 비밀번호 팝업 -->
      <v-dialog v-model="passwordchangeDialog" max-width="500">
        <v-card>
          <v-card-title>비밀번호 변경</v-card-title>
          <v-card-text>
            <v-container>
              <v-row>
                <v-col cols="12"
                  ><p style="font-size: 13px">기존 비밀번호</p></v-col
                >
                <v-col cols="12">
                  <v-text-field
                    :append-inner-icon="visible ? 'mdi-eye' : 'mdi-eye-off'"
                    :type="visible ? 'text' : 'password'"
                    label="기존 비밀번호"
                    variant="solo"
                    :rules="rules.oldPassword"
                    required
                    v-model="pw"
                    @click:append-inner="visible = !visible"
                  ></v-text-field>
                </v-col>
                <v-col cols="12"
                  ><p style="font-size: 13px">변경할 비밀번호</p></v-col
                >
                <v-col cols="12">
                  <v-text-field
                    :append-inner-icon="visible ? 'mdi-eye' : 'mdi-eye-off'"
                    :type="visible ? 'text' : 'password'"
                    label="새로운 비밀번호"
                    variant="solo"
                    :rules="rules.Password"
                    required
                    v-model="newpw"
                    @click:append-inner="visible = !visible"
                  ></v-text-field>
                </v-col>
                <v-col cols="12">
                  <v-text-field
                    :append-inner-icon="visible ? 'mdi-eye' : 'mdi-eye-off'"
                    :type="visible ? 'text' : 'password'"
                    label="비밀번호 확인"
                    variant="solo"
                    :rules="rules.PasswordConfirmation"
                    persistent-hint
                    v-model="newpwcheck"
                    @click:append-inner="visible = !visible"
                    @keyup.enter="passwordOK()"
                    required
                  ></v-text-field>
                </v-col>
              </v-row>
            </v-container>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              color="blue-darken-1"
              variant="text"
              @click="passwordcancle()"
              >취소</v-btn
            >
            <v-btn color="blue-darken-1" variant="text" @click="passwordOK()"
              >입력</v-btn
            >
          </v-card-actions>
        </v-card>
      </v-dialog>

      <!-- 비밀번호 확인 팝업 -->
      <v-dialog v-model="passwordcheckingDialog" max-width="500">
        <v-card>
          <v-card-title>비밀번호 확인</v-card-title>
          <v-card-text>
            <v-container>
              <v-row>
                <v-col cols="12"
                  ><p style="font-size: 13px">비밀번호</p></v-col
                >
                <v-col cols="12">
                  <v-text-field
                    :append-inner-icon="visible ? 'mdi-eye' : 'mdi-eye-off'"
                    :type="visible ? 'text' : 'password'"
                    label="비밀번호 확인"
                    variant="solo"
                    :rules="rules.oldPassword"
                    required
                    v-model="Cpw"
                    @click:append-inner="visible = !visible"
                    @keyup.enter="passwordChecking()"
                  ></v-text-field>
                </v-col>
              </v-row>
            </v-container>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              color="blue-darken-1"
              variant="text"
              @click="passwordCheckingcancle()"
              >취소</v-btn
            >
            <v-btn color="blue-darken-1" variant="text" @click="passwordChecking()"
              >입력</v-btn
            >
          </v-card-actions>
        </v-card>
      </v-dialog>

      <!-- 초기 비밀번호 재설정 팝업 -->
      <v-dialog v-model="resetPasswordDialog" max-width="500">
        <v-card>
          <v-card-title>초기 비밀번호 설정</v-card-title>
          <v-card-text>
            <v-container>
              <v-row>
                <v-col cols="12">
                  <v-text-field
                    :append-inner-icon="visible ? 'mdi-eye' : 'mdi-eye-off'"
                    :type="visible ? 'text' : 'password'"
                    label="초기 비밀번호"
                    variant="solo"
                    :rules="rules.oldPassword"
                    required
                    v-model="Rpw"
                    @click:append-inner="visible = !visible"
                    @keyup.enter="resetPassword()"
                  ></v-text-field>
                </v-col>
              </v-row>
            </v-container>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              color="blue-darken-1"
              variant="text"
              @click="resetPasswordcancle()"
              >취소</v-btn
            >
            <v-btn color="blue-darken-1" variant="text" @click="resetPassword()"
              >입력</v-btn
            >
          </v-card-actions>
        </v-card>
      </v-dialog>

      <!-- 소실주기 설정 모달 -->
      <v-dialog v-model="losstimeDialog" max-width="400">
        <v-card>
          <v-card-title>데이터 소실주기 설정</v-card-title>
          <v-card-text>
            <v-col cols="12"><p style="font-size: 13px">소실 주기</p></v-col>
            <v-col cols="12">
              <v-text-field
                label="settime (초)"
                variant="solo"
                v-model="losstime"
                required
              ></v-text-field>
            </v-col>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              color="blue-darken-1"
              variant="text"
              @click="losstimeDialog = false"
              >취소</v-btn
            >
            <v-btn color="blue-darken-1" variant="text" @click="axiostime()"
              >설정</v-btn
            >
          </v-card-actions>
        </v-card>
      </v-dialog>

      <!-- 소실주기 설정 모달 -->
      <v-dialog v-model="ALLlosstimeDialog" max-width="920">
        <v-card>
          <v-card-title>데이터 소실주기 설정</v-card-title>
          <v-card-text>
            <v-row>
              <v-col cols="4">
                <v-sheet style="height: 63vh; display: flex">
                  <v-card style="flex: 1">
                    <v-card-item>
                      <v-radio-group
                        v-model="selectRadio"
                        label="SubComponents"
                      >
                        <v-radio
                          style="margin-top: 10px"
                          label="DGPS"
                          value="DGPS"
                        ></v-radio>
                        <v-radio label="GYRO" value="GYRO"></v-radio>
                        <v-radio
                          label="ANEMOMETER"
                          value="ANEMOMETER"
                        ></v-radio>
                        <v-radio label="RADAR" value="RADAR"></v-radio>
                        <v-radio label="AIS" value="AIS"></v-radio>
                        <v-radio label="ECDIS" value="ECDIS"></v-radio>
                        <v-radio label="AUTOPILOT" value="AUTOPILOT"></v-radio>
                        <v-radio label="SPEEDLOG" value="SPEEDLOG"></v-radio>
                        <v-radio
                          label="CanThrottle"
                          value="CanThrottle"
                        ></v-radio>
                        <v-radio
                          label="AUTOPILOTCONTACT"
                          value="AUTOPILOTCONTACT"
                        ></v-radio>
                        <v-radio
                          label="NO.1ENGINEPANEL"
                          value="NO.1ENGINEPANEL"
                        ></v-radio>
                        <v-radio
                          label="NO.2ENGINEPANEL"
                          value="NO.2ENGINEPANEL"
                        ></v-radio>
                        <v-radio label="ALL DATA" value="ALL DATA"></v-radio>
                      </v-radio-group>
                    </v-card-item>
                  </v-card>
                </v-sheet>
              </v-col>
              <v-col cols="8">
                <v-sheet style="height: 63vh; display: flex">
                  <v-card
                    style="flex: 1; overflow-y: auto"
                    class="scrollable-card-1"
                  >
                    <v-card-item>
                      <v-radio-group label="Contents"></v-radio-group>
                      <v-sheet v-if="selectRadio === 'DGPS'">
                        <!-- GLL -->
                        <v-row>
                          <v-col cols="1"> </v-col>
                          <v-col cols="3">
                            <v-list-subheader>
                              <p style="padding-top: 15px">DGPS / GLL</p>
                            </v-list-subheader>
                          </v-col>
                          <v-col cols="2"> </v-col>
                          <v-col cols="5">
                            <v-text-field
                              v-model="timeRefs.GLL.value"
                              variant="outlined"
                              label="time"
                              suffix="sec"
                            ></v-text-field>
                          </v-col>
                          <v-col cols="1"> </v-col>
                        </v-row>
                        <!-- GGA -->
                        <v-row>
                          <v-col cols="1"> </v-col>
                          <v-col cols="3">
                            <v-list-subheader>
                              <p style="padding-top: 15px">DGPS / GGA</p>
                            </v-list-subheader>
                          </v-col>
                          <v-col cols="2"> </v-col>
                          <v-col cols="5">
                            <v-text-field
                              v-model="timeRefs.GGA.value"
                              variant="outlined"
                              label="time"
                              suffix="sec"
                            ></v-text-field>
                          </v-col>
                          <v-col cols="1"> </v-col>
                        </v-row>
                        <!-- RMC -->
                        <v-row>
                          <v-col cols="1"> </v-col>
                          <v-col cols="3">
                            <v-list-subheader>
                              <p style="padding-top: 15px">DGPS / RMC</p>
                            </v-list-subheader>
                          </v-col>
                          <v-col cols="2"> </v-col>
                          <v-col cols="5">
                            <v-text-field
                              v-model="timeRefs.RMC.value"
                              variant="outlined"
                              label="time"
                              suffix="sec"
                            ></v-text-field>
                          </v-col>
                          <v-col cols="1"> </v-col>
                        </v-row>
                        <!-- VTG -->
                        <v-row>
                          <v-col cols="1"> </v-col>
                          <v-col cols="3">
                            <v-list-subheader>
                              <p style="padding-top: 15px">DGPS / VTG</p>
                            </v-list-subheader>
                          </v-col>
                          <v-col cols="2"> </v-col>
                          <v-col cols="5">
                            <v-text-field
                              v-model="timeRefs.VTG.value"
                              variant="outlined"
                              label="time"
                              suffix="sec"
                            ></v-text-field>
                          </v-col>
                          <v-col cols="1"> </v-col>
                        </v-row>
                        <!-- ZDA -->
                        <v-row>
                          <v-col cols="1"> </v-col>
                          <v-col cols="3">
                            <v-list-subheader>
                              <p style="padding-top: 15px">DGPS / ZDA</p>
                            </v-list-subheader>
                          </v-col>
                          <v-col cols="2"> </v-col>
                          <v-col cols="5">
                            <v-text-field
                              v-model="timeRefs.ZDA.value"
                              variant="outlined"
                              label="time"
                              suffix="sec"
                            ></v-text-field>
                          </v-col>
                          <v-col cols="1"> </v-col>
                        </v-row>
                        <!-- GSV -->
                        <v-row>
                          <v-col cols="1"> </v-col>
                          <v-col cols="3">
                            <v-list-subheader>
                              <p style="padding-top: 15px">DGPS / GSV</p>
                            </v-list-subheader>
                          </v-col>
                          <v-col cols="2"> </v-col>
                          <v-col cols="5">
                            <v-text-field
                              v-model="timeRefs.GSV.value"
                              variant="outlined"
                              label="time"
                              suffix="sec"
                            ></v-text-field>
                          </v-col>
                          <v-col cols="1"> </v-col>
                        </v-row>
                        <!-- GSA -->
                        <v-row>
                          <v-col cols="1"> </v-col>
                          <v-col cols="3">
                            <v-list-subheader>
                              <p style="padding-top: 15px">DGPS / GSA</p>
                            </v-list-subheader>
                          </v-col>
                          <v-col cols="2"> </v-col>
                          <v-col cols="5">
                            <v-text-field
                              v-model="timeRefs.GSA.value"
                              variant="outlined"
                              label="time"
                              suffix="sec"
                            ></v-text-field>
                          </v-col>
                          <v-col cols="1"> </v-col>
                        </v-row>
                      </v-sheet>
                      <v-sheet v-if="selectRadio === 'GYRO'">
                        <!-- HDT -->
                        <v-row>
                          <v-col cols="1"> </v-col>
                          <v-col cols="3">
                            <v-list-subheader>
                              <p style="padding-top: 15px">GYRO / HDT</p>
                            </v-list-subheader>
                          </v-col>
                          <v-col cols="2"> </v-col>
                          <v-col cols="5">
                            <v-text-field
                              v-model="timeRefs.HDT.value"
                              variant="outlined"
                              label="time"
                              suffix="sec"
                            ></v-text-field>
                          </v-col>
                          <v-col cols="1"> </v-col>
                        </v-row>
                        <!-- ROT -->
                        <v-row>
                          <v-col cols="1"> </v-col>
                          <v-col cols="3">
                            <v-list-subheader>
                              <p style="padding-top: 15px">GYRO / ROT</p>
                            </v-list-subheader>
                          </v-col>
                          <v-col cols="2"> </v-col>
                          <v-col cols="5">
                            <v-text-field
                              v-model="timeRefs.ROT.value"
                              variant="outlined"
                              label="time"
                              suffix="sec"
                            ></v-text-field>
                          </v-col>
                          <v-col cols="1"> </v-col>
                        </v-row>
                      </v-sheet>
                      <v-sheet v-if="selectRadio === 'ANEMOMETER'">
                        <!-- MWV -->
                        <v-row>
                          <v-col cols="1"> </v-col>
                          <v-col cols="5">
                            <v-list-subheader>
                              <p style="padding-top: 15px">ANEMOMETER / MWV</p>
                            </v-list-subheader>
                          </v-col>
                          <v-col cols="5">
                            <v-text-field
                              v-model="timeRefs.MWV.value"
                              variant="outlined"
                              label="time"
                              suffix="sec"
                            ></v-text-field>
                          </v-col>
                          <v-col cols="1"> </v-col>
                        </v-row>
                      </v-sheet>
                      <v-sheet v-if="selectRadio === 'RADAR'">
                        <!-- RADARSCREEN -->
                        <v-row>
                          <v-col cols="1"> </v-col>
                          <v-col cols="5">
                            <v-list-subheader>
                              <p style="padding-top: 15px">
                                RADAR / RADARSCREEN
                              </p>
                            </v-list-subheader>
                          </v-col>
                          <v-col cols="5">
                            <v-text-field
                              v-model="timeRefs.RADARSCREEN.value"
                              variant="outlined"
                              label="time"
                              suffix="sec"
                            ></v-text-field>
                          </v-col>
                          <v-col cols="1"> </v-col>
                        </v-row>
                      </v-sheet>
                      <v-sheet v-if="selectRadio === 'AIS'">
                        <!-- VDM -->
                        <v-row>
                          <v-col cols="1"> </v-col>
                          <v-col cols="3">
                            <v-list-subheader>
                              <p style="padding-top: 15px">AIS / VDM</p>
                            </v-list-subheader>
                          </v-col>
                          <v-col cols="2"> </v-col>
                          <v-col cols="5">
                            <v-text-field
                              v-model="timeRefs.VDM.value"
                              variant="outlined"
                              label="time"
                              suffix="sec"
                            ></v-text-field>
                          </v-col>
                          <v-col cols="1"> </v-col>
                        </v-row>
                        <!-- VDO -->
                        <v-row>
                          <v-col cols="1"> </v-col>
                          <v-col cols="3">
                            <v-list-subheader>
                              <p style="padding-top: 15px">AIS / VDO</p>
                            </v-list-subheader>
                          </v-col>
                          <v-col cols="2"> </v-col>
                          <v-col cols="5">
                            <v-text-field
                              v-model="timeRefs.VDO.value"
                              variant="outlined"
                              label="time"
                              suffix="sec"
                            ></v-text-field>
                          </v-col>
                          <v-col cols="1"> </v-col>
                        </v-row>
                      </v-sheet>
                      <v-sheet v-if="selectRadio === 'ECDIS'">
                        <!-- ROUTEINFO -->
                        <v-row>
                          <v-col cols="1"> </v-col>
                          <v-col cols="5">
                            <v-list-subheader>
                              <p style="padding-top: 15px">ECDIS / ROUTEINFO</p>
                            </v-list-subheader>
                          </v-col>
                          <v-col cols="5">
                            <v-text-field
                              v-model="timeRefs.ROUTEINFO.value"
                              variant="outlined"
                              label="time"
                              suffix="sec"
                            ></v-text-field>
                          </v-col>
                          <v-col cols="1"> </v-col>
                        </v-row>
                        <!-- WAYPOINTS -->
                        <v-row>
                          <v-col cols="1"> </v-col>
                          <v-col cols="5">
                            <v-list-subheader>
                              <p style="padding-top: 15px">ECDIS / WAYPOINTS</p>
                            </v-list-subheader>
                          </v-col>
                          <v-col cols="5">
                            <v-text-field
                              v-model="timeRefs.WAYPOINTS.value"
                              variant="outlined"
                              label="time"
                              suffix="sec"
                            ></v-text-field>
                          </v-col>
                          <v-col cols="1"> </v-col>
                        </v-row>
                        <!-- RTZ -->
                        <v-row>
                          <v-col cols="1"> </v-col>
                          <v-col cols="5">
                            <v-list-subheader>
                              <p style="padding-top: 15px">ECDIS / RTZ</p>
                            </v-list-subheader>
                          </v-col>
                          <v-col cols="5">
                            <v-text-field
                              v-model="timeRefs.RTZ.value"
                              variant="outlined"
                              label="time"
                              suffix="sec"
                            ></v-text-field>
                          </v-col>
                          <v-col cols="1"> </v-col>
                        </v-row>
                        <!-- ECDISSCREEN -->
                        <v-row>
                          <v-col cols="1"> </v-col>
                          <v-col cols="5">
                            <v-list-subheader>
                              <p style="padding-top: 15px">
                                ECDIS / ECDISSCREEN
                              </p>
                            </v-list-subheader>
                          </v-col>
                          <v-col cols="5">
                            <v-text-field
                              v-model="timeRefs.ECDISSCREEN.value"
                              variant="outlined"
                              label="time"
                              suffix="sec"
                            ></v-text-field>
                          </v-col>
                          <v-col cols="1"> </v-col>
                        </v-row>
                      </v-sheet>
                      <v-sheet v-if="selectRadio === 'AUTOPILOT'">
                        <!-- RSA -->
                        <v-row>
                          <v-col cols="1"> </v-col>
                          <v-col cols="5">
                            <v-list-subheader>
                              <p style="padding-top: 15px">AUTOPILOT / RSA</p>
                            </v-list-subheader>
                          </v-col>
                          <v-col cols="5">
                            <v-text-field
                              v-model="timeRefs.RSA.value"
                              variant="outlined"
                              label="time"
                              suffix="sec"
                            ></v-text-field>
                          </v-col>
                          <v-col cols="1"> </v-col>
                        </v-row>
                        <!-- HTD -->
                        <v-row>
                          <v-col cols="1"> </v-col>
                          <v-col cols="5">
                            <v-list-subheader>
                              <p style="padding-top: 15px">AUTOPILOT / HTD</p>
                            </v-list-subheader>
                          </v-col>
                          <v-col cols="5">
                            <v-text-field
                              v-model="timeRefs.HTD.value"
                              variant="outlined"
                              label="time"
                              suffix="sec"
                            ></v-text-field>
                          </v-col>
                          <v-col cols="1"> </v-col>
                        </v-row>
                      </v-sheet>
                      <v-sheet v-if="selectRadio === 'SPEEDLOG'">
                        <!-- VBW -->
                        <v-row>
                          <v-col cols="1"> </v-col>
                          <v-col cols="5">
                            <v-list-subheader>
                              <p style="padding-top: 15px">SPEEDLOG / VBW</p>
                            </v-list-subheader>
                          </v-col>
                          <v-col cols="5">
                            <v-text-field
                              v-model="timeRefs.VBW.value"
                              variant="outlined"
                              label="time"
                              suffix="sec"
                            ></v-text-field>
                          </v-col>
                          <v-col cols="1"> </v-col>
                        </v-row>
                        <!-- VHW -->
                        <v-row>
                          <v-col cols="1"> </v-col>
                          <v-col cols="5">
                            <v-list-subheader>
                              <p style="padding-top: 15px">SPEEDLOG / VHW</p>
                            </v-list-subheader>
                          </v-col>
                          <v-col cols="5">
                            <v-text-field
                              v-model="timeRefs.VHW.value"
                              variant="outlined"
                              label="time"
                              suffix="sec"
                            ></v-text-field>
                          </v-col>
                          <v-col cols="1"> </v-col>
                        </v-row>
                        <!-- VLW -->
                        <v-row>
                          <v-col cols="1"> </v-col>
                          <v-col cols="5">
                            <v-list-subheader>
                              <p style="padding-top: 15px">SPEEDLOG / VLW</p>
                            </v-list-subheader>
                          </v-col>
                          <v-col cols="5">
                            <v-text-field
                              v-model="timeRefs.VLW.value"
                              variant="outlined"
                              label="time"
                              suffix="sec"
                            ></v-text-field>
                          </v-col>
                          <v-col cols="1"> </v-col>
                        </v-row>
                      </v-sheet>
                      <v-sheet v-if="selectRadio === 'CanThrottle'">
                        <!-- CAN_Online_State -->
                        <v-row>
                          <v-col cols="1"> </v-col>
                          <v-col cols="5">
                            <v-list-subheader>
                              <p style="padding-top: 15px">CAN_Online_State</p>
                            </v-list-subheader>
                          </v-col>
                          <v-col cols="5">
                            <v-text-field
                              v-model="timeRefs.CAN_Online_State.value"
                              variant="outlined"
                              label="time"
                              suffix="sec"
                            ></v-text-field>
                          </v-col>
                          <v-col cols="1"> </v-col>
                        </v-row>
                        <!-- Engine_RPM -->
                        <v-row>
                          <v-col cols="1"> </v-col>
                          <v-col cols="5">
                            <v-list-subheader>
                              <p style="padding-top: 15px">Engine_RPM</p>
                            </v-list-subheader>
                          </v-col>
                          <v-col cols="5">
                            <v-text-field
                              v-model="timeRefs.Engine_RPM.value"
                              variant="outlined"
                              label="time"
                              suffix="sec"
                            ></v-text-field>
                          </v-col>
                          <v-col cols="1"> </v-col>
                        </v-row>
                        <!-- Rudder -->
                        <v-row>
                          <v-col cols="1"> </v-col>
                          <v-col cols="5">
                            <v-list-subheader>
                              <p style="padding-top: 15px">Rudder</p>
                            </v-list-subheader>
                          </v-col>
                          <v-col cols="5">
                            <v-text-field
                              v-model="timeRefs.Rudder.value"
                              variant="outlined"
                              label="time"
                              suffix="sec"
                            ></v-text-field>
                          </v-col>
                          <v-col cols="1"> </v-col>
                        </v-row>
                        <!-- Rudder_Scale -->
                        <v-row>
                          <v-col cols="1"> </v-col>
                          <v-col cols="5">
                            <v-list-subheader>
                              <p style="padding-top: 15px">Rudder_Scale</p>
                            </v-list-subheader>
                          </v-col>
                          <v-col cols="5">
                            <v-text-field
                              v-model="timeRefs.Rudder_Scale.value"
                              variant="outlined"
                              label="time"
                              suffix="sec"
                            ></v-text-field>
                          </v-col>
                          <v-col cols="1"> </v-col>
                        </v-row>
                      </v-sheet>
                      <v-sheet v-if="selectRadio === 'AUTOPILOTCONTACT'">
                        <!-- AUTOPILOTCONTACT -->
                        <v-row>
                          <v-col cols="1"> </v-col>
                          <v-col cols="5">
                            <v-list-subheader>
                              <p style="padding-top: 15px">AUTOPILOTCONTACT</p>
                            </v-list-subheader>
                          </v-col>
                          <v-col cols="5">
                            <v-text-field
                              v-model="timeRefs.AUTOPILOTCONTACT.value"
                              variant="outlined"
                              label="time"
                              suffix="sec"
                            ></v-text-field>
                          </v-col>
                          <v-col cols="1"> </v-col>
                        </v-row>
                      </v-sheet>
                      <v-sheet v-if="selectRadio === 'NO.1ENGINEPANEL'">
                        <!-- NO1ENGINE_PANEL_61444 -->
                        <v-row>
                          <v-col cols="1"> </v-col>
                          <v-col cols="5">
                            <v-list-subheader>
                              <p style="padding-top: 15px">
                                NO1ENGINE_PANEL_61444
                              </p>
                            </v-list-subheader>
                          </v-col>
                          <v-col cols="5">
                            <v-text-field
                              v-model="timeRefs.NO1ENGINE_PANEL_61444.value"
                              variant="outlined"
                              label="time"
                              suffix="sec"
                            ></v-text-field>
                          </v-col>
                          <v-col cols="1"> </v-col>
                        </v-row>
                        <!-- NO1ENGINE_PANEL_65262 -->
                        <v-row>
                          <v-col cols="1"> </v-col>
                          <v-col cols="5">
                            <v-list-subheader>
                              <p style="padding-top: 15px">
                                NO1ENGINE_PANEL_65262
                              </p>
                            </v-list-subheader>
                          </v-col>
                          <v-col cols="5">
                            <v-text-field
                              v-model="timeRefs.NO1ENGINE_PANEL_65262.value"
                              variant="outlined"
                              label="time"
                              suffix="sec"
                            ></v-text-field>
                          </v-col>
                          <v-col cols="1"> </v-col>
                        </v-row>
                        <!-- NO1ENGINE_PANEL_65263 -->
                        <v-row>
                          <v-col cols="1"> </v-col>
                          <v-col cols="5">
                            <v-list-subheader>
                              <p style="padding-top: 15px">
                                NO1ENGINE_PANEL_65263
                              </p>
                            </v-list-subheader>
                          </v-col>
                          <v-col cols="5">
                            <v-text-field
                              v-model="timeRefs.NO1ENGINE_PANEL_65263.value"
                              variant="outlined"
                              label="time"
                              suffix="sec"
                            ></v-text-field>
                          </v-col>
                          <v-col cols="1"> </v-col>
                        </v-row>
                        <!-- NO1ENGINE_PANEL_65272 -->
                        <v-row>
                          <v-col cols="1"> </v-col>
                          <v-col cols="5">
                            <v-list-subheader>
                              <p style="padding-top: 15px">
                                NO1ENGINE_PANEL_65272
                              </p>
                            </v-list-subheader>
                          </v-col>
                          <v-col cols="5">
                            <v-text-field
                              v-model="timeRefs.NO1ENGINE_PANEL_65272.value"
                              variant="outlined"
                              label="time"
                              suffix="sec"
                            ></v-text-field>
                          </v-col>
                          <v-col cols="1"> </v-col>
                        </v-row>
                        <!-- NO1ENGINE_PANEL_65271 -->
                        <v-row>
                          <v-col cols="1"> </v-col>
                          <v-col cols="5">
                            <v-list-subheader>
                              <p style="padding-top: 15px">
                                NO1ENGINE_PANEL_65271
                              </p>
                            </v-list-subheader>
                          </v-col>
                          <v-col cols="5">
                            <v-text-field
                              v-model="timeRefs.NO1ENGINE_PANEL_65271.value"
                              variant="outlined"
                              label="time"
                              suffix="sec"
                            ></v-text-field>
                          </v-col>
                          <v-col cols="1"> </v-col>
                        </v-row>
                        <!-- NO1ENGINE_PANEL_65253 -->
                        <v-row>
                          <v-col cols="1"> </v-col>
                          <v-col cols="5">
                            <v-list-subheader>
                              <p style="padding-top: 15px">
                                NO1ENGINE_PANEL_65253
                              </p>
                            </v-list-subheader>
                          </v-col>
                          <v-col cols="5">
                            <v-text-field
                              v-model="timeRefs.NO1ENGINE_PANEL_65253.value"
                              variant="outlined"
                              label="time"
                              suffix="sec"
                            ></v-text-field>
                          </v-col>
                          <v-col cols="1"> </v-col>
                        </v-row>
                        <!-- NO1ENGINE_PANEL_65270 -->
                        <v-row>
                          <v-col cols="1"> </v-col>
                          <v-col cols="5">
                            <v-list-subheader>
                              <p style="padding-top: 15px">
                                NO1ENGINE_PANEL_65270
                              </p>
                            </v-list-subheader>
                          </v-col>
                          <v-col cols="5">
                            <v-text-field
                              v-model="timeRefs.NO1ENGINE_PANEL_65270.value"
                              variant="outlined"
                              label="time"
                              suffix="sec"
                            ></v-text-field>
                          </v-col>
                          <v-col cols="1"> </v-col>
                        </v-row>
                        <!-- NO1ENGINE_PANEL_65276 -->
                        <v-row>
                          <v-col cols="1"> </v-col>
                          <v-col cols="5">
                            <v-list-subheader>
                              <p style="padding-top: 15px">
                                NO1ENGINE_PANEL_65276
                              </p>
                            </v-list-subheader>
                          </v-col>
                          <v-col cols="5">
                            <v-text-field
                              v-model="timeRefs.NO1ENGINE_PANEL_65276.value"
                              variant="outlined"
                              label="time"
                              suffix="sec"
                            ></v-text-field>
                          </v-col>
                          <v-col cols="1"> </v-col>
                        </v-row>
                        <!-- NO1ENGINE_PANEL_65360 -->
                        <v-row>
                          <v-col cols="1"> </v-col>
                          <v-col cols="5">
                            <v-list-subheader>
                              <p style="padding-top: 15px">
                                NO1ENGINE_PANEL_65360
                              </p>
                            </v-list-subheader>
                          </v-col>
                          <v-col cols="5">
                            <v-text-field
                              v-model="timeRefs.NO1ENGINE_PANEL_65360.value"
                              variant="outlined"
                              label="time"
                              suffix="sec"
                            ></v-text-field>
                          </v-col>
                          <v-col cols="1"> </v-col>
                        </v-row>
                        <!-- NO1ENGINE_PANEL_65361_LAMP -->
                        <v-row>
                          <v-col cols="1"> </v-col>
                          <v-col cols="5">
                            <v-list-subheader>
                              <p style="padding-top: 15px">
                                NO1ENGINE_PANEL_LAMP
                              </p>
                            </v-list-subheader>
                          </v-col>
                          <v-col cols="5">
                            <v-text-field
                              v-model="
                                timeRefs.NO1ENGINE_PANEL_65361_LAMP.value
                              "
                              variant="outlined"
                              label="time"
                              suffix="sec"
                            ></v-text-field>
                          </v-col>
                          <v-col cols="1"> </v-col>
                        </v-row>
                        <!-- NO1ENGINE_PANEL_65361_STATUS -->
                        <v-row>
                          <v-col cols="1"> </v-col>
                          <v-col cols="5">
                            <v-list-subheader>
                              <p style="padding-top: 15px">
                                NO1ENGINE_PANEL_STATUS
                              </p>
                            </v-list-subheader>
                          </v-col>
                          <v-col cols="5">
                            <v-text-field
                              v-model="
                                timeRefs.NO1ENGINE_PANEL_65361_STATUS.value
                              "
                              variant="outlined"
                              label="time"
                              suffix="sec"
                            ></v-text-field>
                          </v-col>
                          <v-col cols="1"> </v-col>
                        </v-row>
                        <!-- NO1ENGINE_PANEL_65378 -->
                        <v-row>
                          <v-col cols="1"> </v-col>
                          <v-col cols="5">
                            <v-list-subheader>
                              <p style="padding-top: 15px">
                                NO1ENGINE_PANEL_65378
                              </p>
                            </v-list-subheader>
                          </v-col>
                          <v-col cols="5">
                            <v-text-field
                              v-model="timeRefs.NO1ENGINE_PANEL_65378.value"
                              variant="outlined"
                              label="time"
                              suffix="sec"
                            ></v-text-field>
                          </v-col>
                          <v-col cols="1"> </v-col>
                        </v-row>
                        <!-- NO1ENGINE_PANEL_65376 -->
                        <v-row>
                          <v-col cols="1"> </v-col>
                          <v-col cols="5">
                            <v-list-subheader>
                              <p style="padding-top: 15px">
                                NO1ENGINE_PANEL_65376
                              </p>
                            </v-list-subheader>
                          </v-col>
                          <v-col cols="5">
                            <v-text-field
                              v-model="timeRefs.NO1ENGINE_PANEL_65376.value"
                              variant="outlined"
                              label="time"
                              suffix="sec"
                            ></v-text-field>
                          </v-col>
                          <v-col cols="1"> </v-col>
                        </v-row>
                        <!-- NO1ENGINE_PANEL_65379 -->
                        <v-row>
                          <v-col cols="1"> </v-col>
                          <v-col cols="5">
                            <v-list-subheader>
                              <p style="padding-top: 15px">
                                NO1ENGINE_PANEL_65379
                              </p>
                            </v-list-subheader>
                          </v-col>
                          <v-col cols="5">
                            <v-text-field
                              v-model="timeRefs.NO1ENGINE_PANEL_65379.value"
                              variant="outlined"
                              label="time"
                              suffix="sec"
                            ></v-text-field>
                          </v-col>
                          <v-col cols="1"> </v-col>
                        </v-row>
                      </v-sheet>
                      <v-sheet v-if="selectRadio === 'NO.2ENGINEPANEL'">
                        <!-- NO2ENGINE_PANEL_61444 -->
                        <v-row>
                          <v-col cols="1"> </v-col>
                          <v-col cols="5">
                            <v-list-subheader>
                              <p style="padding-top: 15px">
                                NO2ENGINE_PANEL_61444
                              </p>
                            </v-list-subheader>
                          </v-col>
                          <v-col cols="5">
                            <v-text-field
                              v-model="timeRefs.NO2ENGINE_PANEL_61444.value"
                              variant="outlined"
                              label="time"
                              suffix="sec"
                            ></v-text-field>
                          </v-col>
                          <v-col cols="1"> </v-col>
                        </v-row>
                        <!-- NO2ENGINE_PANEL_65262 -->
                        <v-row>
                          <v-col cols="1"> </v-col>
                          <v-col cols="5">
                            <v-list-subheader>
                              <p style="padding-top: 15px">
                                NO2ENGINE_PANEL_65262
                              </p>
                            </v-list-subheader>
                          </v-col>
                          <v-col cols="5">
                            <v-text-field
                              v-model="timeRefs.NO2ENGINE_PANEL_65262.value"
                              variant="outlined"
                              label="time"
                              suffix="sec"
                            ></v-text-field>
                          </v-col>
                          <v-col cols="1"> </v-col>
                        </v-row>
                        <!-- NO2ENGINE_PANEL_65263 -->
                        <v-row>
                          <v-col cols="1"> </v-col>
                          <v-col cols="5">
                            <v-list-subheader>
                              <p style="padding-top: 15px">
                                NO2ENGINE_PANEL_65263
                              </p>
                            </v-list-subheader>
                          </v-col>
                          <v-col cols="5">
                            <v-text-field
                              v-model="timeRefs.NO2ENGINE_PANEL_65263.value"
                              variant="outlined"
                              label="time"
                              suffix="sec"
                            ></v-text-field>
                          </v-col>
                          <v-col cols="1"> </v-col>
                        </v-row>
                        <!-- NO2ENGINE_PANEL_65272 -->
                        <v-row>
                          <v-col cols="1"> </v-col>
                          <v-col cols="5">
                            <v-list-subheader>
                              <p style="padding-top: 15px">
                                NO2ENGINE_PANEL_65272
                              </p>
                            </v-list-subheader>
                          </v-col>
                          <v-col cols="5">
                            <v-text-field
                              v-model="timeRefs.NO2ENGINE_PANEL_65272.value"
                              variant="outlined"
                              label="time"
                              suffix="sec"
                            ></v-text-field>
                          </v-col>
                          <v-col cols="1"> </v-col>
                        </v-row>
                        <!-- NO2ENGINE_PANEL_65271 -->
                        <v-row>
                          <v-col cols="1"> </v-col>
                          <v-col cols="5">
                            <v-list-subheader>
                              <p style="padding-top: 15px">
                                NO2ENGINE_PANEL_65271
                              </p>
                            </v-list-subheader>
                          </v-col>
                          <v-col cols="5">
                            <v-text-field
                              v-model="timeRefs.NO2ENGINE_PANEL_65271.value"
                              variant="outlined"
                              label="time"
                              suffix="sec"
                            ></v-text-field>
                          </v-col>
                          <v-col cols="1"> </v-col>
                        </v-row>
                        <!-- NO2ENGINE_PANEL_65253 -->
                        <v-row>
                          <v-col cols="1"> </v-col>
                          <v-col cols="5">
                            <v-list-subheader>
                              <p style="padding-top: 15px">
                                NO2ENGINE_PANEL_65253
                              </p>
                            </v-list-subheader>
                          </v-col>
                          <v-col cols="5">
                            <v-text-field
                              v-model="timeRefs.NO2ENGINE_PANEL_65253.value"
                              variant="outlined"
                              label="time"
                              suffix="sec"
                            ></v-text-field>
                          </v-col>
                          <v-col cols="1"> </v-col>
                        </v-row>
                        <!-- NO2ENGINE_PANEL_65270 -->
                        <v-row>
                          <v-col cols="1"> </v-col>
                          <v-col cols="5">
                            <v-list-subheader>
                              <p style="padding-top: 15px">
                                NO2ENGINE_PANEL_65270
                              </p>
                            </v-list-subheader>
                          </v-col>
                          <v-col cols="5">
                            <v-text-field
                              v-model="timeRefs.NO2ENGINE_PANEL_65270.value"
                              variant="outlined"
                              label="time"
                              suffix="sec"
                            ></v-text-field>
                          </v-col>
                          <v-col cols="1"> </v-col>
                        </v-row>
                        <!-- NO2ENGINE_PANEL_65276 -->
                        <v-row>
                          <v-col cols="1"> </v-col>
                          <v-col cols="5">
                            <v-list-subheader>
                              <p style="padding-top: 15px">
                                NO2ENGINE_PANEL_65276
                              </p>
                            </v-list-subheader>
                          </v-col>
                          <v-col cols="5">
                            <v-text-field
                              v-model="timeRefs.NO2ENGINE_PANEL_65276.value"
                              variant="outlined"
                              label="time"
                              suffix="sec"
                            ></v-text-field>
                          </v-col>
                          <v-col cols="1"> </v-col>
                        </v-row>
                        <!-- NO2ENGINE_PANEL_65360 -->
                        <v-row>
                          <v-col cols="1"> </v-col>
                          <v-col cols="5">
                            <v-list-subheader>
                              <p style="padding-top: 15px">
                                NO2ENGINE_PANEL_65360
                              </p>
                            </v-list-subheader>
                          </v-col>
                          <v-col cols="5">
                            <v-text-field
                              v-model="timeRefs.NO2ENGINE_PANEL_65360.value"
                              variant="outlined"
                              label="time"
                              suffix="sec"
                            ></v-text-field>
                          </v-col>
                          <v-col cols="1"> </v-col>
                        </v-row>
                        <!-- NO2ENGINE_PANEL_65361_LAMP -->
                        <v-row>
                          <v-col cols="1"> </v-col>
                          <v-col cols="5">
                            <v-list-subheader>
                              <p style="padding-top: 15px">
                                NO2ENGINE_PANEL_LAMP
                              </p>
                            </v-list-subheader>
                          </v-col>
                          <v-col cols="5">
                            <v-text-field
                              v-model="
                                timeRefs.NO2ENGINE_PANEL_65361_LAMP.value
                              "
                              variant="outlined"
                              label="time"
                              suffix="sec"
                            ></v-text-field>
                          </v-col>
                          <v-col cols="1"> </v-col>
                        </v-row>
                        <!-- NO2ENGINE_PANEL_65361_STATUS -->
                        <v-row>
                          <v-col cols="1"> </v-col>
                          <v-col cols="5">
                            <v-list-subheader>
                              <p style="padding-top: 15px">
                                NO2ENGINE_PANEL_STATUS
                              </p>
                            </v-list-subheader>
                          </v-col>
                          <v-col cols="5">
                            <v-text-field
                              v-model="
                                timeRefs.NO2ENGINE_PANEL_65361_STATUS.value
                              "
                              variant="outlined"
                              label="time"
                              suffix="sec"
                            ></v-text-field>
                          </v-col>
                          <v-col cols="1"> </v-col>
                        </v-row>
                        <!-- NO2ENGINE_PANEL_65378 -->
                        <v-row>
                          <v-col cols="1"> </v-col>
                          <v-col cols="5">
                            <v-list-subheader>
                              <p style="padding-top: 15px">
                                NO2ENGINE_PANEL_65378
                              </p>
                            </v-list-subheader>
                          </v-col>
                          <v-col cols="5">
                            <v-text-field
                              v-model="timeRefs.NO2ENGINE_PANEL_65378.value"
                              variant="outlined"
                              label="time"
                              suffix="sec"
                            ></v-text-field>
                          </v-col>
                          <v-col cols="1"> </v-col>
                        </v-row>
                        <!-- NO2ENGINE_PANEL_65376 -->
                        <v-row>
                          <v-col cols="1"> </v-col>
                          <v-col cols="5">
                            <v-list-subheader>
                              <p style="padding-top: 15px">
                                NO2ENGINE_PANEL_65376
                              </p>
                            </v-list-subheader>
                          </v-col>
                          <v-col cols="5">
                            <v-text-field
                              v-model="timeRefs.NO2ENGINE_PANEL_65376.value"
                              variant="outlined"
                              label="time"
                              suffix="sec"
                            ></v-text-field>
                          </v-col>
                          <v-col cols="1"> </v-col>
                        </v-row>
                        <!-- NO2ENGINE_PANEL_65379 -->
                        <v-row>
                          <v-col cols="1"> </v-col>
                          <v-col cols="5">
                            <v-list-subheader>
                              <p style="padding-top: 15px">
                                NO2ENGINE_PANEL_65379
                              </p>
                            </v-list-subheader>
                          </v-col>
                          <v-col cols="5">
                            <v-text-field
                              v-model="timeRefs.NO2ENGINE_PANEL_65379.value"
                              variant="outlined"
                              label="time"
                              suffix="sec"
                            ></v-text-field>
                          </v-col>
                          <v-col cols="1"> </v-col>
                        </v-row>
                      </v-sheet>
                      <v-sheet v-if="selectRadio === 'ALL DATA'">
                        <!-- RADARSCREEN -->
                        <v-row>
                          <v-col cols="1"> </v-col>
                          <v-col cols="5">
                            <v-text-field
                              v-model="timeRefs.ALL.value"
                              variant="outlined"
                              label="time"
                              suffix="sec"
                            ></v-text-field>
                          </v-col>
                          <v-col cols="1"> </v-col>
                          <v-col cols="4">
                            <v-list-subheader>
                              <v-btn @click="updateTenRefs()" color="blue-grey-lighten-4" style="height: 55px; font-size: 12px">
                                Change All Data
                              </v-btn>
                            </v-list-subheader>
                          </v-col>
                          <v-col cols="1"> </v-col>
                        </v-row>
                      </v-sheet>
                    </v-card-item>
                  </v-card>
                </v-sheet>
              </v-col>
            </v-row>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              color="blue-darken-1"
              variant="text"
              @click="ALLlosstimeDialog = false"
              >취소</v-btn
            >
            <v-btn
              color="blue-darken-1"
              variant="text"
              @click="updateTimeRefs()"
              >설정</v-btn
            >
          </v-card-actions>
        </v-card>
      </v-dialog>

      <!-- 실시간 주기 설정 모달 -->
      <v-dialog v-model="realtimeDialog" max-width="400">
        <v-card>
          <v-card-title>실시간 모니터링 주기 설정</v-card-title>
          <v-card-text>
            <v-col cols="12"><p style="font-size: 13px">실시간 주기</p></v-col>
            <v-col cols="12">
              <v-text-field
                label="settime (초)"
                variant="solo"
                v-model="realtime"
                required
              ></v-text-field>
            </v-col>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              color="blue-darken-1"
              variant="text"
              @click="realtimeDialog = false"
              >취소</v-btn
            >
            <v-btn color="blue-darken-1" variant="text" @click="axiosrealtime()"
              >설정</v-btn
            >
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-card>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import {
  readMineData,
  updateMineData,
  updatePassword,
  updateSetTime,
  readLossTimeData,
  updateLossTimeData,
  readPwData,
  resetPwData,
} from "../api/index.js";

const themeMode = ref(localStorage.getItem("themeMode") || "light");

const lightMode = () => {
  localStorage.setItem("themeMode", "light");
  location.reload();
};

const darkMode = () => {
  localStorage.setItem("themeMode", "dark");
  location.reload();
};

// 토큰
const tokenid = ref(sessionStorage.getItem("token") || "");
const permission = ref(sessionStorage.getItem("isAdmin"));


// 개인정보 변경
const userName = ref();
const userDepartment = ref();
const userGroup = ref();
const userDescription = ref();
const userEmail = ref();
const userNumber = ref();

// 비밀번호 변경
const pw = ref();
const newpw = ref();
const newpwcheck = ref();
const pwCheck = ref();

// 초기 비밀번호 설정
const Cpw = ref();
const Rpw = ref();

// Dialog 관리
const privacyDialog = ref(false);
const passwordchangeDialog = ref(false);
const passwordcheckingDialog = ref(false);
const resetPasswordDialog = ref(false);
const losstimeDialog = ref(false);
const ALLlosstimeDialog = ref(false); // 소실주기 전체
const realtimeDialog = ref(false);

// 데이터 소실주기 설정
const losstime = ref();
const realtime = ref();

// 데이터 소실주기 시간
const selectRadio = ref("DGPS");
const timeRefs = {
  ALL: ref(10),
  GLL: ref(),
  GGA: ref(),
  RMC: ref(),
  VTG: ref(),
  ZDA: ref(),
  GSV: ref(),
  GSA: ref(),
  HDT: ref(),
  ROT: ref(),
  MWV: ref(),
  RADARSCREEN: ref(),
  VDM: ref(),
  VDO: ref(),
  ROUTEINFO: ref(),
  WAYPOINTS: ref(),
  ECDISSCREEN: ref(),
  RTZ: ref(),
  RSA: ref(),
  HTD: ref(),
  VBW: ref(),
  VHW: ref(),
  VLW: ref(),
  CAN_Online_State: ref(),
  Engine_RPM: ref(),
  Rudder: ref(),
  Rudder_Scale: ref(),
  AUTOPILOTCONTACT: ref(),
  NO1ENGINE_PANEL_61444: ref(),
  NO1ENGINE_PANEL_65262: ref(),
  NO1ENGINE_PANEL_65263: ref(),
  NO1ENGINE_PANEL_65272: ref(),
  NO1ENGINE_PANEL_65271: ref(),
  NO1ENGINE_PANEL_65253: ref(),
  NO1ENGINE_PANEL_65270: ref(),
  NO1ENGINE_PANEL_65276: ref(),
  NO1ENGINE_PANEL_65360: ref(),
  NO1ENGINE_PANEL_65361_LAMP: ref(),
  NO1ENGINE_PANEL_65361_STATUS: ref(),
  NO1ENGINE_PANEL_65378: ref(),
  NO1ENGINE_PANEL_65376: ref(),
  NO1ENGINE_PANEL_65379: ref(),
  NO2ENGINE_PANEL_61444: ref(),
  NO2ENGINE_PANEL_65262: ref(),
  NO2ENGINE_PANEL_65263: ref(),
  NO2ENGINE_PANEL_65272: ref(),
  NO2ENGINE_PANEL_65271: ref(),
  NO2ENGINE_PANEL_65253: ref(),
  NO2ENGINE_PANEL_65270: ref(),
  NO2ENGINE_PANEL_65276: ref(),
  NO2ENGINE_PANEL_65360: ref(),
  NO2ENGINE_PANEL_65361_LAMP: ref(),
  NO2ENGINE_PANEL_65361_STATUS: ref(),
  NO2ENGINE_PANEL_65378: ref(),
  NO2ENGINE_PANEL_65376: ref(),
  NO2ENGINE_PANEL_65379: ref(),
};

const setTimeRefs = async () => {
  const response = await readLossTimeData(tokenid.value);
  timeRefs.GLL.value = response.DGPS_GLL;
  timeRefs.GGA.value = response.DGPS_GGA;
  timeRefs.RMC.value = response.DGPS_RMC;
  timeRefs.VTG.value = response.DGPS_VTG;
  timeRefs.ZDA.value = response.DGPS_ZDA;
  timeRefs.GSV.value = response.DGPS_GSV;
  timeRefs.GSA.value = response.DGPS_GSA;
  timeRefs.HDT.value = response.GYRO_HDT;
  timeRefs.ROT.value = response.GYRO_ROT;
  timeRefs.MWV.value = response.ANEMOMETER_MWV;
  timeRefs.RADARSCREEN.value = response.RADAR_RADARSCREEN;
  timeRefs.VDM.value = response.AIS_VDM;
  timeRefs.VDO.value = response.AIS_VDO;
  timeRefs.ROUTEINFO.value = response.ECDIS_ROUTEINFO;
  timeRefs.WAYPOINTS.value = response.ECDIS_WAYPOINTS;
  timeRefs.ECDISSCREEN.value = response.ECDIS_ECDISSCREEN;
  timeRefs.RTZ.value = response.ECDIS_RTZ;
  timeRefs.RSA.value = response.AUTOPILOT_RSA;
  timeRefs.HTD.value = response.AUTOPILOT_HTD;
  timeRefs.VBW.value = response.SPEEDLOG_VBW;
  timeRefs.VHW.value = response.SPEEDLOG_VHW;
  timeRefs.VLW.value = response.SPEEDLOG_VLW;
  timeRefs.CAN_Online_State.value = response.CANTHROTTLE_CANONLINESTATE;
  timeRefs.Engine_RPM.value = response.CANTHROTTLE_ENGINERPM;
  timeRefs.Rudder.value = response.CANTHROTTLE_RUDDER;
  timeRefs.Rudder_Scale.value = response.CANTHROTTLE_RUDDERSCALE;
  timeRefs.AUTOPILOTCONTACT.value = response.AUTOPILOTCONTACT_AUTOPILOTCONTACT;
  timeRefs.NO1ENGINE_PANEL_61444.value =
    response.NO1ENGINEPANEL_NO1ENGINE_PANEL_61444;
  timeRefs.NO1ENGINE_PANEL_65262.value =
    response.NO1ENGINEPANEL_NO1ENGINE_PANEL_65262;
  timeRefs.NO1ENGINE_PANEL_65263.value =
    response.NO1ENGINEPANEL_NO1ENGINE_PANEL_65263;
  timeRefs.NO1ENGINE_PANEL_65272.value =
    response.NO1ENGINEPANEL_NO1ENGINE_PANEL_65272;
  timeRefs.NO1ENGINE_PANEL_65271.value =
    response.NO1ENGINEPANEL_NO1ENGINE_PANEL_65271;
  timeRefs.NO1ENGINE_PANEL_65253.value =
    response.NO1ENGINEPANEL_NO1ENGINE_PANEL_65253;
  timeRefs.NO1ENGINE_PANEL_65270.value =
    response.NO1ENGINEPANEL_NO1ENGINE_PANEL_65270;
  timeRefs.NO1ENGINE_PANEL_65276.value =
    response.NO1ENGINEPANEL_NO1ENGINE_PANEL_65276;
  timeRefs.NO1ENGINE_PANEL_65360.value =
    response.NO1ENGINEPANEL_NO1ENGINE_PANEL_65360;
  timeRefs.NO1ENGINE_PANEL_65361_LAMP.value =
    response.NO1ENGINEPANEL_NO1ENGINE_PANEL_65361_LAMP;
  timeRefs.NO1ENGINE_PANEL_65361_STATUS.value =
    response.NO1ENGINEPANEL_NO1ENGINE_PANEL_65361_STATUS;
  timeRefs.NO1ENGINE_PANEL_65378.value =
    response.NO1ENGINEPANEL_NO1ENGINE_PANEL_65378;
  timeRefs.NO1ENGINE_PANEL_65376.value =
    response.NO1ENGINEPANEL_NO1ENGINE_PANEL_65376;
  timeRefs.NO1ENGINE_PANEL_65379.value =
    response.NO1ENGINEPANEL_NO1ENGINE_PANEL_65379;
  timeRefs.NO2ENGINE_PANEL_61444.value =
    response.NO2ENGINEPANEL_NO2ENGINE_PANEL_61444;
  timeRefs.NO2ENGINE_PANEL_65262.value =
    response.NO2ENGINEPANEL_NO2ENGINE_PANEL_65262;
  timeRefs.NO2ENGINE_PANEL_65263.value =
    response.NO2ENGINEPANEL_NO2ENGINE_PANEL_65263;
  timeRefs.NO2ENGINE_PANEL_65272.value =
    response.NO2ENGINEPANEL_NO2ENGINE_PANEL_65272;
  timeRefs.NO2ENGINE_PANEL_65271.value =
    response.NO2ENGINEPANEL_NO2ENGINE_PANEL_65271;
  timeRefs.NO2ENGINE_PANEL_65253.value =
    response.NO2ENGINEPANEL_NO2ENGINE_PANEL_65253;
  timeRefs.NO2ENGINE_PANEL_65270.value =
    response.NO2ENGINEPANEL_NO2ENGINE_PANEL_65270;
  timeRefs.NO2ENGINE_PANEL_65276.value =
    response.NO2ENGINEPANEL_NO2ENGINE_PANEL_65276;
  timeRefs.NO2ENGINE_PANEL_65360.value =
    response.NO2ENGINEPANEL_NO2ENGINE_PANEL_65360;
  timeRefs.NO2ENGINE_PANEL_65361_LAMP.value =
    response.NO2ENGINEPANEL_NO2ENGINE_PANEL_65361_LAMP;
  timeRefs.NO2ENGINE_PANEL_65361_STATUS.value =
    response.NO2ENGINEPANEL_NO2ENGINE_PANEL_65361_STATUS;
  timeRefs.NO2ENGINE_PANEL_65378.value =
    response.NO2ENGINEPANEL_NO2ENGINE_PANEL_65378;
  timeRefs.NO2ENGINE_PANEL_65376.value =
    response.NO2ENGINEPANEL_NO2ENGINE_PANEL_65376;
  timeRefs.NO2ENGINE_PANEL_65379.value =
    response.NO2ENGINEPANEL_NO2ENGINE_PANEL_65379;
};

const updateTimeRefs = async () => {
  let data = {
    id: "admin",
    AUTOPILOTCONTACT_AUTOPILOTCONTACT: timeRefs.AUTOPILOTCONTACT.value,
    NO1ENGINEPANEL_NO1ENGINE_PANEL_61444: timeRefs.NO1ENGINE_PANEL_61444.value,
    NO1ENGINEPANEL_NO1ENGINE_PANEL_65262: timeRefs.NO1ENGINE_PANEL_65262.value,
    NO1ENGINEPANEL_NO1ENGINE_PANEL_65263: timeRefs.NO1ENGINE_PANEL_65263.value,
    NO1ENGINEPANEL_NO1ENGINE_PANEL_65272: timeRefs.NO1ENGINE_PANEL_65272.value,
    NO1ENGINEPANEL_NO1ENGINE_PANEL_65271: timeRefs.NO1ENGINE_PANEL_65271.value,
    NO1ENGINEPANEL_NO1ENGINE_PANEL_65253: timeRefs.NO1ENGINE_PANEL_65253.value,
    NO1ENGINEPANEL_NO1ENGINE_PANEL_65270: timeRefs.NO1ENGINE_PANEL_65270.value,
    NO1ENGINEPANEL_NO1ENGINE_PANEL_65276: timeRefs.NO1ENGINE_PANEL_65276.value,
    NO1ENGINEPANEL_NO1ENGINE_PANEL_65360: timeRefs.NO1ENGINE_PANEL_65360.value,
    NO1ENGINEPANEL_NO1ENGINE_PANEL_65361_LAMP: timeRefs.NO1ENGINE_PANEL_65361_LAMP.value,
    NO1ENGINEPANEL_NO1ENGINE_PANEL_65361_STATUS: timeRefs.NO1ENGINE_PANEL_65361_STATUS.value,
    NO1ENGINEPANEL_NO1ENGINE_PANEL_65378: timeRefs.NO1ENGINE_PANEL_65378.value,
    NO1ENGINEPANEL_NO1ENGINE_PANEL_65376: timeRefs.NO1ENGINE_PANEL_65376.value,
    NO1ENGINEPANEL_NO1ENGINE_PANEL_65379: timeRefs.NO1ENGINE_PANEL_65379.value,
    NO2ENGINEPANEL_NO2ENGINE_PANEL_61444: timeRefs.NO2ENGINE_PANEL_61444.value,
    NO2ENGINEPANEL_NO2ENGINE_PANEL_65262: timeRefs.NO2ENGINE_PANEL_65262.value,
    NO2ENGINEPANEL_NO2ENGINE_PANEL_65263: timeRefs.NO2ENGINE_PANEL_65263.value,
    NO2ENGINEPANEL_NO2ENGINE_PANEL_65272: timeRefs.NO2ENGINE_PANEL_65272.value,
    NO2ENGINEPANEL_NO2ENGINE_PANEL_65271: timeRefs.NO2ENGINE_PANEL_65271.value,
    NO2ENGINEPANEL_NO2ENGINE_PANEL_65253: timeRefs.NO2ENGINE_PANEL_65253.value,
    NO2ENGINEPANEL_NO2ENGINE_PANEL_65270: timeRefs.NO2ENGINE_PANEL_65270.value,
    NO2ENGINEPANEL_NO2ENGINE_PANEL_65276: timeRefs.NO2ENGINE_PANEL_65276.value,
    NO2ENGINEPANEL_NO2ENGINE_PANEL_65360: timeRefs.NO2ENGINE_PANEL_65360.value,
    NO2ENGINEPANEL_NO2ENGINE_PANEL_65361_LAMP: timeRefs.NO2ENGINE_PANEL_65361_LAMP.value,
    NO2ENGINEPANEL_NO2ENGINE_PANEL_65361_STATUS: timeRefs.NO2ENGINE_PANEL_65361_STATUS.value,
    NO2ENGINEPANEL_NO2ENGINE_PANEL_65378: timeRefs.NO2ENGINE_PANEL_65378.value,
    NO2ENGINEPANEL_NO2ENGINE_PANEL_65376: timeRefs.NO2ENGINE_PANEL_65376.value,
    NO2ENGINEPANEL_NO2ENGINE_PANEL_65379: timeRefs.NO2ENGINE_PANEL_65379.value,

    CANTHROTTLE_CANONLINESTATE: timeRefs.CAN_Online_State.value,
    RADAR_RADARSCREEN: timeRefs.RADARSCREEN.value,
    ECDIS_ECDISSCREEN: timeRefs.ECDISSCREEN.value,
    CANTHROTTLE_ENGINERPM: timeRefs.Engine_RPM.value,
    CANTHROTTLE_RUDDER: timeRefs.Rudder.value,
    CANTHROTTLE_RUDDERSCALE: timeRefs.Rudder_Scale.value,
    // ANEMOMETER_MWD: timeRefs.MWD.value,
    DGPS_RMC: timeRefs.RMC.value,
    // ANEMOMETER_VWT: timeRefs.VWT.value,
    DGPS_GGA: timeRefs.GGA.value,
    DGPS_GSV: timeRefs.GSV.value,
    GYRO_HDT: timeRefs.HDT.value,
    ANEMOMETER_MWV: timeRefs.MWV.value,
    AIS_VDO: timeRefs.VDO.value,
    ECDIS_ROUTEINFO: timeRefs.ROUTEINFO.value,
    // DGPS_DTM: timeRefs.DTM.value,
    // RADAR_TTM: timeRefs.TTM.value,
    DGPS_GLL: timeRefs.GLL.value,
    DGPS_VTG: timeRefs.VTG.value,
    // GYRO_THS: timeRefs.THS.value,
    DGPS_GSA: timeRefs.GSA.value,
    GYRO_ROT: timeRefs.ROT.value,
    // ANEMOMETER_VWR: timeRefs.VWR.value,
    // RADAR_TLL: timeRefs.TLL.value,
    AIS_VDM: timeRefs.VDM.value,
    DGPS_ZDA: timeRefs.ZDA.value,
    ECDIS_WAYPOINTS: timeRefs.WAYPOINTS.value,
    AUTOPILOT_RSA: timeRefs.RSA.value,
    // ANEMOMETER_MTW: timeRefs.MTW.value,
    ECDIS_RTZ: timeRefs.RTZ.value,
    SPEEDLOG_VBW: timeRefs.VBW.value,
    SPEEDLOG_VHW: timeRefs.VHW.value,
    AUTOPILOT_HTD: timeRefs.HTD.value,
    SPEEDLOG_VLW: timeRefs.VLW.value,
  };
  await updateLossTimeData(tokenid.value, data);
  setTimeRefs();
  alert("설정이 완료되었습니다.")
};

const updateTenRefs = () => {
  Object.values(timeRefs).forEach(refObj => {
    refObj.value = timeRefs.ALL.value; // 10의 상수값을 넣으려면 이 부분을 수정
  });
};

onMounted(() => {
  getInfo();
  sessionStorage.setItem("page", "사용자 환경설정");
});

// 개인정보 변경
const privacypost = async () => {
  if (
    rulesname.value === true &&
    rulesaf.value === true &&
    rulesemail.value === true
  ) {
    const data = {
      userName: userName.value,
      department: userDepartment.value,
      phoneNumber: userNumber.value,
      eMail: userEmail.value,
      description: userDescription.value,
    };
    console.log(data);
    try {
      const userDataUpdate = await updateMineData(tokenid.value, data);
      console.log(userDataUpdate);
      alert("개인정보가 변경되었습니다.");
      privacyDialog.value = false;
    } catch (error) {
      console.error(error);
      alert(error.response?.data || "An error occurred during signup.");
    }
  } else {
    alert("정보를 모두 알맞게 입력하세요.");
  }
};

// 비밀번호 변경
const passwordOK = async () => {
  if (rulespassword.value && rulespw.value && rulescpw.value) {
    const data = {
      password: pw.value,
      newPassword: newpw.value,
    };
    console.log(data);
    try {
      const userPasswordUpdate = await updatePassword(tokenid.value, data);
      console.log(userPasswordUpdate);
      alert("개인정보가 변경되었습니다.");
      pw.value = null;
      newpw.value = null;
      newpwcheck.value = null;
      passwordchangeDialog.value = false;
    } catch (error) {
      console.error(error);
      alert(error.response?.data || "An error occurred during signup.");
    }
  } else {
    alert("입력을 하지 않았거나 유효성 검사를 통과하지 못한 항목이 있습니다.");
  }
};

const passwordChecking = async () => {
  let passwordCheck = {
    "password": Cpw.value
  };
  try {
    let A = await readPwData(tokenid.value, passwordCheck);
    console.log(A);
    if (A === true) {
      passwordcheckingDialog.value = false;
      resetPasswordDialog.value = true;
      Cpw.value = null;
    } else {
      alert("비밀번호가 올바르지 않습니다.");
    }
  } catch (error) {
    alert("오류가 발생했습니다.");
    console.error("Error in passwordChecking:", error);
  }
}

const resetPassword = async () => {
  let passwordCheck = {
    "password": Rpw.value
  };
  try {
    let A = await resetPwData(tokenid.value, passwordCheck);
    console.log(A);
    resetPasswordDialog.value = false;
    Rpw.value = null;
    alert("초기 비밀번호를 수정하였습니다.");
  } catch (error) {
    alert("오류가 발생했습니다.");
    console.error("Error in passwordChecking:", error);
  }
}




// 비밀번호 변경 취소
const passwordcancle = () => {
  pw.value = null;
  newpw.value = null;
  newpwcheck.value = null;
  passwordchangeDialog.value = false;
};

const passwordCheckingcancle = () => {
  pwCheck.value = null;
  passwordcheckingDialog.value = false;
}

const resetPasswordcancle = () => {
  pwCheck.value = null;
  resetPasswordDialog.value = false;
}

const axiostime = async () => {
  const data = {
    lossTime: losstime.value,
    lampTime: realtime.value,
  };
  try {
    // 서버에 POST 요청을 보내고 응답을 받음
    const lossTime = await updateSetTime(tokenid.value, data);
    console.log(lossTime);
    alert("수정이 완료되었습니다.");
    realtimeDialog.value = false;
    losstimeDialog.value = false;
    getInfo();
    // 이후 작업 수행 (예: 토큰을 저장하거나 처리)
  } catch (error) {
    console.error(error);
  }
};

const axiosrealtime = async () => {
  const data = {
    lampTime: realtime.value,
  };
  try {
    // 서버에 POST 요청을 보내고 응답을 받음
    const realtime = await updateSetTime(tokenid.value, data);
    console.log(realtime);
    alert("수정이 완료되었습니다.");
    realtimeDialog.value = false;
    getInfo();
    // 이후 작업 수행 (예: 토큰을 저장하거나 처리)
  } catch (error) {
    console.error(error);
  }
};

// 초기 데이터
const getInfo = async () => {
  try {
    // fetchData 함수를 호출하여 데이터를 가져옴
    const userDataResponse = await readMineData(tokenid.value);
    console.log(userDataResponse);
    userName.value = userDataResponse.userName;
    userDepartment.value = userDataResponse.department;
    userGroup.value = userDataResponse.userGroup;
    userDescription.value = userDataResponse.description;
    userEmail.value = userDataResponse.email;
    userNumber.value = userDataResponse.phoneNumber;
    losstime.value = userDataResponse.lossTime;
    realtime.value = userDataResponse.lampTime;
  } catch (error) {
    // 에러 처리
    console.error("Error in fetching data in component:", error);
  }
};

const rulesid = ref(false);
const rulespassword = ref(false);
const rulespw = ref(false);
const rulescpw = ref(false);
const rulesemail = ref(false);
const rulesname = ref(false);
const rulesaf = ref(false);

// Rules
const rules = ref({
  Name: [
    (value) => {
      if (value?.length > 0) {
        rulesname.value = true;
        return true;
      } else {
        rulesname.value = false;
        return "1글자 이상 입력하세요";
      }
    },
  ],
  Affiliation: [
    (value) => {
      if (value?.length > 0) {
        rulesaf.value = true;
        return true;
      } else {
        rulesaf.value = false;
        return "1글자 이상 입력하세요";
      }
    },
  ],
  ID: [
    (value) => {
      if (value?.length > 3) {
        rulesid.value = true;
        return true;
      } else {
        rulesid.value = false;
        return "아이디는 최소 4글자를 입력해주세요";
      }
    },
  ],
  Email: [
    (value) => {
      const pattern =
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      // return pattern.test(value) || "Invalid e-mail.";
      if (pattern.test(value)) {
        rulesemail.value = true;
        return true;
      } else {
        rulesemail.value = false;
        return "이메일 형식으로 입력해주세요";
      }
    },
  ],
  oldPassword: [
    (value) => {
      if (value?.length >= 6 && /[0-9]/.test(value) && /[a-zA-Z]/.test(value)) {
        rulespassword.value = true;
        return true;
      } else {
        rulespassword.value = false;
        return "비밀번호는 최소 6글자를 입력하고, 문자를 포함해주세요";
      }
    },
  ],
  Password: [
    (value) => {
      if (value?.length >= 6 && /[0-9]/.test(value) && /[a-zA-Z]/.test(value)) {
        rulespw.value = true;
        return true;
      } else {
        rulespw.value = false;
        return "비밀번호는 최소 6글자를 입력하고, 문자를 포함해주세요";
      }
    },
  ],
  PasswordConfirmation: [
    () => {
      if (newpw.value === newpwcheck.value) {
        rulescpw.value = true;
        return true;
      } else {
        rulescpw.value = false;
        return "Passwords do not match.";
      }
    },
  ],
});
</script>

<style scoped></style>
