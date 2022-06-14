import { atom, selector } from 'recoil';

export const userState = atom({
    key: "userState",
    default: {
      currentUser: 'maher',
      authenticated: false,
      open: false,
    },
  });



  export const newuser2 = atom({
    key: "userState",
    default: {
     name: 'maher2',
    },
  });


  export const countState = atom({
    key: 'countState',
    default: 0,
});

