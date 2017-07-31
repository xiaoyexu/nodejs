var AppDispatcher = require('../dispatcher/AppDispatcher');

function receiveData(data) {

 var action = {
 type: 'receive_data',
 data: data
 };

 AppDispatcher.dispatch(action);
}

module.exports = {
 receiveData: receiveData
};