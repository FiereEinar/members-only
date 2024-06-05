const mongoose = require('mongoose');
const { DateTime } = require("luxon");

const Schema = mongoose.Schema;

const MessageSchema = new Schema({
  title: { type: String, required: true, maxLength: 30, minLength: 3 },
  text: { type: String, required: true, minLength: 3 },
  date_added: { type: Date, default: Date.now },
  creator: { type: Schema.Types.ObjectId, ref: 'User', required: true }
});

MessageSchema.virtual('date_added_formatted').get(function () {
  return DateTime.fromJSDate(this.date_added).toLocaleString(DateTime.DATETIME_FULL);
});

module.exports = mongoose.model('Message', MessageSchema);
