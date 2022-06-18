import '../styles/globals.css'
import { ChakraProvider } from '@chakra-ui/react'
import { useRecoilValue ,RecoilRoot} from 'recoil'
import AuthContext from '../context/global';
import Navbar from '../components/navbar';
import 'antd/dist/antd.css';
import FilterModal from '../components/filterModal';
import AllContext from '../context/diff';
import Cartbar from '../components/cartbar';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'antd/dist/antd.css'
import SubContext from '../context/sub'

import { wrapper } from "../store/index";

// import dispatch from redux:
import { useDispatch } from "react-redux";

function MyApp({ Component, pageProps }) {







return (


  // <Provider store={initializeStore}>
       <AuthContext>
        <AllContext>
        <SubContext>
      
        <Navbar/>
        <ToastContainer
      
        
        />
      <Cartbar/>
        <FilterModal/>
  <Component {...pageProps} />

        </SubContext>
        </AllContext>

  </AuthContext>

  // </Provider>
  
 

  )
}

export default wrapper.withRedux( MyApp);



//     // <ChakraProvider> 
//  {/* <RecoilRoot> */}
//  <AuthContext>
      
//  <Navbar/>
// <Component {...pageProps} />


// </AuthContext>
// {/* </RecoilRoot> */}
// // </ChakraProvider>


