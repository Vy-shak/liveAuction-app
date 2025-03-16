import { create } from 'zustand';

interface UserDetails {
    fullname: string,
    userId: number,
    profileUrl: string,
}

interface SetterProp {
  type: keyof UserDetails; 
  val: string;
}

interface Store {
  myuser: UserDetails;
  updateMyuser: (data: SetterProp) => void;
}

const initialVal: UserDetails = {
  fullname: "",
  userId: 0,
  profileUrl: "",
};

const UsemyUserstore = create<Store>((set) => ({
    myuser: initialVal,
    updateMyuser: ({ type, val }) =>
    set((state) => {
      const updatedUser = {...state.myuser};
      //@ts-ignore
      updatedUser[type] = val;
      return { myuser: updatedUser}
    }),
}));

export default UsemyUserstore;