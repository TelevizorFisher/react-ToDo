import React, { useState, useEffect } from 'react';
import './App.css';
import Form from './components/Form';
import TodoList from './components/TodoList';
import {useSpring, animated} from 'react-spring'
import Time from './components/CLock';

	function App() {

		//State
		const [inputText, setInputText ] = useState("");
		const [todos, setTodos ] = useState([]);
		const [status, setStatus] = useState("all");
		const [filteredTodos, setFilteredTodos] = useState([]);
		//USE EFFECT
		useEffect(() => {
			getLocalTodos();
		}, [])

		useEffect(() => {
			filterHandler();
			saveLocalTodos()
		}, [todos, status])

		const filterHandler = () => {
			switch (status){
				case 'completed':
					setFilteredTodos(todos.filter(todo => todo.completed === true))
					break;
				case 'uncompleted':
					setFilteredTodos(todos.filter(todo => todo.completed === false))
					break;
				default:
					setFilteredTodos(todos);
			}
		}
		//save to Local
		const saveLocalTodos = () => {
				localStorage.setItem('todos', JSON.stringify(todos));
		}
		const getLocalTodos = () => {
				if (localStorage.getItem('todos') === null){
					localStorage.setItem("todos", JSON.stringify([]));
			} else {
				let todoLocal =JSON.parse(localStorage.getItem('todos'));
				setTodos(todoLocal);
			}
		}
		const props = useSpring({opacity: 1, from: {opacity: 1}})
			return <animated.div style={props}>
					<div className="App">
						<header>			
							<h1>Todo List</h1>
						</header>
						
						<Form setInputText={setInputText} todos={todos} setTodos={setTodos} inputText={inputText} setStatus={setStatus}   />
						{todos.length ? (
							<TodoList todos={todos} setTodos={setTodos} filteredTodos={filteredTodos}/>
							):(	
								<p className="no-todos">
									<div>No todos!</div>
									<div className="no-todos-picture"></div>
								</p>
							)}
						<div className="todos-time"><Time/></div>
					</div>
			</animated.div>

	}

	export default App;
