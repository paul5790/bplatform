// dataTableUtils.js
import { ref } from "vue";

export const dataSet = ref([]);
export const headerName = ref([]);
export const itemsPerPage = ref(18);
export const pageCount = ref(0);
export const beforePage = ref("GLL");

const dataHandlers = {
  "dgps/gll": { header: ref([]), data: ref([]) },
  "dgps/gga": { header: ref([]), data: ref([]) },
  "dgps/rmc": { header: ref([]), data: ref([]) },
  "dgps/vtg": { header: ref([]), data: ref([]) },
  "dgps/zda": { header: ref([]), data: ref([]) },
  "dgps/gsv": { header: ref([]), data: ref([]) },
  "dgps/gsa": { header: ref([]), data: ref([]) },
  "gyro/hdt": { header: ref([]), data: ref([]) },
  "gyro/rot": { header: ref([]), data: ref([]) },
  "anemometer/mwv": { header: ref([]), data: ref([]) },
  "radar/screen": { header: ref([]), data: ref([]) },
  "ais/vdm": { header: ref([]), data: ref([]) },
  "ais/vdo": { header: ref([]), data: ref([]) },
  "ecdis/routeinfo": { header: ref([]), data: ref([]) },
  "ecdis/waypoints": { header: ref([]), data: ref([]) },
  "ecdis/rtz": { header: ref([]), data: ref([]) },
  "ecdis/screen": { header: ref([]), data: ref([]) },
  "autopilot/rsa": { header: ref([]), data: ref([]) },
  "autopilot/htd": { header: ref([]), data: ref([]) },
  "speedlog/vbw": { header: ref([]), data: ref([]) },
  "speedlog/vhw": { header: ref([]), data: ref([]) },
  "speedlog/vlw": { header: ref([]), data: ref([]) },
  "canthrottle/canonlinestate": { header: ref([]), data: ref([]) },
  "canthrottle/enginerpm": { header: ref([]), data: ref([]) },
  "canthrottle/rudder": { header: ref([]), data: ref([]) },
  "canthrottle/rudderscale": { header: ref([]), data: ref([]) },
  "autopilotcontact/autopilotcontact": { header: ref([]), data: ref([]) },
  "no1enginepanel/no1engine_panel_61444": { header: ref([]), data: ref([]) },
  "no1enginepanel/no1engine_panel_65262": { header: ref([]), data: ref([]) },
  "no1enginepanel/no1engine_panel_65263": { header: ref([]), data: ref([]) },
  "no1enginepanel/no1engine_panel_65272": { header: ref([]), data: ref([]) },
  "no1enginepanel/no1engine_panel_65271": { header: ref([]), data: ref([]) },
  "no1enginepanel/no1engine_panel_65253": { header: ref([]), data: ref([]) },
  "no1enginepanel/no1engine_panel_65270": { header: ref([]), data: ref([]) },
  "no1enginepanel/no1engine_panel_65276": { header: ref([]), data: ref([]) },
  "no1enginepanel/no1engine_panel_65360": { header: ref([]), data: ref([]) },
  "no1enginepanel/no1engine_panel_65361_lamp": {
    header: ref([]),
    data: ref([]),
  },
  "no1enginepanel/no1engine_panel_65361_status": {
    header: ref([]),
    data: ref([]),
  },
  "no1enginepanel/no1engine_panel_65378": { header: ref([]), data: ref([]) },
  "no1enginepanel/no1engine_panel_65376": { header: ref([]), data: ref([]) },
  "no1enginepanel/no1engine_panel_65379": { header: ref([]), data: ref([]) },
  "no2enginepanel/no2engine_panel_61444": { header: ref([]), data: ref([]) },
  "no2enginepanel/no2engine_panel_65262": { header: ref([]), data: ref([]) },
  "no2enginepanel/no2engine_panel_65263": { header: ref([]), data: ref([]) },
  "no2enginepanel/no2engine_panel_65272": { header: ref([]), data: ref([]) },
  "no2enginepanel/no2engine_panel_65271": { header: ref([]), data: ref([]) },
  "no2enginepanel/no2engine_panel_65253": { header: ref([]), data: ref([]) },
  "no2enginepanel/no2engine_panel_65270": { header: ref([]), data: ref([]) },
  "no2enginepanel/no2engine_panel_65276": { header: ref([]), data: ref([]) },
  "no2enginepanel/no2engine_panel_65360": { header: ref([]), data: ref([]) },
  "no2enginepanel/no2engine_panel_65361_lamp": {
    header: ref([]),
    data: ref([]),
  },
  "no2enginepanel/no2engine_panel_65361_status": {
    header: ref([]),
    data: ref([]),
  },
  "no2enginepanel/no2engine_panel_65378": { header: ref([]), data: ref([]) },
  "no2enginepanel/no2engine_panel_65376": { header: ref([]), data: ref([]) },
  "no2enginepanel/no2engine_panel_65379": { header: ref([]), data: ref([]) },
  "MTIE1ISA/SITUATIONAL": { header: ref([]), data: ref([]) },
  "MTIE5VDGS/VIRTUALNAV": { header: ref([]), data: ref([]) },
  "MTIE5DBS/SITUATIONALAWARENESS": { header: ref([]), data: ref([]) },
  "MOF1ANS/ROUTEDECISION": { header: ref([]), data: ref([]) },
  "MOF2SYNC/MARINEGATEWAY": { header: ref([]), data: ref([]) },
  "MOF1GNW/WAYPOINT": { header: ref([]), data: ref([]) },
  "MTIE5SAS/SAS": { header: ref([]), data: ref([]) },
  "MTIE4.XINNOS_STAS/ME1": { header: ref([]), data: ref([]) },
  "MTIE4.XINNOS_STAS/ME2": { header: ref([]), data: ref([]) },
  "MTIE4XINNOS_VDGS/V_NO1ENGINE_PANEL_61444": {
    header: ref([]),
    data: ref([]),
  },
  "MTIE4XINNOS_VDGS/V_NO1ENGINE_PANEL_65262": {
    header: ref([]),
    data: ref([]),
  },
  "MTIE4XINNOS_VDGS/V_NO1ENGINE_PANEL_65263": {
    header: ref([]),
    data: ref([]),
  },
  "MTIE4XINNOS_VDGS/V_NO1ENGINE_PANEL_65271": {
    header: ref([]),
    data: ref([]),
  },
  "MTIE4XINNOS_VDGS/V_NO1ENGINE_PANEL_65270": {
    header: ref([]),
    data: ref([]),
  },
  "MTIE4XINNOS_VDGS/V_NO1ENGINE_PANEL_65360": {
    header: ref([]),
    data: ref([]),
  },
  "MTIE4XINNOS_VDGS/V_NO1ENGINE_PANEL_65361_LAMP": {
    header: ref([]),
    data: ref([]),
  },
  "MTIE4XINNOS_VDGS/V_NO1ENGINE_PANEL_65272": {
    header: ref([]),
    data: ref([]),
  },
  "MTIE4XINNOS_VDGS/V_NO1ENGINE_PANEL_65253": {
    header: ref([]),
    data: ref([]),
  },
  "MTIE4XINNOS_VDGS/V_NO1ENGINE_PANEL_65276": {
    header: ref([]),
    data: ref([]),
  },
  "MTIE4XINNOS_VDGS/V_NO2ENGINE_PANEL_61444": {
    header: ref([]),
    data: ref([]),
  },
  "MTIE4XINNOS_VDGS/V_NO2ENGINE_PANEL_65262": {
    header: ref([]),
    data: ref([]),
  },
  "MTIE4XINNOS_VDGS/V_NO2ENGINE_PANEL_65263": {
    header: ref([]),
    data: ref([]),
  },
  "MTIE4XINNOS_VDGS/V_NO2ENGINE_PANEL_65271": {
    header: ref([]),
    data: ref([]),
  },
  "MTIE4XINNOS_VDGS/V_NO2ENGINE_PANEL_65270": {
    header: ref([]),
    data: ref([]),
  },
  "MTIE4XINNOS_VDGS/V_NO2ENGINE_PANEL_65360": {
    header: ref([]),
    data: ref([]),
  },
  "MTIE4XINNOS_VDGS/V_NO2ENGINE_PANEL_65361_LAMP": {
    header: ref([]),
    data: ref([]),
  },
  "MTIE4XINNOS_VDGS/V_NO2ENGINE_PANEL_65272": {
    header: ref([]),
    data: ref([]),
  },
  "MTIE4XINNOS_VDGS/V_NO2ENGINE_PANEL_65253": {
    header: ref([]),
    data: ref([]),
  },
  "MTIE4XINNOS_VDGS/V_NO2ENGINE_PANEL_65276": {
    header: ref([]),
    data: ref([]),
  },
  "MTIE4XINNOS_VDGS/V_NO1ENGINE_PANEL_65361_STATUS": {
    header: ref([]),
    data: ref([]),
  },
  "MTIE4XINNOS_VDGS/V_NO1ENGINE_PANEL_65378": {
    header: ref([]),
    data: ref([]),
  },
  "MTIE4XINNOS_VDGS/V_NO1ENGINE_PANEL_65376": {
    header: ref([]),
    data: ref([]),
  },
  "MTIE4XINNOS_VDGS/NO2ENGINE_PANEL_65379": { header: ref([]), data: ref([]) },
  "MANAGEMENT/SUBSCRIBELIST": { header: ref([]), data: ref([]) },
  "MANAGEMENT/CONNECTSTATE": { header: ref([]), data: ref([]) },
  "MANAGEMENT/SYSTEMSTATE": { header: ref([]), data: ref([]) },
  "MANAGEMENT/ALARMINFO": { header: ref([]), data: ref([]) },
  "MANAGEMENT/MODEINFO": { header: ref([]), data: ref([]) },
  "MANAGEMENT/COM": { header: ref([]), data: ref([]) },
  "MANAGEMENT/ENGINECONTROL": { header: ref([]), data: ref([]) },
  "MANAGEMENT/RUDDERCONTROL": { header: ref([]), data: ref([]) },
  "MANAGEMENT/SHORE_MODE_REQUEST": { header: ref([]), data: ref([]) },
  "MANAGEMENT/SHORE_ENGINE_CONTROL": { header: ref([]), data: ref([]) },
  "MANAGEMENT/SHORE_RUDDER_CONTROL": { header: ref([]), data: ref([]) },
  "RUDDER/REQUESTCOMMAND_R": { header: ref([]), data: ref([]) },
  "RUDDER/RESPONSECOMMAND_R": { header: ref([]), data: ref([]) },
  "ENGINE/REQUESTCOMMAND_E": { header: ref([]), data: ref([]) },
  "ENGINE/RESPONSECOMMAND_E": { header: ref([]), data: ref([]) },
  "MODE/REQUESTCOMMAND_M": { header: ref([]), data: ref([]) },
  "MODE/RESPONSECOMMAND_M": { header: ref([]), data: ref([]) },
};

export const updateData = async (data, header, page) => {
  const initialData = data.slice(
    (page - 1) * itemsPerPage.value,
    page * itemsPerPage.value
  );
  headerName.value = header;
  dataSet.value = initialData;
};

export const updateTable = async (selectedTab, { data, page }) => {
  itemsPerPage.value = 18;
  if (beforePage.value !== selectedTab) {
    page = 1;
    beforePage.value = selectedTab;
  }

  const handler = dataHandlers[selectedTab];
  if (handler) {
    pageCount.value = Math.ceil(handler.data.value.length / itemsPerPage.value);
    await updateData(handler.data.value, handler.header.value, page);
  } else {
    console.error("Invalid tab value:", selectedTab);
  }
};


export const switchValue = (axiosItem, dataheader, response) => {
  const handler = dataHandlers[axiosItem];
  if (handler) {
    handler.header.value = dataheader.value;
    handler.data.value = response;
  }
};