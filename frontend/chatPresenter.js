

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