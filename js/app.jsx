(function () {
	'use strict';

	var ENTER_KEY = 13;

    class TodoItem extends React.Component {
    	constructor(props) {
    		super(props);
    	}
    	render(){
    		return ( <li> 
    			<input type="checkbox" className="checkbox"/>
    			<label>{this.props.todo.title}</label>
    			</li>
    			);
    	}

    }
	class TodoApp extends React.Component {
		constructor(props) {
			super(props);
			this.state = {
				todos : [],
				newTodoItem: ""

			};
			this.onTodoItemChange = this.onTodoItemChange.bind(this);
			this.onTodoItemKeyDown = this.onTodoItemKeyDown.bind(this);
		}

		onTodoItemChange(event) {
			this.setState({
				newTodoItem:event.target.value
			})
		}

		onTodoItemKeyDown(event){
			//enterkey
			if(event.keyCode  != 13) return;
			var newValue = this.state.newTodoItem;
			console.log(newValue);
			this.state.todos.push({'title':newValue})
			this.setState({todos:this.state.todos, newTodo:""})
		}

		render() {
			var todoItems = this.state.todos.map ( todo => {
				return <TodoItem todo={todo} />
			});
			return (
				<div>
					<header className="header">
						<h1>todos</h1>
						<input className="new-todo" 
							   placeholder="What needs to be done?" 
							   autoFocus={true} 
							   onKeyDown={this.onTodoItemKeyDown}
							   onChange={this.onTodoItemChange} 
							   />
					</header>
					<section className="main">
						<input className="toggle-all" 
							   type="checkbox" />
						<ul className="todo-list">
						 {todoItems}			
						</ul>
					</section>
				</div>
			);
		}
	}

	ReactDOM.render(<TodoApp/>, document.getElementsByClassName('todoapp')[0]);
})();
