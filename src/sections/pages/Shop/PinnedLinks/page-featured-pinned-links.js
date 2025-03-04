'use client';

import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

import { Box, Button, Fab, Switch, Typography } from '@mui/material';
import { GridAddIcon } from '@mui/x-data-grid';
import React, { useEffect, useMemo, useState } from 'react';
import { DragDropContext, Draggable, Droppable } from '@hello-pangea/dnd';
import { useForm } from 'react-hook-form';
import { dispatch, useSelector } from 'src/app/redux/store';
import FormProvider, { RHFTextField } from 'src/components/hook-form';
import Iconify from 'src/components/iconify';
import {
  removePinnedProductItem,
  setPinnedProductsList,
  setPinnedProductsTitle,
  togglePinnedProductsVisibility,
} from 'src/app/redux/slices/shopSlice';
import { usePopover } from 'src/components/custom-popover';
import { useBoolean } from 'src/hooks/use-boolean';
import AddPinnedProductDialog from './add-pinned-product-dialog';
import CollectionsEditDeletePopover from '../Collection/page-edit-delete-popover';
import PinnedProductDeleteDialog from './pinned-product-delete-dialog';

export default function PinnedLinks() {
  const collectionsList = useSelector((state) => state.shop.collections);
  const pinnedProductsList = useSelector((state) => state.shop.pinnedProducts);

  const addPinnedProductDialog = useBoolean(false);
  const editDialog = useBoolean(false);
  const deleteDialog = useBoolean(false);
  const popover = usePopover();

  const [pinnedProductsDrag, setPinnedProductsDrag] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const [isEditing, setIsEditing] = useState(false);
  const [isSwitchOn, setIsSwitchOn] = useState(pinnedProductsList.visibility);
  const [pinnedProductTitle, setPinnedProductTitle] = useState(
    pinnedProductsList?.name || 'Pinned Products'
  );

  const [initialTitle, setInitialTitle] = useState(pinnedProductTitle);

  const handleSwitchToggle = (event) => {
    setIsSwitchOn(event.target.checked);
    dispatch(togglePinnedProductsVisibility());
  };

  const handleEditToggle = () => {
    setIsEditing((prev) => !prev);
    if (isEditing) {
      // Reset the title to the initial state when toggling off editing
      setValue('name', initialTitle);
    }
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setValue('name', initialTitle); // Reset to initial value on cancel
  };

  const handleSaveName = () => {
    setPinnedProductTitle(values.name);
    setInitialTitle(values.name); // Update the initial title when saved
    setIsEditing(false);
  };

  // -------------YUP-------------------
  const PinnedProductsSchema = Yup.object().shape({
    name: Yup.string().required('Collection name is required'),
    products: Yup.array(),
    visibility: Yup.boolean(),
  });

  const defaultValues = useMemo(
    () => ({
      name: pinnedProductsList?.name,
      products: pinnedProductsList?.productsList,
      visibility: pinnedProductsList?.visibility,
    }),
    [pinnedProductsList]
  );
  const methods = useForm({
    resolver: yupResolver(PinnedProductsSchema),
    defaultValues,
  });
  const { handleSubmit, watch, setValue, getValues, reset } = methods;
  const values = getValues();
  const { name } = watch();

  useEffect(() => {
    console.log('pinnedProductsList changed!!!: ', pinnedProductsList);
    reset({
      name: pinnedProductsList?.name,
      products: pinnedProductsList?.productsList,
      visibility: pinnedProductsList?.visibility,
    });
  }, [pinnedProductsList, reset]);

  const onSubmit = handleSubmit((data) => {
    try {
      console.log('data:', data);
    } catch (error) {
      console.error(error);
    }
  });

  // ---------------------------------------------------

  useEffect(() => {
    setValue('name', pinnedProductTitle);
    setInitialTitle(pinnedProductTitle);
  }, [pinnedProductTitle, setValue]);

  useEffect(() => {
    dispatch(setPinnedProductsTitle(name));
  }, [name]);

  const onDragEnd = (result) => {
    if (!result.destination) return;

    const reorderedLinks = Array.from(values?.products);
    const [removed] = reorderedLinks.splice(result.source.index, 1);
    reorderedLinks.splice(result.destination.index, 0, removed);

    setPinnedProductsDrag(reorderedLinks);
    dispatch(setPinnedProductsList(reorderedLinks));
  };

  const handleIconToggle = (item) => {
    const updatedArray = values.products.map((prod) => {
      // Check if the current item matches the one being toggled
      if (prod._id === item._id) {
        return { ...prod, visibility: !prod.visibility }; // Return a new object with updated visibility
      }
      return prod; // Return the rest of the social items unchanged
    });

    setPinnedProductsDrag(updatedArray);
    dispatch(setPinnedProductsList(updatedArray));
  };

  const handleDelete = () => {
    console.log('handleDelete on pinnedproduct called', selectedProduct);
    dispatch(removePinnedProductItem(selectedProduct));
    deleteDialog.onFalse();
  };
  const handleEdit = () => {
    console.log('handleEdit on pinnedproduct called', selectedProduct);
  };

  // Check if collectionsList is empty
  const isCollectionsEmpty = collectionsList.length === 0;

  return (
    <Box
      sx={{
        backgroundColor: 'white',
        p: 1,
        px: 2,
        borderRadius: 2,
        border: '1px solid #E7E7E7',
        opacity: isCollectionsEmpty ? 0.5 : 1, // Reduce opacity when collections are empty
        pointerEvents: isCollectionsEmpty ? 'none' : 'auto', // Disable interaction when empty
      }}
    >
      <FormProvider methods={methods} onSubmit={onSubmit}>
        {/* This box should view as disabled if the collectionsList length is 0 */}
        <Box sx={{ position: 'relative', display: 'flex', alignItems: 'center', gap: 1, my: 1 }}>
          <img src="/assets/pages/Pin.svg" alt="pin_icon" />
          <Typography variant="body" fontSize={18} fontWeight={700} color="black">
            Pinned links
          </Typography>

          <Switch
            checked={isSwitchOn}
            onChange={handleSwitchToggle}
            disabled={isCollectionsEmpty} // Disable the switch if collections are empty
            sx={{
              position: 'absolute',
              top: -4,
              right: 5,
              '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
                backgroundColor: '#3B5E54 !important',
              },
            }}
          />
        </Box>

        {isSwitchOn && !isCollectionsEmpty && (
          <Box>
            {/* This box will only be visible when the switch is toggled on */}
            <Box sx={{ px: 3, mb: 1 }}>
              <Typography fontSize={16} fontWeight={500} color="black">
                Title
              </Typography>

              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  position: 'relative',
                }}
              >
                {/* Show editable form when isEditing is true */}
                {isEditing ? (
                  <Box
                    sx={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'flex-end',
                      width: '100%',
                      gap: 2,
                    }}
                  >
                    <RHFTextField
                      name="name"
                      defaultValue={values?.name || ''}
                      placeholder="Pinned Products"
                      inputProps={{ maxLength: 30 }}
                      sx={{
                        backgroundColor: 'white',
                        borderRadius: '1rem',
                        '& .MuiInputBase-input.MuiOutlinedInput-input': {
                          fontSize: 18,
                          fontWeight: 700,
                          color: 'black',
                        },
                      }}
                    />
                    <Typography fontSize={16} fontWeight="medium" color="black" my={-1.4} mr={2.5}>
                      {values?.name?.length}/30
                    </Typography>

                    <Box
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-around',
                        gap: 1,
                      }}
                    >
                      <Button onClick={handleCancelEdit} variant="text">
                        <Typography color="black" fontWeight={700} fontSize={18}>
                          Cancel
                        </Typography>
                      </Button>
                      <Button
                        onClick={handleSaveName}
                        sx={{
                          px: 2,
                          width: 100,
                          border: '1px solid black',
                          backgroundColor: '#A8BAFF',
                        }}
                      >
                        <Typography color="black" fontWeight={700} fontSize={18}>
                          Save
                        </Typography>
                      </Button>
                    </Box>
                  </Box>
                ) : (
                  <Typography
                    fontSize={18}
                    fontWeight={700}
                    color="black"
                    sx={{
                      mt: 0.75,
                      ml: 0.75,
                      width: '100%',
                      p: 1,
                      borderRadius: 1,
                      transition: 'background 0.3s ease-in-out',
                      '&:hover': { backgroundColor: '#F8F8F8' },
                    }}
                  >
                    {values.name}
                  </Typography>
                )}

                <Button
                  onClick={handleEditToggle}
                  sx={{
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    position: 'absolute',
                    top: 20,
                    right: -5,
                    p: 0,
                  }}
                >
                  <img
                    src="/assets/pages/edit.svg"
                    alt="edit_icon"
                    style={{ width: 16, height: 16 }}
                  />
                </Button>
              </Box>
            </Box>

            <Box>
              <DragDropContext onDragEnd={onDragEnd}>
                <Droppable droppableId="pinnedProducts">
                  {(provided) => (
                    <Box ref={provided.innerRef} {...provided.droppableProps}>
                      {values?.products?.map((item, index) => (
                        <Draggable key={item?._id} draggableId={item?._id} index={index}>
                          {(provided2) => (
                            <Box
                              ref={provided2.innerRef}
                              {...provided2.draggableProps} // Allow the container to be draggable
                              variant="body2"
                              sx={{
                                borderRadius: 1,
                                border: '1px solid #CFCFCF',
                                p: 2,
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
                                  justifyContent: 'space-between',
                                  gap: 2,
                                }}
                              >
                                {/* Use a wrapper for dragHandleProps */}
                                <Box
                                  {...provided2.dragHandleProps}
                                  sx={{
                                    cursor: 'grab',
                                    display: 'flex',
                                    alignItems: 'center',
                                  }}
                                >
                                  <img
                                    src="/assets/icons/Drag.svg"
                                    alt="drag"
                                    style={{ scale: '1.2' }}
                                  />
                                </Box>
                                <Box
                                  sx={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                  }}
                                >
                                  <img
                                    src={item?.image}
                                    alt={item?.title}
                                    style={{ width: 70, height: 70, borderRadius: 2 }}
                                  />
                                  <Typography
                                    ml={2}
                                    fontSize={18}
                                    fontWeight={700}
                                    color="black"
                                    align="left"
                                  >
                                    {item?.title}
                                  </Typography>
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
                                    setSelectedProduct(item);
                                  }}
                                  sx={{ cursor: 'pointer' }}
                                />
                              </Box>
                            </Box>
                          )}
                        </Draggable>
                      ))}
                      {provided.placeholder}
                    </Box>
                  )}
                </Droppable>
              </DragDropContext>
            </Box>

            <Button
              size="large"
              onClick={() => {
                addPinnedProductDialog.onTrue();
              }}
              sx={{ ml: 1 }}
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

              <Typography fontSize={18} fontWeight={700} color="black" mx={1}>
                Add pinned products
              </Typography>
            </Button>
          </Box>
        )}
      </FormProvider>

      {addPinnedProductDialog.value && <AddPinnedProductDialog dialog={addPinnedProductDialog} />}
      {popover && (
        <CollectionsEditDeletePopover
          editDialog={editDialog}
          deleteDialog={deleteDialog}
          popover={popover}
        />
      )}

      {deleteDialog.value && (
        <PinnedProductDeleteDialog dialog={deleteDialog} handleDelete={handleDelete} />
      )}

      {/* {editDialog.value && alert('PinnedProduct Edit Dialog')} */}
    </Box>
  );
}
