'use client';

import { useState } from 'react';
// @mui
import { Grid, Container, Box, Typography } from '@mui/material';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import { useSettingsContext } from 'src/components/settings';
import {
  useGetProfileQuery,
  useGetTemplateDetailsQuery,
  useUpdateTemplateMutation,
} from 'src/app/redux/slices/apiSlice';
import ShopView from './Shop/shop-view';
import TemplatePreview from '../predefined-templates/view';

export default function PagesView() {
  const { data: profile, error, isLoading } = useGetProfileQuery();
  const {
    data: templateDetails,
    error: errorDetails,
    isLoading: isLoadingDetails,
  } = useGetTemplateDetailsQuery();
  const [updateTemplate] = useUpdateTemplateMutation();

  const settings = useSettingsContext();
  const initialOptionsList = ['Shop', 'About', 'Services'];
  const [optionsList, setOptionsList] = useState(initialOptionsList);
  const [selectedOption, setSelectedOption] = useState(optionsList[0]);

  const handleDragEnd = (result) => {
    if (!result.destination) return;

    const reorderedOptions = Array.from(optionsList);
    const [removed] = reorderedOptions.splice(result.source.index, 1);
    reorderedOptions.splice(result.destination.index, 0, removed);

    setOptionsList(reorderedOptions);
  };

  return (
    <Container disableGutters maxWidth={settings.themeStretch ? false : 'xl'}>
      <Grid
        container
        sx={{
          mt: -1,
          minHeight: '100%',
        }}
      >
        <Grid item xs={12} md={7} sx={{ borderRight: '1px solid #ccc' }}>
          <Typography variant="h3" mb={1} ml={3} mt={3}>
            Pages
          </Typography>
          <Box
            spacing={3}
            sx={{
              borderRadius: 2,
              border: '1px solid #E7E7E7',
              p: 2,
              display: 'flex',
              flexDirection: 'column',
              gap: 2,
              mx: 3,
              mr: 4.5,
            }}
          >
            {/* Drag and Drop of options (Shop, About, Services) */}
            <DragDropContext onDragEnd={handleDragEnd}>
              <Droppable droppableId="optionsList" direction="horizontal">
                {(provided) => (
                  <Box
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    sx={{
                      display: 'flex',
                      flexDirection: 'row',
                      gap: 2,
                      alignItems: 'center', // Keep buttons in the same line
                      width: '90%',
                      m: 'auto',
                    }}
                  >
                    {optionsList.map((option, index) => (
                      <Draggable key={option} draggableId={option} index={index}>
                        {(provided2) => (
                          <Box
                            ref={provided2.innerRef}
                            {...provided2.draggableProps}
                            sx={{
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              border: '1px solid #ccc',
                              borderRadius: 50,
                              width: '100%',
                              py: 1,
                              backgroundColor: selectedOption === option ? '#A8BAFF' : '#FFFFFF',
                              cursor: 'pointer',
                              gap: 0.75,
                              position: 'relative',
                            }}
                            onClick={() => {
                              setSelectedOption(option);
                            }}
                          >
                            {/* Drag Handle (dnd.svg) */}
                            <Box
                              {...provided2.dragHandleProps}
                              sx={{ cursor: 'grab', position: 'absolute', top: 6, left: 15 }}
                            >
                              <img src="/assets/icons/dnd.svg" alt="dnd" />
                            </Box>
                            <img src={`/assets/icons/${option}.svg`} alt={option} />
                            <Typography fontWeight={700} fontSize={20} color="black">
                              {option}
                            </Typography>
                          </Box>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </Box>
                )}
              </Droppable>
            </DragDropContext>

            {selectedOption === 'Shop' && <ShopView />}
          </Box>
        </Grid>
        <Grid
          item
          xs={12}
          md={5}
          sx={{
            position: 'relative',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'flex-start',
            pl: 2,
            pt: 2,
          }}
        >
          <Box sx={{ p: 0, m: 0, position: 'fixed' }}>
            <TemplatePreview />
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
}
