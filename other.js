"use strict";

const builder = require('botbuilder');

let lib = new builder.Library('other');

let buttons = {
    yes: 'Yes',
    no: 'No',
    exit: 'Exit'
};

// These steps are defined as a waterfall dialog,
// but the control is done manually by calling the next func argument.
lib.dialog('/',[

    function (session) {

            builder.Prompts.choice(session, 'Below are some of the programs that our rehabilitation center offers. \n\nNeuroRecovery Network (NRN) \n\nTherapeutic Recreation (T-Rec) \n\nInpatient Therapy \n\nOutpatient Therapy \n\nEquipment upgrades \n\nEquipment fitting\n\nIf you would like more information about any of these programs, please contact hospital at 555-555-1212.',[buttons.exit],{
                listStyle: builder.ListStyle.button
            });
        }

        // function (session, results, next) {
        //     if(session.message.text == buttons.exit) {
        //         session.endDialog('XYZ menu items...');
        //     }else{
        //         session.endConversation('Goodbye...');
        //     }
        //
        // }

]);
// Export createLibrary() function
module.exports.createLibrary = function () {
    return lib.clone();
};
