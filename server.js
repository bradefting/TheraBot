"use strict";
// This loads the environment variables from the .env file
require('dotenv-extended').load();

const builder = require('botbuilder');
const restify = require('restify');

// Setup Restify Server
const server = restify.createServer();
server.listen(process.env.port || process.env.PORT || 3978, function () {
    console.log('%s listening to %s', server.name, server.url);
});

// This allows static pages and defaults to index.html
const path = require('path');
server.get(/.*/, restify.serveStatic({
        directory: __dirname,
        'default': 'index.html'
    }));

// Create chat bot and listen to messages
const connector = new builder.ChatConnector({
    appId: process.env.MICROSOFT_APP_ID,
    appPassword: process.env.MICROSOFT_APP_PASSWORD
});
server.post('/api/messages', connector.listen());

let DialogLabels = {
    NRN: '(NRN) NeuroRecovery Network',
    TRec: '(T-Rec) Therapeutic Recreation',
    Other: 'Other'
};

let bot = new builder.UniversalBot(connector, function (session) {

    if (session.message.text == DialogLabels.NRN) {
        // NRN
        return session.beginDialog('nrn:/');
    }
    if (session.message.text == DialogLabels.TRec) {
        // Trec
        return session.beginDialog('trec:/');
    }
    if (session.message.text == DialogLabels.Other) {
        // other
        return session.beginDialog('other:/');
    }

    let welcomeCard = new builder.ThumbnailCard(session)
        .title('Hello, my name is Bender and I will be assisting you today.')
        .subtitle('If you need help, type MENU to revert back here and type QUIT to end our conversation. Which therapy program are you interested in?')
        // .subtitle('Which therapy program are you interested in?')
        .images([
            new builder.CardImage(session)
                // .url('http://www.theoldrobots.com/images62/Bender-18.JPG')original
                .url('https://www.passion-stickers.com/870-thickbox_default/bender-futurama.jpg')

                .alt('Bender')
        ])
        .buttons([
            builder.CardAction.postBack(session, DialogLabels.NRN, DialogLabels.NRN),
            builder.CardAction.postBack(session, DialogLabels.TRec, DialogLabels.TRec),
            builder.CardAction.postBack(session, DialogLabels.Other, DialogLabels.Other)
        ]);

    session.send(new builder.Message(session)
        .addAttachment(welcomeCard));
});

// Sub-Dialogs/routes
bot.library(require('./nrn').createLibrary());
bot.library(require('./trec').createLibrary());
bot.library(require('./other').createLibrary());

//=========================================================
// Bots Middleware
//=========================================================

// Anytime the major version is incremented any existing conversations will be restarted.
bot.use(builder.Middleware.dialogVersion({ version: 1.0, resetCommand: /^reset/i }));

//=========================================================
// Bots Global Actions
//=========================================================

bot.endConversationAction('quit', 'Thanks for chatting. Bye.', { matches: /^quit/i });

bot.dialog('support', require('./support'))
    .triggerAction({
        matches: [/help/i, /support/i, /problem/i]
    });

//exit Anytime?
// session.cancelDialog(0, '/');

//=========================================================
// Bots Use
//=========================================================

bot.use({
    botbuilder: function (session, next) {
        let text = session.message.text;

        if (text && 'menu'==text.toLowerCase() || text && 'exit'==text.toLowerCase()) {
            // interrupt and trigger 'settings' dialog
            return session.beginDialog('/');
        }
        // continue normal flow
        next();
    }
});

// Send welcome when conversation with bot is started, by initiating the root dialog
bot.on('conversationUpdate', function (message) {
    if (message.membersAdded) {
        message.membersAdded.forEach(function (identity) {
            if (identity.id === message.address.bot.id) {
                bot.beginDialog(message.address, '/');
            }
        });
    }
});

// log any bot errors into the console
bot.on('error', function (error) {
    console.log('And error ocurred', error);
});
