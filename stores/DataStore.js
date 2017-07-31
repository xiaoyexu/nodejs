var AppDispatcher = require('../dispatcher/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');

var data = null;

function setData(receivedData) {
	console.log('setData called')
	data = receivedData;
}

function emitChange() {
	console.log('emitChange called')
	DataStore.emit('change');
}

var DataStore = assign({}, EventEmitter.prototype, {

	addChangeListener: function (callback) {
		console.log('addChangeListener called')
		this.on('change', callback);
	},

	removeChangeListener: function (callback) {
		console.log('removeChangeListener called')
		this.removeListener('change', callback);
	},

	getData: function () {
		console.log('getData called');
		return data;
	}

});

function handleAction(action) {
	console.log('handleAction called')
	if (action.type === 'receive_data') {
		setData(action.data);
		emitChange();
	}
}

DataStore.dispatchToken = AppDispatcher.register(handleAction);

module.exports = DataStore;