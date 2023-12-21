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
        </v-list-item>
      </v-list>

      <v-divider></v-divider>

      <v-list
        v-if="permission === 'ADMIN' || permission === 'USER'"
        lines="three"
        select-strategy="classic"
      >
        <v-list-subheader>주기 설정</v-list-subheader>

        <v-list-item @click="losstimeDialog = true">
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
                <v-sheet style="height: 60vh; display: flex">
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
                      </v-radio-group>
                    </v-card-item>
                  </v-card>
                </v-sheet>
              </v-col>
              <v-col cols="8">
                <v-sheet style="height: 60vh; display: flex">
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
              @click="losstimeDialog = false"
              >취소</v-btn
            >
            <v-btn color="blue-darken-1" variant="text" @click="axiostime()"
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
            <v-btn color="blue-darken-1" variant="text" @click="axiostime()"
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
import { readMineData, updateMineData, updatePassword, updateSetTime } from "../api/index.js";

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

// Dialog 관리
const privacyDialog = ref(false);
const passwordchangeDialog = ref(false);
const losstimeDialog = ref(false);
const ALLlosstimeDialog = ref(true);
const realtimeDialog = ref(false);

// 데이터 소실주기 설정
const losstime = ref();
const realtime = ref();

// 데이터 소실주기 시간
const selectRadio = ref("DGPS");
const timeRefs = {
  GLL: ref("1"),
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

onMounted(() => {
  getInfo();
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

// 비밀번호 변경 취소
const passwordcancle = () => {
  pw.value = null;
  newpw.value = null;
  newpwcheck.value = null;
  passwordchangeDialog.value = false;
};

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
