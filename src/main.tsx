import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import { HashRouter } from "react-router-dom"
import { TooltipProvider } from "@/components/ui/tooltip"
import { ProvedorDeTema } from "@/lib/tema"
import App from "./app/App"
import "./index.css"

// HashRouter: as rotas ficam depois de "#/", então o site funciona em qualquer
// hospedagem estática sem configurar rewrites.
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ProvedorDeTema>
      <TooltipProvider>
        <HashRouter>
          <App />
        </HashRouter>
      </TooltipProvider>
    </ProvedorDeTema>
  </StrictMode>
)
