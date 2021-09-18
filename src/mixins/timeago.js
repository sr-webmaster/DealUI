import moment from 'moment'
export default {
  methods: {
    timeago (date, format) {
      return moment(date, format).fromNow()
    }
  }
}
