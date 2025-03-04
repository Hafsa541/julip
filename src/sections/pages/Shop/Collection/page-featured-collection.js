'use client';

import { useState } from 'react';
import { Box, Typography, Stack, Button, Fab } from '@mui/material';
import { DragDropContext, Draggable, Droppable } from '@hello-pangea/dnd';
import { GridAddIcon } from '@mui/x-data-grid';

import Iconify from 'src/components/iconify';

import { usePopover } from 'src/components/custom-popover';
import { useBoolean } from 'src/hooks/use-boolean';
import { dispatch, useSelector } from 'src/app/redux/store';
import { setCollectionsData } from 'src/app/redux/slices/shopSlice';
import PageDeleteCollection from './page-shop-delete-collection-dialog';
import CollectionsEditDeletePopover from './page-edit-delete-popover';
import ProductAddNewProduct from './product-add-workflow-steps/page-add-new-product';
import PageEditCollectionDialog from './page-shop-edit-collection-dialog';

const PageCollection = () => {
  const collections = useSelector((state) => state.shop.collections);

  const [collectionsDrag, setCollectionsDrag] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);

  const popover = usePopover();
  const addNewProductDialog = useBoolean(false);
  const deleteDialog = useBoolean(false);
  const editDialog = useBoolean(false);

  const handleDelete = () => {
    const updatedArray = collections.filter((coll) => coll._id !== selectedItem._id);
    dispatch(setCollectionsData(updatedArray));
    deleteDialog.onFalse();
  };

  const onDragEnd = (result) => {
    if (!result.destination) return;

    const reorderedLinks = Array.from(collections);
    const [removed] = reorderedLinks.splice(result.source.index, 1);
    reorderedLinks.splice(result.destination.index, 0, removed);

    dispatch(setCollectionsData(reorderedLinks));
    setCollectionsDrag(reorderedLinks);
  };

  const handleIconToggle = (item) => {
    const updatedArray = collections.map((coll) => {
      // Check if the current item matches the one being toggled
      if (coll._id === item._id) {
        return { ...coll, visibility: !coll.visibility }; // Return a new object with updated visibility
      }
      return coll; // Return the rest of the social items unchanged
    });

    setCollectionsDrag(updatedArray);
    dispatch(setCollectionsData(updatedArray));
  };
  return (
    <Stack>
      <Box sx={{ backgroundColor: 'white', p: 1, borderRadius: 2, border: '1px solid #E7E7E7' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 1, ml: 1 }}>
          <img src="/assets/icons/Collection.svg" alt="collection_icon" />
          <Typography variant="body" fontSize={16} fontWeight="bold">
            Collection
          </Typography>
        </Box>
        {collections?.length === 0 ? (
          <Box
            align="center"
            variant="body2"
            sx={{ borderRadius: 1, border: '1px solid #CFCFCF', p: 2, m: 3 }}
          >
            No collections yet
          </Box>
        ) : (
          <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId="collections">
              {(provided) => (
                <div ref={provided.innerRef} {...provided.droppableProps}>
                  {collections?.map((item, index) => (
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
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            m: 2,
                          }}
                        >
                          <Box
                            sx={{
                              display: 'flex',
                              alignItems: 'center',
                              gap: 1,
                            }}
                          >
                            <Box
                              {...provided2.dragHandleProps}
                              style={{ cursor: 'grab', display: 'flex', alignItems: 'center' }}
                            >
                              <img src="/assets/icons/Drag.svg" alt="drag and drop" />
                            </Box>
                            <Box
                              sx={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                gap: 1,
                              }}
                            >
                              <Box sx={{ display: 'flex', justifyContent: 'center', gap: 1 }}>
                                <Typography fontSize={18} fontWeight={700} color="black">
                                  {item?.name}
                                </Typography>
                                <img src="/assets/icons/Ellipse.svg" alt="Ellipse" />
                                <Typography fontSize={16} fontWeight={500} color="black">
                                  {item?.products?.length} links
                                </Typography>
                              </Box>
                            </Box>
                          </Box>
                          <Box
                            sx={{
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'space-between',
                              width: 50,
                            }}
                          >
                            <Iconify
                              onClick={() => handleIconToggle(item)}
                              icon={item?.visibility ? 'famicons:eye-outline' : 'el:eye-close'}
                              sx={{ cursor: 'pointer' }}
                            />

                            <Iconify
                              icon="flowbite:dots-horizontal-outline"
                              onClick={(event) => {
                                popover.onOpen(event);
                                setSelectedItem(item);
                              }}
                              sx={{ cursor: 'pointer' }}
                            />
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

        <Button
          size="large"
          onClick={() => {
            addNewProductDialog.onTrue();
          }}
          sx={{ ml: 1, mb: 1 }}
        >
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

          <Typography fontSize={18} fontWeight={700} color="black" sx={{ mx: 1 }}>
            Add new product
          </Typography>
        </Button>
      </Box>

      {addNewProductDialog.value && <ProductAddNewProduct dialog={addNewProductDialog} />}

      {deleteDialog.value && (
        <PageDeleteCollection dialog={deleteDialog} handleDelete={handleDelete} />
      )}

      {editDialog.value && (
        <PageEditCollectionDialog selectedCollection={selectedItem} dialog={editDialog} />
      )}

      {popover && (
        <CollectionsEditDeletePopover
          editDialog={editDialog}
          deleteDialog={deleteDialog}
          popover={popover}
          selectedItem={selectedItem}
        />
      )}
    </Stack>
  );
};

export default PageCollection;
