const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/sdc', {useNewUrlParser: true, useUnifiedTopology: true});
mongoose.set('useCreateIndex', true);

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('mongoose is connected');
});

const questionSchema = mongoose.Schema({
    id: Number,
    product_id: Number,
    body: String,
    date_written: Date,
    asker_name: String,
    asker_email: String,
    reported: Boolean,
    helpful: Number
});

const Question = mongoose.model('Question', questionSchema);

module.exports.Question = Question;