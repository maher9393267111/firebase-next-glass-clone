import React from "react";
import { useForm } from "react-hook-form";

export default function Login() {

const [name, setName] = React.useState("");
const [email, setEmail] = React.useState("");

  const { register, handleSubmit, watch, formState: { errors } } = useForm();
  

  console.log(watch("name",)); // watch input value by passing the name of it
  console.log(watch("email",)); // watch input value by passing the name of it


  const  onSubmit = (data) => {
 
console.log('data------>', data);

}






  return (
    /* "handleSubmit" will validate your inputs before invoking "onSubmit" */
    <form onSubmit={handleSubmit(onSubmit)}>
        {name}
      {/* register your input into the hook by invoking the "register" function */}
      <input defaultValue="" {...register("name", { required: true })  } />
      
      {errors.name && <span className="  text-red-500 font-bold"
      >name is required</span>}

      {/* include validation with required or other standard HTML validation rules */}
      <input
      
      
      {...register("email", { required: true })  } />
      {/* errors will return when field validation fails  */}
      {errors.email && <span className="  text-red-500 font-bold"
      >email is required</span>}
      
      <input type="submit" />
    </form>
  );
}