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
import { useDroppable } from "@dnd-kit/react"

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

  const {ref} = useDroppable({id})

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
    <div ref={ref}>
      {filteredTasks?.length === 0 ? (
        <p>Тасок нет</p>
      ) : (
        <>
          <List >
            {filteredTasks?.map((task) => (
              <TaskItem key={task.id} task={task} todolistId={id}/>
            ))}
          </List>
            <TasksPagination totalCount={data?.totalCount || 0} page={page} setPage={setPage} />
        </>
      )}
    </div>
  )
}
