import {Route, Routes, Navigate} from 'react-router-dom'
import Layout from './layouts/Layout';
import HomePage from './pages/HomePage';
import AuthCallbackPage from './pages/AuthCallbackPage';
import UserProfilePage from './pages/UserProfilePage';
import ProtectedRoute from './auth/ProtectedRoute';
import ManageRestaurantPage from './pages/ManageRestaurantPage';


//home layout is being called in AppRoutes
const AppRoutes=()=>{

    return(
        <Routes>
            <Route path="/" element={<Layout showHero> <HomePage/> </Layout>}/>
            <Route path='/auth-callback' element={<AuthCallbackPage/>} />
            <Route element={<ProtectedRoute/>}>
                <Route path='/user-profile' element={<Layout><UserProfilePage/></Layout>}/>
            </Route>
            <Route path='/manage-restaurant' element={<Layout><ManageRestaurantPage/></Layout>}/>
            <Route path='*' element={<Navigate to ='/'/>} /> 
        </Routes>
    );
};

export default AppRoutes