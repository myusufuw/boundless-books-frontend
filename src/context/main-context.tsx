import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useState,
} from "react"
import { cookies } from "../utilities/auth"

type MainContextType = {
  auth: {
    token: string
  }
  setAuth: Dispatch<SetStateAction<{ token: string } | object>>
}

type Props = {
  children: ReactNode
}

const MainContext = createContext<MainContextType>({
  auth: {
    token: "",
  },
  setAuth: () => {},
})

const MainContextProvider = (props: Props) => {
  const { children } = props
  const [auth, setAuth] = useState(cookies.getAll())

  return (
    <MainContext.Provider
      value={{
        auth,
        setAuth,
      }}
    >
      {children}
    </MainContext.Provider>
  )
}

export { MainContext, MainContextProvider }
