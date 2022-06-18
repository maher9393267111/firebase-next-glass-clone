// fetch user inof
import {   setUserInfo } from './global';

export const fetchUserInfo = () => async (dispatch,data) => {

  
    dispatch(setUserInfo(data));
}