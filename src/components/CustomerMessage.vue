<template>
  <v-container class="bgwhite">
    <v-layout
      row
      wrap
    >
      <v-flex d-flex>
        <v-card flat>
          <v-card-title>
            <v-layout
              row
              justify-space-between
            >
              <h2>Sent Email</h2>
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
          </v-card-title>
          <v-divider />
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
                    <span class="body-2">{{ email.user.name }}</span>
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
                    <span class="body-2">{{ email.user.id }}</span>
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
                    <span class="body-2">{{ email.user.email }}</span>
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
                    <span class="body-2">{{ email.user.phone }}</span>
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
              {{ email.deal.name }}
            </div>
          </v-card-title>
          <v-divider />
          <v-card-text>
            <h2 class="pb-3">
              {{ email.subject }}
            </h2>
            <div v-html="email.message" />
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
              Close
            </v-btn>
          </v-layout>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>
<script>
export default {
  props: {
    email: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
    }
  },
  methods: {
    close () {
      this.$emit('close')
    }
  }
}
</script>
