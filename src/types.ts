//User types

export type User = {
    id: number
    username: string
    password: string
    role: 'admin' | 'user'
}

export type StatusState = 'pending' | 'completed' | 'done' | 'deleted'
export type Task = {
    id: number
    uId: number
    taskState: StatusState
    taskValue: string
}

export type ButtonConfigState = {
    showComplete: boolean,
    showRedo: boolean,
    showDelete: boolean,
    showEdit: boolean,
    showDone:boolean
}

export type TodoListType = {
    filterKey: StatusState
    buttonConfig: ButtonConfigState
}

//FORM TYPES

export type LoginFormInputs = {
    username: string;
    password: string;
  }

//API types

export type LoginResponse = {
    message: string;
    user: User;
};