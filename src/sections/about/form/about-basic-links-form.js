'use client';

import { useEffect, useState } from 'react';
import { Box, Typography, Stack, Button, Fab, IconButton } from '@mui/material';

import { useFormContext } from 'react-hook-form';

import { DragDropContext, Draggable, Droppable } from '@hello-pangea/dnd';
import { GridAddIcon } from '@mui/x-data-grid';

import { dispatch, useSelector } from 'src/app/redux/store';
import { setProfileWebLinks } from 'src/app/redux/slices/profileSlice';
import Iconify from 'src/components/iconify';

import uuidv4 from 'src/utils/uuidv4';
import { usePopover } from 'src/components/custom-popover';
import { useBoolean } from 'src/hooks/use-boolean';
import AboutEditDeletePopover from './about-edit-delete-popover';
import AboutBasicLinksAddDialoge from './about-basic-links-add-dialoge';
import AboutBasicLinksDeleteDialoge from './about-basic-links-delete-dialoge';
import AboutBasicLinksEditDialoge from './about-basic-links-edit-dialoge';

const AboutBasicLinksForm = () => {
  const profileData = useSelector((state) => state.profile.data);

  const [basicLinksDrag, setBasicLinksDrag] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);

  const popover = usePopover();
  const addDialog = useBoolean(false);
  const deleteDialog = useBoolean(false);
  const editDialog = useBoolean(false);

  const [basicLinks, setBasicLinks] = useState([profileData?.webLinks]);
  useEffect(() => {
    setBasicLinks(profileData?.webLinks);
  }, [profileData]);

  const handleAdd = (url, title) => {
    const updatedArray = [...basicLinks, { _id: uuidv4(), title, url, visibility: true }];
    dispatch(setProfileWebLinks(updatedArray));
  };
  const handleDelete = () => {
    deleteDialog.onFalse();
    const updatedArray = basicLinks.filter((link) => link._id !== selectedItem._id);
    dispatch(setProfileWebLinks(updatedArray));
  };
  const handleEdit = (url, title) => {
    const modifiedBasicLinks = basicLinks.map((obj) => {
      if (obj._id === selectedItem._id) {
        return { ...obj, url, title };
      }
      return obj;
    });
    dispatch(setProfileWebLinks(modifiedBasicLinks));
  };

  const onDragEnd = (result) => {
    if (!result.destination) return;

    const reorderedLinks = Array.from(basicLinks);
    const [removed] = reorderedLinks.splice(result.source.index, 1);
    reorderedLinks.splice(result.destination.index, 0, removed);

    setBasicLinksDrag(reorderedLinks);
    dispatch(setProfileWebLinks(reorderedLinks));
  };

  const handleIconToggle = (item) => {
    const updatedArray = basicLinks.map((link) => {
      // Check if the current item matches the one being toggled
      if (link._id === item._id) {
        return { ...link, visibility: !link.visibility }; // Return a new object with updated visibility
      }
      return link; // Return the rest of the social items unchanged
    });

    setBasicLinks(updatedArray);
    setBasicLinksDrag(updatedArray);
    dispatch(setProfileWebLinks(updatedArray));
  };

  return (
    <>
      <Stack spacing={1.5} sx={{ backgroundColor: '#E7E7E74D', py: 2, px: 3, borderRadius: 2 }}>
        <Box sx={{ backgroundColor: 'white', p: 1, borderRadius: 2, border: '1px solid #E7E7E7' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 1, ml: 2 }}>
            <img src="/assets/about/link.svg" alt="link" />
            <Typography variant="body" fontSize={18} fontWeight="bold">
              Additional links
            </Typography>
          </Box>

          {basicLinks?.length === 0 ? (
            <Box
              align="center"
              variant="body2"
              sx={{ borderRadius: 1, border: '1px solid #CFCFCF', p: 2, m: 3 }}
            >
              <Typography fontWeight={700}>No links yet</Typography>
            </Box>
          ) : (
            <DragDropContext onDragEnd={onDragEnd}>
              <Droppable droppableId="basicLinks">
                {(provided) => (
                  <div ref={provided.innerRef} {...provided.droppableProps}>
                    {basicLinks?.map((item, index) => (
                      <Draggable key={item?._id} draggableId={item?._id} index={index}>
                        {(provided2) => (
                          <Box
                            ref={provided2.innerRef}
                            {...provided2.draggableProps} // Allow the container to be draggable
                            variant="body2"
                            sx={{
                              borderRadius: 1,
                              border: '1px solid #CFCFCF',
                              p: 1,
                              display: 'flex',
                              alignItems: 'stretch',
                              justifyContent: 'space-between',
                              m: 2,
                            }}
                          >
                            {/* Drag icon */}
                            <Box
                              {...provided2.dragHandleProps}
                              sx={{
                                cursor: 'grab',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                flex: 1,
                              }}
                            >
                              <img src="/assets/icons/Drag.svg" alt="drag" />
                            </Box>

                            {/* link icon, and url and title */}
                            <Box
                              sx={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'left',
                                // gap: 1,
                                flex: 7,
                                // background: 'green',
                              }}
                            >
                              {/* <Iconify icon="bx:link" sx={{ flex: 1 }} /> */}
                              <img src="/assets/about/link.svg" alt="link" />

                              <Box
                                sx={{
                                  dispaly: 'flex',
                                  justifyContent: 'center',
                                  // background: 'red',
                                  flex: 10,
                                  ml: 2,
                                }}
                              >
                                <Typography variant="subtitle1" color="black">
                                  {item?.title}
                                </Typography>
                                <Typography
                                  fontSize={15}
                                  color="black"
                                  sx={{
                                    wordBreak: 'break-word',
                                    display: '-webkit-box',
                                    WebkitBoxOrient: 'vertical',
                                    overflow: 'hidden',
                                    WebkitLineClamp: 1, // Limits the text to 1 lines
                                    textOverflow: 'ellipsis', // Adds ellipsis when text overflows
                                  }}
                                >
                                  {item?.url}
                                </Typography>
                              </Box>
                            </Box>

                            {/* Eye and 3 dots buttons */}
                            <Box
                              sx={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                flex: 1,
                              }}
                            >
                              <IconButton
                                aria-label="delete"
                                onClick={() => handleIconToggle(item)}
                              >
                                <Iconify
                                  icon={item?.visibility ? 'famicons:eye-outline' : 'el:eye-close'}
                                  color="black"
                                />
                              </IconButton>
                              <IconButton
                                aria-label="popover"
                                onClick={(event) => {
                                  popover.onOpen(event);
                                  setSelectedItem(item);
                                }}
                              >
                                <Iconify icon="flowbite:dots-horizontal-outline" color="black" />
                              </IconButton>
                            </Box>
                          </Box>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </DragDropContext>
          )}

          <Button size="large" onClick={addDialog.onTrue} sx={{ ml: 2, mb: 1 }}>
            <Fab
              aria-label="add"
              size="small"
              sx={{
                boxShadow: 0,
                backgroundColor: '#DCFFBA',
                color: 'black',
                border: '1px solid black',
                '&:hover': { backgroundColor: '#DCFFBA' },
              }}
            >
              <GridAddIcon />
            </Fab>

            <Typography sx={{ mx: 1 }} fontWeight={700}>
              Add new link
            </Typography>
          </Button>
        </Box>
      </Stack>

      {addDialog.value && <AboutBasicLinksAddDialoge dialog={addDialog} handleAdd={handleAdd} />}

      {deleteDialog.value && (
        <AboutBasicLinksDeleteDialoge dialog={deleteDialog} handleDelete={handleDelete} />
      )}

      {editDialog.value && (
        <AboutBasicLinksEditDialoge
          dialog={editDialog}
          handleEdit={handleEdit}
          selectedItem={selectedItem}
        />
      )}

      {popover && (
        <AboutEditDeletePopover
          editDialog={editDialog}
          deleteDialog={deleteDialog}
          popover={popover}
        />
      )}
    </>
  );
};

export default AboutBasicLinksForm;
