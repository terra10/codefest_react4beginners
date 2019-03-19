const appRoot = document.getElementById('app');

const app = {
    title: 'Todo\'s app',
    subtitle: 'Getting things done, made easy',
    todos: [
        'Make lunch',
        'Do laundry',
        'Watch Netflix'
    ]
};

const onFormSubmit = (e) => {
    e.preventDefault();
    const todo = e.target.elements.todo.value;

    if (todo) {
        app.todos.push(todo);
        e.target.elements.todo.value = '';
        renderApp();
    }
};

const onCompleteTodo = (todo, e) => {
  if (todo) {
      app.todos.splice(app.todos.indexOf(todo), 1);
      renderApp();
  }
};

const renderApp = () => {
    const template = <div>
        <h1>{app.title}</h1>
        {app.subtitle && <p>{app.subtitle}</p>}
        <p>{(app.todos && app.todos.length > 0) ? 'Here are your todo\'s:' : 'Please add some todo\'s below'}</p>
        <ol>
            {
                app.todos.map((todo) => <li key={todo}>{todo} <button onClick={(e) => onCompleteTodo(todo, e)}>Complete todo</button></li>)
            }
        </ol>
        <form onSubmit={onFormSubmit}>
            <input type="text" name="todo"/>
            <button>Add Todo</button>
        </form>
    </div>;

    ReactDOM.render(template, appRoot);
};

renderApp();