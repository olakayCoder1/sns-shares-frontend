import { useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { setCurrentItemValue, setVideo } from '@/store/features/new_post';
import { Checkbox, TextField } from '@mui/material';
import FormControlLabel from '@mui/material/FormControlLabel';
import Button from '@mui/material/Button';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { styled } from '@mui/material/styles';
import FormLabel from '@/components/atoms/FormLabel';

const PostForm = () => {
    const dispatch = useAppDispatch();
    const currentItem = useAppSelector(state => state.new_post.form);
    const errors = useAppSelector(state => state.new_post.errors || {});
    const [selectedFile, setSelectedFile] = useState<File | null>(null);

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
        const file = event.target.files?.[0];
        if (file) {
            setSelectedFile(file);

            // Convert file to binary data
            const reader = new FileReader();
            reader.onloadend = () => {
                if (reader.result) {
                    // Dispatch action with binary data
                    dispatch(setVideo(reader.result as ArrayBuffer)); // Adjust the action to handle binary data
                }
            };
            reader.readAsArrayBuffer(file);
        }
    };

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
                        onChange={e => dispatch(setCurrentItemValue({ date: e.target.value }))}
                        error={Boolean(errors.date)}
                        helperText={errors.date || ''}
                    />
                    <TextField
                        type='time'
                        size='small'
                        fullWidth
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
                        onChange={e => dispatch(setCurrentItemValue({ instance_dispatch: e.target.checked }))}
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
                                checked={currentItem.is_youtube}
                                onChange={e => dispatch(setCurrentItemValue({ is_youtube: e.target.checked }))}
                            />
                        }
                        label="Youtube"
                        labelPlacement="end"
                    />
                    <FormControlLabel
                        control={
                            <Checkbox
                                size='small'
                                checked={currentItem.is_instagram}
                                onChange={e => dispatch(setCurrentItemValue({ is_instagram: e.target.checked }))}
                            />
                        }
                        label="Instagram"
                        labelPlacement="end"
                    />
                    <FormControlLabel
                        control={
                            <Checkbox
                                size='small'
                                checked={currentItem.is_tiktok}
                                onChange={e => dispatch(setCurrentItemValue({ is_tiktok: e.target.checked }))}
                            />
                        }
                        label="Tiktok"
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
                        onChange={e => dispatch(setCurrentItemValue({ title: e.target.value }))}
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
                        onChange={e => dispatch(setCurrentItemValue({ description: e.target.value }))}
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
                        Upload files
                        <VisuallyHiddenInput
                            type="file"
                            onChange={handleFileChange}
                            multiple
                        />
                    </Button>
                </div>
            </div>
        </>
    );
};

export default PostForm;
