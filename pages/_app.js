import '../styles/globals.css'
import { ChakraProvider } from '@chakra-ui/react'
import { useRecoilValue ,RecoilRoot} from 'recoil'
import AuthContext from '../context/global';
import Navbar from '../components/navbar';
import 'antd/dist/antd.css';
import FilterModal from '../components/filterModal';
import AllContext from '../context/diff';
import Cartbar from '../components/cartbar';
function MyApp({ Component, pageProps }) {

return (


 
       <AuthContext>
        <AllContext>
      
        <Navbar/>
      <Cartbar/>
        <FilterModal/>
  <Component {...pageProps} />

        </AllContext>

  </AuthContext>

  
 

  )
}

export default MyApp



//     // <ChakraProvider> 
//  {/* <RecoilRoot> */}
//  <AuthContext>
      
//  <Navbar/>
// <Component {...pageProps} />


// </AuthContext>
// {/* </RecoilRoot> */}
// // </ChakraProvider>


