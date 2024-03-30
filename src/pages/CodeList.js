import React from "react";
import { Grid, Paper } from "@mui/material";
import { PageContainer, PageHeader } from "../components/index";
import { CircularWithValueLabel } from "./CodeItem";
import { observer } from 'mobx-react-lite';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import codeStore from '../store/Store';

const CodesList = observer(() => {
  const onDragEnd = (result) => {
    // Reorder the codes in the store based on the drag and drop result
    if (!result.destination) return;
    const items = Array.from(codeStore.codes);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    codeStore.setCodes(items);
  };

  return (
    <Paper elevation={2}>
      <PageHeader label='Two Factor Authenticator Codes' />
      <PageContainer maxWidth="md">
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId="codes">
            {(provided) => (
              <Grid container spacing={1} {...provided.droppableProps} ref={provided.innerRef}>
                {codeStore.codes.map((code, index) => (
                  <Draggable key={code.id} draggableId={code.id} index={index}>
                    {(provided) => (
                      <Grid item xs={12} ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                        <CircularWithValueLabel code={code} />
                      </Grid>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </Grid>
            )}
          </Droppable>
        </DragDropContext>
      </PageContainer>
    </Paper>
  );
});

export default CodesList;
