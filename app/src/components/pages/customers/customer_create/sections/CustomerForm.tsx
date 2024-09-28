import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { setCurrentItemValue } from '@/store/features/customer';
import { fetchPropertyData, fetchStatusData } from '@/store/features/shared_data';

import { MenuItem, Select, TextField } from '@mui/material';
import FormLabel from '@/components/atoms/FormLabel';
import { useAuth } from '@/contexts/AuthContext';

const CustomerForm = () => {
    const dispatch = useAppDispatch();
    const {user } = useAuth();

    const currentItem = useAppSelector(state => state.customer.item.form);
    const ProfileItem = useAppSelector(state => state.profile.item.form);
    const errors = useAppSelector(state => state.customer.errors);
    const shared_data = useAppSelector(state => state.shared_data);

    // State to manage the selected social type
    const [selectedSocialType, setSelectedSocialType] = useState(currentItem.ads);

    useEffect(() => {
        dispatch(fetchStatusData());
        dispatch(fetchPropertyData());
    }, [dispatch]);

    const handleSocialTypeChange = (e: { target: { value: any; }; }) => {
        const value = e.target.value;
        setSelectedSocialType(value);
        dispatch(setCurrentItemValue({ ads: value }));
    };


    return (
        <>
            <div className='flex flex-col sm:flex-row sm:items-start gap-[4px] sm:gap-[16px]'>
                <FormLabel className='min-w-[134px] mt-[10px]'>Social Type</FormLabel>
                <div className='w-full'>
                    <Select
                        fullWidth
                        value={selectedSocialType}
                        onChange={handleSocialTypeChange}
                        // error={errors.ads ? true : false}
                        error={Boolean(errors?.ads)}
                    >
                        
                        {!user?.user_info?.is_youtube && <MenuItem value={"YOUTUBE"}>Youtube </MenuItem>}
                        {!user?.user_info?.is_instagram && <MenuItem value={"INSTAGRAM"}>Instagram</MenuItem>}
                        {!user?.user_info?.is_twitter && <MenuItem value={"TWITTER"}>Twitter</MenuItem>}
                        {!user?.user_info?.is_tiktok && <MenuItem value={"TIKTOK"}>Tiktok</MenuItem>}

                        
                        
                        {/* <MenuItem value={"2"}>Instagram</MenuItem> */}
                    </Select>

                    {errors?.ads && (
                        <p className='text-[12px] mt-[4px] ml-[14px] text-[#f44336]'>{errors?.ads}</p>
                    )}
                </div>
            </div>

                <div className='flex flex-col sm:flex-row sm:items-start gap-[4px] sm:gap-[16px]'>
                    <FormLabel className='min-w-[134px] mt-[10px]'>Name</FormLabel>
                    <div className='w-full flex gap-[8px]'>
                        <TextField
                            size='small'
                            fullWidth
                            value={currentItem.name}
                            onChange={e => dispatch(setCurrentItemValue({ name: e.target.value }))}
                            error={errors?.name ? true : false}
                            helperText={errors?.name ? errors.name : ''}
                        />
                    </div>
                </div>

            {selectedSocialType === "YOUTUBE" ? (
                <> 
                <div className='flex flex-col sm:flex-row sm:items-start gap-[4px] sm:gap-[16px]'>
                    <FormLabel className='min-w-[134px] mt-[10px]'>Google Client ID</FormLabel>
                    <div className='w-full flex gap-[8px]'>
                        <TextField
                            size='small'
                            fullWidth
                            value={currentItem.google_client_id}
                            onChange={e => dispatch(setCurrentItemValue({ google_client_id: e.target.value }))}
                            error={errors?.google_client_id ? true : false}
                            helperText={errors?.google_client_id ? errors.google_client_id : ''}
                        />
                    </div>
                </div>
                <div className='flex flex-col sm:flex-row sm:items-start gap-[4px] sm:gap-[16px]'>
                    <FormLabel className='min-w-[134px] mt-[10px]'>Google Client Secret</FormLabel>
                    <div className='w-full flex gap-[8px]'>
                        <TextField
                            size='small'
                            fullWidth
                            value={currentItem.google_client_secret}
                            onChange={e => dispatch(setCurrentItemValue({ google_client_secret: e.target.value }))}
                            error={errors?.google_client_secret ? true : false}
                            helperText={errors?.google_client_secret ? errors.google_client_secret : ''}
                        />
                    </div>
                </div>
                <div className='flex flex-col sm:flex-row sm:items-start gap-[4px] sm:gap-[16px]'>
                    <FormLabel className='min-w-[134px] mt-[10px]'>Project ID</FormLabel>
                    <div className='w-full flex gap-[8px]'>
                        <TextField
                            size='small'
                            fullWidth
                            value={currentItem.google_project_id}
                            onChange={e => dispatch(setCurrentItemValue({ google_project_id: e.target.value }))}
                            error={errors?.google_project_id ? true : false}
                            helperText={errors?.google_project_id ? errors.google_project_id : ''}
                        />
                    </div>
                </div>
                </>
            ): (
                <>
                {selectedSocialType === "INSTAGRAM" ? (
                    <>
                        <div className='flex flex-col sm:flex-row sm:items-start gap-[4px] sm:gap-[16px]'>
                            <FormLabel className='min-w-[134px] mt-[10px]'>App ID</FormLabel>
                            <div className='w-full flex gap-[8px]'>
                                <TextField
                                    size='small'
                                    fullWidth
                                    value={currentItem.facebook_app_id}
                                    onChange={e => dispatch(setCurrentItemValue({ facebook_app_id: e.target.value }))}
                                    error={errors?.facebook_app_id ? true : false}
                                    helperText={errors?.facebook_app_id ? errors.facebook_app_id : ''}
                                />
                            </div>
                        </div>
                        <div className='flex flex-col sm:flex-row sm:items-start gap-[4px] sm:gap-[16px]'>
                            <FormLabel className='min-w-[134px] mt-[10px]'>Instagram Business ID</FormLabel>
                            <div className='w-full flex gap-[8px]'>
                                <TextField
                                    size='small'
                                    fullWidth
                                    value={currentItem.instagram_business_id}
                                    onChange={e => dispatch(setCurrentItemValue({ instagram_business_id: e.target.value }))}
                                    error={errors?.instagram_business_id ? true : false}
                                    helperText={errors?.instagram_business_id ? errors.instagram_business_id : ''}
                                />
                            </div>
                        </div>
                        <div className='flex flex-col sm:flex-row sm:items-start gap-[4px] sm:gap-[16px]'>
                            <FormLabel className='min-w-[134px] mt-[10px]'>Client Secret</FormLabel>
                            <div className='w-full flex gap-[8px]'>
                                <TextField
                                    size='small'
                                    fullWidth
                                    value={currentItem.facebook_client_secret}
                                    onChange={e => dispatch(setCurrentItemValue({ facebook_client_secret: e.target.value }))}
                                    error={errors?.facebook_client_secret ? true : false}
                                    helperText={errors?.facebook_client_secret ? errors.facebook_client_secret : ''}
                                />
                            </div>
                        </div>
                    </>
                ): (
                    <>
                    {selectedSocialType === 'TWITTER' ? (
                        <></>
                    ): (
                        <>
                        <div className='flex flex-col sm:flex-row sm:items-start gap-[4px] sm:gap-[16px]'>
                            <FormLabel className='min-w-[134px] mt-[10px]'>User ID</FormLabel>
                            <div className='w-full flex gap-[8px]'>
                                <TextField
                                    size='small'
                                    fullWidth
                                    value={currentItem.userid}
                                    onChange={e => dispatch(setCurrentItemValue({ userid: e.target.value }))}
                                    error={errors?.userid ? true : false}
                                    helperText={errors?.userid ? errors.userid : ''}
                                />
                            </div>
                        </div>

                        <div className='flex flex-col sm:flex-row sm:items-start gap-[4px] sm:gap-[16px]'>
                            <FormLabel className='min-w-[134px] mt-[10px]'>Password</FormLabel>
                            <div className='w-full flex gap-[8px]'>
                                <TextField
                                    size='small'
                                    fullWidth
                                    value={currentItem.password}
                                    onChange={e => dispatch(setCurrentItemValue({ password: e.target.value }))}
                                    error={errors?.password ? true : false}
                                    helperText={errors?.password ? errors.password : ''}
                                />
                            </div>
                        </div>

                        <div className='flex flex-col sm:flex-row sm:items-start gap-[4px] sm:gap-[16px]'>
                            <FormLabel className='min-w-[134px] mt-[10px]'>API Key</FormLabel>
                            <div className='w-full flex gap-[8px]'>
                                <TextField
                                    size='small'
                                    fullWidth
                                    value={currentItem.api_key}
                                    onChange={e => dispatch(setCurrentItemValue({ api_key: e.target.value }))}
                                    error={errors?.api_key ? true : false}
                                    helperText={errors?.api_key ? errors.api_key : ''}
                                />
                            </div>
                        </div>
                        </>
                    )}
                    
                    </>
                )

                }
                    
                </>
            )}

            
        </>
    );
};

export default CustomerForm;
