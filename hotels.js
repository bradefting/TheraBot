"use strict";

let Promise = require('bluebird');

// Galvanize Boulder coordinates
// 40.0165° N, -105.2817° W

// https://api.sandbox.amadeus.com/v1.2/hotels/

// https://boulderstation.sclv.com/~/media/Images/Slideshow-Images/Boulder/BS_Double-Queen-Room2_R-2_flat.jpg

//http://www.bouldermarriotthotel.com/wp-content/uploads/2016/10/DENBO_KingGuestRoom.jpg

//http://hamptoninn3.hilton.com/resources/media/hp/DENLVHX/en_US/img/shared/full_page_image_gallery/main/HX_2beds_5_425x303_FitToBoxSmallDimension_Center.jpg

results[i].property_name
results[i].address.line1
results[i].min_daily_rate.amount
results[i].contacts[0].detail


let apiKey = process.env.AMADEUS_KEY
console.log(apiKey);

//Sample call
 //

module.exports = {
    searchHotels: function (destination, checkInDate, checkOutDate) {
        return new Promise(function (resolve) {

            // Filling the hotels results manually just for demo purposes
            var hotels = [];
            for (var i = 1; i <= 5; i++) {
                hotels.push({
                    name: destination + ' Hotel ' + i,
                    location: destination,
                    rating: Math.ceil(Math.random() * 5),
                    numberOfReviews: Math.floor(Math.random() * 5000) + 1,
                    priceStarting: Math.floor(Math.random() * 450) + 80,
                    image: 'https://placeholdit.imgix.net/~text?txtsize=35&txt=Hotel+' + i + '&w=500&h=260'
                });
            }

            hotels.sort(function (a, b) { return a.priceStarting - b.priceStarting; });

            // complete promise with a timer to simulate async response
            setTimeout(function () { resolve(hotels); }, 1000);
        });
    }
};
