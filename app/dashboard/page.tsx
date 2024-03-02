import NavBar from "../ui/dashboard/navbar";
import { cookies } from 'next/headers';

const DashboardPage = () => {
    const cookieStore = cookies();
    const getAccessToken = cookieStore.get('accessToken');
    const valueAccessToken = getAccessToken?.value as string | undefined;

    function parseJwt(accessToken: any) {
        if (!accessToken) { return; }
       const base64Url = accessToken.split('.')[1];
        const base64 = base64Url.replace('-', '+').replace('_', '/');
        return JSON.parse(atob(base64));
    }
    
    const auth = parseJwt(valueAccessToken);


    return (
        <div className="px-8 py-4">
            <div className="flex justify-between items-center">
                <NavBar auth={auth}/>
            </div>
        </div>
    )
}

export default DashboardPage;

