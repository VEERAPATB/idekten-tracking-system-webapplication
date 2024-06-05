import { Dispatch, createContext, useEffect, useReducer } from "react";
import { SearchStudentProps } from "@/types/next-general";

export enum StudentActionKind {
    ADDED = 'ADDED',
    DELETE = 'DELETE',
    CLEAR = 'CLEAR'
}

type StudentAction = {
    type: StudentActionKind,
    payload?: SearchStudentProps | any
}

type StudentState = {
    studentSelected: SearchStudentProps[]
}

const StudentReducer = (state: StudentState, action: StudentAction) => {
    switch (action.type){
        case 'ADDED':
            return {...state, studentSelected: [...state.studentSelected, action.payload ]}
        case 'DELETE':
            return {...state, studentSelected: state.studentSelected?.filter(val => val.id !== action.payload?.id)}
        case 'CLEAR':
            return {...state, studentSelected: []}
        default: 
            return state
    }
}

export const StudentContext = createContext<{state: StudentState, dispatch: Dispatch<StudentAction>}>({
    state: { studentSelected: [] },
    dispatch: () => null 
})

export const StudentProvider = ({children} : { children: React.ReactNode }) => {
    const [state, dispatch] = useReducer(StudentReducer, { studentSelected: [] }, () => {
        //Init state from localStorage if available
        if(typeof window !==  'undefined'){
            const persistedState = localStorage.getItem('studentAssessment');
            return persistedState ? JSON.parse(persistedState) : { studentSelected: [] } as StudentState
        }
        return { studentSelected: [] } as StudentState
        }
    );

    useEffect(() => {
        localStorage.setItem('studentAssessment', JSON.stringify(state))
    },[state])

    return (
        <StudentContext.Provider value={{ state, dispatch }}>
            {children}
        </StudentContext.Provider>
    )
}