'use strict'

// Fetch existing todos from localStorage
const getSavedTodos = () => {
    const todosJSON = localStorage.getItem('todos')

    try {
        return todosJSON ? JSON.parse(todosJSON) : []
    } catch (error) {
        return []
    }
}

// Save todos to localStorage
const saveTodos = () => {
    localStorage.setItem('todos', JSON.stringify(todos))
}

// Render application todos based on filters
const renderTodos = (todos, filters) => {
    const textEl = document.querySelector('#todos')
    const filterTodos = todos.filter((todo) => {
        const searchTextMatch = todo.text.toLowerCase().includes(filters.searchText.toLowerCase())
        const hideCompletedMatch = !filters.hideCompleted || !todo.completed
        
        return searchTextMatch && hideCompletedMatch
    })

    // You have ? todos left
    const incompleteTodos = filterTodos.filter((todos) => !todos.completed)

    // clear data while filtering
    textEl.innerHTML = ''
    
    textEl.appendChild(generateSummaryDOM(incompleteTodos))
    
    // Adds message if there are todos or if there are none
    if (filterTodos.length > 0) {
        // //loop through and append date to DOM
        filterTodos.forEach((todo) => {
            textEl.appendChild(generateTodoDOM(todo))
        })
    } else {
        const messageEl = document.createElement('p')
        messageEl.classList.add('empty-message')
        messageEl.textContent = 'No to-dos to show'
        textEl.appendChild(messageEl)
    }
}

// Remove todos from the list
const removeTodos = (id) => {
    const todoIndex = todos.findIndex((todo) => todo.id === id)

    if (todoIndex > -1) {
        todos.splice(todoIndex, 1)
    }
}

// Toggel the completed value for a given todo
const toggelTodos = (id) => {
    const todo = todos.find((todo) => todo.id === id)

    if (todo) {
       todo.completed = !todo.completed
    }
}

// Get the DOM elements for an individual todo
const generateTodoDOM = (todo) => {
    const todoEl = document.createElement('label')
    const containerEl = document.createElement('div')
    const checkbox = document.createElement('input')
    const textEl = document.createElement('span')
    const removeButton = document.createElement('button')
     
    //Setup to checkbox
    checkbox.setAttribute('type', 'checkbox')
    checkbox.checked = todo.completed
    containerEl.appendChild(checkbox)
    checkbox.addEventListener('change', () =>{
        toggelTodos(todo.id)
        saveTodos(todos)
        renderTodos(todos, filters)
    })
    
    //Setup the todo text
    textEl.textContent = todo.text
    containerEl.appendChild(textEl)
    
    //Setup Container
    todoEl.classList.add('list-item')
    containerEl.classList.add('list-item__container')
    todoEl.appendChild(containerEl)

    //Setup the remove button
    removeButton.textContent = 'remove'
    removeButton.classList.add('button', 'button--text')
    todoEl.appendChild(removeButton)
    removeButton.addEventListener('click', () => {
        removeTodos(todo.id)
        saveTodos(todos)
        renderTodos(todos, filters)
        
    })

    return todoEl
}

// Get the DOM elements for the list summary 
const generateSummaryDOM = (incompleteTodos) => {
    const summary = document.createElement('h2')
    summary.classList.add('list-title')

    // Adds a plural ('s') to todos or leaves todo as is to the DOM
    if (incompleteTodos.length === 1) {
        summary.textContent = `You have ${incompleteTodos.length} todo left`
    } else if (incompleteTodos.length > 1) {
        summary.textContent = `You have ${incompleteTodos.length} todos left`
    } else {
        summary.textContent = `You have ${incompleteTodos.length} todos left`
    }
 
    return summary
}