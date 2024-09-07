import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { setCurrentItemValue } from '@/store/features/customer';
import { fetchPropertyData, fetchStatusData } from '@/store/features/shared_data';

import { MenuItem, Select, TextField } from '@mui/material';
import FormLabel from '@/components/atoms/FormLabel';

const CustomerForm = () => {
    const dispatch = useAppDispatch();

    const currentItem = useAppSelector(state => state.customer.item.form);
    const errors = useAppSelector(state => state.customer.item.errors);
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
                        error={errors.ads ? true : false}
                    >
                        <MenuItem value={"YOUTUBE"}>Youtube</MenuItem>
                        <MenuItem value={"1"}>Tiktok</MenuItem>
                        {/* <MenuItem value={"2"}>Instagram</MenuItem> */}
                    </Select>

                    {errors.ads && (
                        <p className='text-[12px] mt-[4px] ml-[14px] text-[#f44336]'>{errors.ads}</p>
                    )}
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
                            error={errors.google_client_id ? true : false}
                            helperText={errors.google_client_id ? errors.google_client_id : ''}
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
                            error={errors.google_client_secret ? true : false}
                            helperText={errors.google_client_secret ? errors.google_client_secret : ''}
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
                            error={errors.google_project_id ? true : false}
                            helperText={errors.google_project_id ? errors.google_project_id : ''}
                        />
                    </div>
                </div>
                </>
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
                        error={errors.userid ? true : false}
                        helperText={errors.userid ? errors.userid : ''}
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
                        error={errors.password ? true : false}
                        helperText={errors.password ? errors.password : ''}
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
                        error={errors.api_key ? true : false}
                        helperText={errors.api_key ? errors.api_key : ''}
                    />
                </div>
            </div>
                </>
            )}

            
        </>
    );
};

export default CustomerForm;
