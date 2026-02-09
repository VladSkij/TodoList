import { createRoot } from "react-dom/client"
import "./index.css"
import { Provider } from "react-redux"
import { App } from "@/app/App.tsx"
import { BrowserRouter } from "react-router"
import { store } from "@/app/store.ts"

createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <Provider store={store}>
      {/*<AppHttpRequests />*/}
      <App />
    </Provider>
  </BrowserRouter>,
)
