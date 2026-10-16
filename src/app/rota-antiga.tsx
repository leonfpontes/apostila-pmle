import { Navigate, useLocation } from "react-router-dom"

/** Endereços da primeira versão (/curso/1/modulo/2…) levam ao equivalente atual (/modulo/1/secao/2…). */
export function RotaAntiga() {
  const { pathname, search } = useLocation()
  const novo = pathname.replace(/^\/curso\/(\d+)/, "/modulo/$1").replace(/^(\/modulo\/\d+)\/modulo\//, "$1/secao/")
  return <Navigate to={novo + search} replace />
}
