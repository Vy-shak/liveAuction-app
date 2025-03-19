"use client"
import React, { useRef } from 'react';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import axios from 'axios';
import {useRouter} from 'next/navigation';


function Signinform2() {
    const emailRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);
    const Router = useRouter()

    async function handlelogin() {
        const password = passwordRef.current?.value;
        const email = emailRef.current?.value;

        try {
            const url = process.env.NEXT_PUBLIC_HTTP_URL;
            if (!url) {
                console.log('URL not found');
                return;
            }
            const signinData = await axios.post(
                `${url}user/signin`,
                { password, email },
                {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                }
            );

            console.log(signinData);

            if (signinData.data?.token) {
                localStorage.setItem('token', signinData.data?.token);
                Router.push('/dashboard/home')
            }
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <>
                        <div className="w-full flex gap-5 justify-start items-start flex-col">
                    <div className="w-full gap-y-3 flex justify-start items-start flex-col">
                        <h3 className="text-2xl font-bold">
                            <span>Hello, gentleman! I have already set up an account for you to save your time</span>
                            <br />
                            <span>please login and check my product</span>
                        </h3>
                        <h2 className="text-md font-normal text-neutral-500">
                            Log in to bid on timeless classics and rare finds
                        </h2>
                    </div>
                    <div className="w-full flexCenter flex-col bg-white gap-y-4">
                        <Input  defaultValue={"tylerDurdan@gmail.com"} ref={emailRef} type="email" placeholder="tylerDurdan@gmail.com" />
                        <Input defaultValue={"Hello@123"} ref={passwordRef} type="password" placeholder="Hello@1234" />
                        <Button className="w-full" onClick={handlelogin}>
                            Login
                        </Button>
                    </div>
                </div>
        </>
    );
}

export default Signinform2;