import React, { memo, useEffect, useState } from 'react'
import { changeTodoStatus, createTodo, deleteTodo, getTodos } from '../../services/Axios/Requests/todos';
import { useSidebarContext } from '../../context/SidebarContext';
import { HiDotsHorizontal } from "react-icons/hi";
import { FaPlus, FaTrash, FaMinus } from 'react-icons/fa6';
import { Formik, Form } from 'formik';
import Input from '../Form/Input/Input'
import Button from '../../components/Form/Button/Button';
import useFetchItem from '../../hooks/useFetchItem';
import useItemMutation from '../../hooks/useItemMutation';
import useDeleteItem from '../../hooks/useDeleteItem';
import './TaskSidebar.scss';


function TaskSidebar() {
    const { state: { isOpenTaskSidebar }, dispatch } = useSidebarContext()
    const { data: todo } = useFetchItem("Todos", getTodos)
    const [activeTabpane, setActiveTabpane] = useState('chat');
    const [isShowAddTodo, setIsShowAddTodo] = useState(false)
    const [todosError, setTodosError] = useState({})
    const [checkedTodo, setCheckedTodo] = useState([])
    const [todoId, setTodoId] = useState(0)
    const [initialLoad, setInitialLoad] = useState(true)
    //handle click out side and close task side bar
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

    const { mutate: addTodo } = useItemMutation(async (values) => {
        if (!values.todo) {
            setTodosError({ todo: "please enter the todo" })
        } else if (values.todo.length > 50) {
            setTodosError({ todo: 'todo should be less than 50 characters!' })
        }
        if (todosError.length > 0) {
            return Promise.reject(todosError[0])
        }
        return await createTodo(values.todo)
    }, 'Todos')

    const { mutate: removeTodo } = useDeleteItem(async () => {
        return await deleteTodo(todoId)
    }, 'Todos', todoId)

    //remove item by change todoId
    useEffect(() => {
        if (!initialLoad) {
            removeTodo()
        }
    }, [todoId])
    useEffect(() => {
        if (initialLoad) {
            setInitialLoad(false)
        }
    }, [])

    const { mutate: handleIsDoneTodo } = useItemMutation(async (updatedTodo) => {
        return await changeTodoStatus(updatedTodo.id, updatedTodo.isDone);
    }, "Todos")

    const handleCheckBox = (event, todo) => {
        let isSelected = event.target.checked;
        let todoId = parseInt(event.target.value)

        if (isSelected) {
            setCheckedTodo(prev => [...prev, todoId])
        } else {
            setCheckedTodo(prev => { return prev.filter(item => item !== todoId) })
        }
        handleIsDoneTodo(todo);
    }

    return (
        <>
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
                                        <img src="images/profile.png" alt="" />
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
                                        {!isShowAddTodo ? <FaPlus onClick={() => setIsShowAddTodo(true)} /> : <FaMinus onClick={() => setIsShowAddTodo(false)} />}
                                    </div>

                                    <Formik initialValues={{ todo: "" }} onSubmit={(values, { resetForm }) => {
                                        addTodo(values, { onSuccess: () => { resetForm() } })
                                    }}>
                                        <Form className={isShowAddTodo ? 'active' : ''}>
                                            <Input type="text" name='todo' placeholder='todo name...' />
                                            {todosError.todo &&
                                                <span className='todo-error-message'>{todosError.todo}</span>
                                            }
                                            <div className="add-todo-btn">
                                                <Button title='add' type='submit' mode='success' />
                                            </div>
                                        </Form>
                                    </Formik>
                                </div>
                                <ul className='todo-list'>
                                    {
                                        todo?.length > 0 ?
                                            todo?.map(todo => {
                                                return <li className='todo-list-item' key={todo.id} >
                                                    <div className="todo-info">
                                                        <div className='todo'  >
                                                            <input type='checkbox'
                                                                id={`todo-id ${todo.id}`}
                                                                value={todo.id}
                                                                onChange={(e) => { handleCheckBox(e, todo); }}
                                                                checked={todo.isDone}
                                                            />
                                                            <label htmlFor={`todo-id ${todo.id}`}
                                                                className={todo.isDone ? 'diactive' : ''}>
                                                                {todo.todoTitle}
                                                            </label>
                                                            <span className='todo-created-time'>{`${todo.todoDate} - ${todo.todoTime}`}</span>
                                                        </div>
                                                        <FaTrash className='trash-icon' onClick={() => {
                                                            setTodoId(todo.id);
                                                        }} />
                                                    </div>
                                                </li>
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
            </aside >
        </>

    )
}

export default memo(TaskSidebar)