const Parcel = require('../../models/parcel');

exports.home =(req,res)=>{
     return res.render('home',{user:req.user});
}

exports.trackParcel =async(req,res)=>{
    let id=req.query?.id
    if(!id){
        return res.redirect('/')
    }
    const parcel =await Parcel.findOne({id:id})
    return res.render('users/track', { parcel, user: req.user });
}