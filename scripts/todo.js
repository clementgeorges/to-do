'use strict'

const todos = getSavedTodos();

const filters = {
    searchText: '',
    hideCompleted: false
}

renderTodos(todos, filters);

// Add eventListener to Filter Input
document.querySelector('#filter-todos').addEventListener('input', (e) => {
    filters.searchText = e.target.value
    renderTodos(todos, filters)
})

// Added eventListener to push new Add Todo Data
document.querySelector('#new-todo').addEventListener('submit', (e) => {
    e.preventDefault()
    const text = e.target.elements.addTodo.value.trim()

    // Prevents adding a blank Todo
    if (text.length > 0) {
        //Add todo to list
        todos.push({
            id: uuidv4(),
            text: text,
            completed: false
        })
        saveTodos()
        renderTodos(todos, filters) 
        //Clear input for First Name
        e.target.elements.addTodo.value = '';
    } else {
        alert('Wowzer - Please add a to-do :)')
    }
})

// Added eventListner to checkbox
document.querySelector('#hide-completed').addEventListener('change', (e) => {
    filters.hideCompleted = e.target.checked
    renderTodos(todos, filters)
})