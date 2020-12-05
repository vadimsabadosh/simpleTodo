'use strict';

const todoControl = document.querySelector('.todo-control');
const headerInput = document.querySelector('.header-input');
const todoList = document.querySelector('.todo-list');
const todoCompleted = document.querySelector('.todo-completed');

let todoData = [];
//Создали массив


const render = function () {  
    todoList.textContent = '';
    todoCompleted.textContent = '';
    todoData.forEach(function(item) {  
        
        const li = document.createElement('li');
        li.classList.add('todo-item');


        li.innerHTML = `<span class="text-todo">${item.value}</span>
            <div class="todo-buttons">
				<button class="todo-remove"></button>
				<button class="todo-complete"></button>
			</div>
        `;
        if(item.completed){
            todoCompleted.append(li);
        }else{
            todoList.append(li);
        }

        const todoComplete = li.querySelector('.todo-complete')
        const todoRemove = li.querySelector('.todo-remove');
        todoComplete.addEventListener('click', function () {  
            item.completed = !item.completed;
            localStorage.setItem('todo', JSON.stringify(todoData));
            render();
        });
        todoRemove.addEventListener('click', function(e){
            let index = todoData.indexOf(item);
            if(index >= 0){
                todoData.splice(index, 1);
            }
            localStorage.setItem('todo', JSON.stringify(todoData));
            
            render();
        })
    });
};

todoControl.addEventListener('submit', function (e) {  
    e.preventDefault();
    if(headerInput.value !== ''){
        const newTodo = {
            value: headerInput.value,
            completed: false
        };
        
        
        todoData.push(newTodo);
        localStorage.setItem('todo', JSON.stringify(todoData));
    }
    render();
    todoControl.reset();
});
if(localStorage.getItem('todo')){
    todoData = JSON.parse(localStorage.getItem('todo'));
    render();
}

render();