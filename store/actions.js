// fetch user inof
import {   setUserInfo } from './global';

export const fetchUserInfo = () => async (dispatch,data) => {

  console.log('🚀🚀🚀🚀🚀🚀🚀🚀🚀  dispath heere------>',);
 dispatch(setUserInfo(data));
}