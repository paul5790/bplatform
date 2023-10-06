<template>
  <v-card>
    <v-layout>
      <v-navigation-drawer expand-on-hover rail>
        <v-list>
          <v-list-item
            prepend-avatar="S"
            title="Sandra Adams"
            subtitle="sandra_a88@gmailcom"
          >
          </v-list-item>
        </v-list>

        <v-divider></v-divider>

        <v-list density="compact" nav>
          <!-- <v-list-item
            v-for="(item, index) in menuItems"
            :key="index"
            :to="item.route"
            :exact="true"
            :prepend-icon="item.icon"
            :title="item.title"
            :value="item.route"
          ></v-list-item> -->
          <v-list-item
            :key="0"
            :to="`/`"
            :exact="true"
            :prepend-icon="`mdi-view-dashboard`"
            :title="`대시보드`"
            :value="`/`"
          ></v-list-item>
          <v-list-item
            :key="1"
            :to="`/realtimeview`"
            :exact="true"
            :prepend-icon="`mdi-television`"
            :title="`모니터링`"
            :value="`/realtimeview`"
          ></v-list-item>

          <!-- <v-list-item
            :key="2"
            :to="`/trialrundata`"
            :exact="true"
            :prepend-icon="`mdi-database-search-outline`"
            :title="`데이터 열람`"
            :value="`/trialrundata`"
          ></v-list-item> -->

          <v-list-group value="trialrundata">
            <template v-slot:activator="{ props }">
              <v-list-item
                v-bind="props"
                title="데이터 열람"
                :prepend-icon="`mdi-database-search-outline`"
              ></v-list-item>
            </template>

            <v-list-item
              :key="2"
              :to="`/trialrundata`"
              :exact="true"
              :title="`시운전 별 데이터`"
              :value="`/trialrundata`"
            ></v-list-item>
            <v-list-item
              :key="3"
              :to="`/alldata`"
              :exact="true"
              :title="`전체 데이터`"
              :value="`/alldata`"
            ></v-list-item>
          </v-list-group>

          <v-list-item
            :key="4"
            :to="`/usersetting`"
            :exact="true"
            :prepend-icon="`mdi-cog-outline`"
            :title="`환경 설정`"
            :value="`/usersetting`"
          ></v-list-item>
        </v-list>
        <!-- 항상 맨 아래에 붙어있는 리스트 -->
        <template v-slot:append>
          <v-list-item
            :key="5"
            :to="`/anotherpage`"
            :exact="true"
            :prepend-icon="`mdi-link`"
            :title="`로그인`"
            :value="`/anotherpage`"
          ></v-list-item>
        </template>
      </v-navigation-drawer>

      <v-main>
        <router-view></router-view>
      </v-main>
    </v-layout>
  </v-card>
</template>

<script setup>
//import { ref } from "vue";

// const menuItems = ref([
//   { title: "대시보드", icon: "mdi-view-dashboard", route: "/" },
//   { title: "모니터링", icon: "mdi-television", route: "/realtimeview" },
//   {
//     title: "데이터 열람",
//     icon: "mdi-database-search-outline",
//     route: "/trialrundata",
//   },
//   { title: "환경 설정", icon: "mdi-cog-outline", route: "/usersetting" },
// ]);
</script>

<style scoped></style>
