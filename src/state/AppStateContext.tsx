import { createContext, useContext, Dispatch, useEffect, ReactNode } from "react";
import { useImmerReducer } from "use-immer";
import { Action } from "./actions";
import { AppState, AppStateReducer, List, Task } from "./appStateReducer";
import { DragItem } from "../DragItem";
import { save } from "../api";
import { withInitialState } from "../utils/withInitialState";

type AppStateContextProps = {
  draggedItem: DragItem | null;
  lists: List[];
  getTasksByListId(id: string): Task[];
  dispatch: Dispatch<Action>;
};

const AppStateContext = createContext<AppStateContextProps>({} as AppStateContextProps);

type AppStateProviderProps = {
  children: ReactNode;
  initialState: AppState;
};

export const AppStateProvider = withInitialState<AppStateProviderProps>(({ children, initialState }) => {
  const [state, dispatch] = useImmerReducer(AppStateReducer, initialState);

  useEffect(() => {
    save(state);
  }, [state]);

  const { draggedItem, lists } = state;
  const getTasksByListId = (id: string) => {
    return lists.find((list) => list.id === id)?.tasks || [];
  };

  return <AppStateContext.Provider value={{ lists, getTasksByListId, dispatch, draggedItem }}>{children}</AppStateContext.Provider>;
});

export const useAppState = () => useContext(AppStateContext);
