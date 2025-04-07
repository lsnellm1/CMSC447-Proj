"use client"
import 'bootstrap/dist/css/bootstrap.css'
import "../../styles/globals.css"
import { useUser } from '@auth0/nextjs-auth0/client';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function SignInPage() {
    const {isLoading,user } = useUser();
    const router = useRouter()

    useEffect(() => {
        if (!isLoading) {
            if(user != null){
                router.push("/userpage");
            } else {
                router.push("/api/auth/login");
            }
        }
    }
    , [isLoading, router]); // Add user and router as dependencies
    return;
}