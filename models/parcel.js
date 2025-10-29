const mongoose = require('mongoose');

const parcelSchema = new mongoose.Schema({
  id: {
    type: String,
  },
  item:{
    type:String,
  },
  weight:{
    type:Number,
  },
  from: {
  type: String,
  },
  to: {
  type: String,
  },

  sender:{
    type:String,
  },
  receiver:{
    type:String,
  },



  pickup:{
    type:Boolean,
    default:false
  },

  delivered:{
    type:Boolean,
    default:false
  },
  CurrentStatus:{
    type:String,
  },


  Status:{
   created:{
    datetime:Date,
    heading:String,
    desc:String,
  },
  pickup:{
    datetime:String,
    heading:String,
    desc:String,
  },
  transit:{
     datetime:String,
    heading:String,
    desc:String,
  },
  delivered:{
   datetime:String,
    heading:String,
    desc:String,
  }

}
});

module.exports = mongoose.model('parcel', parcelSchema);