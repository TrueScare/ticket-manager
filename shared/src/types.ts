export type Task = {
    id: number;
    title: string;
    isDone: boolean;
}

export type ApiResponse<T> = {
    details: T
}