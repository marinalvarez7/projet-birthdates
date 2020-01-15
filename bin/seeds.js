const mongoose = require('mongoose');
const Message = require('../models/message.js');

Message.collection.drop();

const dbtitle = 'projet-birthdates';
mongoose.connect(`mongodb://localhost/${dbtitle}`, {useNewUrlParser: true, useUnifiedTopology: true}).catch(err => console.error(err));

const datas = [
  {
    message: "Happy Birthday !!!",
  },
  {
    message: "Bon anniversaire :)",
  },
];

const p1 = Message.create(datas);
p1.then(message => console.log(`${message.length} message created!`))

Promise.all([p1])
   .then(() => mongoose.disconnect())
   .catch(err => console.error(err))
;