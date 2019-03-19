# 2. React templates and handlebars

In this step we will have an intro into JSX templates and how we can show data.

1. First consider the following JS object:  
    ```javascript
    const app = {
        title: 'Todo's app',
        subtitle: 'Getting things done, made easy',
        todos: [
            'Make lunch',
            'Do laundry',
            'Watch Netflix'
        ]
    }
    ```
2. Please use this object and show its data using JSX. You can do so by only modifying the 'src/app.js' file. 
    Here you can create a JSX template with the following structure:
    
    ```javascript
    <div>
        <h1>---title---</h1>
        <p>---subtitle---</p>
        <p>Here are your todo's:</p>
        <ol>
            <li>---todo 1---</li>
            <li>---todo 2---</li>
            <li>---todo 3---</li>
        </ol>
       <form >
         <input type="text" name="todo"/>
         <button>Add Todo</button>
       </form>
    </div>
    ```
    For information on how to do so, have a look at: https://reactjs.org/docs/introducing-jsx.html For the todos list, have a look at section 8. Don't forget the key attribute.
    
    The best way for now is to wrap the template and rendering in a method called "renderApp". Your "app.js" should be looking like this:
    
    ```javascript
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
     
       // event handler goes here
    };

    const renderApp = () => {
       const template = <div>your template here</div>;
       
       // Render your application here
    };
 
    renderApp();
    ```
    
    ***A couple of tips:*** 
    - Don't copy paste, you will learn more when typing yourself.
    - The app does not rerender itself. You will have to call renderApp yourself when data changes to reflect the changes in the DOM.
    - If you see a blank page in the browsers, you most likely have a transpiler error or a runtime error. Have a look at the terminal in which you are running your babel command. Or use developer tools in your browser to see any errors in the console.

3. Can you make it so the subtitle is rendered only when it is specified?
4. Display a different text when there are no todos listed. For example instead of "Here are your todo's:", display "Please add some todo's below"
5. Can you make the "Add todo" form functional? You will have to add an "onSubmit" handler on the form and reference the already specified "onFormSubmit" method.  
    Complete the onFormSubmit method so it will add the spedified todo to the todos list. You can get the submitted value as follows: 
    ```javascript
    const todo = e.target.elements.todo.value;
    ```
6. For an extra assignment, can you add the ability to complete todo's?
6. A quick note, it seems like it is increadibly inefficent to redraw the entire template when a tiny thing changes. However React will only change the DOM when it actually has changed. Therefor it is important to add a "key" option to the list so it can identify individual items in the list.
7. Congrats, you've created your first fully fledged react application. However this application could be much more structured by using a component based application architecture. Please proceed to [React components](3 React components.md)
    
    
    