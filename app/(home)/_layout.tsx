import { Slot, useRouter } from 'expo-router';
import { useEffect } from 'react';
import { useAuth } from '@/src/context/AuthContext';

export default function HomeLayout() {
const { isLoggedIn, loading } = useAuth();
const router = useRouter();

useEffect(() => {
    if(!loading && !isLoggedIn){
        router.replace('/login');
    }
}, [isLoggedIn, loading]);

    return <Slot />;
}