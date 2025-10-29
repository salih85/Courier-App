const Parcel = require('../../models/parcel');

exports.adminDashboard = async (req, res) => {
  try {
    const parcels = await Parcel.find();
    return res.render('admin/dashboard', { parcels });
  } catch (e) {
    console.log(e);
    res.redirect('/');
  }
};
exports.updateStatus = async (req, res) => {
  try {
    const { parcelId, status, date, time } = req.body;

    const parcel = await Parcel.findOne({ id: parcelId });
    if (!parcel) return res.redirect('/admin');

    parcel.CurrentStatus = status;

    const datetime = `${date}, ${time}`;

    if (status === 'Collected') {
      parcel.pickup = true;
      parcel.Status.pickup = {
        datetime,
        heading: 'Item Collected',
        desc: 'Item has been collected by our executive'
      };
    } else if (status === 'In Transit') {
      parcel.Status.transit = {
        datetime,
        heading: 'In Transit',
        desc: `Item is in transit as of ${datetime}`
      };
    } else if (status === 'Delivered') {
      parcel.delivered = true;
      parcel.Status.delivered = {
        datetime,
        heading: 'Delivered',
        desc: `Item delivered on ${datetime}`
      };
    } else if (status === 'Awaiting Pickup') {
      parcel.Status.created = {
        datetime,
        heading: 'Awaiting Pickup',
        desc: 'Item is waiting for pickup'
      };
    }

    await parcel.save();
    return res.redirect('/admin');

  } catch (e) {
    console.log(e);
    res.redirect('/');
  }
};
