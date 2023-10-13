<template>
  <div style="padding: 100px">
    <v-data-iterator
      v-model:items-per-page="itemsPerPage"
      v-model:page="page"
      :items="desserts"
      :search="search"
      :sort-by="sortBy"
    >
      <template v-slot:header>
        <v-toolbar color="blue-darken-3" class="px-2" style="width: 50%">
          <v-text-field
            v-model="search"
            clearable
            hide-details
            prepend-inner-icon="mdi-magnify"
            placeholder="Search"
            variant="outlined"
            density="comfortable"
          ></v-text-field>
        </v-toolbar>
        <v-toolbar color="blue-darken-3" class="px-2">
              <v-checkbox
      v-for="label in keys"
      :key="label"
      :value="label"
      v-model="selectedItems"
      :label="label"
    ></v-checkbox>
        </v-toolbar>
        
        <v-toolbar color="blue-darken-3" class="px-2">
          {{ selectedItems }}
        </v-toolbar>
        
        <v-toolbar color="blue-darken-3" class="px-2" style="margin-bottom: 80px;">
        </v-toolbar>
      </template>

      <template v-slot:no-data>
        <v-alert class="ma-2" type="warning">No results</v-alert>
      </template>

      <template v-slot:default="props">
        <v-row>
          <v-col
            v-for="item in props.items"
            :key="item.name"
            cols="12"
            sm="6"
            md="4"
            lg="3"
          >
            <v-card>
              <v-card-title class="subheading font-weight-bold">
                {{ item.raw.name }}
              </v-card-title>

              <v-divider></v-divider>

              <v-list density="compact">
                <v-list-item
                  v-for="(key, index) in filteredKeys"
                  :key="index"
                  :title="key"
                  :subtitle="String(item.raw[key.toLowerCase()])"
                  :class="{ 'text-blue': sortKey === key.toLowerCase() }"
                ></v-list-item>
              </v-list>
            </v-card>
          </v-col>
        </v-row>
      </template>

      <template v-slot:footer>
        <div class="d-flex align-center justify-space-around pa-4">
          <v-spacer></v-spacer>
          <span class="mr-4 grey--text">
            Page {{ page }} of {{ numberOfPages }}
          </span>
          <v-btn icon size="small" @click="prevPage">
            <v-icon>mdi-chevron-left</v-icon>
          </v-btn>
          <v-btn icon size="small" class="ml-2" @click="nextPage">
            <v-icon>mdi-chevron-right</v-icon>
          </v-btn>
        </div>
      </template>
    </v-data-iterator>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";

const itemsPerPage = ref(3);
const page = ref(1);
const search = ref("");
const sortKey = ref("name");
const selectedItems = ref([]);

const keys = ref([
  "Name",
  "Calories",
  "Fat",
  "Carbs",
  "Protein",
  "Sodium",
  "Calcium",
  "Iron",
]);
const desserts = ref([
  {
    name: "Frozen Yogurt",
    calories: 159,
    fat: 6.0,
    carbs: 24,
    protein: 4.0,
    sodium: 87,
    calcium: "14%",
    iron: "1%",
  },
  {
    name: "Ice cream sandwich",
    calories: 237,
    fat: 9.0,
    carbs: 37,
    protein: 4.3,
    sodium: 129,
    calcium: "8%",
    iron: "1%",
  },
  {
    name: "Eclair",
    calories: 262,
    fat: 16.0,
    carbs: 23,
    protein: 6.0,
    sodium: 337,
    calcium: "6%",
    iron: "7%",
  },
  {
    name: "Cupcake",
    calories: 305,
    fat: 3.7,
    carbs: 67,
    protein: 4.3,
    sodium: 413,
    calcium: "3%",
    iron: "8%",
  },
  {
    name: "Gingerbread",
    calories: 356,
    fat: 16.0,
    carbs: 49,
    protein: 3.9,
    sodium: 327,
    calcium: "7%",
    iron: "16%",
  },
  {
    name: "Jelly bean",
    calories: 375,
    fat: 0.0,
    carbs: 94,
    protein: 0.0,
    sodium: 50,
    calcium: "0%",
    iron: "0%",
  },
  {
    name: "Lollipop",
    calories: 392,
    fat: 0.2,
    carbs: 98,
    protein: 0,
    sodium: 38,
    calcium: "0%",
    iron: "2%",
  },
  {
    name: "Honeycomb",
    calories: 408,
    fat: 3.2,
    carbs: 87,
    protein: 6.5,
    sodium: 562,
    calcium: "0%",
    iron: "45%",
  },
  {
    name: "Donut",
    calories: 452,
    fat: 25.0,
    carbs: 51,
    protein: 4.9,
    sodium: 326,
    calcium: "2%",
    iron: "22%",
  },
  {
    name: "KitKat",
    calories: 518,
    fat: 26.0,
    carbs: 65,
    protein: 7,
    sodium: 54,
    calcium: "12%",
    iron: "6%",
  },
]);

const numberOfPages = computed(() => {
  return Math.ceil(desserts.value.length / itemsPerPage.value);
});

const filteredKeys = computed(() => {
  return keys.value.filter((key) => key !== "Name");
});

const sortBy = computed(() => {
  return [
    {
      key: sortKey.value,
      order: sortOrder.value,
    },
  ];
});

const sortOrder = ref("asc");

const nextPage = () => {
  if (page.value + 1 <= numberOfPages.value) {
    page.value += 1;
  }
};

const prevPage = () => {
  if (page.value - 1 >= 1) {
    page.value -= 1;
  }
};
</script>
