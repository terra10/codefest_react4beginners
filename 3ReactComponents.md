# React components and stateless functional components

In this step we will be refactoring our application to be more maintainable and object oriented.
We will cover a lot of topics in this specific step, so don't be afraid to ask for advice.

First we will start with some much needed theory. All of the topics we will cover next will be needed to complete the assignment at the end of this step.

A good way to learn would be to comment out the current code in "app.js" and type out the various examples in the "app.js" and play with them to get a better feel for how React works.

### Component Classes
React component classes are a way to create reusable components in React. With ES6 you can define a component class as follows:  
```javascript
class App extends React.Component {
    render() {
        return (
            <div>
                Hello world!
            </div>
        );
    }
}
```

As you can see you simply name your React class and extend React.Component. The only thing you have to do then is implement the "render()" method. 
In this method you can use JSX template syntax to define your view just as you have done in previous examples. 
One important point here with regards to naming is to always start with a capital letter. This tells React it is dealing with a React component and not html. 
This point will become apparent when we start nesting components.

You can render a component as follows:

```javascript
ReactDOM.render(<App />, document.getElementById('app')); // note the capital in 'App'
```

## Nesting components
You can simply nest components. Consider the following example:

```javascript
class App extends React.Component {

    render() {
        return (
            <div>
                Hello world!
                <MyName />
            </div>
        );
    }
}

class MyName extends React.Component {
    render() {
        return (
            <div>
                <p>My name is Marcel</p>
                <p>My age is: 33</p>
            </div>
        );
    }
}

ReactDOM.render(<App />, document.getElementById('app'));
```

To nest components, use the html style "MyName" component in the render function of the "App" component. 
Please note the render method must always return a single html root component. You can see this in the "MyName" component. It will return a single div containing two paragraph tags.

## Properties
You can pass date from a parent to a child component using properties. This is a one-way street, you can only pass data from the parent to the child, not the other way around.  
Consider the following example:  
```javascript
class App extends React.Component {
    render() {
        return (
            <div>
                Hello world!
                <MyName name="Marcel Maas "age="33" />
            </div>
        );
    }
}

class MyName extends React.Component {
    render() {
        return (
            <div>
                <p>My name is {this.props.name}</p>
                <p>My age is: {this.props.age}</p>
            </div>
        );
    }
}

ReactDOM.render(<App />, document.getElementById('app'));
```
Any piece of data you pass into a component as an attribute will be made available in the component in "this.props.<property-name>". When the data in the parent component changes, it will be passed into the child component again.
The main point here is that properties are read-only. A component should never modify its own properties. This is where the concept of state comes in which we will cover next. 

For more information about the topics we have covered until now, have a look at the documentation: https://reactjs.org/docs/components-and-props.html

## State
Now this is where the magic happens. The concept of state is similar to properties, however it is designed to be used to contain the component state. One of the bonusses of
using component state is that when you modify the state, the component automatically rerenders for you. You do have to follow a number of conventions though, the following example will cover all of these:  
```javascript
class App extends React.Component {
    constructor(props) {
        super(props);

        this.onSubmitName = this.onSubmitName.bind(this); // this is where you make sure 'this' is available in the method

        // Set the initial state
        this.state = {
            name: "Anonymous",
            age: 33
        }
    }

    onSubmitName(e) {
        e.preventDefault();
        const submittedName = e.target.elements.name.value.trim();
        if (submittedName) {
            this.setState(() => ({name: submittedName})); // this is where you modify the state
        }
    }

    render() {
        return (
            <div>
                Hello world!
                <MyName name={this.state.name} age={this.state.age} />
                <form onSubmit={this.onSubmitName}> <!-- here we are referencing the onSubmit method, note the absence of parenthesis -> ()-->
                    <input name="name" type="text" />
                    <button type="submit">Set name</button>
                </form>
            </div>
        );
    }
}

class MyName extends React.Component {
    render() {
        return (
            <div>
                <p>My name is {this.props.name}</p>
                <p>My age is: {this.props.age}</p>
            </div>
        );
    }
}

ReactDOM.render(<App />, document.getElementById('app'));
```
As you can see the previous example has been modified to include a form to submit a new name as well as modify it in the state. Lets go over it step by step.

### Constructor
```javascript
   constructor(props) {
        super(props);

        this.onSubmitName = this.onSubmitName.bind(this); // this is where you make sure 'this' is available in the method

        // Set the initial state
        this.state = {
            name: "Anonymous",
            age: 33
        }
    }
```

We have added a constructor to the component, which gets the props value passed in. Since we override a default constructor we need to call
"super(props)" to make sure we don't break the functionality in the parent class (React.Component)

What follows is a bit of peculiar code which does not seem to make sense at first. As you might have noticed we have been using the "this" keyword
to reference values and methods in the class. However, when we call a method reference from a JSX component as we are doing 
in this example it will lose the context in which it has been run, and the "this" keyword will return "undefined".  
When we use the construct "**_this.onSubmitName = this.onSubmitName.bind(this);_**" we are simply saying:
Whenever your are calling this method in the current class, make sure to do this from the context of the current class. 

The last piece of code is setting the initial state with default values. We need to use the reserved propert "state" for this. It takes an object of any form.

### Calling methods from JSX
```javascript
    render() {
        return (
            <div>
                Hello world!
                <MyName name={this.state.name} age={this.state.age} />
                <form onSubmit={this.onSubmitName}> <!-- here we are referencing the onSubmit method, note the absence of parenthesis -> ()-->
                    <input name="name" type="text" />
                    <button type="submit">Set name</button>
                </form>
            </div>
        );
    }
```
Note the html form we have included. We can call our "onSubmitName" method by using the JSX accolades and "this.<method-name>". 
Main point here is you want to leave of the parenthesis to make sure you reference the method and not call it right away when rendering.  
So this is right: _"onSubmit={this.onSubmitName}"_  
And this is wrong: _"onSubmit={this.onSubmitName()}"_  
  
Also note we are now passing the properties into the "MyName" component from the state object. When these properties change because the state has changed
the MyName component will rerender as well.

### Modifying state
```javascript
    onSubmitName(e) {
        e.preventDefault();
        const submittedName = e.target.elements.name.value.trim();
        if (submittedName) {
            this.setState(() => ({name: submittedName})); // this is where you modify the state
        }
    }
```
In this method we are first making sure the page does not refresh after the form has been submitted by using the "preventDefault" method on the event.
Secondly we are using the event to get a reference to the form and get the name value. For good measure we are removing any leading or traling spaces using the trim command.
Lastly and most importantly we are modifying the state by using the "setState" method which is provided by React.Component only if there is a name available.

With regards to modifying state there is a couple of things you should keep in mind:

#### Never use the this.state to get existing state.
Please consider the following state:

```javascript
this.state = {
    counter: 0
}
```
If we would like to increment this counter by one using the setState method you might be tempted to do this as follows:
```javascript
// this example is the WRONG way to modify existing state
this.setState(() => ({
    counter: this.state.counter + 1
}))
```

However due to the asynchronous nature of the setState method (the state is not immediately modified) this might lead to unexpected
results. For this use case you can use the previous state which is always passed in as an argument to setState. The following example is corrent: 
```javascript
this.setState((prevState) => ({
    counter: prevState.counter + 1
}))
```
This way you always will use what React has determined what the previous state was, and you will not get unexpected behaviour.

#### Shorthand annotation
We have been using the shorthand annotation
```javascript
this.setState((prevState) => ({ counter: prevState.counter + 1 }));
```
is shorthand for:
```javascript
this.setState((prevState) => {
    return { 
        counter: prevState.counter + 1
    };
})
```

## Passing calling methods on parent components
Please consider the following example: 
```javascript
class App extends React.Component {
    constructor(props) {
        super(props);

        this.onSubmitName = this.onSubmitName.bind(this);

        this.state = {
            name: "Anonymous",
            age: 33
        }
    }

    onSubmitName(e) {
        e.preventDefault();
        const submittedName = e.target.elements.name.value.trim();
        if (submittedName) {
            this.setState(() => ({name: submittedName})); // this is where you modify the state
        }
    }

    render() {
        return (
            <div>
                Hello world!
                <MyName name={this.state.name} age={this.state.age} />
                <NameForm onSubmitName={this.onSubmitName} />
            </div>
        );
    }
}

class NameForm extends React.Component {
    render() {
        return (
            <form onSubmit={this.props.onSubmitName}>
                <input name="name" type="text" />
                <button type="submit">Set name</button>
            </form>
        );
    }
}

class MyName extends React.Component {
    render() {
        return (
            <div>
                <p>My name is {this.props.name}</p>
                <p>My age is: {this.props.age}</p>
            </div>
        );
    }
}

ReactDOM.render(<App />, document.getElementById('app'));
```
Most of this example is the same is the previous however we have move the name form into its own component called "NameForm". 
We are now passing the "onSubmitName" method into the NameForm. Inside the NameForm component we can call "this.props.onSubmitName".
This way when the form is submitted it is actually being handled by the parent component.

However this is not nicely encapsulated. The application should actually look like this:
```javascript
class App extends React.Component {
    constructor(props) {
        super(props);

        this.handleNewName = this.handleNewName.bind(this);

        this.state = {
            name: "Anonymous",
            age: 33
        }
    }

    handleNewName(name) {
        this.setState(() => ({ name })); // this is shorthand for: name: name
    }

    render() {
        return (
            <div>
                Hello world!
                <MyName name={this.state.name} age={this.state.age} />
                <NameForm onHandleNewName={this.handleNewName} />
            </div>
        );
    }
}

class NameForm extends React.Component {
    constructor(props) {
        super(props);
        this.onSubmitName = this.onSubmitName.bind(this);
    }

    onSubmitName(e) {
        e.preventDefault();
        const submittedName = e.target.elements.name.value.trim();
        if (submittedName) {
            this.props.onHandleNewName(submittedName);
        }
    }
    render() {
        return (
            <form onSubmit={this.onSubmitName}>
                <input name="name" type="text" />
                <button type="submit">Set name</button>
            </form>
        );
    }
}

class MyName extends React.Component {
    render() {
        return (
            <div>
                <p>My name is {this.props.name}</p>
                <p>My age is: {this.props.age}</p>
            </div>
        );
    }
}

ReactDOM.render(<App />, document.getElementById('app'));
```

Right now the NameForm handles the submission of the form and validation. It will then use the passed in "onHandleNewName" method to pass the new validated name to the parent component.
The parent component will then update the state with the new name, and this state is passed through to the MyName component and everything is rerendered.

## Stateless functional components
The last topic before we dive into the assignment is to have a look at stateless components.
Components which only render a template with some properties, but do not need the additional overhead of state management and React lifecycle.
These components should be created as stateless components resulting in performance gains.

The MyName component in the last example is a good candidate for a stateless functional component.

When we convert the MyName class to a stateless component it will look like this:
```javascript
const MyName = (props) => {
    return (
        <div>
            <p>My name is {props.name}</p>
            <p>My age is: {props.age}</p>
        </div>
    );
};
```
As you can see we have removed the class declaration and replaced it with a function which gets a props argument.
Then you can simply return the JSX template and use the props argument. (no need for this since this props is no longer a class variable)

Right now we have a highly object based an performant application. For more info have a look at the docs: https://reactjs.org/docs/state-and-lifecycle.html

## Assignment
At the start of this step we have commented out our "Todo's" app. Your assignment will be to refactor this app into React classes and functional components.
A suggestion would be to create the following components:

- Header
- Todos
    - Todo
- AddForm

**Some tips:**
- Use developer tools to check the console for errors, they are usually very descriptive
- Check for compiler errors in the babel transpiler.
- You can install the React dev tools for chrome or firefox to help debugging

### Bonus assignment
Try to save the todo's to the local storage to make sure they are saved even after page refreshes.  
You need to use the lifecycle methods "componentDidMount" and "componentDidUpdate" as described here: https://reactjs.org/docs/state-and-lifecycle.html#adding-lifecycle-methods-to-a-class  
You can set localStorage using "localStorage.setItem(key, value)" and get it using "localStorage.getItem(key)". 
The value for localstorage must be a string, so you can serialize and deserialize your state using JSON.stringify(state) and JSON.parse(serializedState)  
  
This concludes the workshop for now. I'm planning to create a couple more steps which you will need to do to create production builds, including styling etc.