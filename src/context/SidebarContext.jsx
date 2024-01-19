import { createContext, useContext, useEffect, useReducer } from "react";

const initialState = {
    isOpenTaskSidebar: false,
    isOpenMainSidebar: window.innerWidth <= 1200 ? false : true,
};

const TOOGLE_TASKSIDEBAR = "TOOGLE_TASKSIDEBAR";
const CLOSE_TASKSIDEBAR = "CLOSE_TASKSIDEBAR";
const TOGGLE_MAINSIDEBAR = "TOGGLE_MAINSIDEBAR";
const CLOSE_MAINSIDEBAR = "CLOSE_MAINSIDEBAR";
const OPEN_MAINSIDEBAR = "OPEN_MAINSIDEBAR";

const sidebarReducer = (state, action) => {
    switch (action.type) {
        case TOOGLE_TASKSIDEBAR:
            return { ...state, isOpenTaskSidebar: !state.isOpenTaskSidebar };

        case CLOSE_TASKSIDEBAR:
            return { ...state, isOpenTaskSidebar: false };

        case TOGGLE_MAINSIDEBAR:
            return { ...state, isOpenMainSidebar: !state.isOpenMainSidebar };

        case CLOSE_MAINSIDEBAR:
            return { ...state, isOpenMainSidebar: false };

        case OPEN_MAINSIDEBAR:
            return { ...state, isOpenMainSidebar: true };
            
        default:
            return state;
    }
};

const sidebarContext = createContext();

export const SidebarProvider = ({ children }) => {
    const [state, dispatch] = useReducer(sidebarReducer, initialState);

    const handleResize = () => {
        if (window.innerWidth <= 1200) {
            dispatch({
                type: "CLOSE_MAINSIDEBAR",
            });
        }
        else {
            dispatch({
                type: "OPEN_MAINSIDEBAR",
            });
        }
    };

    useEffect(() => {
        window.addEventListener("resize", handleResize);
        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    return (
        <sidebarContext.Provider value={{ state, dispatch }}>
            {children}
        </sidebarContext.Provider>
    );
};

export const useSidebarContext = () => {
    const contextSidebar = useContext(sidebarContext);
    return contextSidebar;
};
