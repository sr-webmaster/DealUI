<template>
  <v-card height="100%">
    <v-layout
      row
      wrap
      text-customer
    >
      <v-flex d-flex>
        <v-card flat>
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
                    <span class="body-2">{{ customer.name }}</span>
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
                    <span class="body-2">{{ customer.pbs_id }}</span>
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
                    <span class="body-2">{{ customer.email }}</span>
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
                    <span class="body-2">{{ customer.mobile_phone }}</span>
                  </div>
                </v-card-title>
              </v-card>
            </v-flex>
          </v-layout>
        </v-card>
      </v-flex>
      <v-flex
        d-flex
        justify-end
        xs12
      >
        <v-card flat>
          <v-card-title>
            <div>
              <h3 class="subheading pb-1">
                Opportunity
              </h3>
              {{ deal.name }}
            </div>
          </v-card-title>
          <v-divider />
          <v-card-text>
            <h2 class="pb-3">
              Text Message
            </h2>
            <v-textarea
              v-model="textMessage"
              solo
              label="Text Content"
              :hint="(textMessage.length) + ' / 160'"
              :class="[(textMessage.length > 160)?'error-class':'']"
              data-textMessage
            />
          </v-card-text>
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
              :disabled="!!((textMessage.length > 160) || (textMessage.length === 0))"
              @click="save"
            >
              Send
            </v-btn>
          </v-layout>
        </v-card>
      </v-flex>
    </v-layout>
  </v-card>
</template>

<script>
export default {
  props: {
    customer: {
      type: Object,
      required: true
    },
    deal: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      textMessage: ''
    }
  },
  methods: {
    save () {
      let info = {
        text: this.textMessage,
        customer_id: this.customer.pbs_id,
        deal_id: this.deal.id
      }
      this.$emit('save', info)
    },
    close () {
      this.$emit('close')
    }
  }
}
</script>

<style lang="scss" scoped>
  .v-card__text {
    width: 100%;
    padding-right: 0px;
  }
  .error-class .theme--light.v-messages {
    color: #ff0000;
  }
  .text-customer {
    padding: 10px;
  }
  .text-customer .v-text-field.v-text-field--enclosed {
    padding-right: 16px;
  }
</style>
