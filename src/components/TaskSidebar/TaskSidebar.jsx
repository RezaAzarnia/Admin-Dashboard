import React, { memo, useEffect, useState } from 'react'
import { changeTodoStatus, createTodo, deleteTodo, getTodos } from '../../services/Axios/Requests/todos';
import { useSidebarContext } from '../../context/SidebarContext';
import { HiDotsHorizontal } from "react-icons/hi";
import { FaPlus, FaTrash, FaMinus } from 'react-icons/fa6';
import { Formik, Form } from 'formik';
import Input from '../Form/Input/Input'
import Button from '../Form/Button/Button'
import './TaskSidebar.scss';


function TaskSidebar() {
    const { state: { isOpenTaskSidebar }, dispatch } = useSidebarContext()
    const [activeTabpane, setActiveTabpane] = useState('chat');
    const [isShowAddTodo, setIsShowAddTodo] = useState(false)
    const [isUpdateTodo, setIsUpdateTodo] = useState(false)
    const [errors, setErros] = useState({})
    const [todos, setTodos] = useState([])
    const [checkedTodo, setCheckedTodo] = useState([])

    const handleClickOutside = (event) => {
        if (isOpenTaskSidebar && !event.target.closest('.task-sidebar') && !event.target.closest('.settings-icon')) {
            dispatch({ type: 'CLOSE_TASKSIDEBAR' })
        }
    };
    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isOpenTaskSidebar]);

    useEffect(() => {
        getTodo()
    }, [isUpdateTodo])

    const getTodo = async () => {
        const todos = await getTodos()
        setTodos(todos)
        console.log('get')
    }
    const addTodo = async (values, { resetForm }) => {
        if (!values.todo) {
            setErros({ todo: 'please enter the todo!!' })
            return
        } else
            if (values.todo.length > 50) {
                setErros({ todo: 'todo should be less than 50 characters!' })
                return
            }
        const response = await createTodo(values.todo)

        if (response.status === 200) {
            resetForm()
            setIsUpdateTodo(prev => !prev)
        } else {
            setErros({ todo: response.errors })
        }
        setErros({})
    }
    const removeTodo = async (todoId) => {
        const response = await deleteTodo(todoId)
        if (response.status == 200) {
            setIsUpdateTodo(prev => !prev)
        }
    }
    const handeIsDoneTodo = async (todoId, isDone) => {
        await changeTodoStatus(todoId, isDone)
        setIsUpdateTodo(prev => !prev)
    }

    const handleCheckBox = (event, isDone) => {
        let isSelected = event.target.checked;
        let todoId = parseInt(event.target.value)

        handeIsDoneTodo(todoId, isDone)

        if (isSelected) {
            setCheckedTodo(prev => [...prev, todoId])

        } else {
            setCheckedTodo(prev => { return prev.filter(item => item !== todoId) })
        }
    }

    const TodoItem = (todo) => {
        return (
            <li className='todo-list-item' >
                <div className="todo-info">
                    <div className='todo'  >
                        <input type='checkbox'
                            id={`todo-id ${todo.id}`}
                            value={todo.id}
                            onChange={(event) => { handleCheckBox(event, todo.isDone) }}
                            checked={todo.isDone || checkedTodo.includes(todo.id)}
                        />
                        <label htmlFor={`todo-id ${todo.id}`}
                            className={todo.isDone || checkedTodo.includes(todo.id) ? 'diactive' : ''}>
                            {todo.todoTitle}
                        </label>
                        <span className='todo-created-time'>{`${todo.todoDate} - ${todo.todoTime}`}</span>
                    </div>
                    <FaTrash className='trash-icon' onClick={() => {
                        removeTodo(todo.id)
                    }} />
                </div>
            </li>
        );
    };
    return (
        <aside className={`task-sidebar ${isOpenTaskSidebar ? 'active' : ''}`} >
            <div className="task-sidebar-menu">
                <ul className='task-sidebar-menu-list'>
                    <li className={`task-sidebar-menu-list-item ${activeTabpane === 'chat' ? 'active' : ''}`} onClick={() => setActiveTabpane('chat')}>chat</li>
                    <li className={`task-sidebar-menu-list-item ${activeTabpane === 'todo' ? 'active' : ''}`} onClick={() => setActiveTabpane('todo')}>todos</li>
                </ul>
            </div>
            <div className="task-sidebar-body">
                {
                    activeTabpane === 'chat' ? (
                        <>
                            <div className="taskSidebar-header">
                                <div className="row">
                                    <HiDotsHorizontal />
                                    <h4 className='task-header-title'>chat</h4>
                                    <FaPlus />
                                </div>
                            </div>
                            <ul className='chat-list'>
                                <li className='chat-list-item'>
                                    <img src="./public/images/profile.PNG" alt="" />
                                    <div className="chat-info">
                                        <p className='user-name'>rayan</p>
                                        <span className='chat-text'>hello i was windering if you could talk to me ?!</span>
                                    </div>
                                </li>
                                <li className='chat-list-item'>
                                    <img src="./public/images/profile.PNG" alt="" />
                                    <div className="chat-info">
                                        <p className='user-name'>rayan</p>
                                        <span className='chat-text'>hello i was windering if you could talk to me ?!</span>
                                    </div>
                                </li>
                                <li className='chat-list-item'>
                                    <img src="./public/images/profile.PNG" alt="" />
                                    <div className="chat-info">
                                        <p className='user-name'>rayan</p>
                                        <span className='chat-text'>hello i was windering if you could talk to me ?!</span>
                                    </div>
                                </li>
                                <li className='chat-list-item'>
                                    <img src="./public/images/profile.PNG" alt="" />
                                    <div className="chat-info">
                                        <p className='user-name'>rayan</p>
                                        <span className='chat-text'>hello i was windering if you could talk to me ?!</span>
                                    </div>
                                </li>

                            </ul>
                        </>
                    ) : (
                        <>
                            <div className="taskSidebar-header">
                                <div className="row">
                                    <HiDotsHorizontal />
                                    <h4>todo</h4>
                                    {
                                        !isShowAddTodo ?
                                            <FaPlus onClick={() => setIsShowAddTodo(true)} />
                                            : <FaMinus onClick={() => setIsShowAddTodo(false)} />
                                    }
                                </div>
                                <Formik initialValues={{ todo: "" }} onSubmit={addTodo}>
                                    <Form className={isShowAddTodo ? 'active' : ''}>
                                        <Input type="text" name='todo' placeholder='todo name...' />
                                        {errors.todo &&
                                            <span className='todo-error-message'>{errors.todo}</span>
                                        }
                                        <div className="add-todo-btn">
                                            <Button title='add' type='submit' mode='success' />
                                        </div>
                                    </Form>
                                </Formik>
                            </div>
                            <ul className='todo-list'>
                                {
                                    todos.length > 0 ?
                                        todos.map(todo => {
                                            return <TodoItem {...todo} key={todo.id} />
                                        })
                                        :
                                        <li className='todo-list-item' >
                                            <div className="todo">there is no todo yet!</div>
                                        </li>

                                }
                            </ul>
                        </>
                    )
                }

            </div>
        </aside>
    )
}

export default memo(TaskSidebar)