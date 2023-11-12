<template>
  <div class="my-app">

    <v-card
    class="mx-auto"
  >

    <v-list lines="three">
      <v-list-subheader>User Controls</v-list-subheader>

      <v-list-item>
        <v-list-item-title>Content filtering</v-list-item-title>

        <v-list-item-subtitle>
          Set the content filtering level to restrict appts that can be downloaded
        </v-list-item-subtitle>
      </v-list-item>

      <v-list-item>
        <v-list-item-title>Password</v-list-item-title>

        <v-list-item-subtitle>
          Require password for purchase or use password to restrict purchase
        </v-list-item-subtitle>
      </v-list-item>
    </v-list>

    <v-divider></v-divider>

    <v-list lines="three" select-strategy="classic">
      <v-list-subheader>General</v-list-subheader>

      <v-list-item @click="a()">

        <v-list-item-title>Notifications</v-list-item-title>

        <v-list-item-subtitle>
          Notify me about updates to apps or games that I downloaded
        </v-list-item-subtitle>
      </v-list-item>

      <v-list-item @click="b()">

        <v-list-item-title>Sound</v-list-item-title>

        <v-list-item-subtitle>
          Auto-update apps at any time. Data charges may apply
        </v-list-item-subtitle>
      </v-list-item>

      <v-list-item @click="c()">

        <v-list-item-title>Auto-add widgets</v-list-item-title>

        <v-list-item-subtitle>
          Automatically add home screen widgets when downloads complete
        </v-list-item-subtitle>
      </v-list-item>
    </v-list>

    <!-- diolog -->
    <v-dialog v-model="dialog" persistent width="1024">
      <template v-slot:activator="{ props }">
        <v-btn color="blue" v-bind="props">
          수정하기
        </v-btn>
      </template>
      <v-card>
        <v-card-title>
          <span class="text-h5">User Profile</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12" sm="6">
                <v-text-field
                  label="User ID"
                  required
                  v-model="selected"
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6">
                <v-text-field
                  label="User Name"
                  hint="example of persistent helper text"
                  persistent-hint
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field label="User Email" required></v-text-field>
              </v-col>
              <v-col cols="12" sm="6">
                <v-text-field
                  label="Affiliation"
                  type="text"
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6">
                <v-select
                  :items="['Admin', 'User', 'Guest']"
                  label="Permission*"
                  required
                ></v-select>
              </v-col>
              <v-col cols="12">
                <v-textarea
                  label="description"
                  type="text"
                  maxlength="120"
                  multi-line
                ></v-textarea>
              </v-col>
            </v-row>
          </v-container>
          <small>*indicates required field</small>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue-darken-1" variant="text" @click="dialog = false">
            Close
          </v-btn>
          <v-btn color="blue-darken-1" variant="text" @click="dialog = false">
            Save
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-card>
  </div>
</template>

<script setup>
import { ref } from "vue";
import EchartGauge from "../components/EchartGraph/EchartGauge.vue";

const dialog = ref(false);

const a = () => {
  alert("a")
}
const b = () => {
  alert("b")
}
const c = () => {
  alert("c")
}

</script>

<style scoped></style>
