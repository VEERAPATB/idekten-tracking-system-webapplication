import { Dispatch, createContext, useContext, useEffect, useReducer } from "react";

export type AssessmentScore = {
    [key: string ] : string | number
}

export type AssessmentStudent = {
    name: string | undefined
    IDT: number | undefined
    assessment: AssessmentScore
}

export enum AssessmentActionKind {
    ADDED_NAME = 'ADD-NAME',
    CLEAR = 'CLEAR-ASS',
}

type AssessmentResultAction = {
    type: AssessmentActionKind
    id?: number
    name?: string    
    payload?: AssessmentStudent | any
}

export type AssessmentResultState = {
    assessment: {
      id?: number,
      name?: string  
    },
}

const AssessmentReducer = (stateAs: AssessmentResultState, action: AssessmentResultAction) => {
    switch(action.type){
        case 'ADD-NAME':
            const assessmentName = action.name
            const assessmentId = action.id
            return {...stateAs, assessment: { id: assessmentId, name: assessmentName}}
        case 'CLEAR-ASS':
            return { assessment: { id: undefined, name: undefined }}
        default:
            return stateAs
    }
}

export const AssessmentResultContext = createContext<{stateAs: AssessmentResultState, dispatchAs: Dispatch<AssessmentResultAction>}>({
    stateAs: { assessment: { id: undefined, name: undefined}},
    dispatchAs: () => null
})

const initialState: AssessmentResultState = { assessment: { id: undefined, name: undefined}}

export const AssessmentResultProvider = ({ children } : { children: React.ReactNode}) => {
    const [stateAs, dispatchAs] = useReducer(AssessmentReducer, { assessment: { id: undefined, name: undefined }}, () =>{
        //Init state from localStorage if available
        if(typeof window !== 'undefined'){
            const persistedState = localStorage.getItem('assessmentResult');
            return persistedState ? JSON.parse(persistedState) : initialState
        }
        return initialState
    })

    useEffect(() => {
        localStorage.setItem('assessmentResult', JSON.stringify(stateAs))
    }, [stateAs])

    return (
        <AssessmentResultContext.Provider value={{ stateAs, dispatchAs}}>
            {children}
        </AssessmentResultContext.Provider>
    )
}