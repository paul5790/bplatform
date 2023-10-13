// Styles
import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'

// Vuetify
import { createVuetify } from 'vuetify'
import {
  VDataTable,
  VDataTableServer,
  VDataTableVirtual,
} from "vuetify/labs/VDataTable";
import { VDataIterator } from "vuetify/labs/VDataIterator";

export default createVuetify(
  {
    components: {
      VDataTable,
      VDataTableServer,
      VDataTableVirtual,
      VDataIterator,
    },
  }
  // https://vuetifyjs.com/en/introduction/why-vuetify/#feature-guides
);
