import React from "react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { useAuth } from "../context/global";
import { useEffect, useState, useRef } from "react";
import UserEditForm from "../components/userEditForm";
import { setname } from "../store/global";
import { useDispatch,useSelector } from "react-redux";
const Edituser = () => {
  const { userinfo } = useAuth();

  const [phone, setPhone] = React.useState("");

  const [urlimage, setUrlimage] = React.useState("");
  const ImageInputRef = useRef();

  const coverimageref = useRef();

  const dispatch = useDispatch()

  const {name} = useSelector((state) => state.global)


  const [coverimage, setCoverimage] = React.useState("");



  const handlechangeimage = (e) => {
    e.preventDefault();
    let reader = new FileReader();
    let file = e.target.files[0];
    reader.onloadend = () => {
      setUrlimage(reader.result);
      console.log(reader.result);
    }
    reader.readAsDataURL(file);


   
  };

  const handluserinputClicked = (e) => {
    ImageInputRef.current.click();
  };

  const handlecoverchangeimage = (e) => {
   
    e.preventDefault();
    let reader = new FileReader();
    let file = e.target.files[0];
    reader.onloadend = () => {
      setCoverimage(reader.result);
      console.log(reader.result);
    }
    reader.readAsDataURL(file);

   
  };

  const handlcoverinputClicked = (e) => {
    coverimageref.current.click();
  };

const changename = (e) => {
e.preventDefault();
dispatch(setname('hhhhhhhhhhh'))

}



  return (
    <div className=" mt-16 pb-16 mb-16 ">
      <div className=" w-[575px] mx-auto min-h-[666px] shadow-xl ">
        {/* ---cover- */}

        <div
        onClick={changename}
        className="image-cover">
            {name}
          <div className=" relative">

{! userinfo?.coverimage ? 

            <img
              className=" w-full h-[210px]  object-cover"
              src={
                coverimage
                  ? coverimage
                  : `https://salinaka-ecommerce.web.app/images/defaultBanner.accdc757f2c48d61f24c4fbcef2742fd.jpg`
              }
              alt=""
            />
  :  (  <img
    className=" w-full h-[210px]  object-cover"
    src={
        coverimage ? coverimage :userinfo?.coverimage
    }
    alt=""
  />)}

            

            <div className=" absolute w-full     bottom-[-28px]">
              <div className=" flex justify-between">
                <div className="usser-image">
                  <div className=" relative">
                    <img
                      className="w-24  h-24 rounded-full  ml-6"
                      src={urlimage ? urlimage : userinfo?.image}
                      alt=""
                    />

                    <div>
                      <div>
                        <img
                          onClick={handluserinputClicked}
                          className=" w-8 h-8 rounded-full mt-6 absolute  bottom-[35px] right-[-48px]  mr-8 ml-6"
                          src="https://cdn4.iconfinder.com/data/icons/symbol-blue-set-1/100/Untitled-2-92-256.png"
                          alt=""
                        />

                        <input
                          onChange={handlechangeimage}
                          type="file"
                          className=" hidden"
                          ref={ImageInputRef}
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="  mt-6   mr-8 ml-6">
                  <img
                    onClick={handlcoverinputClicked}
                    className=" w-8 h-8 rounded-full"
                    src="https://cdn4.iconfinder.com/data/icons/symbol-blue-set-1/100/Untitled-2-92-256.png"
                    alt=""
                  />

                  <input
                    onChange={handlecoverchangeimage}
                    type="file"
                    className=" hidden"
                    ref={coverimageref}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* ------form edit- */}

<div className=" mt-12 ml-12">

<UserEditForm userimage ={urlimage} coverimage ={coverimage} />    


</div>


      </div>
    </div>
  );
};

export default Edituser;
