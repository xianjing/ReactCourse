(function () {
	'use strict';

	var ENTER_KEY = 13;


	class TodoItem extends React.Component {
		constructor(props) {
			super(props);
		}

		render() {
			return (
				<li className={this.props.todo.completed ? "completed" : ""}>
					<div className="view">
						<input className="toggle"
							   type="checkbox"
							   checked={this.props.todo.completed}
							   onChange={this.props.onToggle} 
						/>
						<label>{this.props.todo.title}</label>
					</div>
				</li>
			);
		}
	}


	class TodoApp extends React.Component {
		constructor(props) {
			super(props);

			this.state = {
				todos: [],
				newTodo: ""
			};

			this.onNewTodoChange = this.onNewTodoChange.bind(this);
			this.onNewTodoKeyDown = this.onNewTodoKeyDown.bind(this);
			this.onToggleAllItems = this.onToggleAllItems.bind(this);
		}

		onNewTodoChange(event) {
			this.setState({newTodo: event.target.value});
		}

		onNewTodoKeyDown(event) {
			if (event.keyCode !== ENTER_KEY) return;
			event.preventDefault();

			var val = this.state.newTodo.trim();

			if (val) {
				var todos = this.state.todos;
				todos.push({id: todos.length+1, title: val, completed: false});
				this.setState({newTodo: '', todos: todos});
			}
		}

		onToggleItem(todoId) {
			var todos = this.state.todos.map(todo => {
				if(todo.id === todoId) {
					todo.completed = !todo.completed;
				}
				return todo;
			});
			this.setState({todos: todos});
		}

		onToggleAllItems(event) {
			var todos = this.state.todos.map(todo => {
				todo.completed = event.target.checked;
				return todo;
			});
			this.setState({todos: todos});
		}

		render() {
			var todoItems = this.state.todos.map(todo => {
				return <TodoItem key={todo.id} todo={todo} onToggle={this.onToggleItem.bind(this, todo.id)} />
			});

			var activeTodoCount = this.state.todos.reduce((acc, todo) => {
				return todo.completed ? acc : acc + 1;
			}, 0);

			return (
				<div>
					<header className="header">
						<h1>todos</h1>
						<input className="new-todo" 
							   placeholder="What needs to be done?" 
							   autoFocus={true}
							   value={this.state.newTodo}
							   onChange={this.onNewTodoChange}
							   onKeyDown={this.onNewTodoKeyDown} />
					</header>
					<section className="main">
						<input className="toggle-all" 
							   type="checkbox" 
							   onChange={this.onToggleAllItems}
							   checked={activeTodoCount === 0} />
						<ul className="todo-list">
							{todoItems}
						</ul>
					</section>
				</div>
			);
		}
	}

	ReactDOM.render(<TodoApp />, document.getElementsByClassName('todoapp')[0]);
})();
