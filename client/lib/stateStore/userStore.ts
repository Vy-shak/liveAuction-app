import { create } from 'zustand';

interface UserDetails {
  email?: string;
  fullname?: string;
  password?: string;
  profileUrl: string;
}

interface SetterProp {
  type: keyof UserDetails; 
  val: string;
}

interface Store {
  userData: UserDetails;
  updateUserData: (data: SetterProp) => void;
}

const initialVal: UserDetails = {
  email: '',
  fullname: '',
  password: '',
  profileUrl: '',
};

const UseUserStore = create<Store>((set) => ({
  userData: initialVal,
  updateUserData: ({ type, val }) =>
    set((state) => {
      const updatedUser = {...state.userData};
      updatedUser[type] = val;
      return { userData: updatedUser}
    }),
}));

export default UseUserStore;
