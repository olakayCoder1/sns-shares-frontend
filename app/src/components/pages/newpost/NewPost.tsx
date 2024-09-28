import MainPannel from '@/components/atoms/MainPannel';
import TitleBar from '@/components/atoms/TitleBar';
import AuthLayout from '@/components/templates/AuthLayout';
import PermissionLayout from '@/components/templates/PermissionLayout';
import MainLayout from '@/components/templates/layout/MainLayout';
import { useAuth } from '@/contexts/AuthContext';
import { clearCurrentItem, setCurrentItemValue, setError } from '@/store/features/new_post';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { postFormdata } from '@/utils/axios';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import CloseIcon from '@mui/icons-material/Close';
import { Button, TextField, Typography } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import Modal from '@mui/material/Modal';
import { FormEvent, useState } from 'react';
import PostForm from './sections/PostForm';

const NewPost = () => {
    const { setPending, user } = useAuth();
    const dispatch = useAppDispatch();
    const form = useAppSelector(state => state.new_post.form);
    const [currentStatus, setCurrentStatus] = useState(false);
    const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
    const errors = useAppSelector(state => state.new_post.errors);
    const [currentPlatformIndex, setCurrentPlatformIndex] = useState(0);
    const [modalOpen, setModalOpen] = useState(false);

    // Validation function
    const isFormValid = () => {
        const hasDescription = form.description && form.description.trim() !== '';
        const hasTitle = form.title && form.title.trim() !== '';
        const hasChannel = form.is_youtube || form.is_instagram || form.is_tiktok || form.is_twitter;
        const hasVideoFile = selectedFiles.length > 0;
        return hasDescription && hasTitle && hasChannel && hasVideoFile;
    };

    const getSelectedPlatforms = () => {
        const platforms = [];
        if (form.is_youtube) platforms.push('YouTube');
        if (form.is_instagram) platforms.push('Instagram');
        if (form.is_tiktok) platforms.push('TikTok');
        return platforms;
    };

    const openSubmitModal = () => {
        if (!isFormValid()) {
            alert('Please ensure you have filled in the description, selected at least one channel, and uploaded at least one video file.');
            return;
        }
        setModalOpen(true);
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('title', form.title);
        formData.append('description', form.description);
        formData.append('is_youtube', String(form.is_youtube));
        formData.append('is_tiktok', String(form.is_tiktok));
        formData.append('is_twitter', String(form.is_twitter));
        formData.append('is_instagram', String(form.is_instagram));
        formData.append('instance_dispatch', String(form.instance_dispatch));
        formData.append('youtube_description', String(form.youtube_description));
        formData.append('instagram_description', String(form.instagram_description));
        formData.append('twitter_description', String(form.twitter_description));
        formData.append('youtube_title', String(form.youtube_title));
        formData.append('tiktok_description', String(form.tiktok_description));

        if (form.date) formData.append('date', form.date);
        if (form.time) formData.append('time', form.time);

        const maxFileSizeMB = 100;
        const allowedFileTypes = ['video/mp4', 'video/webm', 'video/ogg', 'video/mov', 'video/quicktime'];

        for (const file of selectedFiles) {
            if (!allowedFileTypes.includes(file.type)) {
                alert(`File type not allowed: ${file.name}`);
                return;
            }
            const fileSizeMB = file.size / (1024 * 1024);
            if (fileSizeMB > maxFileSizeMB) {
                alert(`File size exceeds 100 MB: ${file.name}`);
                return;
            }
        }

        selectedFiles.forEach((videoBlob, index) => {
            formData.append('files', videoBlob, `video_${index + 1}.mp4`);
        });

        if (form.video) {
            const videoBlob = new Blob([form.video], { type: 'video/mp4' });
            formData.append('video', videoBlob, 'video.mp4');
        }

        try {
            setPending!(true);
            setCurrentStatus(true);
            const res = await postFormdata(`/v0/customers/post/dispatch`, formData);
            if (res.status === 200) {
                console.log(res.data);
                setSelectedFiles([]);
                dispatch(clearCurrentItem());
                dispatch(setError({}));
            } else {
                dispatch(setError(res.data));
            }
        } catch (error) {
            console.error('Error submitting form:', error);
        } finally {
            // setCurrentStatus(false);
            setPending!(false);
        }
    };

    const handleSubmitModalNext = () => {
        setCurrentPlatformIndex(prev => {
            const newIndex = (prev + 1) % getSelectedPlatforms().length;
            setCurrentPlatformIndex(newIndex);
            return newIndex;
        });
    };

    const handleSubmitModalPrevious = () => {
        setCurrentPlatformIndex(prev => {
            const newIndex = (prev - 1 + getSelectedPlatforms().length) % getSelectedPlatforms().length;
            setCurrentPlatformIndex(newIndex);
            return newIndex;
        });
    };

    const handleModalSubmit = async () => {
        await handleSubmit(new Event('submit')); // Pass a dummy event
        closeSubmitModal();
    };

    const closeSubmitModal = () => {
        setModalOpen(false);
    };

    return (
        <AuthLayout>
            <PermissionLayout permission={['customer', 'owner', 'super']} role={['admin', 'member']}>
                <MainLayout>
                    <TitleBar>新規投稿</TitleBar>
                    <MainPannel>
                        <form className='w-full max-w-[600px] flex flex-col gap-[10px]' onSubmit={handleSubmit}>
                            <PostForm setSelectedFiles={setSelectedFiles} selectedFiles={selectedFiles} />
                            <div className='mt-[16px]'>
                                <Button
                                        type='button'
                                        variant='contained'
                                        color='secondary'
                                        onClick={openSubmitModal}
                                        disabled={
                                            // Check if the user has no connected accounts
                                            (user?.user_info?.is_youtube === false &&
                                            user?.user_info?.is_instagram === false &&
                                            user?.user_info?.is_twitter === false &&
                                            user?.user_info?.is_tiktok === false) ||

                                            // Check if the form is missing a title or description
                                            !form.title || !form.description ||

                                            // Check if no channels are selected
                                            !(form.is_instagram || form.is_tiktok || form.is_youtube || form.is_twitter)
                                        }
                                    >
                                        {user?.user_info?.is_youtube === false &&
                                        user?.user_info?.is_instagram === false &&
                                        user?.user_info?.is_twitter === false &&
                                        user?.user_info?.is_tiktok === false
                                            ? 'No connected accounts.'
                                            : (currentStatus ? '送信中...' : '確認する')}
                                </Button>

                            </div>

                            <Modal
                                open={modalOpen}
                                onClose={closeSubmitModal}
                                aria-labelledby="submit-review-modal"
                                aria-describedby="submit-review-description"
                            >
                                <div className='flex flex-col gap-4 items-center p-[24px] bg-white mx-auto my-[50px] w-[90%] max-w-[800px] relative'>
                                    <IconButton
                                        aria-label="close"
                                        onClick={closeSubmitModal}
                                        style={{ position: 'absolute', top: 16, right: 16 }}
                                    >
                                        <CloseIcon />
                                    </IconButton>
                                    <Typography variant="h6" component="h2">
                                        Review & Edit Content
                                    </Typography>
                                    <Typography variant="h6" component="h3" className='mt-8'>
                                        Platform: {getSelectedPlatforms()[currentPlatformIndex]}
                                    </Typography>
                                    <div className='w-full max-w-[600px] flex flex-col gap-[10px]'>
                                    {getSelectedPlatforms()[currentPlatformIndex] === 'YouTube' ? (
                                        <>
                                        <div className='flex flex-col sm:flex-row sm:items-start gap-[4px] sm:gap-[16px]'>
                                            <TextField
                                                label="Title"
                                                fullWidth
                                                value={form.youtube_title}
                                                onChange={e => dispatch(setCurrentItemValue({ youtube_title: e.target.value }))}
                                                className='mt-[16px]'
                                                error={Boolean(errors.youtube_title)}
                                                helperText={errors?.youtube_title || ''}
                                            />
                                        </div>

                                        <div className='flex flex-col sm:flex-row sm:items-start gap-[4px] sm:gap-[16px] mt-4'>
                                            <TextField
                                                label="Description"
                                                multiline
                                                fullWidth
                                                rows={4}
                                                value={form.youtube_description}
                                                onChange={e => dispatch(setCurrentItemValue({ youtube_description: e.target.value }))}
                                                className='mt-[16px]'
                                                error={Boolean(errors.youtube_description)}
                                                helperText={errors?.youtube_description || ''}
                                            />
                                        </div>
                                        </>
                                    ): (
                                        getSelectedPlatforms()[currentPlatformIndex] === 'TikTok' ? (
                                            <div className='flex flex-col sm:flex-row sm:items-start gap-[4px] sm:gap-[16px]'>
                                                <TextField
                                                    label="Description"
                                                    multiline
                                                    fullWidth
                                                    rows={4}
                                                    value={form.tiktok_description}
                                                    onChange={e => dispatch(setCurrentItemValue({ tiktok_description: e.target.value }))}
                                                    className='mt-[16px]'
                                                    error={Boolean(errors.tiktok_description)}
                                                    helperText={errors?.tiktok_description || ''}
                                                />
                                            </div>
                                        ) : (
                                            getSelectedPlatforms()[currentPlatformIndex] === 'Twitter' ? (
                                                <div className='flex flex-col sm:flex-row sm:items-start gap-[4px] sm:gap-[16px]'>
                                                    <TextField
                                                        label="Description"
                                                        multiline
                                                        fullWidth
                                                        rows={4}
                                                        value={form.twitter_description}
                                                        onChange={e => dispatch(setCurrentItemValue({ twitter_description: e.target.value }))}
                                                        className='mt-[16px]'
                                                        error={Boolean(errors.twitter_description)}
                                                        helperText={errors?.twitter_description || ''}
                                                    />
                                                </div>
                                            ) : (
                                                <div className='flex flex-col sm:flex-row sm:items-start gap-[4px] sm:gap-[16px]'>
                                                    <TextField
                                                        label="Description"
                                                        multiline
                                                        fullWidth
                                                        rows={4}
                                                        value={form.instagram_description}
                                                        onChange={e => dispatch(setCurrentItemValue({ instagram_description: e.target.value }))}
                                                        className='mt-[16px]'
                                                        error={Boolean(errors.instagram_description)}
                                                        helperText={errors?.instagram_description || ''}
                                                    />
                                                </div>
                                            )
                                        )
                                    )}
                                        
                                    </div>

                                    <div className='flex gap-[8px] mt-[16px]'>
                                        <IconButton
                                            onClick={handleSubmitModalPrevious}
                                            disabled={getSelectedPlatforms().length <= 1}
                                        >
                                            <ArrowBackIcon />
                                        </IconButton>
                                        <IconButton
                                            onClick={handleSubmitModalNext}
                                            disabled={getSelectedPlatforms().length <= 1}
                                        >
                                            <ArrowForwardIcon />
                                        </IconButton>
                                    </div>
                                    <div className='flex gap-[8px] mt-[16px]'>
                                        <Button
                                            type='button'
                                            variant="contained"
                                            color="primary"
                                            onClick={handleModalSubmit}
                                            disabled={!isFormValid()} // Disable if form is invalid
                                        >
                                            Done
                                        </Button>
                                        <Button
                                            variant="outlined"
                                            onClick={closeSubmitModal}
                                        >
                                            Close
                                        </Button>
                                    </div>
                                </div>
                            </Modal>
                        </form>
                    </MainPannel>
                </MainLayout>
            </PermissionLayout>
        </AuthLayout>
    );
};

export default NewPost;
