import { TodolistItem } from "./TodolistItem/TodolistItem"
import Grid from "@mui/material/Grid2"
import Paper from "@mui/material/Paper"
import { useGetTodolistsQuery } from "@/features/todolists/api/todolistsApi.ts"
import Button from "@mui/material/Button"
import { useState } from "react"

export const Todolists = () => {

  const [skip, setSkip] = useState(true)

  const { data: todolists } = useGetTodolistsQuery(undefined, {skip})

  const getTodosHandler = ()=>{
    setSkip(false)
  }
  return (
    <>
      <div>
        <Button onClick={getTodosHandler} >Get to do Lists</Button>
      </div>
      {todolists?.map((todolist) => (
        <Grid key={todolist.id}>
          <Paper sx={{ p: "0 20px 20px 20px" }}>
            <TodolistItem todolist={todolist} />
          </Paper>
        </Grid>
      ))}
    </>
  )
}
