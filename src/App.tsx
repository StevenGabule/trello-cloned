import { Column } from "./Column";
import { AppContainer } from "./styles";
import { useAppState } from "./state/AppStateContext";
import { AddNewItem } from "./AddNewItem";
import { CustomDragLayer } from "./CustomDragLayer";
import { addList } from "./state/actions";

const App = () => {
  const { lists, dispatch } = useAppState();

  return (
    <AppContainer>
      <CustomDragLayer />
      {lists.map(({ id, text }) => (
        <Column key={id} id={id} text={text} />
      ))}
      <AddNewItem toggleButtonText="+ add another list" onAdd={(text) => dispatch(addList(text))} />
    </AppContainer>
  );
};

export default App;
