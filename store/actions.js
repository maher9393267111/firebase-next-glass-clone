// fetch user inof
import {   setUserInfo } from './global';

export const fetchUserInfo = () => async (dispatch) => {

  console.log('🚀🚀🚀🚀🚀🚀🚀🚀🚀  dispath heere------>',);
 dispatch(setUserInfo({name:'majd',email:'maher'}));
}