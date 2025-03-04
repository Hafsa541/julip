'use client';

import React, { useEffect, useState } from 'react';
import { Box, Typography, Stack, Button, Fab, IconButton } from '@mui/material';
import { GridAddIcon } from '@mui/x-data-grid';

import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';

import { useFormContext } from 'react-hook-form';
import { usePopover } from 'src/components/custom-popover';

import uuidv4 from 'src/utils/uuidv4';
import Iconify from 'src/components/iconify';
import { useBoolean } from 'src/hooks/use-boolean';

import { dispatch, useSelector } from 'src/app/redux/store';
import { setProfileSocialLinks } from 'src/app/redux/slices/profileSlice';
import AboutSocialLinksAddDialoge from './about-social-links-add-dialoge';
import AboutEditDeletePopover from './about-edit-delete-popover';
import AboutSocialLinksDeleteDialoge from './about-social-links-delete-dialoge';
import AboutSocialLinksEditDialoge from './about-social-links-edit-dialoge';

const socialMediaList = [
  {
    name: 'Instagram',
    image: '/assets/icons/social-media/Instagram.svg',
    url: 'https://instagram.com/',
  },
  {
    name: 'TikTok',
    image: '/assets/icons/social-media/Tiktok.svg',
    url: 'https://www.tiktok.com/@',
  },
  {
    name: 'X',
    image: '/assets/icons/social-media/X.svg',
    url: 'https://x.com/',
  },
  {
    name: 'Threads',
    image: '/assets/icons/social-media/Thread.svg',
    url: 'https://threads.net/',
  },
  {
    name: 'YouTube',
    image: '/assets/icons/social-media/Youtube.svg',
    url: 'https://www.youtube.com/c/',
  },
  {
    name: 'Facebook',
    image: '/assets/icons/social-media/Facebook.svg',
    url: 'https://facebook.com/',
  },
  {
    name: 'Discord',
    image: '/assets/icons/social-media/Discord.svg',
    url: 'https://discord.gg/',
  },
  {
    name: 'LinkedIn',
    image: '/assets/icons/social-media/LinkedIn.svg',
    url: 'https://linkedin.com/in/',
  },
  {
    name: 'Pinterest',
    image: '/assets/icons/social-media/Pinterest.svg',
    url: 'https://pinterest.com/',
  },
  {
    name: 'Snapchat',
    image: '/assets/icons/social-media/Snapchat.svg',
    url: 'https://www.snapchat.com/add/',
  },
  {
    name: 'Spotify',
    image: '/assets/icons/social-media/Spotify.svg',
    url: 'https://open.spotify.com/user/',
  },
];

const AboutSocialLinksForm = () => {
  const profileData = useSelector((state) => state.profile.data);

  const [socialLinksDrag, setSocialLinksDrag] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);

  const popover = usePopover();
  const addDialog = useBoolean(false);
  const deleteDialog = useBoolean(false);
  const editDialog = useBoolean(false);

  const [socialLinks, setSocialLinks] = useState([profileData?.socialLinks]);
  useEffect(() => {
    setSocialLinks(profileData?.socialLinks);
  }, [profileData]);

  const handleAdd = (platform, username) => {
    const selectedOption = socialMediaList.find((item) => item?.name === platform);
    const updatedArray = [
      ...socialLinks,
      {
        _id: uuidv4(),
        username,
        platform,
        icon: selectedOption.image,
        visibility: true,
        url: `${selectedOption.url}${username.split('@')[1]}`,
      },
    ];
    dispatch(setProfileSocialLinks(updatedArray));
  };
  const handleDelete = () => {
    deleteDialog.onFalse();
    const updatedArray = socialLinks.filter((link) => link._id !== selectedItem._id);
    dispatch(setProfileSocialLinks(updatedArray));
  };
  const handleEdit = (data) => {
    const { username, platform, _id } = data;
    const updatedArray = socialLinks.map((obj) => {
      if (obj._id === _id) {
        const selectedObj = socialMediaList.find((item) => item?.name === platform);
        return {
          ...obj,
          username,
          platform,
          icon: selectedObj.image,
          url: `${selectedObj.url}${username.split('@')[1]}`,
        };
      }
      return obj;
    });
    dispatch(setProfileSocialLinks(updatedArray));
  };
  const onDragEnd = (result) => {
    if (!result.destination) return;

    const reorderedLinks = Array.from(socialLinks);
    const [removed] = reorderedLinks.splice(result.source.index, 1);
    reorderedLinks.splice(result.destination.index, 0, removed);

    setSocialLinksDrag(reorderedLinks);
    dispatch(setProfileSocialLinks(reorderedLinks));
  };

  const handleIconToggle = (item) => {
    const updatedArray = socialLinks.map((social) => {
      // Check if the current item matches the one being toggled
      if (social._id === item._id) {
        return { ...social, visibility: !social.visibility }; // Return a new object with updated visibility
      }
      return social; // Return the rest of the social items unchanged
    });

    setSocialLinks(updatedArray);
    setSocialLinksDrag(updatedArray);
    dispatch(setProfileSocialLinks(updatedArray));
  };

  return (
    <>
      <Stack spacing={1.5} sx={{ backgroundColor: '#E7E7E74D', py: 2, px: 3, borderRadius: 2 }}>
        <Box sx={{ backgroundColor: 'white', p: 1, borderRadius: 2, border: '1px solid #E7E7E7' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 1, ml: 2 }}>
            {/* <Iconify icon="bx:link" /> */}
            <img src="/assets/about/link.svg" alt="link" />
            <Typography variant="body" fontSize={18} fontWeight="bold">
              Social media links
            </Typography>
          </Box>

          {socialLinks?.length === 0 ? (
            <Box
              align="center"
              variant="body2"
              sx={{ borderRadius: 1, border: '1px solid #CFCFCF', p: 2, m: 3 }}
            >
              <Typography fontWeight={700}>No links yet</Typography>
            </Box>
          ) : (
            <DragDropContext onDragEnd={onDragEnd}>
              <Droppable droppableId="socialLinks">
                {(provided) => (
                  <div ref={provided.innerRef} {...provided.droppableProps}>
                    {socialLinks?.map((item, index) => (
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
                                <img src="/assets/icons/Drag.svg" alt="drag" />
                              </Box>
                              <Box
                                sx={{
                                  display: 'flex',
                                  alignItems: 'center',
                                  justifyContent: 'center',
                                }}
                              >
                                <img
                                  alt={item?.platform}
                                  src={
                                    socialMediaList?.find((i) => i?.name === item?.platform)?.image
                                  }
                                />
                                <Typography ml={1} fontWeight={700} color="black" align="left">
                                  {item?.username}
                                </Typography>
                              </Box>
                            </Box>
                            <Box
                              sx={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'flex-end',
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

      {addDialog.value && (
        <AboutSocialLinksAddDialoge
          dialog={addDialog}
          handleAdd={handleAdd}
          socialMediaList={socialMediaList}
        />
      )}

      {deleteDialog.value && (
        <AboutSocialLinksDeleteDialoge
          dialog={deleteDialog}
          handleDelete={handleDelete}
          socialMediaList={socialMediaList}
        />
      )}

      {editDialog.value && (
        <AboutSocialLinksEditDialoge
          dialog={editDialog}
          handleEdit={handleEdit}
          socialMediaList={socialMediaList}
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

export default AboutSocialLinksForm;
