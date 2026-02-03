import styles from "./PageNotFound.module.css"
import Button from "@mui/material/Button"
import { Link } from "react-router"
import { Path } from "@/common/routing/Routing.tsx"
import Box from "@mui/material/Box"

export const PageNotFound = () => (
  <>
    <h1 className={styles.title}>404</h1>
    <h2 className={styles.subtitle}>page not found</h2>
    <Box sx={{
      marginTop: "15px",
      display: "flex",
      justifyContent: "center",
    }}>
      <Button
        component={Link}
        to={Path.Main}
        sx={{
          backgroundColor: "#087EA4",
          color: "#fff",
          padding:"8px 80px",
            "&:hover": {
            backgroundColor: "rgba(8,126,164,0.68)",
            }
        }}
      >
        Вернуться на главную
      </Button>
    </Box>
  </>
)
