"use strict";

const builder = require('botbuilder');

let lib = new builder.Library('trec');

let buttons = {
  click: 'click',
  exit: 'Exit'
};

lib.dialog('/',[

  //welcome
  function (session, results, next) {
    session.send("Therapeutic recreation (T-Rec) is important for the total rehabilitation process. Whether it's getting back on the mountain or riding an arm cycle, we'll work towards getting you back to your favorite activities.");

    next();
  },

  //Carousel
  function (session, results, next) {

    //get carousel cards
    let carouselCards = getCardsCarousel();

    // create reply with Carousel AttachmentLayout
     let carousel = new builder.Message(session)
         .attachmentLayout(builder.AttachmentLayout.carousel)
         .attachments(carouselCards);

     //shows carousel
     session.send(carousel);
     next();
  },

  //exit button
  function(session){
    builder.Prompts.choice(session, 'Click exit to go back to the main menu.',[buttons.exit],{
        listStyle: builder.ListStyle.button
    });
    // session.endDialog();
  }
]);

//creates cards for carousel
function getCardsCarousel(session) {
    return [
        new builder.HeroCard(session)
            // .title('Monoski')
            // .subtitle('Get back on the mountain')
            .text("Andy's passion is skiiing. Knowing this, our team was able to work with him to transfer in and out of a monoski and to get on and off the chairlift.")
            .images([
                builder.CardImage.create(session, 'https://s-media-cache-ak0.pinimg.com/originals/81/1b/66/811b66b868a3c37a5579a98542578134.jpg')
            ]),

        new builder.HeroCard(session)
            // .title('Sailing')
            // .subtitle('Get back on the water')
            .text('Devin loves sailing with his wife. Since his goal was to sail again, we were able to practice the body movements that are required to get him back on the water.')
            .images([
                builder.CardImage.create(session, 'https://craighospital.org/uploads/_800x600_fit_center-center_75/Foundation-Patient-David-Larkin-at-Hobie-Day.jpg')
            ]),

        new builder.HeroCard(session)
            // .title('Exoskeleton Therapy')
            // .subtitle('get back racing')
            .text("Tony is using a robotic exoskeleton to take a walk with his family. Tony has a spinal cord injury and could only dream of getting out of his chair and using his legs to take an afternoon walk with his family.")
            .images([
                builder.CardImage.create(session, 'https://craighospital.org/uploads/Blog-Indegotrial.jpg')
            ]),

        new builder.HeroCard(session)
            // .title('Arm Cycle')
            // .subtitle('get back racing')
            .text("Getting back into racing was Jim's goal. With this in mind, we focused on the skills that are required to get to the races and to get his race equipment setup. Now, because of his hard work and determination he is not only competing but winning.")
            .images([
                builder.CardImage.create(session, 'https://i.ytimg.com/vi/a0L366GS3Vs/maxresdefault.jpg')
            ])
    ];
}

// Export createLibrary() function
module.exports.createLibrary = function () {
    return lib.clone();
};
