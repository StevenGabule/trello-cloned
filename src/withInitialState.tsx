import { ComponentType, useState } from "react";
import { AppState } from "./state/appStateReducer";

type InjectedProps = {
  initialState: AppState;
};

export function withInitialState<TProps>(WrapperComponent: ComponentType<TProps & InjectedProps>) {
  return (props: Omit<TProps, keyof InjectedProps>) => {
    const [initialState, setInitialState] = useState<AppState>({
      lists: [],
      draggedItem: null,
    });

    return <WrapperComponent {...(props as TProps)} initialState={initialState} />;
  };
}
