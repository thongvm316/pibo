// src/context/state.js
import { useReducer, createContext, useContext } from "react"

const AppContext = createContext()

const initialState = {
  tabLists: [
    {
      text: "Home",
      linkTo: "/layout/home",
    },
    {
      text: "AboutUs",
      linkTo: "/layout/about-us",
    },
    {
      text: "Causes",
      linkTo: "/layout/causes",
    },
  ],
  selectTab: null,
}

const reducer = (state, action) => {
  const { type, payload } = action
  switch (type) {
    case "addTab":
      return {
        ...state,
        tabLists: state.tabLists.concat(payload),
      }
    case "deleteTab":
      return {
        ...state,
        tabLists: state.tabLists.filter((item) => item.text !== payload),
      }
    case "changeTab":
      return {
        ...state,
        selectTab: payload,
      }
    default:
      return state
  }
}

export function AppWrapper({ children }) {
  const [tabLists, dispatch] = useReducer(reducer, initialState)

  return (
    <AppContext.Provider value={{ state: tabLists, dispatch: dispatch }}>
      {children}
    </AppContext.Provider>
  )
}

export function useAppContext() {
  return useContext(AppContext)
}
