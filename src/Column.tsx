import { PropsWithChildren, useRef } from "react";
import { useDrop } from "react-dnd";
import { AddNewItem } from "./AddNewItem";
import { Card } from "./Card";
import { DragItem } from "./DragItem";
import { addTask, moveList, moveTask, setDraggedItem } from "./state/actions";
import { useAppState } from "./state/AppStateContext";
import { ColumnContainer, ColumnTitle } from "./styles";
import { isHidden } from "./utils/isHidden";
import { useItemDrag } from "./utils/useItemDrag";

type ColumnProps = PropsWithChildren<{
  text: string;
  id: string;
  isPreview?: boolean;
}>;

export const Column = ({ text, id, isPreview }: ColumnProps) => {
  const { draggedItem, getTasksByListId, dispatch } = useAppState();
  const tasks = getTasksByListId(id);
  const ref = useRef<HTMLDivElement>(null);

  const { drag } = useItemDrag({ type: "COLUMN", id, text });
  const [, drop] = useDrop({
    accept: ["COLUMN", "CARD"],
    hover(item: DragItem) {
      if (item.type === "COLUMN") {
        if (!draggedItem) {
          return;
        }
        if (draggedItem.type === "COLUMN") {
          if (draggedItem.id === id) {
            return;
          }
        }
        dispatch(moveList(draggedItem.id, id));
      } else {
        if (draggedItem.columnId === id) return;
        if (tasks.length) return;
        dispatch(moveTask(draggedItem.id, null, draggedItem.columnId, id));
        dispatch(setDraggedItem({ ...draggedItem, columnId: id }));
      }
    },
  });

  drag(drop(ref));

  return (
    <ColumnContainer isPreview={isPreview} ref={ref} isHidden={isHidden(draggedItem, "COLUMN", id, isPreview)}>
      <ColumnTitle>{text}</ColumnTitle>
      {tasks.map((task) => (
        <Card id={task.id} text={task.text} key={task.id} columnId={id} />
      ))}
      <AddNewItem toggleButtonText={"+ add another task"} onAdd={(text) => dispatch(addTask(text, id))} dark />
    </ColumnContainer>
  );
};
