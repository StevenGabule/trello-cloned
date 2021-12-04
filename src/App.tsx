import { AddNewItem } from "./AddNewItem";
import { Column } from "./Column";
import { AppContainer } from "./styles";
import { useAppState } from "./state/AppStateContext";
import { addList } from "./state/actions";
import { CustomDragLayer } from "./CustomDragLayer";

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
