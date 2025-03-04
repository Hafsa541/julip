'use client';

import { useMemo, useState, useEffect, useRef } from 'react';

import * as Yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import LoadingButton from '@mui/lab/LoadingButton';
// import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { Box, Container } from '@mui/system';
import {
  Alert,
  Button,
  Card,
  CardContent,
  Checkbox,
  Grid,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
// routes
// import { paths } from 'src/routes/paths';
// import { RouterLink } from 'src/routes/components';
// components
import { useRouter } from 'next/navigation';
import Iconify from 'src/components/iconify';
import FormProvider, { RHFTextField } from 'src/components/hook-form';
// assets
// import { useSelectPricing } from 'src/api/pricing';
import { useSelector } from 'src/app/redux/store';
import { paths } from 'src/routes/paths';
import { useAuthContext } from 'src/auth/hooks';
import { useGetTemplateList } from 'src/api/template';
import ProfileUpload from './components/profile-upload';

// ----------------------------------------------------------------------

const steps = [
  {
    value: 'userName',
  },
  {
    value: 'profile',
  },
  {
    value: 'template',
  },
  {
    value: 'pricing',
  },
];

export default function ModernSetProfileView() {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [selectedTemplate, setSelectedTemplate] = useState('');
  const [pricing, setPricing] = useState('Premium');
  const uploadAvatarRef = useRef(null);
  const [imageProfile, setImageProfile] = useState('/assets/placeholder.jpeg');
  const [isDefaultImage, setIsDefaultImage] = useState(true);
  const [status, setStatus] = useState({
    userName: { error: '', success: false },
    profile: { error: '', success: false },
    template: { error: '', success: false },
    pricing: { error: '', success: false },
  });

  const { createSlug, createProfile, selectPricing, selectTemplate } = useAuthContext();
  const user = useSelector((state) => state.auth.user);

  const basicOptions = [
    { icon: 'eva:checkmark-fill', text: '5 products in shop ' },
    { icon: 'eva:checkmark-fill', text: 'Auto populated product info/image' },
    { icon: 'eva:checkmark-fill', text: 'Pinned products (increase sales)' },
    { icon: 'eva:checkmark-fill', text: 'Unlimited links to external sites' },
    { icon: 'eva:checkmark-fill', text: 'Template customization' },
    { icon: 'eva:checkmark-fill', text: 'Brand color customization' },
  ];
  const proOptions = [
    { icon: 'eva:plus-fill', text: 'Includes everything from the Free Plan' },
    { icon: 'eva:checkmark-fill', text: 'An About Page for people to know why you are different' },
    { icon: 'eva:checkmark-fill', text: 'Premium templates' },
    { icon: 'eva:checkmark-fill', text: 'Landing Page to dive deeper into your services' },
    { icon: 'eva:checkmark-fill', text: 'Accept payment through Julip' },
    { icon: 'eva:checkmark-fill', text: 'Your Service menu' },
    { icon: 'eva:checkmark-fill', text: 'Add FAQ’s and testimonials' },
    { icon: 'eva:checkmark-fill', text: 'Your Media Kit' },
  ];

  const ProfileSchema = Yup.object().shape({
    userName: Yup.string().required('Username is required'),
    profile: Yup.object().shape({
      profileName: Yup.string().required('Profile name is required'),
      bio: Yup.string()
        .max(300, 'Description must not exceed 500 characters')
        .required('Bio is rerquired'),
      profileImage: Yup.mixed()
        .nullable()
        .test('fileType', 'Image must be an image file or URL', (value) => {
          // Allow if value is null
          if (!value) return true;

          // Check if value is a File or Blob
          if (value instanceof File || value instanceof Blob) {
            return ['image/jpeg', 'image/png', 'image/gif'].includes(value.type);
          }

          // Check if value is a string (URL or path)
          if (typeof value === 'string') {
            return value.match(/\.(jpeg|jpg|png|gif)$/i); // Allow valid image file extensions
          }

          return false; // Reject if it doesn't match any criteria
        })
        .required('Profile image is required'),
      // profileImage: Yup.mixed()
      //   .nullable()
      //   .test('fileType', 'Avatar must be an image file', (value) => {
      //     if (!value) return true;
      //     return ['image/jpeg', 'image/png', 'image/gif'].includes(value.type);
      //   })
      //   .required('Profile image is required'),
    }),
    template: Yup.string().required('Template is required'),
    pricing: Yup.string().typeError('Pricing must be a number').required('Pricing is required'),
  });

  const defaultValues = useMemo(
    () => ({
      userName: '',
      profile: {
        profileName: '',
        bio: '',
        profileImage: '/assets/placeholder.jpeg' || null,
      },
      template: '',
      pricing: '',
    }),
    []
  );

  const methods = useForm({
    mode: 'onChange',
    resolver: yupResolver(ProfileSchema),
    defaultValues,
  });

  const {
    handleSubmit,
    getValues,
    setValue,
    trigger,
    watch,

    clearErrors,
    resetField,
    formState: { isSubmitting, errors },
  } = methods;

  useEffect(() => {
    resetField('profile.profileName', '');
    resetField('profile.bio', '');
    resetField('profile.profileImage', '/assets/placeholder.jpeg');
  }, [resetField]);

  const {
    profile: { profileImage },
    template: templateId,
  } = getValues();

  const values = watch();
  console.log('errors', errors);

  // swr
  const { templates } = useGetTemplateList();
  // const getButtonText = (step, pricing) => {
  //   if (step === 3 && pricing === 'Premium') {
  //     return 'Start with Premium';
  //   } else if (step === 3) {
  //     return 'Start with Basics';
  //   }
  //   return 'Continue';
  // };

  useEffect(() => {
    if (user?.isSlugCreated) {
      setStep(1);
      setValue('userName', user.userName);
    }
    if (user?.isProfileCreated) {
      setStep(2);
      setValue('profile', { bio: user.bio, profileName: user.profileName });
    }
    if (user?.isTemplateSelected) {
      setStep(3);
      setValue('template', user.template);
    }
    // eslint-disable-next-line
  }, [user?.isSlugCreated, user?.isProfileCreated, user?.isTemplateSelected, setValue]);

  const handleProileImage = (file) => {
    setValue('profile.profileImage', file);
    setImageProfile(file);
    setIsDefaultImage(false);
  };
  const handleButtonClick = () => {
    uploadAvatarRef.current.openFileDialog();
  };
  const handleReplaceProileImage = (file) => {
    setValue('profile.profileImage', file);
    setImageProfile(file);
    setIsDefaultImage(false);
  };
  const handleDeleteProfileImage = (file) => {
    setValue('profile.profileImage', null);
    setImageProfile(null);
    setIsDefaultImage(false);
  };

  const onSubmit = handleSubmit(async (data) => {
    try {
      console.info('DATA', data);
    } catch (error) {
      console.error(error);
    }
  });

  const getFormValidation = async () => {
    const currentStepValue = steps[step].value;
    let isFormValid;
    // refers to project stepper form value 'name'
    if (currentStepValue === 'profile') {
      const isProfileNameValid = await trigger('profile.profileName');
      const isDescriptionValid = await trigger('profile.bio');
      const isAvatarValid = await trigger('profile.profileImage');
      isFormValid = isProfileNameValid && isDescriptionValid && isAvatarValid;
    } else {
      isFormValid = await trigger(currentStepValue);
    }
    return { isFormValid, currentStepValue };
  };

  const handleNext = async () => {
    if (step === steps.length) return; // Prevent submission if already on last step

    const { isFormValid, currentStepValue } = await getFormValidation();

    // Dispatch form data or perform other actions based on current step value
    if (isFormValid) {
      const formValues = getValues();
      let proceedNextStep = false;
      switch (currentStepValue) {
        case 'userName':
          proceedNextStep = await handleSlugCreation(formValues.userName, currentStepValue);
          if (proceedNextStep) {
            clearErrors(['profile.profileName', 'profile.bio', 'profile.profileImage']);

            // Optionally, reset the values if needed
            setValue('profile.profileName', ''); // Reset to default or empty value
            setValue('profile.bio', '');
            setValue('profile.profileImage', '/assets/placeholder.jpeg');
          }
          break;
        case 'profile':
          proceedNextStep = await handleProfileCreation(formValues.profile, currentStepValue);
          if (proceedNextStep) {
            clearErrors(['profile.template']);

            // Optionally, reset the values if needed
            setValue('profile.template', ''); // Reset to default or empty value
          }
          break;
        case 'template':
          setSelectedTemplate(formValues.template);
          proceedNextStep = await handleTemplateSelection(formValues.template, currentStepValue);
          break;
        case 'pricing':
          proceedNextStep = await handlePricingSelection(formValues.pricing, currentStepValue);
          break;
        default:
          break;
      }
      if (proceedNextStep) {
        if (step + 1 === steps.length) {
          router.replace(paths.dashboard.about);
          return;
        }
        setStep((prevActiveStep) => prevActiveStep + 1);
      }
    }
  };
  const handleFinish = () => {
    methods.handleSubmit(onSubmit)();
  };

  const handleSlugCreation = async (slug, key) => {
    try {
      const slugData = {
        userId: user._id,
        userName: slug,
      };

      const res = await createSlug(slugData);
      setStatus((prevStatus) => ({
        ...prevStatus,
        [key]: { error: '', success: true },
      }));
      return true;
    } catch (e) {
      console.error(e);
      setStatus((prevStatus) => ({
        ...prevStatus,
        [key]: { error: e.message, success: false },
      }));
      return false;
    }
  };
  const handleProfileCreation = async (profile, key) => {
    try {
      const profileData = {
        userId: user._id,
        bio: profile.bio,
        profileName: profile.profileName,
      };
      const formData = new FormData();

      if (profileImage instanceof File) {
        console.log('profile image file', profileImage);
        formData.append('image', profileImage);
        formData.append('body', JSON.stringify(profileData));
      } else if (profileImage.includes('/assets/placeholder.jpeg')) {
        console.log('profile image link', profileImage);

        formData.append('body', JSON.stringify(profileData));
      }

      const res = await createProfile(formData);

      setStatus((prevStatus) => ({
        ...prevStatus,
        [key]: { error: '', success: true },
      }));
      return true;
    } catch (e) {
      console.error(e);
      setStatus((prevStatus) => ({
        ...prevStatus,
        [key]: { error: e.message, success: false },
      }));
      return false;
    }
  };
  const handleTemplateSelection = async (value, key) => {
    try {
      const res = await selectTemplate(value);
      setStatus((prevStatus) => ({
        ...prevStatus,
        [key]: { error: '', success: true },
      }));
      return true;
    } catch (e) {
      console.error(e);
      setStatus((prevStatus) => ({
        ...prevStatus,
        [key]: { error: e.message, success: false },
      }));
      return false;
    }
  };
  const handlePricingSelection = async (value, key) => {
    try {
      const pricingData = {
        pricing,
      };

      const res = await selectPricing(pricingData);
      setStatus((prevStatus) => ({
        ...prevStatus,
        [key]: { error: '', success: true },
      }));
      return true;
    } catch (e) {
      console.error(e);
      setStatus((prevStatus) => ({
        ...prevStatus,
        [key]: { error: e.message, success: false },
      }));
      return false;
    }
  };

  const renderHead = <img src="/assets/icons/Julip.svg" alt="Julip" />;

  const renderUserNameComponent = (
    <Stack spacing={3} alignItems="center">
      <Typography variant="h5" mt={3}>
        Claim your free Julip username.
      </Typography>
      {status?.userName?.error && (
        <Alert severity="error" variant="outlined" sx={{ width: '100%' }}>
          {status?.userName?.error}
        </Alert>
      )}
      <Typography fontSize={16} color="black" sx={{ mt: -2 }}>
        Enter your unique username.
      </Typography>

      <Box sx={{ position: 'relative' }}>
        <Typography fontSize={17} fontWeight={600} sx={{ position: 'absolute', left: 10, top: 16 }}>
          myjulip.com/
        </Typography>
        <RHFTextField
          name="userName"
          autoComplete="off"
          placeholder="username"
          sx={{
            width: 300,
            '& .MuiInputBase-input.MuiOutlinedInput-input': {
              pl: '103px',
              fontSize: 17,
              fontWeight: 600,
            },
          }}
        />
      </Box>
    </Stack>
  );

  const renderProfileComponent = (
    <Container
      sx={{
        marginTop: 3,
        minWidth: '500px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
      }}
      disableGutters
    >
      <Stack>
        <Typography fontSize={20} fontWeight={700}>
          Personalize your Julip.
        </Typography>

        <Typography fontSize={16} fontWeight={600} sx={{ mt: 1 }}>
          Add your profile image, name and bio.
        </Typography>
        {status?.profile?.error && (
          <Alert severity="error" variant="outlined" sx={{ width: '100%' }}>
            {status?.profile?.error}
          </Alert>
        )}
      </Stack>
      <Stack spacing={1.5} marginTop={4}>
        <RHFTextField
          name="profile.profileName"
          placeholder="Profile Name"
          inputProps={{ maxLength: 30 }}
          sx={{
            '& .MuiInputBase-input.MuiOutlinedInput-input': {
              fontSize: 17,
              fontWeight: 600,
            },
          }}
        />
        <Box sx={{ position: 'relative' }}>
          <RHFTextField
            name="profile.bio"
            multiline
            fullWidth
            rows={4}
            placeholder="Bio Description"
            inputProps={{ maxLength: 100 }}
            sx={{
              backgroundColor: 'white',
              borderRadius: '1rem',
              '& .MuiInputBase-input.MuiOutlinedInput-input': {
                fontSize: 17,
                fontWeight: 600,
              },
            }}
          />
          <Typography
            fontWeight={500}
            fontSize={15}
            sx={{
              color: '#6C6C6C',
              letterSpacing: 0.5,
              position: 'absolute',
              right: 10,
              ...((values.profile.bio || values.profile.bio === '') && {
                bottom: 5,
              }),
              ...(errors?.profile?.bio?.message && { bottom: 30 }),
            }}
          >
            {values.profile?.bio?.length}/100
          </Typography>
        </Box>
      </Stack>

      <Box mt={4} sx={{ display: 'flex', flexDirection: 'column' }}>
        <Container sx={{ textAlign: 'left' }}>
          <Typography>Profile Image</Typography>
        </Container>
        <Container
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '1rem',
            marginTop: 1,
          }}
        >
          <ProfileUpload
            sx={{
              width: 120,
              height: 120,
              borderRadius: 100,
              border: profileImage ? '0.6px solid black' : 'none',
            }}
            error={errors?.profile?.profileImage}
            file={imageProfile}
            setFile={handleProileImage}
            ref={uploadAvatarRef}
            onReplace={handleReplaceProileImage}
            isDefaultImage={isDefaultImage}
          />
          {/* <img src="/assets/placeholder.jpeg" alt="placeholder" /> */}

          <Button
            color="inherit"
            type="submit"
            variant="outlined"
            startIcon={<Iconify icon="pepicons-pop:arrows-spin" />}
            sx={{ borderRadius: 100, width: '40%', paddingY: 1.25, border: '0.6px solid black' }}
            onClick={handleButtonClick}
          >
            <Typography fontSize={16} fontWeight={700}>
              Replace
            </Typography>
          </Button>
          <Button
            // size="sm"
            color="inherit"
            type="submit"
            variant="outlined"
            startIcon={<Iconify icon="famicons:trash-outline" />}
            sx={{ borderRadius: 100, width: '40%', paddingY: 1.25, border: '0.6px solid black' }}
            onClick={handleDeleteProfileImage}
          >
            <Typography fontSize={16} fontWeight={700}>
              Remove
            </Typography>
          </Button>
        </Container>
      </Box>
    </Container>
  );

  const renderTemplateComponent = (
    <Stack spacing={3} alignItems="center">
      <Typography fontSize={20} fontWeight={700} sx={{ margin: 5 }}>
        Pick a template.
      </Typography>

      <Typography fontSize={16} fontWeight={500} sx={{ color: 'black', mt: -7 }}>
        You&apos;ll be able to change it later.
      </Typography>

      <Grid container minWidth={700} alignItems="center" justifyContent="center">
        {templates?.map((template, index) => (
          <Grid
            item
            sx={{
              cursor: 'pointer',
              outline: selectedTemplate === template?._id ? '1px solid black' : '',
              '&:hover': { outline: '1px solid black' },
              borderRadius: '1rem',
              mx: 1,
            }}
            onClick={() => {
              setSelectedTemplate(template._id);
              setValue('template', template._id);
            }}
            key={template._id}
          >
            <img
              src={`/assets/template/${template.name}.svg`}
              width="150px"
              height="auto"
              alt={template.name}
            />
          </Grid>
        ))}

        <Grid
          item
          sx={{
            cursor: 'not-allowed',
            // outline: selectedTemplate === template?._id ? '1px solid black' : '',
            // '&:hover': { outline: '1px solid black' },
            borderRadius: '1rem',
            mx: 1,
            position: 'relative',
            opacity: '0.8',
            filter: 'brightness(80%)',
          }}
          onClick={() => {
            // setSelectedTemplate(template._id);
            // setValue('template', template._id);
          }}
          // key={template._id}
        >
          <img src="/assets/template/Lime.svg" width="150px" height="auto" alt="Lime" />
          <img
            src="/assets/template/pro.svg"
            width="65px"
            height="auto"
            alt="pro"
            style={{ position: 'absolute', top: -5, right: -5 }}
          />
        </Grid>
        <Grid
          item
          sx={{
            cursor: 'not-allowed',
            // outline: selectedTemplate === template?._id ? '1px solid black' : '',
            // '&:hover': { outline: '1px solid black' },
            borderRadius: '1rem',
            mx: 1,
            position: 'relative',
            opacity: '0.8',
            filter: 'brightness(80%)',
          }}
          onClick={() => {
            // setSelectedTemplate(template._id);
            // setValue('template', template._id);
          }}
          // key={template._id}
        >
          <img src="/assets/template/Coffee.svg" width="150px" height="auto" alt="Coffee" />
          <img
            src="/assets/template/pro.svg"
            width="65px"
            height="auto"
            alt="pro"
            style={{ position: 'absolute', top: -5, right: -5 }}
          />
        </Grid>
      </Grid>

      {!selectedTemplate && errors?.template?.message && (
        <Typography fontSize={10} color="red">
          {errors?.template?.message}
        </Typography>
      )}
    </Stack>
  );

  const renderPricingComponent = (
    <Stack spacing={3} alignItems="center">
      <Typography fontSize={20} fontWeight={700} sx={{ margin: 3 }}>
        Try Pro for free.
      </Typography>

      <Typography fontSize={16} fontWeight={500} sx={{ color: 'black', mt: -5 }}>
        You can try the Pro plan for free for 30 days. Pause and cancel anytime.
      </Typography>
      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Card
          variant="outlined"
          sx={{
            width: 350,
            margin: 1,
            cursor: 'pointer',
          }}
          onClick={() => {
            setPricing('Basic');
            setValue('pricing', 'Basic');
          }}
        >
          <CardContent sx={{ borderBottom: '1px solid black' }}>
            <Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Container
                  disableGutters
                  sx={{
                    display: 'flex',
                    alignItems: 'baseline',
                    justifyContent: 'flex-start',
                  }}
                >
                  <Typography fontSize={20} fontWeight={700} inline>
                    Free
                  </Typography>
                  <Typography variant="body" ffontSize={16} fontWeight={700} inline sx={{ ml: 1 }}>
                    0 USD / month
                  </Typography>
                </Container>
                <Checkbox
                  color="success"
                  id="Basic"
                  checked={pricing === 'Basic'}
                  onClick={(e) => {
                    setPricing(e.target.id);
                    setValue('pricing', e.target.id);
                  }}
                />
              </Box>
              <Typography fontSize={16} fontWeight={400} align="start">
                Free Forever
              </Typography>
            </Box>
          </CardContent>
          <CardContent>
            <List>
              {basicOptions.map((option) => (
                <ListItem
                  disablePadding
                  sx={{ display: 'flex', alignItems: 'flex-start', paddingY: 0.5 }}
                >
                  <ListItemIcon>
                    <Iconify icon={option.icon} />
                  </ListItemIcon>
                  <ListItemText>
                    <Typography fontSize={16} fontWeight={500}>
                      {option.text}
                    </Typography>
                  </ListItemText>
                </ListItem>
              ))}
            </List>
          </CardContent>
        </Card>
        <Card
          variant="outlined"
          sx={{
            width: 350,
            margin: 1,
            cursor: 'pointer',
          }}
          onClick={() => {
            setPricing('Premium');
            setValue('pricing', 'Premium');
          }}
        >
          <CardContent sx={{ borderBottom: '1px solid black', backgroundColor: '#DCFFBA' }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Container
                disableGutters
                sx={{
                  display: 'flex',
                  alignItems: 'baseline',
                  justifyContent: 'flex-start',
                }}
              >
                <Typography fontSize={20} fontWeight={700} inline>
                  Pro
                </Typography>
                <Typography fontSize={16} fontWeight={700} inline sx={{ ml: 1 }}>
                  Free for 30 days
                </Typography>
              </Container>
              <Checkbox
                color="success"
                id="Premium"
                checked={pricing === 'Premium'}
                onClick={(e) => {
                  setPricing(e.target.id);
                  setValue('pricing', e.target.id);
                }}
              />
            </Box>
            <Typography fontSize={16} fontWeight={400} align="start">
              Then $9.99/mo annually, or $14.99 monthly
            </Typography>
          </CardContent>
          <CardContent>
            <List>
              {proOptions.map((option) => (
                <ListItem
                  disablePadding
                  sx={{ display: 'flex', alignItems: 'flex-start', paddingY: 0.5 }}
                >
                  <ListItemIcon>
                    <Iconify icon={option.icon} />
                  </ListItemIcon>
                  <ListItemText>
                    <Typography fontSize={16} fontWeight={500}>
                      {option.text}
                    </Typography>
                  </ListItemText>
                </ListItem>
              ))}
            </List>
          </CardContent>
        </Card>
      </Box>
      {!pricing && errors?.pricing?.message && (
        <Typography fontSize={10} color="red">
          {errors?.pricing?.message}
        </Typography>
      )}
    </Stack>
  );
  const renderStepCount = (
    <Typography variant="body2" color="black">
      Step {step + 1}/3
    </Typography>
  );

  const renderContinueBtn = (
    <>
      {console.log(values)}
      <LoadingButton
        fullWidth
        color="secondary"
        size="large"
        type="submit"
        variant="contained"
        loading={isSubmitting}
        sx={{ borderRadius: 100, marginTop: 4, color: 'black', border: '0.8px solid #000' }}
        onClick={() => {
          handleNext();
        }}
        disabled={
          (step === 0 && values.userName === '') ||
          (step === 1 &&
            !(values.profile.bio && values.profile.profileName && values.profile.profileImage)) ||
          (step === 2 && !values.template)
        }
      >
        {/* {step === 3 ? 'Complete' : 'Continue'} */}
        {/* eslint-disable no-nested-ternary  */}
        {step === 3 && pricing === 'Premium'
          ? 'Start with Pro'
          : step === 3
          ? 'Start with Free'
          : 'Continue'}
        {/* eslint-enable no-nested-ternary  */}
      </LoadingButton>
    </>
  );

  return (
    <Container
      maxWidth={step === 3 ? 'md' : 'sm'}
      disableGutters
      sx={{
        paddingTop: '0 !important',
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <FormProvider methods={methods} onSubmit={onSubmit}>
        {renderHead}

        {/* Steps Components */}
        {step === 0 && renderUserNameComponent}
        {step === 1 && renderProfileComponent}
        {step === 2 && renderTemplateComponent}
        {step === 3 && renderPricingComponent}

        {/* Steps Buttons */}
        {(step === 0 || step === 1 || step === 2 || step === 3) && renderContinueBtn}

        {/* Step Count */}
        {step < 3 && <Container sx={{ marginTop: 5 }}>{renderStepCount}</Container>}
      </FormProvider>
    </Container>
  );
}
