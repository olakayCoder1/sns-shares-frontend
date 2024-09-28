"use client"
import { FormEvent, useEffect, useState } from 'react';
import { postRequest, getRequest } from '@/utils/axios';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { clearCurrentItem, setError } from '@/store/features/customer';
import { Modal, Button, TextField, Box } from '@mui/material';

import AuthLayout from '@/components/templates/AuthLayout';
import PermissionLayout from '@/components/templates/PermissionLayout';
import MainLayout from '@/components/templates/layout/MainLayout';
import TitleBar from '@/components/atoms/TitleBar';
import MainPannel from '@/components/atoms/MainPannel';
import CustomerForm from './sections/CustomerForm';
import Loader from '@/components/Loader';
import { useSearchParams } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';

const CustomerCreatePage = () => {
    const { setPending } = useAuth();
    const dispatch = useAppDispatch();
    const [data, setData] = useState<any>(null);
    const searchParams = useSearchParams();
    const [modalOpen, setModalOpen] = useState<boolean>(false);
    const [authCode, setAuthCode] = useState('');
    const [loading, setLoading] = useState<boolean>(false);

    const queryParams = new URLSearchParams(searchParams.toString());

    const currentItem = useAppSelector(state => state.customer.item.form);

    useEffect(() => {
        // Clear form data when the component loads
        dispatch(clearCurrentItem());

        // Function to fetch data
        const fetchData = async () => {
            if (queryParams.toString()) {

                validateQueryParams(queryParams)
                // setPending!(true);
                // // setLoading(true); // Show loader
                // try {

                //     const res = await getRequest(`/v0/customers/create/callback?${queryParams}`);
                //     if (res.status === 200){
                //         console.log(res.data)
                //         const newUrl = window.location.pathname;
                //         window.history.replaceState(null, '', newUrl);
                //     }else{
                //         dispatch(setError(res.data.errors));
                //     }
                // } catch (error) {
                //     console.error('Error fetching data:', error);
                // } finally {
                //     setLoading(false);
                //     setPending!(false);
                // }
            }
        };

        fetchData();
    }, [searchParams]);

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();

        const res = await postRequest(`/v0/customers/create/sns`, currentItem);
        if (res.status === 200) {
            const { redirectUrl } = res.data;

            if (redirectUrl) {
                if(currentItem.ads === 'TWITTER'){
                    setModalOpen(true);
                    window.open(redirectUrl, '_blank');
                }else{
                    window.location.href = redirectUrl;
                }
                
            }
            dispatch(clearCurrentItem());
        }

        if (res.status == 400 && res.data) {
            dispatch(setError(res.data));
        }
    };


    const handleAuthCodeSubmit = async (e: FormEvent) => {
        e.preventDefault();
        // Handle the authorization code as needed
        // For example, you might want to validate it or send it to your backend
        console.log('Authorization Code:', authCode);
        await validateQueryParams(`oauth_verifier=${authCode}`)
        setModalOpen(false); // Close the modal
    };

    const validateQueryParams = async (queryParams) => {
        setPending!(true);
        try {
            const res = await getRequest(`/v0/customers/create/callback?${queryParams}`);
            if (res.status === 200){
                console.log(res.data)
                const newUrl = window.location.pathname;
                window.history.replaceState(null, '', newUrl);
            }else{
                dispatch(setError(res.data.errors));
            }
        } catch (error) {
            console.error('Error fetching data:', error);
        } finally {
            setLoading(false);
            setPending!(false);
        }
    };

    return (
        <AuthLayout>
            <PermissionLayout permission={['owner', 'super', 'customer']} role={['admin', 'member']}>
                <MainLayout>
                    <TitleBar href='/snsaccounts'>SNSアカウント登録</TitleBar>

                    <MainPannel>
                        {loading ? (
                            <Loader message="Validating credentials..." /> // Show loader with message
                        ) : (
                            <form className='w-full max-w-[600px] flex flex-col gap-[10px]' onSubmit={handleSubmit}>
                                <CustomerForm />

                                {/* Show fetched data if needed */}
                                {data && <pre>{JSON.stringify(data, null, 2)}</pre>}

                                <div className='mt-[16px]'>
                                    <Button type='submit' variant='contained' color='secondary'>
                                        登録する
                                    </Button>
                                </div>
                            </form>
                        )}
                    </MainPannel>
                </MainLayout>
                <Modal open={modalOpen} onClose={() => setModalOpen(false)}>
                    <Box 
                        sx={{
                            padding: '20px',
                            background: 'white',
                            margin: 'auto',
                            marginTop: '20%',
                            width: '300px',
                            borderRadius: '8px',
                            boxShadow: 24,
                        }}
                    >
                        <h2 className=' mb-4'>Enter Authorization Code</h2>
                        <form onSubmit={handleAuthCodeSubmit}>
                            <TextField
                                label="Authorization Code"
                                variant="outlined"
                                fullWidth
                                value={authCode}
                                onChange={(e) => setAuthCode(e.target.value)}
                                required
                            />
                            <Button 
                                type="submit" 
                                variant="contained" 
                                color='secondary'
                                sx={{ marginTop: '10px' }}
                            >
                                Submit
                            </Button>
                        </form>
                    </Box>
                </Modal>
            </PermissionLayout>

        </AuthLayout>
    );
};

export default CustomerCreatePage;
