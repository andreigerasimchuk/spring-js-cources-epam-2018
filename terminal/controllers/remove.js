const { getAllTodos, writeFile, findCurrentTodo } = require('../services');

exports.remove = (id) => {
    getAllTodos()
        .then(todos => {
            const currentTodo = findCurrentTodo(id, todos);
            currentTodo.todos.splice(currentTodo.index, 1);
            
            return currentTodo.todos;
        })
        .then(todos => {
            writeFile(JSON.stringify({ todos }));
        })
        .catch(err => {
            console.log(`error: ${err}`);
        });
}