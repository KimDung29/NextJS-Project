'use client'
import { RootState } from "@/app/lib/store";
import { useSelector } from "react-redux";

const DashboardHome = () => {
  const auth = useSelector((state:RootState) => state.auth);

//   const email = auth.user.email

//   console.log(auth)
  

//   useEffect(() => {
//     if (email) {
//       const fetchData = async () => {
//         const res = await credRequest.post("/users", {email});
//         if (res.status !== 200) throw new Error("something was wrong");
       
//         // const response = await res.json();
//         console.log('user: ', res)
//       };
//       fetchData();
//     }
//   }, [email]);
  


  // const name = auth?.user.name;
  // const email = auth?.user.email

    return (
        <div>home</div>
    )
}

export default DashboardHome;