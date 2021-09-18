<template>
  <v-container class="bgwhite">
    <v-layout
      row
      wrap
    >
      <v-flex d-flex>
        <div>
          <v-layout
            row
            justify-space-between
          >
            <h2>Email Customer</h2>
            <v-btn
              icon
              class="mr-0 mt-0 small-btn"
              @click="close"
            >
              <v-icon class="grey--text">
                fas fa-times
              </v-icon>
            </v-btn>
          </v-layout>
          <v-layout row>
            <v-flex d-flex>
              <v-card
                tile
                flat
              >
                <v-card-title>
                  <div>
                    <div class="subheading">
                      Customer
                    </div>
                    <span class="body-2">{{ user.name }}</span>
                  </div>
                </v-card-title>
              </v-card>
            </v-flex>
            <v-flex d-flex>
              <v-card
                tile
                flat
              >
                <v-card-title>
                  <div>
                    <div class="subheading">
                      Customer ID
                    </div>
                    <span class="body-2">{{ user.id }}</span>
                  </div>
                </v-card-title>
              </v-card>
            </v-flex>
            <v-flex d-flex>
              <v-card
                tile
                flat
              >
                <v-card-title>
                  <div>
                    <div class="subheading">
                      Email Address
                    </div>
                    <span class="body-2">{{ user.email }}</span>
                  </div>
                </v-card-title>
              </v-card>
            </v-flex>
            <v-flex d-flex>
              <v-card
                tile
                flat
              >
                <v-card-title>
                  <div>
                    <div class="subheading">
                      Phone
                    </div>
                    <span class="body-2">{{ user.phone }}</span>
                  </div>
                </v-card-title>
              </v-card>
            </v-flex>
          </v-layout>
        </div>
      </v-flex>
      <v-flex
        d-flex
        justify-end
        xs12
      >
        <div>
          <v-form
            ref="form"
            v-model="valid"
            lazy-validation
          >
            <v-text-field
              v-model="deal.name"
              :disabled="true"
              label="Opportunity"
              outline
              required
            />
            <v-select
              v-model="text"
              :items="templates"
              :rules="[v => !!v || 'Item is required']"
              label="Email Template"
              outline
              required
            />
            <v-text-field
              v-model="subject"
              label="Email Subject"
              outline
              required
            />
            <tiptap-vuetify
              v-model="content"
              :extensions="extensions"
            />
            <v-layout
              justify-end
              row
            >
              <v-btn
                round
                large
                @click="close"
              >
                Cancel
              </v-btn>

              <v-btn
                round
                large
                @click="save"
              >
                Send
              </v-btn>
            </v-layout>
          </v-form>
        </div>
      </v-flex>
    </v-layout>
  </v-container>
</template>
<script>
import 'tiptap-vuetify/dist/main.css'
import { TiptapVuetify, Heading, Bold, Italic, Strike, Underline, Paragraph, BulletList, OrderedList, ListItem, HardBreak } from 'tiptap-vuetify'
export default {
  components: {
    TiptapVuetify
  },
  props: {
    user: {
      type: Object,
      required: true
    },
    templates: {
      type: Array,
      required: true
    },
    deal: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      deal_uui: null,
      subject: null,
      text: null,
      valid: false,
      extensions: [
        new Heading({
          levels: [1, 2, 3]
        }),
        new Bold(),
        new Italic(),
        new Strike(),
        new Underline(),
        new Paragraph(),
        new BulletList(),
        new OrderedList(),
        new ListItem(),
        new HardBreak()
      ],
      // starting content for the editor
      content: `<p>content</p>`
    }
  },
  methods: {
    save () {
      let info = {
        subject: this.subject,
        text: this.content,
        user_id: this.user.id,
        ddeal_uuid: this.deal.id
      }
      this.$emit('save', info)
    },
    close () {
      this.$emit('close')
    }
  }
}
</script>
<style>
    .bgwhite {
        background-color: #fff;
    }
</style>
