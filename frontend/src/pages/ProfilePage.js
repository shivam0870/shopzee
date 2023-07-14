 import React, { useContext } from 'react'
 import { Context } from '..';

 const ProfilePage = () => {
     const { isAuthenticated, user } = useContext(Context);
     if (!isAuthenticated) return null;
   return (
     <div className='center'>
           <h2>Name: {user.name}{'\n'}</h2>
           
          <h2>{'\n'}Email: {user.email}</h2>
     </div>
   )
 }

 export default ProfilePage















































