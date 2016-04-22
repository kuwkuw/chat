'use strict';

function ChatView(options){
    this._el = options.element;

    this._init();
}

ChatView.prototype.onSendMsg = function(delegat){
    this._sendMessageDelegat = delegat;
};

ChatView.prototype.showMsg = function(msg){
    console.log(msg);
    var newMsg = document.createElement('div');
    newMsg.setAttribute('class', 'message');

    var time = new Date(msg.time)
    var msgTime = document.createElement('span');
    msgTime.setAttribute('class', 'message-time');
    msgTime.innerText = time.getHours() + ':' + time.getMinutes();

    var msgAutor = document.createElement('span');
    msgAutor.setAttribute('class', 'message-autor');
    msgAutor.innerText = msg.autor;

    var msgText = document.createElement('span');
    msgText.setAttribute('class', 'message-text');
    msgText.innerText = msg.text;

    newMsg.appendChild(msgTime);
    newMsg.appendChild(msgAutor);
    newMsg.appendChild(msgText);
    this._chatContent.appendChild(newMsg);
};

ChatView.prototype._init = function(){
    var chat = document.createElement('div');
    chat.setAttribute('class', 'chat-field');

    chat.appendChild(this._createChatContent());
    chat.appendChild(this._createInputMessageControls());

    this._el.appendChild(chat);
    this._el.addEventListener('keydown', this._onSendMsg.bind(this));
    this._el.addEventListener('click', this._onSendMsg.bind(this));
};
ChatView.prototype._createChatContent = function(){
    this._chatContent = document.createElement('div');
    this._chatContent.setAttribute('class', 'chat-content');
    //this._chatContent.setAttribute('data-selector', 'chat-content');

    return this._chatContent;
};

ChatView.prototype._createInputMessageControls = function(){
    var inputMessageControlsWrp = document.createElement('div');
    inputMessageControlsWrp.setAttribute('class', 'input-message-controls-wrp');
    inputMessageControlsWrp.setAttribute('data-selector', 'message-controls');

    var messageInput = document.createElement('input');
    messageInput.setAttribute('type', 'text');
    messageInput .setAttribute('class', 'message-input');

    var sendBtn = document.createElement('input');
    sendBtn.setAttribute('type', 'button');
    sendBtn.setAttribute('value', 'Send');
    sendBtn .setAttribute('class', 'send-btn');

    inputMessageControlsWrp.appendChild(messageInput);
    inputMessageControlsWrp.appendChild(sendBtn);

    return inputMessageControlsWrp;
};

ChatView.prototype._onSendMsg = function(e){
    var target = e.target.closest('.message-input') || e.target.closest('.send-btn');

    if(!target || !this._sendMessageDelegat){
        return;
    }

    if(e.keyCode === 13){
        var msg = target.value;
        this._sendMessageDelegat(msg);
        target.value = '';
        return;
    }

    if(target.classList.contains('send-btn')){
        var msgInput = this._el.querySelector('.message-input');
        this._sendMessageDelegat(msgInput.value);
        msgInput.value = '';
    }
};


module.exports = ChatView;
