"use client"
import { YourName,YourEmail,YourPassword } from '../../components/index';
import { useUserStore ,useCount} from '@/lib/stateStore/index';


export default function Authpage() {
    const {count,updateCount} = useCount();
    const {userData,updateUserData} = useUserStore();
    return (
        <div className='w-full flexCenter h-screen px-12'>
            {count==1?<YourName />:null}
            {count==2?<YourEmail />:null}
            {count==3?<YourPassword />:null}
            <div className='w-1/2 z-50'>
               <div className='w-full px-6 bg-neutral-400'>

               </div>
            </div>
        </div>
    )
}
