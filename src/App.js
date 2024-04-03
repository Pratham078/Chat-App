// import './App.css';
// import Dashboard from './modules/Dashboard';
// import Form from './modules/Form'
// import { Routes, Route , Navigate } from 'react-router-dom';

// // const ProtectedRoute = ({ children, auth = false }) => {
// //   const isLoggedIn = localStorage.getItem('user:token') !== null || false;

// //   console.log('isLoggedIn:', isLoggedIn);
// //   console.log('auth:', auth);
// //   console.log('pathname:', window.location.pathname);

// //   if (!isLoggedIn && auth) {
// //     console.log('Redirecting to sign-in page');
// //     return <Navigate to='/users/sign-in' />;
// //   } else if (isLoggedIn && !auth && ['/users/sign-up', '/users/sign-in'].includes(window.location.pathname)) {
// //     console.log('Redirecting to dashboard');
// //     return <Navigate to='/' />;
// //   }

// //   console.log('Rendering children');
// //   return children;
// // };

// const ProtectedRoute = ({ children, auth = false }) => {
//   const isLoggedIn = localStorage.getItem('user:token') !== null;

//   if (!isLoggedIn && auth) {
//     return <Navigate to="/users/sign-in" />;
//   } else if (isLoggedIn && !auth) {
//     return <Navigate to="/" />;
//   }

//   return children;
// };
// function App() {
//   return (
//       <Routes>
//         <Route path='/' element={
//           <ProtectedRoute auth={true}>
//             <Dashboard/>
//           </ProtectedRoute>
//         }/>
//         <Route path='/users/sign-in' element={
//           <ProtectedRoute>
//             <Form isSignInPage={true}/>
//           </ProtectedRoute>
//         }/>
//         <Route path='/users/sign-up' element={
//           <ProtectedRoute>
//             <Form isSignInPage={false}/>
//           </ProtectedRoute>
//         }/>
//       </Routes>
//   );
// }

// export default App;

import './App.css';
import Dashboard from './modules/Dashboard';
import Form from './modules/Form'
import { Routes, Route, Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children, auth = false }) => {
  const isLoggedIn = localStorage.getItem('user:token') !== null;

  if (!isLoggedIn && auth) {
    return <Navigate to="/users/sign-in" />;
  } else if (isLoggedIn && !auth) {
    return <Navigate to="/" />;
  }

  return children;
};

function App() {
  return (
    <Routes>
      <Route
        path='/'
        element={
          <ProtectedRoute auth={true}>
            <Dashboard/>
          </ProtectedRoute>
        }
      />
      <Route path='/users/sign-in' element={<Form isSignInPage={true}/>} />
      <Route path='/users/sign-up' element={<Form isSignInPage={false}/>} />
    </Routes>
  );
}

export default App;