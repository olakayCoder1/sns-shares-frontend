
import { useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { setCurrentItemValue, setVideo } from '@/store/features/new_post';
import { Checkbox, TextField } from '@mui/material';
import FormControlLabel from '@mui/material/FormControlLabel';
import Button from '@mui/material/Button';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { styled } from '@mui/material/styles';
import FormLabel from '@/components/atoms/FormLabel';
import { useAuth } from '@/contexts/AuthContext';
import Modal from '@mui/material/Modal';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

const PostForm = ({ setSelectedFiles, selectedFiles }) => {
    const dispatch = useAppDispatch();
    const { user } = useAuth();
    const [isDateDisable, setIsDateDisable] = useState(true);
    const currentItem = useAppSelector(state => state.new_post.form);
    const errors = useAppSelector(state => state.new_post.errors || {});
    const [videoPreviews, setVideoPreviews] = useState<string[]>([]);
    
    const [previewModalOpen, setPreviewModalOpen] = useState(false);
    const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
    const [currentPlatformIndex, setCurrentPlatformIndex] = useState(0);
    
    const isDescriptionAndTitleValid = currentItem.description && currentItem.title.trim() !== '';

    const VisuallyHiddenInput = styled('input')({
        clip: 'rect(0 0 0 0)',
        clipPath: 'inset(50%)',
        height: 1,
        overflow: 'hidden',
        position: 'absolute',
        bottom: 0,
        right: 0,
        whiteSpace: 'nowrap',
        width: 'max-content'
    });

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files;
        if (files && files.length > 0) {
            const fileList = Array.from(files);
            setSelectedFiles(fileList);
            
            const newPreviews: string[] = [];
            
            fileList.forEach(file => {
                if (file.type.startsWith('video/')) {
                    const url = URL.createObjectURL(file);
                    newPreviews.push(url);
                }
                const reader = new FileReader();
                reader.onloadend = () => {
                    if (reader.result) {
                        dispatch(setVideo(reader.result as ArrayBuffer));
                    }
                };
                reader.readAsArrayBuffer(file);
            });

            setVideoPreviews(newPreviews);
        }
    };

    const handleInstantUploadChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(setCurrentItemValue({ instance_dispatch: e.target.checked }));
        setIsDateDisable(e.target.checked);
    };

    const openPreviewModal = (index: number) => {
        setCurrentVideoIndex(index);
        setPreviewModalOpen(true);
    };

    const closePreviewModal = () => {
        setPreviewModalOpen(false);
        setCurrentVideoIndex(0);
    };

    const handleNext = () => {
        setCurrentVideoIndex(prev => (prev + 1) % videoPreviews.length);
    };

    const handlePrevious = () => {
        setCurrentVideoIndex(prev => (prev - 1 + videoPreviews.length) % videoPreviews.length);
    };

    const getSelectedPlatforms = () => {
        const platforms = [];
        if (currentItem.is_youtube) platforms.push('YouTube');
        if (currentItem.is_instagram) platforms.push('Instagram');
        if (currentItem.is_tiktok) platforms.push('TikTok');
        if (currentItem.is_twitter) platforms.push('Twitter');
        return platforms;
    };

    const updateAllDescription = (e:React.ChangeEvent<HTMLInputElement>) => {
        dispatch(setCurrentItemValue({ description: e.target.value }))
        dispatch(setCurrentItemValue({ youtube_description: e.target.value }))
        dispatch(setCurrentItemValue({ tiktok_description: e.target.value }))
        dispatch(setCurrentItemValue({ instagram_description: e.target.value }))
        dispatch(setCurrentItemValue({ twitter_description: e.target.value }))
    }

    const updateAllTitle = (e:React.ChangeEvent<HTMLInputElement>) => {
        dispatch(setCurrentItemValue({ title: e.target.value }))
        dispatch(setCurrentItemValue({ youtube_title: e.target.value }))
    }

    



    return (
        <>
            {/* Date and Time */}
            <div className='flex flex-col sm:flex-row sm:items-start gap-[4px] sm:gap-[16px]'>
                <FormLabel className='min-w-[134px] mt-[10px]'>予定日時</FormLabel>
                <div className='w-full flex gap-[8px]'>
                    <TextField
                        type='date'
                        size='small'
                        fullWidth
                        value={currentItem.date || ''}
                        disabled={isDateDisable}
                        onChange={e => dispatch(setCurrentItemValue({ date: e.target.value }))}
                        error={Boolean(errors.date)}
                        helperText={errors.date || ''}
                    />
                    <TextField
                        type='time'
                        size='small'
                        fullWidth
                        disabled={isDateDisable}
                        value={currentItem.time || ''}
                        onChange={e => dispatch(setCurrentItemValue({ time: e.target.value }))}
                        error={Boolean(errors.time)}
                        helperText={errors.time || ''}
                    />
                </div>
            </div>

            {/* Immediate Dispatch */}
            <div className='flex flex-col sm:flex-row sm:items-start gap-[4px] sm:gap-[16px]'>
                <FormLabel className='min-w-[134px] mt-[10px]'>すぐに対応</FormLabel>
                <div className='w-full flex gap-[8px]'>
                    <Checkbox
                        size='small'
                        checked={currentItem.instance_dispatch}
                        onChange={handleInstantUploadChange}
                        error={Boolean(errors.instance_dispatch)}
                    />
                </div>
            </div>

            {/* Account Selection */}
            <div className='flex flex-col sm:flex-row sm:items-start gap-[4px] sm:gap-[16px]'>
                <FormLabel className='min-w-[134px] mt-[10px]'>アカウントを選択</FormLabel>
                <div className='w-full flex gap-[8px]'>
                    <FormControlLabel
                        control={
                            <Checkbox
                                size='small'
                                checked={user?.user_info?.is_youtube ? currentItem.is_youtube : false}
                                onChange={e => dispatch(setCurrentItemValue({ is_youtube: e.target.checked }))}
                                disabled={!user?.user_info?.is_youtube}
                            />
                        }
                        label={user?.user_info?.is_youtube ? "YouTube" : "YouTube"}
                        labelPlacement="end"
                    />
                    <FormControlLabel
                        control={
                            <Checkbox
                                size='small'
                                checked={user?.user_info?.is_instagram ? currentItem.is_instagram : false}
                                onChange={e => dispatch(setCurrentItemValue({ is_instagram: e.target.checked }))}
                                disabled={!user?.user_info?.is_instagram}
                            />
                        }
                        label={user?.user_info?.is_instagram ? "Instagram" : "Instagram"}
                        labelPlacement="end"
                    />
                    <FormControlLabel
                        control={
                            <Checkbox
                                size='small'
                                checked={user?.user_info?.is_twitter ? currentItem.is_twitter : false}
                                onChange={e => dispatch(setCurrentItemValue({ is_twitter: e.target.checked }))}
                                disabled={!user?.user_info?.is_twitter}
                            />
                        }
                        label={user?.user_info?.is_twitter ? "Twitter" : "Twitter"}
                        labelPlacement="end"
                    />
                    <FormControlLabel
                        control={
                            <Checkbox
                                size='small'
                                checked={user?.user_info?.is_tiktok ? currentItem.is_tiktok : false}
                                onChange={e => dispatch(setCurrentItemValue({ is_tiktok: e.target.checked }))}
                                disabled={!user?.user_info?.is_tiktok}
                            />
                        }
                        label={user?.user_info?.is_tiktok ? "Tiktok" : "Tiktok"}
                        labelPlacement="end"
                    />
                </div>
            </div>

            {/* Title */}
            <div className='flex flex-col sm:flex-row sm:items-start gap-[4px] sm:gap-[16px]'>
                <div className='w-full flex gap-[8px]'>
                    <TextField
                        placeholder="見出しを入力してください。。。"
                        multiline
                        fullWidth
                        rows={2}
                        maxRows={4}
                        value={currentItem.title}
                        onChange={updateAllTitle}
                        error={Boolean(errors.title)}
                        helperText={errors.title || ''}
                    />
                </div>
            </div>

            {/* Description */}
            <div className='flex flex-col sm:flex-row sm:items-start gap-[4px] sm:gap-[16px]'>
                <div className='w-full flex gap-[8px]'>
                    <TextField
                        placeholder="内容を入力してください。。。"
                        multiline
                        fullWidth
                        rows={6}
                        maxRows={8}
                        value={currentItem.description}
                        onChange={updateAllDescription}
                        error={Boolean(errors.description)}
                        helperText={errors.description || ''}
                    />
                </div>
            </div>

            {/* File Upload */}
            <div className='flex flex-col sm:flex-row sm:items-start gap-[4px] sm:gap-[16px] w-[max-content]'>
                <div className='flex gap-[8px]'>
                    <Button
                        component="label"
                        role={undefined}
                        variant="contained"
                        tabIndex={-1}
                        startIcon={<CloudUploadIcon />}
                    >
                        {selectedFiles.length > 0 ?  `${selectedFiles.length} 件のファイルが選択されました` :   'ファイルをアップロード'}
                        <VisuallyHiddenInput
                            type="file"
                            onChange={handleFileChange}
                            multiple
                        />
                    </Button>
                </div>
                <div className=''>
                    <Button
                        type='button'
                        variant="contained"
                        onClick={() => openPreviewModal(0)}
                        disabled={!selectedFiles.length}
                        // disabled={!selectedFiles.length || !getSelectedPlatforms().length}
                    >
                        動画をプレビュー
                    </Button>
                </div>
            </div>
            

            {/* Modal for Video Previews */}
            <Modal
                open={previewModalOpen}
                onClose={closePreviewModal}
                aria-labelledby="video-preview-modal"
                aria-describedby="video-preview-description"
            >
                <div className='flex flex-col items-center p-[24px] bg-white mx-auto my-[50px] w-[90%] max-w-[800px] relative'>
                    <IconButton
                        aria-label="close"
                        onClick={closePreviewModal}
                        style={{ position: 'absolute', top: 16, right: 16 }}
                    >
                        <CloseIcon />
                    </IconButton>
                    <video
                        src={videoPreviews[currentVideoIndex]}
                        controls
                        width="100%"
                        style={{ maxHeight: '600px', objectFit: 'cover' }}
                    />
                    <div className='flex gap-[8px] mt-[16px]'>
                        <IconButton
                            onClick={handlePrevious}
                            disabled={videoPreviews.length <= 1}
                        >
                            <ArrowBackIcon />
                        </IconButton>
                        <IconButton
                            onClick={handleNext}
                            disabled={videoPreviews.length <= 1}
                        >
                            <ArrowForwardIcon />
                        </IconButton>
                    </div>
                </div>
            </Modal>

            

            
        </>
    );
};

export default PostForm;
