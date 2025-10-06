import { createSlice, isAction } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { Task } from '../../types'


type TaskState = {
    onChangeValue: string
    taskSliceData: Task[]
    editTask: number | null
}

const initialState: TaskState = {
    onChangeValue: '',
    taskSliceData: [],
    editTask: null,
}

export const taskSlice = createSlice({
    name: 'tasks',
    initialState,
    reducers: {
        setOnChangeValue: (state, action: PayloadAction<string>) => {
            state.onChangeValue = action.payload
        },
        setTask: (state, action: PayloadAction<Task[]>) => {
            state.taskSliceData = action.payload;   // for fetch
        },
        setAddTask: (state, action: PayloadAction<Task>) => {
            state.taskSliceData.push(action.payload); // for add
        },
        setEditOpen: (state, action: PayloadAction<number>) => {
            state.editTask = action.payload; // for add
        },
        setEditClose: (state) => {
            state.editTask = null; // for add
        },
        // setEditingTaskId: (state, action: PayloadAction<number | null>) => {
        //     state.editingTaskId = action.payload;
        // }
    },
})

// Action creators are generated for each case reducer function
export const { setOnChangeValue, setTask, setAddTask, setEditOpen, setEditClose } = taskSlice.actions

export default taskSlice.reducer