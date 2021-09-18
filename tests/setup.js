import Vuetify from 'vuetify'
import setup from 'vue-cli-plugin-freshinup-ui/utils/testing/setup'
import Vue from 'vue'
import registerRequireContextHook from 'babel-plugin-require-context-hook/register'
import { TiptapVuetifyPlugin } from 'tiptap-vuetify'

registerRequireContextHook()
Vue.use(Vuetify)
Vue.use(TiptapVuetifyPlugin, {
  // optional, default to 'md' (default vuetify icons before v2.0.0)
  iconsGroup: 'md'
})
setup(console, Vue)
