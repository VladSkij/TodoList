import { FilterButtons } from "./FilterButtons/FilterButtons"
import { Tasks } from "./Tasks/Tasks"
import { TodolistTitle } from "./TodolistTitle/TodolistTitle"
import { CreateItemForm } from "@/common/components/CreateItemForm/CreateItemForm"
import { useCreateTaskMutation } from "@/features/todolists/api/tasksApi.ts"
import { DomainTodolist } from "@/features/todolists/ui/Todolists/lib/types"
import { DragDropProvider } from "@dnd-kit/react"

type Props = {
  todolist: DomainTodolist
}

export const TodolistItem = ({ todolist }: Props) => {
  const [createTask] = useCreateTaskMutation()
  const createTaskHandler = (title: string) => {
    createTask({ todolistId: todolist.id, title })
  }

  return (
    <div>
      <TodolistTitle todolist={todolist} />
      <CreateItemForm onCreateItem={createTaskHandler} />
      <DragDropProvider
        onDragEnd={(event) => {
          if (event.canceled) return
          const {target, source} = event.operation
        }}
      >
        <Tasks todolist={todolist} />
      </DragDropProvider>
      <FilterButtons todolist={todolist} />
    </div>
  )
}
