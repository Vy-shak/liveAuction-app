"use client"
import { YourName,YourEmail,YourPassword, Navbar, Progressdiv,YourProfile } from '../../components/index';
import { CarImg } from '@/public';
import Image from 'next/image';
import { Button } from '../../components/index';
import UseUserStore from '@/lib/stateStore/userStore';
import UseCount from '@/lib/stateStore/dataCount';
import axios from 'axios';

export default function Authpage() {
    const {count} = UseCount();
    const {userData} = UseUserStore();
    console.log(userData)

    console.log("url",process.env.NEXT_PUBLIC_HTTP_URL)

    const signupUser = async ()=>{
        const url = process.env.NEXT_PUBLIC_HTTP_URL
        if (!url) {
            console.log("url not found");
            return
        }
        const {fullname, email, password, profileUrl} = userData;
        console.log(userData)
        if (!fullname&&!email&&!password) {
            console.log("credential missing");
            return
        }
        const {data} = await axios.post(`${url}user/signup`,{fullname, email, password, profileUrl});
        console.log(data)
    }

    
    return (
        <div className='w-full flexCenter h-screen px-12'>
            <Navbar />
            <Progressdiv/>
            {count==1?<YourName />:null}
            {count==2?<YourEmail />:null}
            {count==3?<YourPassword />:null}
            {count==4?<YourProfile />:null}
            {count==4&&userData.profileUrl!==""?<Button onClick={signupUser} className='absolute bottom-8 right-8'>Launch app</Button>:null}
            {count==4&&userData.profileUrl===""?<Button onClick={signupUser} className='absolute bottom-8 right-8'>Skip & Launch app</Button>:null}
            <div className='w-1/2 px-20 z-50'>
              <Image alt='carimage' src={CarImg} />
            </div>
        </div>
    )
}
