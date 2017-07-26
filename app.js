/*
var React = require('react');
var ReactDOM = require('react-dom');
var reactElement = React.createElement('h1', { className: 'header' },'This is React');
ReactDOM.render(reactElement, document.getElementById('react-application'));
*/
var React = require('react');
var ReactDOM = require('react-dom');

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
	}
	
	componentWillMount() {
		this.setState({i:''})
		console.log('componentWillMount')
	}
	componentWillReceiveProps(){
		console.log('componentWillReceiveProps')
	}
	shouldComponentUpdate(){
		console.log('shouldComponentUpdate')
		return true
	}
	componentWillUpdate(np,ns){
		console.log(np);
		console.log(ns);
		console.log('componentWillUpdate')
	}
	onClick() {
		
		this.setState({i:'abc'})
	}
	render() {
		console.log('render')
		return (<div>
		<h1>Hello {this.props.name} {this.state.i}</h1>
		<button onClick={this.onClick}>Test</button>
		</div>);
		
	}
	componentDidUpdate(pp,ps) {
		console.log(pp);
		console.log(ps);
		console.log('componentDidUpdate')
	}
	componentDidMount() {
		console.log('componentDidMount')
		this.setState({i:''})
	}
	componentWillUnmount() {
		console.log('componentWillUnmount')
	}

}



ReactDOM.render(<TestComp name='name'/>, document.getElementById('react-application'));