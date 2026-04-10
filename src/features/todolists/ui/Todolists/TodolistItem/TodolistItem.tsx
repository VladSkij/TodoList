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
  // const handleDragEnd = ({operation}:{operation:any})=>{
  //   if(operation){
  //     console.log(`from ${operation.source.initialIndex} to ${operation.source.index}`)
  //   }
  // }

  return (
    <div>
      <TodolistTitle todolist={todolist} />
      <CreateItemForm onCreateItem={createTaskHandler} />
      {/*<DragDropProvider*/}
      {/*  onDragEnd={handleDragEnd}*/}
      {/*>*/}
        <Tasks todolist={todolist} />
      {/*</DragDropProvider>*/}
      <FilterButtons todolist={todolist} />
    </div>
  )
}
