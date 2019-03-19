"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var App =
/*#__PURE__*/
function (_React$Component) {
  _inherits(App, _React$Component);

  function App(props) {
    var _this;

    _classCallCheck(this, App);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(App).call(this, props));
    _this.onCompleteTodo = _this.onCompleteTodo.bind(_assertThisInitialized(_this));
    _this.onAddTodo = _this.onAddTodo.bind(_assertThisInitialized(_this)); // set the initial state, including title and subtitle for good measure

    _this.state = {
      title: 'Todo\'s app',
      subtitle: 'Getting things done, made easy',
      todos: []
    };
    return _this;
  }
  /**
   * When the component is mounted, check localstorage for existing todos
   */


  _createClass(App, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      // wrap in try catch to make sure corrupt localstorage does not break the app.
      try {
        var json = localStorage.getItem('todos'); // read the json string from localstorage

        var todos = JSON.parse(json); // parse the json string into a todos object

        if (todos) {
          this.setState(function () {
            return {
              todos: todos
            };
          }); // set the todos object in the state, note: there is no prevState necessary
        }
      } catch (e) {// Do nothing at all, our default array will be shown (which is empty)
      }
    }
    /**
     * When the component changes because of a state change, check if the data we want to save has changed, and save it
     * to local storage.
     * @param prevProps
     * @param prevState
     */

  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps, prevState) {
      // Check if our data has been modified
      if (prevState.todos.length !== this.state.todos.length) {
        var json = JSON.stringify(this.state.todos); // create json string from todos object

        localStorage.setItem('todos', json); // save todos to localstorage
      }
    }
    /**
     * Gets called from one of the child components to add a completedTodo, which actually removes it from the list
     * @param completedTodo
     * @param event
     */

  }, {
    key: "onCompleteTodo",
    value: function onCompleteTodo(completedTodo, event) {
      // juste make sure we got a completedTodo, and no undefined or empty argument
      if (completedTodo) {
        // filter the completed todo out of the previous todos list and set it as the new state.
        this.setState(function (prevState) {
          return {
            todos: prevState.todos.filter(function (todo) {
              return todo !== completedTodo;
            })
          };
        });
      }
    }
    /**
     * Adds a todo to the todos list in the state.
     * @param todo
     */

  }, {
    key: "onAddTodo",
    value: function onAddTodo(todo) {
      this.setState(function (prevState) {
        return {
          todos: prevState.todos.concat(todo) // never modify the prevState, but use it to create a new object, so dont do prevState.todos.push(todo) here

        };
      });
    }
    /**
     * Render various components and child components
     * @returns {*}
     */

  }, {
    key: "render",
    value: function render() {
      // Note how we pass in state, and when the state changes these child componts are rerendered as well
      return React.createElement("div", null, React.createElement(Header, {
        title: this.state.title,
        subtitle: this.state.subtitle
      }), React.createElement(Todos, {
        todos: this.state.todos,
        onCompleteTodo: this.onCompleteTodo
      }), React.createElement(AddForm, {
        onAddTodo: this.onAddTodo
      }));
    }
  }]);

  return App;
}(React.Component);
/**
 * This is a stateless component, it only displays what is passed in through the props
 * @param props
 * @returns {*}
 * @constructor
 */


var Header = function Header(props) {
  return React.createElement("div", null, React.createElement("h1", null, props.title), props.subtitle && React.createElement("p", null, props.subtitle));
};
/**
 * This is a stateless component, it only displays what is passed in through the props
 * However, please note how the child "onCompleteTodo" method gets passed back to the parent here from the child Todo component
 * @param props
 * @returns {*}
 * @constructor
 */


var Todos = function Todos(props) {
  return React.createElement("ol", null, props.todos.map(function (todo) {
    return React.createElement(Todo, {
      key: todo,
      todo: todo,
      onCompleteTodo: props.onCompleteTodo
    });
  }));
};
/**
 * This is a stateless component, it only displays what is passed in through the props
 * @param props
 * @returns {*}
 * @constructor
 */


var Todo = function Todo(props) {
  return React.createElement("li", null, props.todo, " ", React.createElement("button", {
    onClick: function onClick(e) {
      return props.onCompleteTodo(props.todo, e);
    }
  }, "Complete todo"));
};
/**
 * Class responsible for getting new todo's and validating its content
 */


var AddForm =
/*#__PURE__*/
function (_React$Component2) {
  _inherits(AddForm, _React$Component2);

  function AddForm(props) {
    var _this2;

    _classCallCheck(this, AddForm);

    _this2 = _possibleConstructorReturn(this, _getPrototypeOf(AddForm).call(this, props));
    _this2.onFormSubmit = _this2.onFormSubmit.bind(_assertThisInitialized(_this2));
    return _this2;
  }
  /**
   * Get the form submission and make sure to trim it and check if it is not undefined or empty.
   * @param e
   */


  _createClass(AddForm, [{
    key: "onFormSubmit",
    value: function onFormSubmit(e) {
      e.preventDefault();
      var todo = e.target.elements.todo.value.trim();

      if (todo) {
        // call parent method with the sanitized todo
        this.props.onAddTodo(todo);
        e.target.elements.todo.value = ''; // empty the input field for good measure,
      }
    }
  }, {
    key: "render",
    value: function render() {
      return React.createElement("form", {
        onSubmit: this.onFormSubmit
      }, React.createElement("input", {
        type: "text",
        name: "todo"
      }), React.createElement("button", null, "Add Todo"));
    }
  }]);

  return AddForm;
}(React.Component);

ReactDOM.render(React.createElement(App, null), document.getElementById('app'));
