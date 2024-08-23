<template>
  <!-- 전체화면 패딩100px -->
  <v-card-actions style="padding: 0px">
    <v-card ref="searchCard" :style="cardStyle">
      <v-card-text style="padding-bottom: 0px">
        <div style="display: flex; gap: 16px">
          <v-text-field
            v-model="tb1"
            density="compact"
            :append-inner-icon="
              ShipData === '관제 데이터' ? 'mdi-radar' : 'mdi-ferry'
            "
            label="Data Source"
            variant="outlined"
            readonly
            @click="
              (SelectedDataCardVisible = true),
                (SelectedShipContentsCardVisible = false),
                (SelectedVtsContentsCardVisible = false),
                (DataTypeCardVisible = false),
                (periodSettingCardVisible = false)
            "
            class="custom-text-field"
          ></v-text-field>
          <v-text-field
            v-model="tb2"
            body-1
            density="compact"
            append-inner-icon="mdi-format-list-checks"
            label="Select Component"
            variant="outlined"
            @click="
              (SelectedDataCardVisible = false),
                (SelectedShipContentsCardVisible = ShipData === '선내 데이터'),
                (SelectedVtsContentsCardVisible = ShipData === '관제 데이터'),
                (DataTypeCardVisible = false),
                (periodSettingCardVisible = false)
            "
            class="custom-text-field"
            ><v-tooltip activator="parent" location="bottom">{{
              formattedSearchTarget
            }}</v-tooltip></v-text-field
          >
          <v-text-field
            v-model="tb3"
            density="compact"
            :append-inner-icon="
              selectDataType === '비정형 데이터'
                ? 'mdi-code-json'
                : 'mdi-table-large'
            "
            label="Data Format"
            variant="outlined"
            readonly
            @click="
              (SelectedDataCardVisible = false),
                (SelectedShipContentsCardVisible = false),
                (SelectedVtsContentsCardVisible = false),
                (DataTypeCardVisible = true),
                (periodSettingCardVisible = false)
            "
            class="custom-text-field"
          >
          </v-text-field>
          <v-text-field
            v-model="tb4"
            density="compact"
            append-inner-icon="mdi-calendar-range"
            label="Data Scope"
            variant="outlined"
            readonly
            @click="
              (SelectedDataCardVisible = false),
                (SelectedShipContentsCardVisible = false),
                (SelectedVtsContentsCardVisible = false),
                (DataTypeCardVisible = false),
                (periodSettingCardVisible = true)
            "
            class="custom-text-field"
          ></v-text-field>
          <v-btn
            @click="dataSearchBtn()"
            color="#5865f2"
            variant="flat"
            width="10%"
            height="40px"
            >검색</v-btn
          >
        </div>
      </v-card-text>
    </v-card>

    <v-card
      v-if="viewState === 'basic'"
      ref="searchCard"
      :style="{
        position: 'absolute',
        top:
          SelectedDataCardVisible ||
          SelectedShipContentsCardVisible ||
          SelectedVtsContentsCardVisible ||
          DataTypeCardVisible ||
          periodSettingCardVisible
            ? '500px'
            : '450px',
        left: '50%',
        transform: 'translateX(-50%)',
        zIndex: 1000,
        width: '70%',
        overflow: 'visible',
      }"
    >
      <v-card-text style="padding-bottom: 0px">
        <div class="file-upload-page">
          <div
            class="drop-zone"
            @dragover.prevent
            @dragenter.prevent
            @drop.prevent="handleDrop"
          >
            <input
              type="file"
              ref="fileInput"
              @change="handleFileSelect"
              accept=".xls,.xlsx"
              style="display: none"
            />
            <div v-if="!file" @click="triggerFileSelect">
              <img
                src="/image/uploadfile.png"
                alt="upload icon"
                class="upload-icon"
              />
              <p style="font-size: 16px; font-weight: 550">
                클릭 혹은 파일을 이곳에 드롭하세요.
              </p>
              <p>1개씩, 파일당 최대 5MB</p>
            </div>
            <div v-else class="file-info">
              <div v-if="loadingFile">
                <div style="text-align: center; margin-top: 3%">
                  <v-progress-circular
                    indeterminate
                    :size="60"
                  ></v-progress-circular>
                </div>
                <div style="text-align: center; margin-top: 3%">
                  <v-btn color="red" @click="cancelRequest('1')" size="small"
                    >요청 취소하기</v-btn
                  >
                </div>
              </div>
              <div v-else>
                <table>
                  <tr>
                    <td><strong>파일 이름:</strong></td>
                    <td>{{ file.name }}</td>
                  </tr>
                  <tr>
                    <td><strong>최근 수정일:</strong></td>
                    <td>{{ file.lastModifiedDate.toLocaleString() }}</td>
                  </tr>
                  <tr>
                    <td><strong>용량:</strong></td>
                    <td>{{ (file.size / (1024 * 1024)).toFixed(2) }} MB</td>
                  </tr>
                </table>
                <button @click.stop="removeFile" class="remove-button">
                  X
                </button>
              </div>
            </div>
          </div>
          <button
            @click="uploadFile"
            :disabled="!file || loadingFile"
            class="upload-button"
          >
            다운로드
          </button>
        </div>
      </v-card-text>
    </v-card>

    <!-- --------------------------시험, 날짜 기간 검색------------------------------- -->

    <!-- 0번째 데이터 타입 선택 카드 -->
    <v-card
      v-if="SelectedDataCardVisible"
      :style="{
        position: 'absolute',
        top: searchState ? '150px' : '310px',
        left: '15%',
        zIndex: 1100,
        width: '27%',
        overflow: 'visible',
      }"
    >
      <v-card-title>
        <span>Data</span>
      </v-card-title>
      <v-card-text>
        <div
          class="destination-container"
          style="margin-bottom: 15px; display: flex; justify-content: center"
        >
          <v-btn
            :class="{ 'selected-button': ShipData === '선내 데이터' }"
            width="43%"
            style="flex: 1; margin: 0 10px"
            variant="outlined"
            class="secondBtn"
            @click="toggleSelectShipData('ship')"
          >
            <v-icon v-if="ShipData === '선내 데이터'" left color="red"
              >mdi-check</v-icon
            >
            선내 데이터 (SHIP)</v-btn
          >
          <v-btn
            :class="{
              'selected-button': ShipData === '관제 데이터',
            }"
            width="43%"
            style="flex: 1; margin: 0 10px"
            variant="outlined"
            class="secondBtn"
            @click="toggleSelectShipData('vts')"
          >
            <v-icon v-if="ShipData === '관제 데이터'" left color="red"
              >mdi-check</v-icon
            >
            관제 데이터 (VTS)</v-btn
          >
        </div>
        <v-divider></v-divider>
        <div class="chip-container">
          <div class="recent-search">
            <p style="height: 20px"></p>
          </div>
          <v-btn
            color="#5865f2"
            width="100px"
            variant="flat"
            @click="completeData0()"
            style="position: absolute; right: 16px; bottom: 8px"
            >선택</v-btn
          >
        </div>
      </v-card-text>
    </v-card>

    <!-- 1번째 데이터 선택 카드(선내) -->
    <v-card
      v-if="SelectedShipContentsCardVisible"
      :style="{
        position: 'absolute',
        top: searchState ? '150px' : '310px',
        left: '31%',
        zIndex: 1100,
        width: '50%',
        overflow: 'visible',
      }"
    >
      <v-card-title>
        <span>Ship Information Data Select</span>
      </v-card-title>
      <v-card-text>
        <div class="destination-container">
          <v-list class="category-list category-list">
            <v-list-item-group v-model="selectedCategory">
              <v-list-item
                v-for="(category, index) in shipCategories"
                :key="index"
                @click="toggleCategory(index)"
                :class="{ 'selected-item': selectedCategory === index }"
              >
                <v-list-item-title>{{ category }}</v-list-item-title>
              </v-list-item>
            </v-list-item-group>
          </v-list>
          <v-list class="destination-list destination-list scrollable-card-1">
            <v-list-item-group v-model="selectedDestination">
              <v-list-item
                v-for="(destination, index) in filteredDestinations"
                :key="index"
                @click="toggleDestination(destination)"
                :class="{
                  'selected-item': selectedDestination === destination,
                }"
              >
                <v-list-item-title>{{ destination.name }}</v-list-item-title>
              </v-list-item>
            </v-list-item-group>
          </v-list>
          <v-list class="destination-list destination-list scrollable-card-1">
            <v-list-item-group multiple v-model="selectedItems">
              <v-list-item
                v-for="(subItem, index) in subItems"
                :key="index"
                @click="toggleSubItem(subItem)"
                :class="{
                  'selected-item': selectedItems.includes(subItem),
                }"
              >
                <v-list-item-title>{{ subItem }}</v-list-item-title>
              </v-list-item>
            </v-list-item-group>
          </v-list>
        </div>
        <v-divider></v-divider>
        <div class="chip-container">
          <div class="recent-search">
            <h4>조회 데이터</h4>
            <v-chip
              v-for="(search, index) in recentSearches"
              :key="index"
              close
              @click="handleChipClick(search)"
              class="chip-item"
            >
              {{ search }}
            </v-chip>
          </div>
          <v-btn
            color="#5865f2"
            width="100px"
            variant="flat"
            @click="completeData1()"
            style="position: absolute; right: 16px; bottom: 8px"
            >선택</v-btn
          >
        </div>
      </v-card-text>
    </v-card>

    <!-- 1번째 데이터 선택 카드(관제) -->
    <v-card
      v-if="SelectedVtsContentsCardVisible"
      :style="{
        position: 'absolute',
        top: searchState ? '150px' : '310px',
        left: '31%',
        zIndex: 1100,
        width: '16%',
        overflow: 'visible',
      }"
    >
      <v-card-title>
        <span>VTS Information Data Select</span>
      </v-card-title>
      <v-card-text>
        <div>
          <v-list>
            <v-list-item-group multiple v-model="selectedVts">
              <v-list-item
                v-for="(vts, index) in vtsCategories"
                :key="index"
                @click="toggleVts(vts)"
                :class="{ 'selected-item': selectedItems.includes(vts) }"
              >
                <v-list-item-title>{{ vts }}</v-list-item-title>
              </v-list-item>
            </v-list-item-group>
          </v-list>
        </div>
        <v-divider style="margin-bottom: 35px"></v-divider>
        <div class="chip-container">
          <div class="recent-search"></div>
          <v-btn
            color="#5865f2"
            width="100px"
            variant="flat"
            @click="completeData1_1()"
            style="position: absolute; right: 16px; bottom: 8px"
            >선택</v-btn
          >
        </div>
      </v-card-text>
    </v-card>

    <!-- 2번째 데이터 타입 선택 카드 -->
    <v-card
      v-if="DataTypeCardVisible"
      :style="{
        position: 'absolute',
        top: searchState ? '150px' : '310px',
        left: '46.5%',
        zIndex: 1100,
        width: '27%',
        overflow: 'visible',
      }"
    >
      <v-card-title>
        <span>Data Format</span>
      </v-card-title>
      <v-card-text>
        <div
          class="destination-container"
          style="margin-bottom: 15px; display: flex; justify-content: center"
        >
          <v-btn
            :class="{ 'selected-button': selectDataType === '정형 데이터' }"
            width="43%"
            variant="outlined"
            style="flex: 1; margin: 0 10px"
            class="secondBtn"
            @click="toggleSelectDataType('정형 데이터')"
          >
            <v-icon v-if="selectDataType === '정형 데이터'" left color="red"
              >mdi-check</v-icon
            >
            정형 데이터 (TABLE)</v-btn
          >
          <v-btn
            :class="{
              'selected-button': selectDataType === '비정형 데이터',
            }"
            width="43%"
            variant="outlined"
            style="flex: 1; margin: 0 10px"
            class="secondBtn"
            @click="toggleSelectDataType('비정형 데이터')"
          >
            <v-icon v-if="selectDataType === '비정형 데이터'" left color="red"
              >mdi-check</v-icon
            >
            비정형 데이터 (JSON)</v-btn
          >
        </div>
        <v-divider></v-divider>
        <div class="chip-container">
          <div class="recent-search">
            <p style="height: 20px"></p>
          </div>
          <v-btn
            color="#5865f2"
            width="100px"
            variant="flat"
            @click="completeData2()"
            style="position: absolute; right: 16px; bottom: 8px"
            >선택</v-btn
          >
        </div>
      </v-card-text>
    </v-card>

    <!-- 3번째 항차, 기간 선택 카드 -->
    <v-card
      v-if="periodSettingCardVisible"
      :style="{
        position: 'absolute',
        top: searchState ? '150px' : '310px',
        left: selectedTest === 0 ? '67.5%' : '70.5%',
        zIndex: 1100,
        width: selectedTest === 0 ? '35%' : '17%',
        overflow: 'visible',
        transform: 'translateX(-50%)',
      }"
    >
      <v-card-title>
        <span>Data Period</span>
      </v-card-title>
      <v-card-text>
        <div class="destination-container" style="margin-bottom: 15px">
          <v-list
            class="scrollable-card-1"
            :style="{
              height: selectedTest === 0 ? '250px' : '250px',
              width: selectedTest === 0 ? '30%' : '100%',
              borderRight: '1px solid #e0e0e0',
            }"
          >
            <v-list-item-group v-model="selectedTest">
              <v-list-item
                v-for="(category, index) in testList"
                :key="index"
                @click="selectTest(index, category)"
                :class="{ 'selected-item': selectedTest === index }"
              >
                <v-list-item-title>{{ category }}</v-list-item-title>
              </v-list-item>
            </v-list-item-group>
          </v-list>

          <div
            v-if="selectedTest === 0"
            :style="{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              width: '70%',
            }"
          >
            <!-- <VueDatePicker
              v-model="dateRange"
              :inline="true"
              select-text="apply"
              density="compact"
              range
              style="--dp-input-padding: 8px; width: auto"
              @update:model-value="handleDateChange"
            /> -->

            <span class="span-title">시작 시점</span>
            <div class="row-container">
              <input
                class="date-picker"
                type="date"
                v-model="startDateInput"
                min="2000-01-01"
                max="9999-12-31"
              />
              <select
                v-model="startHour"
                class="time-select"
                :style="{
                  marginLeft: '20px',
                  backgroundColor: selectColor,
                  color: selectTextColor,
                }"
              >
                <option
                  v-for="hour in hours"
                  :key="hour"
                  :value="hour"
                  :style="{
                    backgroundColor: selectColor,
                    color: selectTextColor,
                  }"
                >
                  {{ hour }}
                </option>
              </select>
              시
              <input
                v-model="startMinute"
                @input="validateMinutes"
                type="text"
                class="m-time-input"
                placeholder="00"
              />
              분
            </div>

            <span class="span-title">종료 시점</span>
            <div class="row-container">
              <input
                class="date-picker"
                type="date"
                v-model="endDateInput"
                min="1000-01-01"
                max="9999-12-31"
              />
              <select
                v-model="endHour"
                class="time-select"
                :style="{
                  marginLeft: '20px',
                  backgroundColor: selectColor,
                  color: selectTextColor,
                }"
              >
                <option
                  v-for="hour in hours"
                  :key="hour"
                  :value="hour"
                  :style="{
                    backgroundColor: selectColor,
                    color: selectTextColor,
                  }"
                >
                  {{ hour }}
                </option>
              </select>
              시

              <input
                v-model="endMinute"
                @input="validateMinutee"
                type="text"
                class="m-time-input"
                placeholder="00"
              />
              분
            </div>
            <p style="font-size: 12px; font-weight: bold; margin-top: 20px">
              &nbsp;&nbsp;* 날짜 검색은 UTC를 기준으로 작성하며, &nbsp;&nbsp;
            </p>
            <p style="font-size: 12px; font-weight: bold">
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;데이터는 UTC 기준으로 보여짐
            </p>
          </div>
        </div>
        <v-divider></v-divider>
        <div class="chip-container">
          <div class="recent-search">
            <p style="height: 20px"></p>
          </div>
          <v-btn
            color="#5865f2"
            width="100px"
            variant="flat"
            @click="completeData3()"
            style="position: absolute; right: 16px; bottom: 8px"
            >선택</v-btn
          >
        </div>
      </v-card-text>
    </v-card>

    <v-spacer></v-spacer>
  </v-card-actions>
  <div style="height: 87vh" @click="windowClick()">
    <div style="padding: 30px; padding-bottom: 0px">
      <!-- 데이터 테이블 -->
      <template v-if="viewState == 'ondata'">
        <v-container v-if="showType == 'table'">
          <v-row>
            <v-col cols="9"
              ><v-tabs v-model="activeTab">
                <v-tab
                  :style="{
                    'background-color':
                      activeTab === index
                        ? themeSelectedTabColor
                        : themeNoNSelectedTabColor,
                    color:
                      activeTab === index
                        ? themeSelectedTabTextColor
                        : themeNoNSelectedTabTextColor,
                  }"
                  v-for="(data, index) in dataKeys"
                  :key="index"
                  >{{ data }}</v-tab
                >
              </v-tabs></v-col
            >
            <v-col cols="auto" style="padding-bottom: 3px; margin-left: auto"
              ><v-text-field
                style="width: 300px"
                v-model="searchInput"
                label="Search"
                prepend-inner-icon="mdi-magnify"
                variant="underlined"
                hide-details
                single-line
              ></v-text-field
            ></v-col>
          </v-row>

          <v-tabs-items v-model="activeTab">
            <v-tab-item v-for="(data, index) in dataKeys" :key="index">
              <template v-if="activeTab === index">
                <v-data-table
                  density="dence"
                  style="height: 68vh; margin-top: 10px"
                  :headers="headers[data]"
                  :items="paginatedItems"
                  :search="search"
                  :items-per-page="itemsPerPage"
                  class="elevation-1"
                >
                  <template v-slot:bottom>
                    <div
                      class="text-center pt-2"
                      style="display: flex; justify-content: center"
                    >
                      <v-pagination
                        v-model="page"
                        :length="pageCount"
                        :total-visible="15"
                      ></v-pagination>
                      <v-text-field
                        label="Page"
                        variant="outlined"
                        style="
                          max-width: 70px;
                          margin-left: 10px;
                          text-align: center;
                        "
                        @keyup.enter="keyPage"
                        v-model="page"
                      ></v-text-field>
                    </div>
                  </template>
                </v-data-table>
              </template>
              <template v-if="viewState === 'nodata'">
                <div style="text-align: center">
                  <p style="font-weight: 500; font-size: 20px">
                    {{ message }}
                  </p>
                </div>
              </template>
            </v-tab-item>
          </v-tabs-items>
          <v-card-actions
            v-if="downloadPermission"
            style="padding: 0px; margin: 0"
          >
            <v-spacer></v-spacer>
            <v-progress-circular
              v-if="downloading"
              style="margin-top: 5px"
              :size="25"
              color="primary"
              indeterminate
            ></v-progress-circular>
            <v-select
              v-if="downloadReq.type === 'table_data'"
              v-model="selectDownloadFormat"
              :items="downloadFormats"
              density="compact"
              label="format"
              style="
                max-width: 150px;
                margin: 0;
                margin-left: 10px;
                padding: 0;
                line-height: 1;
                height: 36px;
              "
              variant="solo"
            ></v-select>
            <v-btn
              v-if="!downloading"
              :color="'#5865f2'"
              variant="flat"
              :style="{
                'margin-top': '5px',
                'margin-left': '10px',
                width: '150px',
                height: '36px',
                'line-height': '36px',
                padding: '0',
              }"
              @click="dataDownloadServer()"
              :disabled="downloadBtnDisabled"
              >데이터 다운로드</v-btn
            >
            <v-btn
              v-if="downloading"
              :color="'red'"
              variant="flat"
              :style="{
                'margin-top': '5px',
                'margin-left': '10px',
                width: '150px',
                height: '36px',
                'line-height': '36px',
                padding: '0',
              }"
              @click="cancelRequest('2')"
              :disabled="downloadBtnDisabled"
              >다운로드 요청 취소</v-btn
            >
          </v-card-actions>
        </v-container>

        <!-- 데이터 원문 -->
        <v-container
          v-if="showType == 'json'"
          style="padding: 50px; padding-top: 15px"
        >
          <v-tabs v-model="activeTab2">
            <v-tab v-for="(tab, index) in dataKeys" :key="index">{{
              tab
            }}</v-tab>
          </v-tabs>

          <v-tabs-items v-model="activeTab2">
            <v-tab-item
              v-for="(tab, index) in dataKeys"
              :key="index"
              :value="tab"
            >
              <template v-if="activeTab2 === index">
                <v-row style="margin-top: 10px">
                  <v-col v-if="data[tab].length === 0" cols="12">
                    <v-card>
                      <v-card-title class="d-flex align-center">
                        <span class="ml-2" style="font-size: 16px"
                          >No Data</span
                        >
                      </v-card-title>
                    </v-card>
                  </v-col>
                  <v-col
                    v-else
                    v-for="(item, itemIndex) in getPaginatedData(tab)"
                    :key="item.id"
                    cols="12"
                  >
                    <v-card>
                      <v-card-title class="d-flex align-center">
                        <v-icon
                          @click="toggleDetails(tab, itemIndex)"
                          class="expand-icon"
                        >
                          {{
                            isItemExpanded(tab, itemIndex)
                              ? "mdi-chevron-up"
                              : "mdi-chevron-down"
                          }}
                        </v-icon>
                        <span class="ml-2" style="font-size: 16px">
                          {{ getCardName(item) }}
                        </span>
                      </v-card-title>
                      <v-card-text style="padding: 0; padding-left: 50px">
                        <pre v-if="isItemExpanded(tab, itemIndex)">{{
                          JSON.stringify(item, null, 2)
                        }}</pre>
                      </v-card-text>
                    </v-card>
                  </v-col>
                </v-row>
                <v-pagination
                  v-if="viewState == 'ondata'"
                  style="margin-top: 10px"
                  v-model="pages[tab]"
                  :length="getTotalPages(tab)"
                  @input="changePage(tab)"
                ></v-pagination>
              </template>
            </v-tab-item>
          </v-tabs-items>
          <v-card-actions v-if="downloadPermission">
            <v-spacer></v-spacer>
            <v-progress-circular
              v-if="!downloading"
              style="margin-top: 5px"
              :size="25"
              color="primary"
              indeterminate
            ></v-progress-circular>
            <v-select
              v-if="downloadReq.type === 'table_data'"
              v-model="selectDownloadFormat"
              :items="downloadFormats"
              density="compact"
              label="format"
              style="
                max-width: 150px;
                margin: 0;
                margin-left: 10px;
                padding: 0;
                line-height: 1;
                height: 36px;
              "
              variant="solo"
            ></v-select>
            <v-btn
              v-if="!downloading"
              :color="'#5865f2'"
              variant="flat"
              :style="{
                'margin-top': '5px',
                'margin-left': '10px',
                width: '150px',
                height: '36px',
                'line-height': '36px',
                padding: '0',
              }"
              @click="dataDownloadServer()"
              :disabled="downloadBtnDisabled"
              >데이터 다운로드</v-btn
            >
            <v-btn
              v-if="downloading"
              :color="'red'"
              variant="flat"
              :style="{
                'margin-top': '5px',
                'margin-left': '10px',
                width: '150px',
                height: '36px',
                'line-height': '36px',
                padding: '0',
              }"
              @click="cancelRequest('2')"
              :disabled="downloadBtnDisabled"
              >다운로드 요청 취소</v-btn
            >
          </v-card-actions>
        </v-container>
      </template>
      <template v-if="viewState == 'loading'">
        <div style="text-align: center; margin-top: 40vh">
          <v-progress-circular
            :size="50"
            color="primary"
            indeterminate
          ></v-progress-circular>
        </div>
        <div style="text-align: center; margin-top: 3%">
          <v-btn color="red" @click="cancelRequest('1')" size="small"
            >요청 취소하기?</v-btn
          >
        </div>
      </template>

      <!-- 데이터 다운로드 -->
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch, onMounted } from "vue";
import DatePicker from "vue3-datepicker";
import {
  readTrialData,
  readDataTrial,
  downloadDataFile,
  readMineData,
  downloadDataFileXml,
} from "../api/index.js";
import { themeMode, themeConfig } from "@/utils/theme.js";
import "@/styles/datepicker-theme.css";

const {
  btnColor,
  textColor,
  themeColor,
  btnTextColor,
  themeSelectedTabColor,
  themeNoNSelectedTabColor,
  themeSelectedTabTextColor,
  themeNoNSelectedTabTextColor,
  tableStyle,

  selectColor,
  selectTextColor,
} = themeConfig;
// 토큰
const tokenid = ref(sessionStorage.getItem("token") || "");

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// 데이터 선택창
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// text field
let tb1 = "";
let tb2 = "";
let tb3 = "";
let tb4 = "";

// for View API Request variable
const requests = ref({
  type: "",
  data: "",
  period: "",
  index: "",
  signal: "",
});

// for Download API Request variable
const downloadReq = ref({
  type: "",
  data: "",
  file_type: "",
  period: "",
  signal: "",
});

// ---------------- Main Component Card View -------------------------//
const SelectedDataCardVisible = ref(false);
const SelectedShipContentsCardVisible = ref(false);
const SelectedVtsContentsCardVisible = ref(false);
const DataTypeCardVisible = ref(false);
const periodSettingCardVisible = ref(false);

const selectedCategory = ref(null);
const selectedDestination = ref(null);
const selectedItems = ref([]);
const subItems = ref([]);
const searchTarget = ref([]);

const searchState = ref(false);

const selectedHour = ref(6);
const selectedMinute = ref(19);

const viewState = ref("basic");

const selectBoxClick1 = () => {};

const selectBoxClick2 = () => {};

const selectBoxClick3 = () => {};

const selectBoxClick4 = () => {};

const search = ref("");
const searchInput = ref("");

watch(searchInput, async (newValue, oldValue) => {
  search.value = searchInput.value;
});

// ------------------- 0번째 데이터 선정 Method ------------------------ //
const ShipData = ref();
const ShipDataState = ref();

const toggleSelectShipData = (data) => {
  if (data === "ship") {
    ShipData.value = "선내 데이터";
    requests.value.data = "information";
  } else if (data === "vts") {
    ShipData.value = "관제 데이터";
    requests.value.data = "vts";
  } else {
    console.log("있을 수 없는 일");
  }

  tb1 = ShipData.value;

  // 검색 조건 할당
  // requests.value.data =
  //   ShipData.value === "선내 데이터" ? "information" : "vts";

  // 다음 선택 시, 다음 조건 CardView로 이동
  SelectedDataCardVisible.value = false;

  if (ShipData.value === "선내 데이터") {
    SelectedShipContentsCardVisible.value = true;
  } else if (ShipData.value === "관제 데이터") {
    SelectedVtsContentsCardVisible.value = true;
  } else {
    alert("항목을 선택해주세요.");
  }
};

// ShipData가 변경될 때 recentSearches와 searchTarget 초기화
watch(ShipData, (newValue, oldValue) => {
  if (newValue !== oldValue) {
    recentSearches.value = [];
    searchTarget.value = [];
    tb2 = "";
    selectedItems.value = [];
    selectedCategory.value = null;
    selectedDestination.value = null;
    subItems.value = [];
  }
});

// ------------------- 1번째 데이터 선정 Method ------------------------ //

const shipCategories = ref([
  "Ship Information",
  "Kass Information",
  "System Information",
  "Ctrl Information",
]);

const vtsCategories = ref([
  "AIS",
  "STATIC AIS INFO",
  "DYNAMIC AIS INFO",
  "OBJECT INFO",
  "WEATHER INFO",
]);

// SubComponents List
const destinations = ref([
  // { name: "로스앤젤레스, CA", code: "LAX", category: 1 },
  // { name: "뉴욕 / 존 F 케네디, NY", code: "JFK", category: 3 },
  // { name: "샌프란시스코, CA", code: "SFO", category: 3 },
  // { name: "시애틀, WA", code: "SEA", category: 3 },
  // { name: "호놀룰루, HI", code: "HNL", category: 3 },
  { name: "GYRO", category: 0 },
  { name: "DGPS", category: 0 },
  { name: "ANEMOMETER", category: 0 },
  { name: "RADAR", category: 0 },
  { name: "AIS", category: 0 },
  { name: "ECDIS", category: 0 },
  { name: "AUTOPILOT", category: 0 },
  { name: "SPEEDLOG", category: 0 },
  { name: "CANTHROTTLE", category: 0 },
  { name: "AUTOPILOTCONTACT", category: 0 },
  { name: "NO1ENGINEPANEL", category: 0 },
  { name: "NO2ENGINEPANEL", category: 0 },

  { name: "MTIE1ISA", category: 1 },
  { name: "MTIE5VDGS", category: 1 },
  { name: "MTIE5DBS", category: 1 },
  { name: "MOF1ANS", category: 1 },
  { name: "MOF2SYNC", category: 1 },
  { name: "MOF1GNW", category: 1 },
  { name: "MTIE5SAS", category: 1 },
  { name: "MTIE4XINNOS_VDGS_EMUL", category: 1 },
  { name: "MTIE4XINNOS_STAS_EMUL", category: 1 },
  { name: "MTIE4XINNOS_STAS", category: 1 },
  { name: "MTIE4XINNOS_VDGS", category: 1 },

  { name: "MANAGEMENT", category: 2 },

  { name: "RUDDER", category: 3 },
  { name: "ENGINE", category: 3 },
  { name: "MODE", category: 3 },
  // Add more destinations here with corresponding category
]);
// Contents List
const destinationSubItems = {
  GYRO: ["THS", "HDT", "ROT"],
  DGPS: ["GLL", "GGA", "RMC", "VTG", "ZDA", "DTM", "GSV", "GSA"],
  ANEMOMETER: ["MWV", "MWD", "VWR", "MTW", "VWT"],
  RADAR: ["TTM", "TLL", "RADARSCREEN"],
  AIS: ["VDM", "VDO"],
  ECDIS: ["ROUTEINFO", "WAYPOINTS", "RTZ", "ECDISSCREEN"],
  AUTOPILOT: ["RSA", "HTD"],
  SPEEDLOG: ["VBW", "VHW", "VLW"],
  CANTHROTTLE: ["CANONLINESTATE", "ENGINERPM", "RUDDER", "RUDDERSCALE"],
  AUTOPILOTCONTACT: ["AUTOPILOTCONTACT"],
  NO1ENGINEPANEL: [
    "NO1ENGINE_PANEL_61444",
    "NO1ENGINE_PANEL_65262",
    "NO1ENGINE_PANEL_65263",
    "NO1ENGINE_PANEL_65272",
    "NO1ENGINE_PANEL_65271",
    "NO1ENGINE_PANEL_65253",
    "NO1ENGINE_PANEL_65270",
    "NO1ENGINE_PANEL_65276",
    "NO1ENGINE_PANEL_65360",
    "NO1ENGINE_PANEL_65361_LAMP",
    "NO1ENGINE_PANEL_65361_STATUS",
    "NO1ENGINE_PANEL_65378",
    "NO1ENGINE_PANEL_65376",
    "NO1ENGINE_PANEL_65379",
  ],
  NO2ENGINEPANEL: [
    "NO2ENGINE_PANEL_61444",
    "NO2ENGINE_PANEL_65262",
    "NO2ENGINE_PANEL_65263",
    "NO2ENGINE_PANEL_65272",
    "NO2ENGINE_PANEL_65271",
    "NO2ENGINE_PANEL_65253",
    "NO2ENGINE_PANEL_65270",
    "NO2ENGINE_PANEL_65276",
    "NO2ENGINE_PANEL_65360",
    "NO2ENGINE_PANEL_65361_LAMP",
    "NO2ENGINE_PANEL_65361_STATUS",
    "NO2ENGINE_PANEL_65378",
    "NO2ENGINE_PANEL_65376",
    "NO2ENGINE_PANEL_65379",
  ],

  MTIE1ISA: ["SITUATIONAL"],
  MTIE5VDGS: ["VIRTUALNAV"],
  MTIE5DBS: ["SITUATIONALAWARENESS"],
  MOF1ANS: ["ROUTEDECISION"],
  MOF2SYNC: ["MARINEGATEWAY"],
  MOF1GNW: ["WAYPOINT"],
  MTIE5SAS: ["SAS"],
  MTIE4XINNOS_VDGS_EMUL: [
    "VIRTUALME1_1",
    "VIRTUALME1_2",
    "VIRTUALME1_3",
    "VIRTUALME1_4",
    "VIRTUALME1_5",
    "VIRTUALME1_6",
    "VIRTUALME1_7",
    "VIRTUALME1_8",
    "VIRTUALME1_9",
    "VIRTUALME1_10",
    "VIRTUALME1_11",
    "VIRTUALME1_12",
    "VIRTUALME1_13",
    "VIRTUALME1_14",
    "VIRTUALME2_1",
    "VIRTUALME2_2",
    "VIRTUALME2_3",
    "VIRTUALME2_4",
    "VIRTUALME2_5",
    "VIRTUALME2_6",
    "VIRTUALME2_7",
    "VIRTUALME2_8",
    "VIRTUALME2_9",
    "VIRTUALME2_10",
    "VIRTUALME2_11",
    "VIRTUALME2_12",
    "VIRTUALME2_13",
    "VIRTUALME2_14",
    "VIRTUALMP1_1",
    "VIRTUALMP1_2",
    "VIRTUALMP1_3",
    "VIRTUALMP1_4",
    "VIRTUALMP1_5",
    "VIRTUALMP2_1",
    "VIRTUALMP2_2",
    "VIRTUALMP2_3",
    "VIRTUALMP2_4",
    "VIRTUALMP2_5",
    "VIRTUALPMS_1",
    "VIRTUALPMS_2",
    "VIRTUALPMS_3",
  ],
  MTIE4XINNOS_STAS_EMUL: ["ME1", "ME2"],
  MTIE4XINNOS_STAS: ["ME1", "ME2"],
  MTIE4XINNOS_VDGS: [
    "NO1ENGINE_PANEL_61444",
    "NO1ENGINE_PANEL_65262",
    "NO1ENGINE_PANEL_65263",
    "NO1ENGINE_PANEL_65272",
    "NO1ENGINE_PANEL_65271",
    "NO1ENGINE_PANEL_65253",
    "NO1ENGINE_PANEL_65270",
    "NO1ENGINE_PANEL_65276",
    "NO1ENGINE_PANEL_65360",
    "NO1ENGINE_PANEL_65361_LAMP",
    "NO1ENGINE_PANEL_65361_STATUS",
    "NO1ENGINE_PANEL_65378",
    "NO1ENGINE_PANEL_65376",
    "NO1ENGINE_PANEL_65379",
    "NO2ENGINE_PANEL_61444",
    "NO2ENGINE_PANEL_65262",
    "NO2ENGINE_PANEL_65263",
    "NO2ENGINE_PANEL_65272",
    "NO2ENGINE_PANEL_65271",
    "NO2ENGINE_PANEL_65253",
    "NO2ENGINE_PANEL_65270",
    "NO2ENGINE_PANEL_65276",
    "NO2ENGINE_PANEL_65360",
    "NO2ENGINE_PANEL_65361_LAMP",
    "NO2ENGINE_PANEL_65361_STATUS",
    "NO2ENGINE_PANEL_65378",
    "NO2ENGINE_PANEL_65376",
    "NO2ENGINE_PANEL_65379",
  ],

  MANAGEMENT: [
    "SUBSCRIBELIST",
    "CONNECTSTATE",
    "SYSTEMSTATE",
    "ALARMINFO",
    "MODEINFO",
    "COM",
    "ENGINECONTROL",
    "RUDDERCONTROL",
    "SHORE_MODE_REQUEST",
    "SHORE_ENGINE_CONTROL",
    "SHORE_RUDDER_CONTROL",
  ],

  RUDDER: ["REQUESTCOMMAND", "RESPONSECOMMAND"],
  ENGINE: ["REQUESTCOMMAND", "RESPONSECOMMAND"],
  MODE: ["REQUESTCOMMAND", "RESPONSECOMMAND"],

  // 필요에 따라 다른 항목 추가
};

const filteredDestinations = computed(() =>
  destinations.value.filter(
    (destination) => destination.category === selectedCategory.value
  )
);

const recentSearches = ref([]);

// ------------------------ 1번째 리스트 Main Componunet ----------------------------- //
const toggleCategory = (index) => {
  if (selectedCategory.value === index) {
    selectedCategory.value = null;
    subItems.value = [];
  } else {
    selectedCategory.value = index;
    subItems.value = [];
  }
};

// ------------------------ 2번째 리스트 Sub Componunet ----------------------------- //
const toggleDestination = (destination) => {
  if (selectedDestination.value === destination) {
    selectedDestination.value = null;
    subItems.value = [];
  } else {
    selectedDestination.value = destination;
    subItems.value = destinationSubItems[destination.name] || [];
  }
};

const removeItemFromArray = (array, item) => {
  const index = array.indexOf(item);
  if (index > -1) {
    array.splice(index, 1);
  }
};

// ------------------------ 3번째 리스트 Contents ----------------------------- //
const toggleSubItem = (subItem) => {
  const itemName = `${selectedDestination.value.name}_${subItem}`;
  if (selectedItems.value.includes(subItem)) {
    selectedItems.value = selectedItems.value.filter(
      (item) => item !== subItem
    );
    removeItemFromArray(recentSearches.value, itemName);
    removeItemFromArray(searchTarget.value, itemName);
  } else {
    selectedItems.value.push(subItem);
    if (subItem === "ALL") {
      recentSearches.value.push(`${selectedDestination.value.name}`);
    } else {
      recentSearches.value.push(`${selectedDestination.value.name}_${subItem}`);
      searchTarget.value.push(`${selectedDestination.value.name}_${subItem}`);
    }
  }

  tb2 = formattedSearchTarget;

  let signalParams = "";

  for (let i = 0; i < recentSearches.value.length; i++) {
    signalParams += `&signal_name=${recentSearches.value[i]}`;
  }

  requests.value.signal = signalParams;
};

// ---------------------------- 관제 --------------------------- //
const toggleVts = (vts) => {
  const index = selectedItems.value.indexOf(vts);
  const vtsWithoutSpaces = vts.replace(/\s+/g, ""); // 스페이스바를 제거한 새로운 문자열
  // 선택하면 selectedItems에 추가
  if (index === -1) {
    selectedItems.value.push(vts);

    recentSearches.value.push(`integratedctrlsystem_${vtsWithoutSpaces}`);
    searchTarget.value.push(vts);
  }
  // 선택된 리스트를 한번더 클릭 시 선택 해제
  else {
    selectedItems.value.splice(index, 1);
    removeItemFromArray(
      recentSearches.value,
      `integratedctrlsystem_${vtsWithoutSpaces}`
    );
    removeItemFromArray(searchTarget.value, vts);
  }

  tb2 = formattedSearchTarget;

  let signalParams = "";

  for (let i = 0; i < recentSearches.value.length; i++) {
    signalParams += `&signal_name=${recentSearches.value[i]}`;
  }

  requests.value.signal = signalParams;
};

const handleChipClick = (search) => {
  const parts = search.split("_");
  let destination, subItem;

  if (parts.length > 2) {
    if (
      parts[0] === "NO1ENGINEPANEL" ||
      parts[0] === "NO2ENGINEPANEL" ||
      parts[0] === "MANAGEMENT"
    ) {
      destination = parts[0];
      subItem = parts.slice(1).join("_");
    } else if (parts[0] === "MTIE4XINNOS") {
      const endIndex = parts[2] === "EMUL" ? 3 : 2;
      destination = parts.slice(0, endIndex).join("_");
      subItem = parts.slice(endIndex).join("_");
    } else {
      alert("_가 2개 이상 존재합니다.");
      return;
    }
  } else {
    [destination, subItem] = parts;
  }

  const destObj = destinations.value.find((dest) => dest.name === destination);

  if (subItem) {
    selectedDestination.value = destObj;
    toggleSubItem(subItem);
  } else {
    toggleDestination(destObj);
  }
};

// ------------------- 2번째 데이터 타입 Method ------------------------ //
const selectDataType = ref(null);

const toggleSelectDataType = (type) => {
  if (type === "정형 데이터") {
    selectDataType.value = "정형 데이터";
    requests.value.type = "table_data";
  } else if (type === "비정형 데이터") {
    selectDataType.value = "비정형 데이터";
    requests.value.type = "collection_data";
  } else {
    console.log("가능한가?");
  }

  // 데이터 선택 박스 text 할당
  tb3 = selectDataType.value;

  // 다음 선택 시, 다음 조건 CardView로 이동
  DataTypeCardVisible.value = false;
  if (searchTimeRange.value == null) {
    periodSettingCardVisible.value = true;
  }
};

// ------------------- 3번째 데이터 기간 Method ------------------------ //

// 초기 날짜 설정
const dateRange = ref(); // 초기 날짜를 설정합니다
const startUtc = ref(); //검색용 직접선택 시작시간
const endUtc = ref(); //검색용 직접선택 종료시간

const testList = ref(["직접 선택"]);
const selectedTest = ref();
const testStartTimeList = ref([]);
const testEndTimeList = ref([]);

const searchTimeRange = ref(null); //null로 변경

const getTrialDate = async () => {
  try {
    const response = await readTrialData(tokenid.value);
    for (let i = 0; i < response.length; i++) {
      testStartTimeList.value.push(`${response[i].startTimeUtc}`);
      testEndTimeList.value.push(`${response[i].endTimeUtc}`);

      selectedTestStartTime.value.push(response[i].startTimeUtc);
      selectedTestEndTime.value.push(response[i].endTimeUtc);

      const testNumber = response[i].testName;
      testList.value.push(`${testNumber}`);
    }
  } catch (error) {
    console.error(error);
  }
};

// 새로운 데이트피커
const startDateInput = ref("");
const endDateInput = ref("");
const startHour = ref("00");
const startMinute = ref("");
const endHour = ref("00");
const endMinute = ref("");

const selectedTestStartTime = ref([]);
const selectedTestEndTime = ref([]);

// 시간 및 분 옵션
const hours = Array.from({ length: 24 }, (_, i) =>
  i.toString().padStart(2, "0")
);

const updateDate = () => {
  let start;
  let end;
    // 시작 날짜와 시간을 합쳐서 Date 객체로 변환
    start = new Date(
      `${startDateInput.value}T${startHour.value.padStart(
        2,
        "0"
      )}:${startMinute.value.padStart(2, "0")}:00`
    );
    // 종료 날짜와 시간을 합쳐서 Date 객체로 변환
    end = new Date(
      `${endDateInput.value}T${endHour.value.padStart(
        2,
        "0"
      )}:${endMinute.value.padStart(2, "0")}:00`
    );
  

  start.setHours(start.getHours() + 9);
  end.setHours(end.getHours() + 9);

  if (!isNaN(start) && !isNaN(end)) {
    // 유효한 날짜인 경우에만 ISO 문자열로 변환
    startUtc.value = start.toISOString();
    endUtc.value = end.toISOString();
  } else {
    console.error("Invalid date values in dateRange.value");
  }
};

const selectTest = (index, category) => {
  selectedTest.value = index;
  if (index == 0) {
    handleDateChange();
    requests.value.period = `period?start_time_utc=${startUtc.value}&end_time_utc=${endUtc.value}`;
  } else {
    searchTimeRange.value = category;
    requests.value.period = `test?test_name=${searchTimeRange.value}`;
  }
  // 데이터 선택 박스 text 할당
  tb4 = searchTimeRange.value;
};

const handleDateChange = () => {
  if (dateRange.value) {
    startUtc.value = dateRange.value[0].toISOString();
    endUtc.value = dateRange.value[1].toISOString();

    searchTimeRange.value = `${startUtc.value} - ${endUtc.value}`;
  } else {
    searchTimeRange.value = "날짜를 입력하세요.";
  }
};

// ------------------- Complete Method ------------------------ //
const showType = ref("none");
const completeData0 = () => {
  // 데이터 선택 박스 text 할당
  tb1 = ShipData.value;

  // 검색 조건 할당
  requests.value.data =
    ShipData.value === "선내 데이터" ? "information" : "vts";

  // 다음 선택 시, 다음 조건 CardView로 이동
  SelectedDataCardVisible.value = false;

  if (ShipData.value === "선내 데이터") {
    SelectedShipContentsCardVisible.value = true;
  } else if (ShipData.value === "관제 데이터") {
    SelectedVtsContentsCardVisible.value = true;
  } else {
    alert("항목을 선택해주세요.");
  }
};

const completeData1 = () => {
  // 데이터 선택 박스 text 할당
  tb2 = formattedSearchTarget;

  let signalParams = "";

  for (let i = 0; i < recentSearches.value.length; i++) {
    signalParams += `&signal_name=${recentSearches.value[i]}`;
  }

  requests.value.signal = signalParams;

  // 다음 선택 시, 다음 조건 CardView로 이동
  SelectedShipContentsCardVisible.value = false;

  if (selectDataType.value == null) {
    DataTypeCardVisible.value = true;
  }
};

const completeData1_1 = () => {
  // 데이터 선택 박스 text 할당
  tb2 = formattedSearchTarget;

  let signalParams = "";

  for (let i = 0; i < recentSearches.value.length; i++) {
    signalParams += `&signal_name=${recentSearches.value[i]}`;
  }

  requests.value.signal = signalParams;

  // 다음 선택 시, 다음 조건 CardView로 이동
  SelectedVtsContentsCardVisible.value = false;
  if (selectDataType.value == null) {
    DataTypeCardVisible.value = true;
  }
};

const completeData2 = () => {
  // 데이터 선택 박스 text 할당
  tb3 = selectDataType.value;

  // 검색 조건 할당
  requests.value.type =
    selectDataType.value === "정형 데이터" ? "table_data" : "collection_data";

  // 다음 선택 시, 다음 조건 CardView로 이동
  DataTypeCardVisible.value = false;
  if (searchTimeRange.value == null) {
    periodSettingCardVisible.value = true;
  }
};

const completeData3 = () => {
  // 데이터 선택 박스 text 할당

  updateDate();

  if (selectedTest.value === 0) {
    requests.value.period = `period?start_time_utc=${startUtc.value}&end_time_utc=${endUtc.value}`;
    if (startUtc.value === undefined || endUtc.value === undefined) {
      tb4 = "날짜를 입력하세요.";
    } else {
      tb4 = `${startUtc.value}~${endUtc.value}`;
    }
  } else {
    requests.value.period = `test?test_name=${searchTimeRange.value}`;
    tb4 = testList.value[selectedTest.value];
  }

  // 다음 선택 시, 다음 조건 CardView로 이동
  periodSettingCardVisible.value = false;
};

// ------------------- Data Viewing ------------------------ //

////////////////////////////////////////////////////////////
// --------------- 데이터 검색 버튼 -----------------------//
///////////////////////////////////////////////////////////
const dataSearchBtn = async () => {
  if (tb1 && tb2 && tb3 && tb4) {
    checkPermission();
    viewState.value = "loading";
    ShipDataState.value = ShipData.value;
    showType.value = selectDataType.value === "정형 데이터" ? "table" : "json";
    let apiReq = `collection_data/information/period?start_time_utc=2024-05-27T15:15:28.000Z&end_time_utc=2024-05-27T15:45:38.000Z&signal_name=AIS_VDM&signal_name=AIS_VDO`;
    apiReq = `${requests.value.type}/${requests.value.data}/${requests.value.period}${requests.value.signal}`;
    await searchApi(apiReq);
    // 요청이 취소되지 않은 경우에만 실행
    if (searchState.value) {
      if (selectDataType.value == "비정형 데이터") {
        dataKeys2.value = Object.keys(data.value);

        pages.value = dataKeys2.value.reduce((acc, key) => {
          acc[key] = 1;
          return acc;
        }, {});
      }
      ShipDataState.value = ShipData.value;
      viewState.value = "ondata";

      downloadReq.value.type = requests.value.type;
      downloadReq.value.data = requests.value.data;
      downloadReq.value.signal = requests.value.signal;
      downloadReq.value.period =
        selectedTest.value === 0
          ? `find_method=period&start_time_utc=${startUtc.value}&end_time_utc=${endUtc.value}`
          : `find_method=test&test_name=${searchTimeRange.value}`;
    }
  }
};

// Test 중
const activeTab = ref(0);
const dataTables = ref({});
const dataKeys = ref([]);
const headers = ref([]);

let cancelTokenSource = null; // 요청 취소 토큰

const searchApi = async (apiReq) => {
  try {
    // 요청 취소를 위한 CancelToken 생성
    cancelTokenSource = axios.CancelToken.source();

    // readDataTrial 호출, cancelToken 전달
    const response = await readDataTrial(
      tokenid.value,
      apiReq,
      cancelTokenSource.token
    );

    // 취소되지 않은 경우에만 응답 처리
    if (!axios.isCancel(response)) {
      data.value = response;
      processData(response);
      paginatedComputed();
      searchState.value = true;
    }
  } catch (error) {
    if (axios.isCancel(error)) {
      console.log("요청이 취소되었습니다:", error.message);
      searchState.value = false;
    } else {
      if (error.response && error.response.status) {
        if (error.response.status === 403) {
          alert(error.response.data);
        }
      } else {
        // error.response가 없으면 해당 오류를 무시하고 넘어감
        console.error("정의되지 않은 오류 발생:", error.message || error);
      }

      viewState.value = "basic";
      searchState.value = false;
    }
  } finally {
    cancelTokenSource = null; // 요청이 완료된 후 토큰 초기화
  }
};

// 요청 취소하기
const cancelRequest = (loc) => {
  if (cancelTokenSource) {
    cancelTokenSource.cancel("요청이 취소되었습니다."); // 요청 취소
    if (loc === "1") {
      searchState.value = false;
      viewState.value = "basic";
    }
    alert("요청이 취소되었습니다."); // 취소 알림
  } else {
    alert("취소할 요청이 없습니다.");
  }
};

const processData = (response) => {
  const importantKeys = [
    "seatrial_ID",
    "timestamp_EQUIPMENT",
    "timestamp_PUBLISH",
    "ship_ID",
  ];

  dataKeys.value = Object.keys(response);
  dataKeys.value.forEach((key) => {
    if (response[key].length > 0) {
      const fields = Object.keys(response[key][0]);
      const sortedFields = [
        ...importantKeys.filter((importantKey) =>
          fields.includes(importantKey)
        ),
        ...fields.filter(
          (field) => !importantKeys.includes(field) && field !== "id"
        ),
      ];
      headers.value[key] = sortedFields.map((field) => ({
        title:
          field === "timestamp_EQUIPMENT" || field === "timestamp_PUBLISH"
            ? ` ${field}          `
            : field,
        value: field,
      }));
    }
    dataTables.value[key] = response[key];
  });
};

// --------------------------- pagenation --------------------------------//
const itemsPerPage = ref(24);
const page = ref(1);
const pageCount = ref(0);

// 현재 활성화된 탭의 데이터를 기반으로 페이지네이션을 설정
watch([activeTab, dataTables], () => {
  paginatedComputed();
});

const paginatedComputed = () => {
  const currentTabData =
    dataTables.value[dataKeys.value[activeTab.value]] || [];
  pageCount.value = Math.ceil(currentTabData.length / itemsPerPage.value);
  page.value = 1; // 탭을 변경할 때 페이지를 1로 초기화
};

// 현재 페이지에 표시할 항목 계산
const paginatedItems = computed(() => {
  const currentTabData =
    dataTables.value[dataKeys.value[activeTab.value]] || [];
  const start = (page.value - 1) * itemsPerPage.value;
  const end = start + itemsPerPage.value;
  return currentTabData.slice(start, end);
});

//

const windowClick = () => {
  SelectedDataCardVisible.value = false;
  SelectedShipContentsCardVisible.value = false;
  SelectedVtsContentsCardVisible.value = false;
  DataTypeCardVisible.value = false;
  periodSettingCardVisible.value = false;
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// 데이터 검색 및 저장
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//----------------------데이터 검색--------------------------//

onMounted(() => {
  getTrialDate();
  sessionStorage.setItem("page", "데이터 조회");
});

// ----------------------------- 원문 데이터 테스트 ------------------------------ //
const data = ref({});

const itemsPerPage2 = 10;
const page2 = ref(1);
const expandedItems = ref([]);
const currentTab = ref("0"); // Default tab
const activeTab2 = ref(0);

const dataKeys2 = ref(Object.keys(data.value));

const pages = ref(
  dataKeys2.value.reduce((acc, key) => {
    acc[key] = 1;
    return acc;
  }, {})
);

// 페이지네이션을 적용한 데이터
const getPaginatedData = (tab) => {
  const start = (pages.value[tab] - 1) * itemsPerPage2;
  const end = pages.value[tab] * itemsPerPage2;
  return data.value[tab].slice(start, end);
};

// 전체 페이지 수 계산
const getTotalPages = (tab) => {
  return Math.ceil(data.value[tab].length / itemsPerPage2);
};

// 카드 클릭 시 세부 정보 토글
const toggleDetails = (tab, index) => {
  const itemIndex = `${tab}-${index}`;
  if (expandedItems.value.includes(itemIndex)) {
    expandedItems.value = expandedItems.value.filter((i) => i !== itemIndex);
  } else {
    expandedItems.value.push(itemIndex);
  }
};

const isItemExpanded = (tab, index) => {
  const itemIndex = `${tab}-${index}`;
  return expandedItems.value.includes(itemIndex);
};

// 페이지 변경 시 호출되는 함수
const changePage = (tab) => {
  expandedItems.value = [];
};

const getCardName = (item) => {
  const cardName = ref();
  try {
    if (ShipDataState.value == "선내 데이터") {
      cardName.value =
        item.packageDetail.timeSeriesData[0].tabularData[0].dataSet[0].timeStamp;
    } else {
      cardName.value = item.receivedTime;
    }
  } catch (error) {
    console.log(error);
  }

  return cardName.value;
};

const formattedSearchTarget = computed(() => {
  return searchTarget.value.join(", ");
});

// ----------------------------- 다운로드 ----------------------------- //
const downloadPermission = ref(false);
const sampleChoice1 = ref("GYRO_HDT, GYRO_ROT, ANEMOMETER_MWV");

const checkPermission = async () => {
  const userDataResponse = await readMineData(tokenid.value);
  console.log(userDataResponse);
  if (userDataResponse.userGroup === "ADMIN") {
    downloadPermission.value = true;
  } else {
    const getTime = userDataResponse.permissionsExpiryTime;
    const getPermission = userDataResponse.permissions;

    const currentTime = new Date();
    const permissionTime = new Date(getTime);

    // 조건 1: 현재 시간이 getTime보다 이른지 확인
    const isTimeValid = currentTime < permissionTime;

    // 조건 2: sampleChoice1의 데이터가 getPermission에 포함되는지 확인
    const isDataValid = formattedSearchTarget.value
      .split(", ")
      .every((choice) => {
        return getPermission.some((permission) =>
          choice.startsWith(permission)
        );
      });

    // 두 조건을 모두 만족하는지 확인
    downloadPermission.value = isTimeValid && isDataValid;
  }
};

const downloadFormats = ref(["csv", "txt"]);
const downloadFormatv = ref(["csv", "txt"]);
const selectDownloadFormat = ref("csv");
const downloading = ref(false);

const dataDownloadServer = async () => {
  try {
    downloading.value = true;
    cancelTokenSource = axios.CancelToken.source();
    downloadReq.value.file_type =
      downloadReq.value.type === "table_data"
        ? `download?file_type=${selectDownloadFormat.value}`
        : "download?";

    let apiReq = ``;
    apiReq = `${downloadReq.value.type}/${downloadReq.value.data}/${downloadReq.value.file_type}&${downloadReq.value.period}${downloadReq.value.signal}`;
    const loadData = await downloadDataFile(
      tokenid.value,
      apiReq,
      cancelTokenSource.token
    );

    const contentDispositionHeader = loadData.headers["content-disposition"];
    const match = contentDispositionHeader.match(/filename=([^;]+)/);
    const fileName = match ? match[1] : "downloaded-file";

    const blob = new Blob([loadData.data]);
    // Blob 객체를 다운로드할 수 있는 URL로 변환
    const url = window.URL.createObjectURL(blob);

    // <a> 태그를 생성하고 다운로드 링크 설정
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", fileName); // 다운로드할 ZIP 파일의 이름 설정
    document.body.appendChild(link);

    // 다운로드 링크 클릭하여 파일 다운로드
    link.click();

    // 사용이 끝난 URL 객체 제거
    window.URL.revokeObjectURL(url);
  } catch (error) {
    if (axios.isCancel(error)) {
      console.log("요청이 취소되었습니다:", error.message);
      searchState.value = false;
    } else {
      if (error.response && error.response.status) {
        if (error.response.status === 403) {
          alert(error.response.data);
        }
      } else {
        // error.response가 없으면 해당 오류를 무시하고 넘어감
        console.error("정의되지 않은 오류 발생:", error.message || error);
      }
    }
  } finally {
    cancelTokenSource = null; // 요청이 완료된 후 토큰 초기화
    downloading.value = false;
  }
};

// for Download API Request variable
// const downloadReq = ref({
//   type: "",
//   data: "",
//   file_type: "",
//   period: "",
//   signal: "",
// })

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// 엑셀파일 업로드 및 다운로드 설정
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
import axios from "axios";
const loadingFile = ref(false);
const file = ref(null);

const handleDrop = (event) => {
  const droppedFiles = event.dataTransfer.files;
  if (droppedFiles.length > 0) {
    processFile(droppedFiles[0]);
  }
};

const handleFileSelect = (event) => {
  const selectedFiles = event.target.files;
  if (selectedFiles.length > 0) {
    processFile(selectedFiles[0]);
  }
};

const processFile = (selectedFile) => {
  if (selectedFile.size > 5 * 1024 * 1024) {
    alert("파일 크기는 최대 5MB까지 가능합니다.");
    return;
  }
  file.value = selectedFile;
};

const removeFile = () => {
  file.value = null;
  fileInput.value.value = ""; // input 요소의 값을 초기화하여 동일한 파일을 다시 선택할 수 있게 함
};

const triggerFileSelect = () => {
  fileInput.value.click();
};

const fileInput = ref(null);

const uploadFile = async () => {
  if (!file.value) return;

  const formData = new FormData();
  formData.append("file", file.value);

  try {
    cancelTokenSource = axios.CancelToken.source();
    loadingFile.value = true;

    const loadData = await downloadDataFileXml(
      tokenid.value,
      formData,
      cancelTokenSource.token
    );

    const contentDispositionHeader = loadData.headers["content-disposition"];
    const match = contentDispositionHeader.match(/filename=([^;]+)/);
    let fileName = match ? match[1] : "downloaded-file";

    fileName = fileName.replace(".xlsx", ".zip");

    const blob = new Blob([loadData.data]);
    // Blob 객체를 다운로드할 수 있는 URL로 변환
    const url = window.URL.createObjectURL(blob);

    // <a> 태그를 생성하고 다운로드 링크 설정
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", fileName); // 다운로드할 ZIP 파일의 이름 설정
    document.body.appendChild(link);

    // 다운로드 링크 클릭하여 파일 다운로드
    link.click();
    // 사용이 끝난 URL 객체 제거
    window.URL.revokeObjectURL(url);
    loadingFile.value = false;
  } catch (error) {
    console.error("파일 업로드 실패:", error);
    loadingFile.value = false;
  } finally {
    cancelTokenSource = null; // 요청이 완료된 후 토큰 초기화
  }
};

//////////////////////////////////// 스타일 관련 js /////////////////////////////////////////

const cardStyle = computed(() => {
  let topValue = "320px";

  if (searchState.value) {
    topValue = "80px";
  } else {
    if (
      SelectedDataCardVisible.value ||
      SelectedShipContentsCardVisible.value ||
      SelectedVtsContentsCardVisible.value ||
      DataTypeCardVisible.value ||
      periodSettingCardVisible.value
    ) {
      topValue = "220px";
    } else {
      topValue = "320px";
    }
  }

  // 다른 조건들을 추가할 수 있습니다.
  // if (또 다른 조건) {
  //   topValue = '200px';
  // }

  return {
    position: "absolute",
    top: topValue,
    left: "50%",
    transform: "translateX(-50%)",
    zIndex: 1100,
    width: "70%",
    height: "75px",
    overflow: "visible",
  };
});
</script>

<style scoped>
.selected-item {
  background-color: #d0d0d0;
}

.all-app {
  padding: 30px;
  padding-left: 50px;
  padding-right: 50px;
}

.destination-container {
  display: flex;
}

.category-list {
  width: 30%;
  border-right: 1px solid #e0e0e0;
}

.category-list40 {
  width: 40%;
  border-right: 1px solid #e0e0e0;
}

.destination-list {
  width: 35%;
  height: 350px;
}

.recent-search {
  margin-top: 16px;
}

.custom-text-field {
  width: 300px !important;
}

.destination-container > .v-list {
  margin-right: 10px;
}

.chip-container .v-chip {
  margin-right: 10px;
}
.chip-item {
  margin-top: 5px;
  margin-right: 5px;
  cursor: pointer;
}
.secondBtn {
  margin-right: 20px;
  height: 40px;
}

.selected-button {
  border: 1px solid red;
  color: red;
}

/* Select 버튼을 숨기는 스타일 */
.vue3-date-picker__actions {
  display: none !important;
}

.vue3-date-picker__select-button {
  display: none !important;
}

.v-data-table__wrapper {
  overflow-x: auto;
}

.v-tabs .v-tab {
  text-transform: none;
}

.header-timestamp_equipment,
.header-timestamp_publish {
  min-width: 200px;
  /* 필요한 경우 더 조정할 수 있습니다 */
}

.v-data-table__wrapper {
  overflow-x: auto;
}
.file-upload-page {
  text-align: center;
  padding: 20px;
}

.drop-zone {
  border: 2px dashed #ccc;
  border-radius: 10px;
  padding: 20px;
  cursor: pointer;
  margin-bottom: 20px;
  position: relative;
}

.upload-icon {
  width: 50px;
  height: 50px;
}

.file-info {
  text-align: left;
  margin: 0 auto;
  max-width: 400px;
}

.file-info table {
  width: 100%;
  border-collapse: collapse;
}

.file-info td {
  padding: 8px;
  border-bottom: 1px solid #ddd;
}

.remove-button {
  background-color: #ff4d4d;
  color: white;
  border: none;
  padding: 5px 10px;
  border-radius: 5px;
  cursor: pointer;
  position: absolute;
  top: 10px;
  right: 10px;
}

.upload-button {
  width: 300px;
  background-color: #5865f2;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.upload-button:disabled {
  width: 300px;
  background-color: #ccc;
  cursor: not-allowed;
}

/* DatePicker 테두리 스타일 추가 */
.date-picker {
  border: 1px solid #ccc;
  padding: 0.3rem;
  border-radius: 4px;
  width: 200px;
  box-sizing: border-box;
}

.time-select {
  padding: 5px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 4px;
  margin-left: 5px;
  width: 50px;
}

.time-divider {
  margin-right: 5px;
  font-size: 18px;
}

/* 시간 입력 필드 스타일 */
.time-input {
  border: 1px solid #ccc;
  padding: 0.5rem;
  border-radius: 4px;
  width: 50px;
  text-align: center;
  margin: 0 5px;
}

.time-input:focus {
  outline: none;
  border-color: #007bff;
}

.date-input {
  padding: 5px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 4px;
  width: 100%;
}

.icon-btn {
  background: none;
  border: none;
  cursor: pointer;
  font-size: 1.5em;
}

.row-container {
  margin-top: 10px;
  display: flex;
  align-items: center;
  gap: 3px; /* 요소 간 간격 조절 */
}

.span-title {
  margin-top: 30px;
  font-size: 16px;
  font-weight: 550;
}

select.time-select {
  background-color: selectColor; /* 어두운 배경 */
  color: selectTextColor; /* 텍스트 색상 */
  border-radius: 4px;
  padding: 5px;
}

/* 옵션 목록의 스타일 */
select.time-select option {
  background-color: selectColor; /* 옵션 배경색 */
  color: selectTextColor; /* 옵션 텍스트 색상 */
}

/* 커서 포인터 추가 */
select.time-select {
  cursor: pointer;
}

.m-time-input {
  padding: 5px;
  font-size: 14px;
  border: 1px solid #ccc;
  border-radius: 4px;
  margin-left: 5px;
  width: 50px;
}
</style>

<style>
.pagination-center {
  margin: -50 auto;
}
</style>
