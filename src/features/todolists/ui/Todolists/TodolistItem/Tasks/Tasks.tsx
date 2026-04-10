import { TaskItem } from "./TaskItem/TaskItem"
import List from "@mui/material/List"
import { TaskStatus } from "@/common/enums"
import { useGetTasksQuery } from "@/features/todolists/api/tasksApi.ts"
import { TasksSkeleton } from "@/features/todolists/ui/Todolists/TodolistItem/Tasks/TasksSkeleton/TasksSkeleton.tsx"
import { DomainTodolist } from "@/features/todolists/ui/Todolists/lib/types"
import { useState } from "react"
import {
  TasksPagination
} from "@/features/todolists/ui/Todolists/TodolistItem/Tasks/TasksPagination/TasksPagination.tsx"
import { DragDropProvider } from "@dnd-kit/react"

type Props = {
  todolist: DomainTodolist
}

export const Tasks = ({ todolist }: Props) => {
  const { id, filter } = todolist
  const [page, setPage] = useState(1)
  const { data, isLoading } = useGetTasksQuery({
    todolistId: id,
    params: { page },
  })

  const handleDragEnd = ({ operation }: { operation: any }) => {
    if (operation) {
      console.log(`from ${operation.source.initialIndex} to ${operation.source.index}`)
      const initialIndex = operation.source.initialIndex
      const index = operation.source.index
      if(initialIndex  !== index){
        if (data?.items) {
          const copy = [...data?.items]
          const [item] = copy.splice(initialIndex, 1)
          copy.splice(index, 0, item)
          console.log(copy[index])
           const movedTask = copy[index]
          const previousTask = copy.indexOf(copy[index])=== 0 ? null : copy[index - 1]
        }
        else{
          return
        }
      }

    }
  }

  let todolistTasks = data?.items
  let filteredTasks = todolistTasks

  if (filter === "active") {
    filteredTasks = todolistTasks?.filter((task) => task.status === TaskStatus.New)
  }
  if (filter === "completed") {
    filteredTasks = todolistTasks?.filter((task) => task.status === TaskStatus.Completed)
  }

  if (isLoading) {
    return <TasksSkeleton />
  }
  return (
    <div>
      {filteredTasks?.length === 0 ? (
        <p>Тасок нет</p>
      ) : (
        <>
          <List>
            <DragDropProvider
              onDragEnd={handleDragEnd}
            >
            {filteredTasks?.map((task, index) => (
                <TaskItem key={task.id} task={task} todolistId={id} index={index} />
            ))}
            </DragDropProvider>
          </List>
          <TasksPagination totalCount={data?.totalCount || 0} page={page} setPage={setPage} />
        </>
      )}
    </div>
  )
}
