import { createContext, useContext, useReducer } from "react";

const initialState = {
    isOpenTaskSidebar: false,
    isOpenMainSidebar: true
}

const TOOGLE_TASKSIDEBAR = "TOOGLE_TASKSIDEBAR"
const CLOSE_TASKSIDEBAR = "CLOSE_TASKSIDEBAR"
const TOGGLE_MAINSIDEBAR = "TOGGLE_MAINSIDEBAR"

const sidebarReducer = (state, action) => {
    switch (action.type) {
        case TOOGLE_TASKSIDEBAR:
            return { ...state , isOpenTaskSidebar: !state.isOpenTaskSidebar }

        case CLOSE_TASKSIDEBAR:
            return {...state , isOpenTaskSidebar: false }

        case TOGGLE_MAINSIDEBAR:
            return { ...state, isOpenMainSidebar: !state.isOpenMainSidebar }

        default:
            return state
    }
}

const sidebarContext = createContext();

export const SidebarProvider = ({ children }) => {
    const [state, dispatch] = useReducer(sidebarReducer, initialState);
    return (
        <sidebarContext.Provider value={{ state, dispatch }}>
            {children}
        </sidebarContext.Provider>
    )
}

export const useSidebarContext = () => {
    const contextSidebar = useContext(sidebarContext)
    return contextSidebar
}
