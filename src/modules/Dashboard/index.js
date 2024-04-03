
// import Avatar from '../../assets/avatar.svg';
// import React, { useEffect, useState } from 'react';
// import Input from "../../components/input";
// import { initiateSocketConnection } from '../../socket';

// const Dashboard = () => {
//     const contacts = [
//         {
//             name: 'Pratham',
//             status: 'Online',
//             img: Avatar
//         },
//         {
//             name: 'Aman',
//             status: 'Online',
//             img: Avatar
//         },
//         {
//             name: 'Viraj',
//             status: 'Online',
//             img: Avatar
//         },
//         {
//             name: 'Bron',
//             status: 'Online',
//             img: Avatar
//         },
//         {
//             name: 'Prem',
//             status: 'Online',
//             img: Avatar
//         },
//         {
//             name: 'Bhavya',
//             status: 'Online',
//             img: Avatar
//         },
//     ];

//     const [socket, setSocket] = useState(null);
//     const [user, setUser] = useState(JSON.parse(localStorage.getItem('user:detail')));
//     const [conversations, setConversations] = useState([]);
//     const [messages, setMessages] = useState([]);
//     const [messageInput, setMessageInput] = useState('');

//     useEffect(() => {
//         const loggedInUser = JSON.parse(localStorage.getItem('user:detail'));

//         const fetchConversations = async () => {
//             if (loggedInUser && loggedInUser.id) {
//                 const res = await fetch(`http://localhost:8000/api/conversations/${loggedInUser.id}`, {
//                     method: 'GET',
//                     headers: {
//                         'Content-Type': 'application/json',
//                     }
//                 });
//                 const resData = await res.json();
//                 console.log('resData :>>', resData);
//                 setConversations(resData);
//             } else {
//                 console.log('User detail not found in local storage');
//                 // Handle the case where user detail is not found in local storage
//             }
//         };
//         fetchConversations();

//         // Establish Socket.IO connection
//         const newSocket = initiateSocketConnection();
//         setSocket(newSocket);

//         // Handle receiving messages from the server
//         receiveMessage((data) => {
//             setMessages((prevMessages) => [...prevMessages, data]);
//         });

//         // Clean up the Socket.IO connection when the component unmounts
//         return () => {
//             newSocket.disconnect();
//         };
//     }, []);

//     const sendMessage = () => {
//         if (socket && messageInput.trim() !== '') {
//             // Send message to server
//             sendMessageToServer(messageInput);
            
//             // Clear message input
//             setMessageInput('');
//         }
//     };

//     const sendMessageToServer = (message) => {
//         if (socket) {
//             socket.emit('sendMessage', { message, receiver: 'receiverId' }); // Replace 'receiverId' with the actual receiver's ID
//         }
//     };

//     const receiveMessage = (callback) => {
//         if (socket) {
//             socket.on('receiveMessage', (data) => {
//                 callback(data);
//             });
//         }
//     };

//     const handleInputChange = (e) => {
//         setMessageInput(e.target.value);
//     };

//     return (
//         <div className='w-screen flex'>
//             {/* Sidebar */}
//             <div className='w-[25%] h-screen bg-secondary ' style={{ overflowY: 'hidden' }}>
//                 {/* Sidebar content */}
//             </div>

//             {/* Main content */}
//             <div className='w-[50%] h-screen bg-white flex flex-col items-center'>
//                 {/* Header */}
//                 <div className='w-[75%] bg-secondary h-[80px] my-14 rounded-full flex items-center px-14'>
//                     {/* Header content */}
//                 </div>

//                 {/* Messages */}
//                 <div className='flex-grow w-full overflow-scroll border-b'>
//                     {/* Message list */}
//                     <div className='p-10'>
//                         {messages.map((message, index) => (
//                             <div
//                                 key={index}
//                                 className={`max-w-[40%] ${
//                                     message.sender === user.name
//                                         ? 'bg-primary rounded-b-xl rounded-tr-xl ml-auto p-3 text-white mb-5'
//                                         : 'bg-secondary rounded-b-xl rounded-tr-xl p-3 mb-5'
//                                 }`}
//                             >
//                                 {message.message}
//                             </div>
//                         ))}
//                     </div>
//                 </div>

//                 {/* Message input */}
//                 <div className='p-10 w-full flex items-center'>
//                     <Input
//                         placeholder='Enter your message'
//                         className='w-[75%]'
//                         inputClassName='p-2 boder-0 shadow-md rounded-full bg-light focus:ring-0 focus:border-0 outline-none'
//                         value={messageInput}
//                         onChange={handleInputChange}
//                     />
//                     <div
//                         className='ml-4 cursor-pointer bg-light p-2 rounded-full'
//                         onClick={sendMessage}
//                     >
//                         {/* Send button icon */}
//                     </div>
//                 </div>
//             </div>

//             {/* Additional panel */}
//             <div className='w-[25%] h-screen bg-light'></div>
//         </div>
//     );
// }

// export default Dashboard;


import Avatar from '../../assets/avatar.svg';
import React, { useEffect, useState } from 'react';
import Input from "../../components/input";
import { initiateSocketConnection } from '../../socket';

const Dashboard = () => {
    const contacts = [
        {
            name: 'Pratham',
            status: 'Online',
            img: Avatar
        },
        {
            name: 'Aman',
            status: 'Online',
            img: Avatar
        },
        {
            name: 'Viraj',
            status: 'Online',
            img: Avatar
        },
        {
            name: 'Bron',
            status: 'Online',
            img: Avatar
        },
        {
            name: 'Prem',
            status: 'Online',
            img: Avatar
        },
        {
            name: 'Bhavya',
            status: 'Online',
            img: Avatar
        },
    ];

    const [socket, setSocket] = useState(null);
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('user:detail')));
    const [conversations, setConversations] = useState([]);
    const [messages, setMessages] = useState([]);
    const [messageInput, setMessageInput] = useState('');

    useEffect(() => {
        const loggedInUser = JSON.parse(localStorage.getItem('user:detail'));

        const fetchConversations = async () => {
            if (loggedInUser && loggedInUser.id) {
                const res = await fetch(`http://localhost:8000/api/conversations/${loggedInUser.id}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    }
                });
                const resData = await res.json();
                console.log('resData :>>', resData);
                setConversations(resData);
            } else {
                console.log('User detail not found in local storage');
                // Handle the case where user detail is not found in local storage
            }
        };
        fetchConversations();

        // Establish Socket.IO connection
        const newSocket = initiateSocketConnection();
        setSocket(newSocket);

        // Handle receiving messages from the server
        receiveMessage((data) => {
            setMessages((prevMessages) => [...prevMessages, data]);
        });

        // Clean up the Socket.IO connection when the component unmounts
        return () => {
            newSocket.disconnect();
        };
    }, []);

    const sendMessage = () => {
        if (socket && messageInput.trim() !== '') {
            // Send message to server
            sendMessageToServer(messageInput);
            
            // Clear message input
            setMessageInput('');
        }
    };

    const sendMessageToServer = (message) => {
        if (socket) {
            socket.emit('sendMessage', { message, receiver: 'receiverId' }); // Replace 'receiverId' with the actual receiver's ID
        }
    };

    const receiveMessage = (callback) => {
        if (socket) {
            socket.on('receiveMessage', (data) => {
                callback(data);
            });
        }
    };

    const handleInputChange = (e) => {
        setMessageInput(e.target.value);
    };

    return (
        <div className='w-screen flex'>
            {/* Sidebar */}
            <div className='w-[25%] h-screen bg-secondary ' style={{ overflowY: 'hidden' }}>
                {/* Sidebar content */}
            </div>

            {/* Main content */}
            <div className='w-[50%] h-screen bg-white flex flex-col items-center'>
                {/* Header */}
                <div className='w-[75%] bg-secondary h-[80px] my-14 rounded-full flex items-center px-14'>
                    {/* Header content */}
                </div>

                {/* Messages */}
                <div className='flex-grow w-full overflow-scroll border-b'>
                    {/* Message list */}
                    <div className='p-10'>
                        {messages.map((message, index) => (
                            <div
                                key={index}
                                className={`max-w-[40%] ${
                                    message.sender === user.name
                                        ? 'bg-primary rounded-b-xl rounded-tr-xl ml-auto p-3 text-white mb-5'
                                        : 'bg-secondary rounded-b-xl rounded-tr-xl p-3 mb-5'
                                }`}
                            >
                                {message.message}
                            </div>
                        ))}
                    </div>
                </div>

                {/* Message input */}
                <div className='p-10 w-full flex items-center'>
                    <Input
                        placeholder='Enter your message'
                        className='w-[75%]'
                        inputClassName='p-2 boder-0 shadow-md rounded-full bg-light focus:ring-0 focus:border-0 outline-none'
                        value={messageInput}
                        onChange={handleInputChange}
                    />
                    <div
                        className='ml-4 cursor-pointer bg-light p-2 rounded-full'
                        onClick={sendMessage}
                    >
                        {/* Send button icon */}
                    </div>
                </div>
            </div>

            {/* Additional panel */}
            <div className='w-[25%] h-screen bg-light'></div>
        </div>
    );
}

export default Dashboard;


