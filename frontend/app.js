var ChatView = require('./chatView.js');
var ChatPresenter = require('./chatPresenter.js');

var chatView = new ChatView({
    element: document.querySelector('[data-component="chat"]')
});

var chatPresenter = new ChatPresenter(chatView);