"use client"
import { YourName,YourEmail,YourPassword, Progressdiv,Yourprofile } from '../../components/index';
import { Button } from '../../components/index';
import { useUserStore ,useCount} from '@/lib/stateStore/index';



export default function Authpage() {
    const {count,updateCount} = useCount();
    const {userData,updateUserData} = useUserStore();
    return (
        <div className='w-full flexCenter h-screen px-12'>
            <Progressdiv/>
            {count==1?<YourName />:null}
            {count==2?<YourEmail />:null}
            {count==3?<YourPassword />:null}
            {count==4?<Yourprofile />:null}
            {count==4&&userData.profileUrl?<Button className='absolute bottom-8 right-8'>Launch app</Button>:null}
            {count==4?<Button variant={"outline"} className='absolute bottom-8 right-8'>Skip & Launch app</Button>:null}
            <div className='w-1/2 z-50'>
               <div className='w-full px-6 bg-neutral-400'>

               </div>
            </div>
        </div>
    )
}
