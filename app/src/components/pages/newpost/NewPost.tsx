import { FormEvent, useEffect, useState } from 'react';
import AuthLayout from '@/components/templates/AuthLayout';
import PermissionLayout from '@/components/templates/PermissionLayout';
import MainLayout from '@/components/templates/layout/MainLayout';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { Button } from '@mui/material';
import TitleBar from '@/components/atoms/TitleBar';
import MainPannel from '@/components/atoms/MainPannel';
import PostForm from './sections/PostForm';
import {clearCurrentItem, setError } from '@/store/features/new_post';
import { postFormdata } from '@/utils/axios';
import { useAuth } from '@/contexts/AuthContext';



const NewPost = () => {
    const { setPending } = useAuth();
    const dispatch = useAppDispatch();
    const form = useAppSelector(state => state.new_post.form);
    const [currentStatus, setCurrentStatus] = useState(false);
    const errors = useAppSelector(state => state.new_post.errors);

    // Handle form submission
    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();


        
        // Construct FormData object
        const formData = new FormData();
        formData.append('title', form.title);
        formData.append('description', form.description);
        formData.append('is_youtube', String(form.is_youtube));
        formData.append('is_tiktok', String(form.is_tiktok));
        formData.append('is_instagram', String(form.is_instagram));
        formData.append('instance_dispatch', String(form.instance_dispatch));
        if (form.date) formData.append('date', form.date);
        if (form.time) formData.append('time', form.time);

        // Handle file binary data
        if (form.video) {
            const videoBlob = new Blob([form.video], { type: 'video/mp4' }); // Adjust MIME type if necessary
            formData.append('video', videoBlob, 'video.mp4'); // Adjust file name as needed
        }

        try {
            setPending!(true);
            setCurrentStatus(true);
            const res = await postFormdata(`/v0/customers/post/dispatch`, formData);
            if (res.status === 200) {
                console.log(res.data);
                dispatch(clearCurrentItem());
            } else {
                console.log(res);
                console.log(res.data.errors);
                dispatch(setError(res.data));
            }
        } catch (error) {
            console.error('Error fetching data:', error);
        } finally {
            setCurrentStatus(false);
            setPending!(false);
        }
    };

    return (
        <AuthLayout>
            <PermissionLayout permission={['customer', 'owner', 'super']} role={['admin', 'member']}>
                <MainLayout>
                    <TitleBar>新規投稿</TitleBar>
                    <MainPannel>
                        <form className='w-full max-w-[600px] flex flex-col gap-[10px]' onSubmit={handleSubmit}>
                            <PostForm />
                            {/* Submit button */}
                            <div className='mt-[16px]'>
                                <Button type='submit' variant='contained' color='secondary' disabled={currentStatus}>
                                    {currentStatus ? 'Submitting...' : '確認する'}
                                </Button>
                            </div>
                        </form>
                    </MainPannel>
                </MainLayout>
            </PermissionLayout>
        </AuthLayout>
    );
};

export default NewPost;
