// pages/customers/[id].js

import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import AuthLayout from '@/components/templates/AuthLayout';
import PermissionLayout from '@/components/templates/PermissionLayout';
import MainLayout from '@/components/templates/layout/MainLayout';

// Example function to fetch customer data (replace with your actual data fetching logic)
const fetchCustomerData = async (id) => {
    const response = await fetch(`/api/customers/${id}`);
    if (!response.ok) {
        throw new Error('Failed to fetch customer data');
    }
    return response.json();
};

const CustomerPage = () => {
    const router = useRouter();
    const { id } = router.query;
    const [customer, setCustomer] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (id) {
            fetchCustomerData(id)
                .then(data => setCustomer(data))
                .catch(err => setError(err.message));
        }
    }, [id]);

    if (error) return <p>Error: {error}</p>;
    if (!customer) return <p>Loading...</p>;

    return (
        <AuthLayout>
            <PermissionLayout permission={['customer', 'super', 'owner']} role={['admin', 'member']}>
                <MainLayout>
                    <div>
                        <h1>Customer Details</h1>
                        <p><strong>ID:</strong> {customer}</p>
                        <p><strong>Name:</strong> {customer}</p>
                        <p><strong>Email:</strong> {customer}</p>
                        <p><strong>Phone:</strong> {customer}</p>
                    </div>
                </MainLayout>
            </PermissionLayout>
        </AuthLayout>
        
    );
};

export default CustomerPage;
