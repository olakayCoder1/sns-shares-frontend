"use client"
import { FormEvent, useEffect, useState } from 'react';
import { postRequest, getRequest } from '@/utils/axios';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { clearCurrentItem, setError } from '@/store/features/customer';

import { Button } from '@mui/material';
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
    const [loading, setLoading] = useState<boolean>(false);

    const queryParams = new URLSearchParams(searchParams.toString());

    const currentItem = useAppSelector(state => state.customer.item.form);

    useEffect(() => {
        // Clear form data when the component loads
        dispatch(clearCurrentItem());

        // Function to fetch data
        const fetchData = async () => {
            if (queryParams.toString()) {
                setPending!(true);
                // setLoading(true); // Show loader
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
                window.location.href = redirectUrl;
            }
            dispatch(clearCurrentItem());
        }

        if (res.status == 400 && res.data) {
            dispatch(setError(res.data));
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
            </PermissionLayout>
        </AuthLayout>
    );
};

export default CustomerCreatePage;
