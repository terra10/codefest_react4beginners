"use strict";

var appRoot = document.getElementById('app');
var app = {
  title: 'Todo\'s app',
  subtitle: 'Getting things done, made easy',
  todos: ['Make lunch', 'Do laundry', 'Watch Netflix']
};

var onFormSubmit = function onFormSubmit(e) {
  e.preventDefault();
  var todo = e.target.elements.todo.value;

  if (todo) {
    app.todos.push(todo);
    e.target.elements.todo.value = '';
    renderApp();
  }
};

var onCompleteTodo = function onCompleteTodo(completedTodo, e) {
  if (completedTodo) {
    app.todos = app.todos.filter((todo) => todo !== completedTodo);
    renderApp();
  }
};

var renderApp = function renderApp() {
  var template = React.createElement("div", null, React.createElement("h1", null, app.title), app.subtitle && React.createElement("p", null, app.subtitle), React.createElement("p", null, app.todos && app.todos.length > 0 ? 'Here are your todo\'s:' : 'Please add some todo\'s below'), React.createElement("ol", null, app.todos.map(function (todo) {
    return React.createElement("li", {
      key: todo
    }, todo, " ", React.createElement("button", {
      onClick: function onClick(e) {
        return onCompleteTodo(todo, e);
      }
    }, "Complete todo"));
  })), React.createElement("form", {
    onSubmit: onFormSubmit
  }, React.createElement("input", {
    type: "text",
    name: "todo"
  }), React.createElement("button", null, "Add Todo")));
  ReactDOM.render(template, appRoot);
};

renderApp();
