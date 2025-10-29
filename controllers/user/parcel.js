const Parcel = require('../../models/parcel');

exports.sendParcelPage =(req,res)=>{
    try{
       return res.render('users/send-parcel',{user:req.user})
    }catch(e){
        console.log(e)
        res.redirect('/')
    }
}

exports.sendParcel = async (req, res) => {
  try {
    const { Item, weight, email, from, to, pdate, ptime } = req.body;

    await Parcel.create({
      id: `P${Date.now()}`,
      Item,
      weight,
      from,
      to,
      sender: req.user.email,
      receiver: email,
      CurrentStatus:'Awating pickup',
       Status: {
        created: {
          datetime:Date.now(),
          heading: "Pickup Accepted",
          desc: `Your pickup for the item ${Item} (${weight}KG) for ${pdate}-$${ptime} is accepted`,
        },
      },
    });

    return res.redirect("/dashboard");
  } catch (e) {
    console.log(e);
    res.redirect("/");
  }
};


exports.dashboardPage = async (req, res) => {
  try {
   
    const sentParcels = await Parcel.find({ sender: req.user.email });
    const receivedParcels = await Parcel.find({ receiver: req.user.email });

     return res.render('users/dashboard', { user: req.user, sentParcels, receivedParcels });
    
  } catch (e) {
    console.log(e);
    res.redirect('/');
  }
};