<template>
  <v-card>
    <v-layout>
      <v-navigation-drawer
              expand-on-hover
        rail>
        <v-list>
          <v-list-item>
            <v-img src="https://cdn.imweb.me/thumbnail/20201112/e6675247d2e47.png"
            width="130"
            height="60"
            ></v-img>
          </v-list-item>
        </v-list>

        <v-divider></v-divider>

        <v-list density="compact" nav>
          <v-list-item
            v-for="(item, index) in menuItems"
            :key="index"
            :to="item.route" 
            :exact="true"
            :prepend-icon="item.icon"
            :title="item.title"
            :value="item.route"
          ></v-list-item>
        </v-list>
      </v-navigation-drawer>

      <v-main>
        <router-view></router-view>
      </v-main>
    </v-layout>
  </v-card>
</template>

<script setup>
import { ref } from 'vue';

const menuItems = ref([
  { title: '대시보드', icon: 'mdi-view-dashboard', route: '/' },
  { title: '모니터링', icon: 'mdi-television', route: '/realtimeview' },
  { title: '데이터 열람', icon: 'mdi-database-search-outline', route: '/trialrundata' },
  { title: '환경 설정', icon: 'mdi-cog-outline', route: '/usersetting' },
]);
</script>