import jwtDecode from 'jwt-decode';
import { useSelector } from 'react-redux';
import { selectCurrentToken } from '../features/user/userSlice';
import { getMe } from '../features/user/userApiSlice';


function useAuth() {


    const token = useSelector(state => state.user.token);

    // console.log(token);
    let isAuth = false;
    let wallet = 0;

    // let isAdmin = false
    // let status = 'User'
    // let myData;
    // const myWallet = async () => {
    //     myData = await getMe();
    //     wallet = myData.wallet;
    // };

    if (token) {
    // console.log('useAuth', token);
        // myWallet();
        // console.log(myData);
        
        const decoded = jwtDecode(token);
        const { username, email } = decoded;
        isAuth = true
        

        // isAdmin = roles.includes('Admin');

        // if (isAdmin) status = 'Admin'

        return { username, email, isAuth }
    }
    return { username: '', email: '', isAuth }
}

export default useAuth