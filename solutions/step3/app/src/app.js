class App extends React.Component {
    constructor(props) {
        super(props);

        this.onCompleteTodo = this.onCompleteTodo.bind(this);
        this.onAddTodo = this.onAddTodo.bind(this);

        // set the initial state, including title and subtitle for good measure
        this.state = {
            title: 'Todo\'s app',
            subtitle: 'Getting things done, made easy',
            todos: []
        }
    }

    /**
     * When the component is mounted, check localstorage for existing todos
     */
    componentDidMount() {
        // wrap in try catch to make sure corrupt localstorage does not break the app.
        try {
            const json = localStorage.getItem('todos'); // read the json string from localstorage
            const todos = JSON.parse(json); // parse the json string into a todos object

            if (todos){
                this.setState(() => ({ todos })); // set the todos object in the state, note: there is no prevState necessary
            }
        } catch (e) {
            // Do nothing at all, our default array will be shown (which is empty)
        }

    }

    /**
     * When the component changes because of a state change, check if the data we want to save has changed, and save it
     * to local storage.
     * @param prevProps
     * @param prevState
     */
    componentDidUpdate(prevProps, prevState) {
        // Check if our data has been modified
        if (prevState.todos.length !== this.state.todos.length) {
            const json = JSON.stringify(this.state.todos); // create json string from todos object
            localStorage.setItem('todos', json); // save todos to localstorage
        }
    }

    /**
     * Gets called from one of the child components to add a completedTodo, which actually removes it from the list
     * @param completedTodo
     * @param event
     */
    onCompleteTodo(completedTodo, event) {
        // juste make sure we got a completedTodo, and no undefined or empty argument
        if (completedTodo) {
            // filter the completed todo out of the previous todos list and set it as the new state.
            this.setState((prevState) => ({
                todos: prevState.todos.filter((todo) => todo !== completedTodo)
            }))
        }
    }

    /**
     * Adds a todo to the todos list in the state.
     * @param todo
     */
    onAddTodo(todo) {
        this.setState((prevState) => ({
            todos: prevState.todos.concat(todo) // never modify the prevState, but use it to create a new object, so dont do prevState.todos.push(todo) here
        }));

    }

    /**
     * Render various components and child components
     * @returns {*}
     */
    render() {
        // Note how we pass in state, and when the state changes these child componts are rerendered as well
        return (
            <div>
                <Header title={this.state.title} subtitle={this.state.subtitle} />
                <Todos todos={this.state.todos} onCompleteTodo={this.onCompleteTodo} />
                <AddForm onAddTodo={this.onAddTodo}/>
            </div>
        );
    }
}

/**
 * This is a stateless component, it only displays what is passed in through the props
 * @param props
 * @returns {*}
 * @constructor
 */
const Header = (props) => {
    return (
        <div>
            <h1>{props.title}</h1>
            {props.subtitle && <p>{props.subtitle}</p>}
        </div>
    );
};

/**
 * This is a stateless component, it only displays what is passed in through the props
 * However, please note how the child "onCompleteTodo" method gets passed back to the parent here from the child Todo component
 * @param props
 * @returns {*}
 * @constructor
 */
const Todos = (props) => {
    return (
        <ol>
            {
                props.todos.map((todo) => <Todo key={todo} todo={todo} onCompleteTodo={props.onCompleteTodo} />)
            }
        </ol>
    );
};

/**
 * This is a stateless component, it only displays what is passed in through the props
 * @param props
 * @returns {*}
 * @constructor
 */
const Todo = (props) => {
    return (
        <li>{props.todo} <button onClick={(e) => props.onCompleteTodo(props.todo, e)}>Complete todo</button></li>
    );
};

/**
 * Class responsible for getting new todo's and validating its content
 */
class AddForm extends React.Component {
    constructor(props) {
        super(props);
        this.onFormSubmit = this.onFormSubmit.bind(this);
    }

    /**
     * Get the form submission and make sure to trim it and check if it is not undefined or empty.
     * @param e
     */
    onFormSubmit(e) {
        e.preventDefault();
        const todo = e.target.elements.todo.value.trim();

        if (todo) {
            // call parent method with the sanitized todo
            this.props.onAddTodo(todo);
            e.target.elements.todo.value = ''; // empty the input field for good measure,
        }
    }

    render() {
        return (
            <form onSubmit={this.onFormSubmit}>
                <input type="text" name="todo"/>
                <button>Add Todo</button>
            </form>
        );
    }
}

ReactDOM.render(<App />, document.getElementById('app'));