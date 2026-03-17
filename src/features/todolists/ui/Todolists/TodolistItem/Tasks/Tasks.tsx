import { useAppDispatch } from "@/common/hooks"
import type { DomainTodolist } from "@/features/todolists/model/todolists-slice.ts"
import { TaskItem } from "./TaskItem/TaskItem"
import List from "@mui/material/List"
import { fetchTasksTC } from "@/features/todolists/model/tasks-slice.ts"
import { useEffect } from "react"
import { TaskStatus } from "@/common/enums"
import { useGetTasksQuery } from "@/features/todolists/api/tasksApi.ts"
import { TasksSkeleton } from "@/features/todolists/ui/Todolists/TodolistItem/Tasks/TasksSkeleton/TasksSkeleton.tsx"

type Props = {
  todolist: DomainTodolist
}

export const Tasks = ({ todolist }: Props) => {
  const { id, filter } = todolist

  const dispatch = useAppDispatch()
  useEffect(() => {
    dispatch(fetchTasksTC(id))
  }, [])

  const { data, isLoading } = useGetTasksQuery(id)

  let todolistTasks = data?.items
  let filteredTasks = todolistTasks

  if (filter === "active") {
    filteredTasks = todolistTasks?.filter((task) => task.status === TaskStatus.New)
  }
  if (filter === "completed") {
    filteredTasks = todolistTasks?.filter((task) => task.status === TaskStatus.Completed)
  }

  if (isLoading) {
    return (
      <TasksSkeleton/>
    )
  }

  return (
    <>
      {filteredTasks?.length === 0 ? (
        <p>Тасок нет</p>
      ) : (
        <List>
          {filteredTasks?.map((task) => (
            <TaskItem key={task.id} task={task} todolistId={id} disabled={todolist.entityStatus === "loading"} />
          ))}
        </List>
      )}
    </>
  )
}
