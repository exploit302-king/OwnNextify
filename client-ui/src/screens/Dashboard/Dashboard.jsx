import { useAuth } from '../../context/auth';
import Sidebar from './Sidebar';
import { Outlet } from 'react-router-dom';

const Dashboard = () => {
  const { auth } = useAuth(); 
  return (
    <div className='flex' >
      <Sidebar />
      {/* Main Content */}
      {/* <main className=' flex flex-1 flex-col ' >
        <h1 className='text-5xl pl-10 flex-1 text-center pb-5 text-black' >Dashboard</h1>
        <p className='text-black flex-1 text-3xl ml-5 text-center ' >
          Welcome,  {auth?.user?.isAdmin ? "Admin" : "User" } 
        </p>
      </main> */}
     
      <Outlet />
    </div>
  );
};

export default Dashboard;
