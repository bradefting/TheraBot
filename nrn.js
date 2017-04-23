"use strict";

const builder = require('botbuilder');

let lib = new builder.Library('nrn');

let buttons = {
    yes: 'Yes',
    no: 'No',
    exit: 'Exit',
    medicaid: 'Medicaid/Medicare',
    none: 'None',
    private: 'Private'

};

let patientInfo = {};

// These steps are defined as a waterfall dialog,
// but the control is done manually by calling the next func argument.
lib.dialog('/',[

    //Age
    function (session) {
        session.send("It looks like your interested in the NeuroRecovery Network (NRN) program. To see if you are a good fit for the program, I will ask you some questions and simply click the best answer. To exit at anytime, click Exit to go back to the main menu.");
        builder.Prompts.choice(session, 'Are you at least 16 years old?', [buttons.yes, buttons.no, buttons.exit],{
            listStyle: builder.ListStyle.button
      });
    },

    //add age status to patientInfo object
    function (session, results, next) {
        patientInfo.ofAge = session.message.text;
        next();
    },

    // Housing
    // function (session) {
    //     builder.Prompts.choice(session, 'Can you provide your own housing near the hospital?',
    //     [buttons.yes, buttons.no, buttons.exit],{
    //         listStyle: builder.ListStyle.button
    //   });
    // },
    //
    // //add housing status to patientInfo object
    // function (session, results, next) {
    //     patientInfo.hasHousing = session.message.text;
    //     next();
    // },

    // injury type
    function (session) {
       var msg = new builder.Message(session)
           .attachments([{
               contentType: "image/jpeg",
               contentUrl: "http://www.lyslaw.com/images/import/wp-content/uploads/2015/01/SCS3.jpg"
           }]);
       session.send(msg);

       builder.Prompts.choice(session, 'Is your injury considered Incomplete? See image above and click yes if you have an incomplete injury.'
       ,[buttons.yes, buttons.no, buttons.exit],{
           listStyle: builder.ListStyle.button
     });
    },
    function (session, results, next) {
       patientInfo.injuryType = session.message.text;
       next();
    },

    // Injurylevel
    function (session) {
        var msg = new builder.Message(session)
           .attachments([{
               contentType: "image/jpeg",
               contentUrl: "http://themonkeystar.com/wp-content/uploads/2016/07/How-many-cervical-vertebrae-Information-on-Human-Anatomy.jpg"
           }]);

        session.send(msg);

        builder.Prompts.choice(session, 'Is your injury at the Cervical level? (Refer to the image above and only click Yes if at Cervical level.)'
        ,[buttons.yes, buttons.no, buttons.exit],{
           listStyle: builder.ListStyle.button
        });
    },

    //add cervical injury status to patientInfo object
    function (session, results, next) {
        patientInfo.cervicalLevel = session.message.text;
        next();
    },

    // Regular Standing
    function (session) {
        var msg = new builder.Message(session)
           .attachments([{
               contentType: "image/jpeg",
               contentUrl: "http://www.newmobility.com/wp-content/uploads/2014/08/Tek-RMD-300x201.jpg"
           }]);

        session.send(msg);

        builder.Prompts.choice(session, 'Do you perform any regular standing? (Pick Yes if you stand on your own or use a device like a tilt table or standing frame.)'
        ,[buttons.yes, buttons.no, buttons.exit],{
           listStyle: builder.ListStyle.button
        });
    },

    //add standing status to patientInfo object
    function (session, results, next) {
        patientInfo.canStand = session.message.text;
        next();
    },

    //Insurance
    function (session) {
        builder.Prompts.choice(session, 'What type of insurance do you have?',[buttons.private, buttons.medicaid, buttons.none, buttons.exit], {
            listStyle: builder.ListStyle.button
        });
    },

    //add insurance type to patientInfo object
    function (session, results, next) {
        patientInfo.insuranceType = session.message.text;
        next();
    },

    // Review info in patientInfo
    function (session) {
      console.log(patientInfo);
      session.send("Let\'s review your information:\n\nOlder than 16: %s \n\nIncomplete Injury: %s \n\nCervical Level Injury: %s \n\nStands Regularily: %s \n\nType of Insurance: %s",
          patientInfo.ofAge,
          patientInfo.injuryType,
          patientInfo.cervicalLevel,
          patientInfo.canStand,
          patientInfo.insuranceType
        );

      //ask user if input correct
       builder.Prompts.choice(session, 'Do these answers look correct?',[buttons.yes, buttons.no],{
            listStyle: builder.ListStyle.button
        });
    },

    //if yes, qualify, if no, go back to start of nrn waterfall
    function(session, results, next){
        if(session.message.text === buttons.yes){
            if(patientInfo.ofAge === 'Yes' && patientInfo.injuryType === 'Yes' && patientInfo.cervicalLevel === 'Yes' && patientInfo.canStand === "Yes" && patientInfo.insuranceType === 'Private'){

                session.send("It looks like you might be a good candidate for the program. Let's get some contact information from you and we can discuss more details about the program.");
                // session.beginDialog('other:/');
                next();
            }else{

               builder.Prompts.choice(session, "Thank you for your interest in the NRN program. Currently you don't pre-qualify for the program but please try again in the future.",[buttons.exit],{
                    listStyle: builder.ListStyle.button
                });
                // session.endDialog();
            }
        }else {
          //if select no, go to top of nrn waterfall
            session.beginDialog('/');
        }
    },

    // get full name
    function (session) {
      console.log(session.dialogData);
       builder.Prompts.text(session, 'What is your first and last name?');

    },

    //add name to patientInfo
    function (session, results, next) {
        patientInfo.name = results.response;
        let name = results.response;

        let firstLetter = name.slice(0,1).toUpperCase();
        let endFirstName = name.slice(1,name.indexOf(" ")).toLowerCase();
        patientInfo.FirstName = firstLetter.concat('', endFirstName);

        next();
    },

    //ask for contact info
    function (session) {
      console.log(session.dialogData);
       builder.Prompts.text(session, 'Please enter the phone number (including the area code) where you can be reached.');
    },

    //adds phone number or email to patientInfo
    function (session, results, next) {
        patientInfo.phone = results.response;
        next();
    },

    //contact soon with first name
    function (session) {
       builder.Prompts.text(session, `Thank you, ${patientInfo.FirstName}. We will contact you soon. Type EXIT to go to the main menu.`);
    }
]);

// Export createLibrary() function
module.exports.createLibrary = function () {
    return lib.clone();
};
