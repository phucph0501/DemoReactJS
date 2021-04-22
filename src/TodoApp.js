import React, { useState, useEffect } from 'react';
import Header from './layout/Header';
import Todos from './Todos';
import AddTodo from './AddTodo';
import { v4 as uuid } from 'uuid';
import axios from 'axios';
import Footer from './store/containers/Footer';

function TodoApp(props) {
    const [state, setState] = useState({
        todos: []
    });
    const handleCheckboxChange = (id) => {
        setState({
            todos: state.todos.map(todo => {
                if (todo.id === id) {
                    todo.completed = !todo.completed;
                }
                return todo;
            })
        })
    }
    const deleteTodo = id => {
        axios.delete(`http://127.0.0.1:8000/todos/${id}`).then((response) => setState({
            todos: [
                ...state.todos.filter(todo => todo.id !== id)]
        }))
    }
    const addTodo = title => {
        const newTodo = {
            title: title,
            completed: false
        };
        axios.post("http://127.0.0.1:8000/todos/", newTodo).then((response) => setState({
            todos: [
                ...state.todos, response.data]
        }))
    }
    useEffect(() => {
        const config = {
            params: {
                _limit: 5
            }
        }
        //tạo GET request để lấy danh sách todos
        axios.get("http://127.0.0.1:8000/todos/", config)
            .then(response => setState({ todos: response.data }));
    }, []);

    return (
        <div className="container">
            <Header />
            <AddTodo addTodo={addTodo} />
            <Todos todos={state.todos}
                handleChange={handleCheckboxChange}
                deleteTodo={deleteTodo}
            />
            <Footer/>
        </div>
    )
}

/*class TodoApp extends React.Component {
    handleCheckChange = (id) => {
        this.setState({
            todos: this.state.todos.map(todo => {
                if (todo.id === id) {
                    todo.completed = !todo.completed;
                }
                return todo;
            })
        })
    };
    deleteTodo = (id) => {
        axios.delete(`http://127.0.0.1:8000/todos/${id}`).then((response) => this.setState({
            todos: [
                ...this.state.todos.filter(todo => todo.id !== id)]
        }))
    }
    addTodo = title => {
        const newTodo = {
            title: title,
            completed: false
        };
        axios.post("http://127.0.0.1:8000/todos/", newTodo).then((response) => this.setState({
            todos: [
                ...this.state.todos, response.data]
        }))
    }
    componentDidMount() {
        const config = {
            params: {
                _limit: 5
            }
        }
        axios.get("http://127.0.0.1:8000/todos/", config).then((response) => this.setState({ todos: response.data }))
    }
    render() {
        return (
            <div className="container">
                <Header />
                <AddTodo addTodo={this.addTodo} />
                <Todos todos={this.state.todos}
                    handleChange={this.handleCheckChange}
                    deleteTodo={this.deleteTodo}
                />
            </div>
        );
    }
    state = {
        todos: []
    };
}*/
export default TodoApp;