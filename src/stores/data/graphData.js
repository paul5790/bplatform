import { defineStore } from "pinia";
import { readDataTrial } from "../../api/index.js";

const tokenid = sessionStorage.getItem("token") || "";

export const useDataStore = defineStore("userState", {
  state: () => ({
    gData: {
      latitude: generateRandomData(0, 200, 200),
      longitude: generateRandomData(-10, 50, 200),
      altitude: generateRandomData(1000, 1100, 200),
      speedovergroundknots: generateRandomData(0, 40, 200),
      courseovergrounddegreestrue: generateRandomData(0, 360, 200),
      heading: generateRandomData(0, 360, 200),
      rateofturn: generateRandomData(-30, 30, 200),
      anemometerangle: generateRandomData(0, 360, 200),
      anemometerspeed: generateRandomData(0, 100, 200),
      speedn: generateRandomData(0, 40, 200),
      starboardruddersensor: generateRandomData(-45, 45, 200),
      portruddersensor: generateRandomData(-45, 45, 200),
      "1_Engine Speed": generateRandomData(0, 5000, 200),
      "1_Engine Oil Temperature": generateRandomData(60, 120, 200),
      "1_Engine Oil Pressure": generateRandomData(10, 100, 200),
      "1_Engine Coolant Level": generateRandomData(0, 100, 200),
      "1_Transmission Oil Pressure": generateRandomData(10, 100, 200),
      "1_Charging System Potential": generateRandomData(12, 14, 200),
      "1_Battery Potential": generateRandomData(12, 14, 200),
      "1_Engine total hours": generateRandomData(0, 10000, 200),
      "1_Engine Intake Manifold Pressure": generateRandomData(0, 30, 200),
      "1_Engine Intake Manifold Temp": generateRandomData(0, 50, 200),
      "1_Engine Exhaust Gas Temperature": generateRandomData(0, 700, 200),
      "1_fuel_LEVEL": generateRandomData(0, 100, 200),
      "2_Engine Speed": generateRandomData(0, 5000, 200),
      "2_Engine Oil Temperature": generateRandomData(60, 120, 200),
      "2_Engine Oil Pressure": generateRandomData(10, 100, 200),
      "2_Engine Coolant Level": generateRandomData(0, 100, 200),
      "2_Transmission Oil Pressure": generateRandomData(10, 100, 200),
      "2_Charging System Potential": generateRandomData(12, 14, 200),
      "2_Battery Potential": generateRandomData(12, 14, 200),
      "2_Engine total hours": generateRandomData(0, 10000, 200),
      "2_Engine Intake Manifold Pressure": generateRandomData(0, 30, 200),
      "2_Engine Intake Manifold Temp": generateRandomData(0, 50, 200),
      "2_Engine Exhaust Gas Temperature": generateRandomData(0, 700, 200),
      "2_fuel_LEVEL": generateRandomData(0, 100, 200),
    },
    itemsData: {
      gga: [],
      vtg: [],
      hdt: [],
      rot: [],
      mwv: [],
      vhw: [],
      rsa: [],
      engine_SPEED: [],
      engine_OIL_TEMPERATURE1: [],
      engine_OIL_PRESSURE: [],
      transmission_OIL_PRESSURE: [],
      charging_SYSTEM_POTENTIAL: [],
      engine_TOTAL_HOURS: [],
      engine_INTAKE_MANIFOLD_NO1_PRESSURE: [],
      fuel_LEVEL_1: [],
      engine_SPEED2: [],
      engine_OIL_TEMPERATURE2: [],
      engine_OIL_PRESSURE2: [],
      transmission_OIL_PRESSURE2: [],
      charging_SYSTEM_POTENTIAL2: [],
      engine_TOTAL_HOURS2: [],
      engine_INTAKE_MANIFOLD_NO1_PRESSURE2: [],
      fuel_LEVEL_2: [],
    },
    startDate: "",
    endDate: "",
  }),
  actions: {
    async classify(selectedItem) {
      console.log("pp");
      if (
        selectedItem.includes("latitude") ||
        selectedItem.includes("longitude") ||
        selectedItem.includes("altitude")
      ) {
        this.itemsData.gga = await this.fetchData("DGPS", "GGA");
      }
      if (
        selectedItem.includes("speedovergroundknots") ||
        selectedItem.includes("courseovergrounddegreestrue")
      ) {
        this.itemsData.vtg = await this.fetchData("DGPS", "VTG");
      }
      if (selectedItem.includes("heading")) {
        this.itemsData.hdt = await this.fetchData("GYRO", "HDT");
      }
      if (selectedItem.includes("rateofturn")) {
        this.itemsData.rot = await this.fetchData("GYRO", "ROT");
      }
      if (
        selectedItem.includes("anemometerangle") ||
        selectedItem.includes("anemometerspeed")
      ) {
        this.itemsData.mwv = await this.fetchData("ANEMOMETER", "MWV");
      }
      if (selectedItem.includes("speedn")) {
        this.itemsData.vhw = await this.fetchData("SPEEDLOG", "VHW");
      }
      if (
        selectedItem.includes("starboardruddersensor") ||
        selectedItem.includes("portruddersensor")
      ) {
        this.itemsData.rsa = await this.fetchData("AUTOPILOT", "RSA");
      }
      if (selectedItem.includes("1_Engine Speed")) {
        this.itemsData.engine_SPEED = await this.fetchData(
          "NO1ENGINEPANEL",
          "NO1ENGINE_PANEL_61444"
        );
      }
      if (selectedItem.includes("1_Engine Oil Temperature")) {
        this.itemsData.engine_OIL_TEMPERATURE1 = await this.fetchData(
          "NO1ENGINEPANEL",
          "NO1ENGINE_PANEL_65262"
        );
      }
      if (
        selectedItem.includes("1_Engine Oil Pressure") ||
        selectedItem.includes("1_Engine Coolant Level")
      ) {
        this.itemsData.engine_OIL_PRESSURE = await this.fetchData(
          "NO1ENGINEPANEL",
          "NO1ENGINE_PANEL_65263"
        );
      }
      if (selectedItem.includes("1_Transmission Oil Pressure")) {
        this.itemsData.transmission_OIL_PRESSURE = await this.fetchData(
          "NO1ENGINEPANEL",
          "NO1ENGINE_PANEL_65272"
        );
      }
      if (
        selectedItem.includes("1_Charging System Potential") ||
        selectedItem.includes("1_Battery Potential")
      ) {
        this.itemsData.charging_SYSTEM_POTENTIAL = await this.fetchData(
          "NO1ENGINEPANEL",
          "NO1ENGINE_PANEL_65271"
        );
      }
      if (selectedItem.includes("1_Engine total hours")) {
        this.itemsData.engine_TOTAL_HOURS = await this.fetchData(
          "NO1ENGINEPANEL",
          "NO1ENGINE_PANEL_65253"
        );
      }
      if (
        selectedItem.includes("1_Engine Intake Manifold Pressure") ||
        selectedItem.includes("1_Engine Intake Manifold Temp") ||
        selectedItem.includes("1_Engine Exhaust Gas Temperature")
      ) {
        this.itemsData.engine_INTAKE_MANIFOLD_NO1_PRESSURE =
          await this.fetchData("NO1ENGINEPANEL", "NO1ENGINE_PANEL_65270");
      }
      if (selectedItem.includes("1_fuel_LEVEL")) {
        this.itemsData.fuel_LEVEL_1 = await this.fetchData(
          "NO1ENGINEPANEL",
          "NO2ENGINE_PANEL_65276"
        );
      }
      if (selectedItem.includes("2_Engine Speed")) {
        this.itemsData.engine_SPEED2 = await this.fetchData(
          "NO2ENGINEPANEL",
          "NO2ENGINE_PANEL_61444"
        );
      }
      if (selectedItem.includes("2_Engine Oil Temperature")) {
        this.itemsData.engine_OIL_TEMPERATURE2 = await this.fetchData(
          "NO2ENGINEPANEL",
          "NO2ENGINE_PANEL_65262"
        );
      }
      if (
        selectedItem.includes("2_Engine Oil Pressure") ||
        selectedItem.includes("1_Engine Coolant Level")
      ) {
        this.itemsData.engine_OIL_PRESSURE2 = await this.fetchData(
          "NO2ENGINEPANEL",
          "NO2ENGINE_PANEL_65263"
        );
      }
      if (selectedItem.includes("2_Transmission Oil Pressure")) {
        this.itemsData.transmission_OIL_PRESSURE2 = await this.fetchData(
          "NO2ENGINEPANEL",
          "NO2ENGINE_PANEL_65272"
        );
      }
      if (
        selectedItem.includes("2_Charging System Potential") ||
        selectedItem.includes("1_Battery Potential")
      ) {
        this.itemsData.charging_SYSTEM_POTENTIAL2 = await this.fetchData(
          "NO2ENGINEPANEL",
          "NO2ENGINE_PANEL_65271"
        );
      }
      if (selectedItem.includes("2_Engine total hours")) {
        this.itemsData.engine_TOTAL_HOURS2 = await this.fetchData(
          "NO2ENGINEPANEL",
          "NO2ENGINE_PANEL_65253"
        );
      }
      if (
        selectedItem.includes("2_Engine Intake Manifold Pressure") ||
        selectedItem.includes("1_Engine Intake Manifold Temp") ||
        selectedItem.includes("1_Engine Exhaust Gas Temperature")
      ) {
        this.itemsData.engine_INTAKE_MANIFOLD_NO1_PRESSURE2 =
          await this.fetchData("NO2ENGINEPANEL", "NO2ENGINE_PANEL_65270");
      }
      if (selectedItem.includes("2_fuel_LEVEL")) {
        this.itemsData.fuel_LEVEL_2 = await this.fetchData(
          "NO2ENGINEPANEL",
          "NO2ENGINE_PANEL_65276"
        );
      }
    },
    async fetchData(subComponent, contents) {
      try {
        let dataFomat = {
          subComponent: subComponent,
          content: contents,
          seatrialNumber: "N/A",
          period: [this.startDate, this.endDate],
        };
        console.log(dataFomat);
        return await readDataTrial(tokenid.value, dataFomat, "period");
      } catch (error) {
        console.error(error);
        throw error; // 에러를 호출자에게 전파
      }
    },
  },
  getters: {},
});

function generateRandomData(min, max, length) {
  return Array.from({ length }, () => Math.floor(Math.random() * (max - min + 1)) + min);
}