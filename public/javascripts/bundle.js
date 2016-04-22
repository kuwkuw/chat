/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	var ChatView = __webpack_require__(1);
	var ChatPresenter = __webpack_require__(2);

	var chatView = new ChatView({
	    element: document.querySelector('[data-component="chat"]')
	});

	var chatPresenter = new ChatPresenter(chatView);

/***/ },
/* 1 */
/***/ function(module, exports) {

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


/***/ },
/* 2 */
/***/ function(module, exports) {

	

	function ChatPresenter(view){
	    this._view = view;
	    this._socet = io();

	    this._view.onSendMsg(this.sendMsg.bind(this));
	    this._socet.on('chat-message', this._view.showMsg.bind(this._view));
	}

	ChatPresenter.prototype.sendMsg = function(msg){
	    console.log(msg);
	    this._socet.emit('chat-message', msg);
	};

	module.exports = ChatPresenter;

/***/ }
/******/ ]);