import {Route, Routes, Navigate} from 'react-router-dom'
import Layout from './layouts/Layout';
import HomePage from './components/Pages/HomePage';


//home layout is being called in AppRoutes
const AppRoutes=()=>{

    return(
        <Routes>
            <Route path='/' element={<Layout ><HomePage/></Layout>}/>
            <Route path='/user-profile' element={<span>USER PROFILE PAGE</span>}/>
            <Route path='*' element={<Navigate to ='/'/>} /> 
        </Routes>
    );
};

export default AppRoutes