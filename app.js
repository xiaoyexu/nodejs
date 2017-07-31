/*
var React = require('react');
var ReactDOM = require('react-dom');
var reactElement = React.createElement('h1', { className: 'header' },'This is React');
ReactDOM.render(reactElement, document.getElementById('react-application'));
*/
var React = require('react');
var ReactDOM = require('react-dom');
var DataStore = require('./stores/DataStore');
var ActionCreator = require('./actions/ActionCreators');

var Redux = require('redux');
var ReduxLogger = require('redux-logger');
var ReduxThunk = require('redux-thunk');
var thunk = ReduxThunk.default;
//console.log('thunk:'+thunk);

var ReduxPromise = require('redux-promise')

var ReactRedux = require('react-redux')
var Provider = ReactRedux.Provider;
const title = value => <h1>{value}</h1>
const titleContainer = ReactRedux.connect()(title)

const logger = ReduxLogger.createLogger();

const reducer = (state = 0, action) => {
	console.log('reducer, state: ' + state + ' action: ' + action.type)
	/*
	var retState = state + 1;
	if (action.type === 'TEST_ACT') {
		retState = 1;
	}
	var retState = state;
	console.log('reducer return state: ' + retState);
	return retState;
	*/
	return state;
};

const testmw = (e) => {
	console.log('e: ' +e);
	/*
	return {
		type: 'TEST_ACT2',
		payload:'data2'
	}*/
	//return e.dispatch
	//return;
	return (e)=>e;
	/*
	return function(ddd) {
		console.log('ddd in testmw called');
		return ddd;
	}*/
}

const testmw2 = (e2) => {
	console.log('e2: ' +e2);
	/*
	return {
		type: 'TEST_ACT2',
		payload:'data2'
	}*/
	//return e.dispatch
	//return;
	return function(ddd) {
		console.log('ddd in testmw2 called');
		return ddd;
	}
}

const testmw3 = store => next => action => {
  // 传递前, 执行的代码
  console.group(action.type)
  console.info('dispatching', action)
  let result = next(action)
  // 传递完, 执行的代码
  console.log('next state', store.getState())
  console.groupEnd(action.type)
  return result
}

var result = testmw3({getState:function(){return 'a'}})(function(a){return a})({type:'abc'});
console.log('result: ' + result);

const testmw4 = (store) => {
	var a = function(next) {
		console.log('func a called');
		var b = function(action) {
			console.log('func b called');
			return action;
		};
		
		return b
	}
	return a;
}

const store = Redux.createStore(reducer, 0, Redux.applyMiddleware(ReduxPromise));
//console.log('store:'+store);
//const state = store.getState();
//console.log('state:' + state);
//import { createStore } from 'redux';
//const store = createStore(fn);

store.subscribe(()=>{
	console.log('store data changed');
});

const actionFunc = (dispatch,getState)=> {
	console.log('actionFunc called'); 
	const fetchFunc = fetch('http://www.baidu.com').then(response => dispatch({type:'TEST_FETCH'}));
	return fetchFunc;
}

const promiseFunc = (dispatch,getState)=> {
	console.log('promiseFunc called');
	return new Promise(function(resolve, reject) {
		console.log('Promise called');
		const fetchFunc = fetch('http://www.baidu.com').then(response => {type:'TEST_FETCH'});
		return fetchFunc;
		//return {type:'TEST_FETCH'};
	});
}





/*
var re = store.dispatch({
	type: 'TEST_ACT',
	payload:'data'
})
console.log('re:' + re);
*/
//re = store.dispatch(promiseFunc);
//console.log('actionFunc dispatched re:' + re);


/*
var listOfItems = <ul className="list-of-items">
 <li className="item-1">Item 1</li>
 <li className="item-2">Item 2</li>
 <li className="item-3">Item 3</li>
 </ul>;
*/
//var listOfItems = <h1>abc</h1>
//ReactDOM.render(listOfItems, document.getElementById('react-application'));


class TestComp extends React.Component {
	/*
	getInitialState() {
		console.log('getInitialState')
		return {i:''}
	}
	*/
	constructor(props) {
		super(props)
		this.onClick = this.onClick.bind(this);
		this.onDataChange = this.onDataChange.bind(this);
		
	}
		
	componentWillMount() {
		this.setState({i:''})
		console.log('componentWillMount')
	}
	componentWillReceiveProps(){
		console.log('componentWillReceiveProps')
	}
	/*
	shouldComponentUpdate(){
		console.log('shouldComponentUpdate')
		return true
	}
	*/
	/*
	componentWillUpdate(np,ns){
		console.log(np);
		console.log(ns);
		console.log('componentWillUpdate')
	}
	*/
	onClick() {
		//DataStore.emit('change')
		ActionCreator.receiveData('test');
		//this.setState({i:'abc'})
		
	}
	render() {
		console.log('render')
		const propClick = this.props.propClick
		return (<div>
		<h1>Hello {this.props.name} {this.state.i}</h1>
		<button onClick={propClick}>Test</button>
		</div>);
		
	}
	/*
	componentDidUpdate(pp,ps) {
		console.log(pp);
		console.log(ps);
		console.log('componentDidUpdate')
	}
	*/
	componentDidMount() {
		console.log('componentDidMount')
		this.setState({i:''})
		DataStore.addChangeListener(this.onDataChange);
	}
	componentWillUnmount() {
		console.log('componentWillUnmount')
		DataStore.removeChangeListener(this.onDataChange);
	}
	onDataChange() {
		console.log('onDataChange called');
		var d = DataStore.getData()
		console.log('getData:' + d);
		this.setState({i:d})
	}
}

/*
TestComp.defaultProps = {
  i: 'Guest'
}

TestComp.initialStates = {
	i: 'aaa'
	
}

TestComp.propTypes = {
	name: React.PropTypes.number
}
*/		

function mapStateToProps(state) {
	return {i:state.i}
	
}
function mapDispatchToProps(dispatch) {
	return {
		propClick: ()=> dispatch({type:'TEST'})
	}
}

const App = ReactRedux.connect(mapStateToProps,mapDispatchToProps)(TestComp)
//ReactDOM.render(<TestComp name='name'/>, document.getElementById('react-application'));
ReactDOM.render(
<Provider store={store}>
<App/>
</Provider>, document.getElementById('react-application'));
