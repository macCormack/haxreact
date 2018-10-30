import React from 'react';
import '../../styles/404.css'

// const ele = document.getElementById('page-loader')
//     if(ele){
//         // fade out
//         ele.classList.add('hidden')
//             setTimeout(() => {
//                 // remove from DOM
//                 ele.outerHTML = ''
//             }, 500)
//     }

const Error404 = ({ location }) => (
    <div className="container error-content">
        <h1>ERROR 404</h1>
       <p>Requested URL <code>{location.pathname}</code> was not found</p>
    </div>,
    document.getElementById('page-loader').classList.add('hidden')
);

export default Error404