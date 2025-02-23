import React from 'react'
import {motion} from "motion/react"
import Image from 'next/image'
import { Button } from '../ui/button'
import { useRef,useState } from 'react'
import { supabase, avatarsPublicurl } from "../../lib/supabase/supabaseClient"


type Profile = {
    id: string,
    url: string
}


function Yourprofile() {
    const uploadImgref = useRef<HTMLInputElement>(null);
    const [Profile, setProfile] = useState<Profile>({ id: 'Avatar2.svg', url: "https://ppppwffeiuaabvrukckb.supabase.co/storage/v1/object/public/appAvatars/Avatar2.svg" })
    const uploadImg = async () => {
        const files = uploadImgref.current?.files;
        if (!files) {
            console.log("files is not present");
            return
        }
        const file = files[0];
        if (!file) {
            console.log("file is not present");
            return
        }
        const randomId = Math.random()
        const profileName = `${randomId}customProfile`
        const upload = await supabase.storage.from('Profilepic').upload(profileName, file);
        const { error } = upload;
        if (error) {
            console.log("unable to upload file")
        }
        const getUrl = await supabase.storage.from("Profilepic").getPublicUrl(profileName);
        const profileUrl = getUrl.data.publicUrl;
        if (!profileUrl) {
            console.log('no url found')
            return
        }
        setProfile({ id: profileName, url: profileUrl });
        //@ts-ignore
        uploadImgref.current.value = null;
    }

  return (
    <motion.div initial={{opacity:50,x:0}} animate={{ opacity: 1,x:30 }} transition={{ duration: 1 }} className='w-1/2 flex justify-start items-start flex-col gap-y-6'>
        <span className='font-extrabold text-2xl text-neutral-700'>Time to create Profile!</span>
        <Image alt='avatar' src={Profile.url} />
        <Button>Upload Profile</Button>
        <input  onChange={uploadImg} ref={uploadImgref} className='hidden' type='file' />
        <span>or</span>
        <span>i will do it later</span>
     </motion.div>
  )
}

export default Yourprofile
