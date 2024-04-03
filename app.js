const express = require('express');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
require('./db/connection');

const Users = require('./models/Users');
const Conversations = require('./models/Conversation');
const Messages = require('./models/Messages');

const port = process.env.PORT || 8000;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

app.get('/', (req, res) => {
    res.send('Welcome');
})

app.post('/api/register',async (req, res) => {
    try{
        const { name, email, password } = req.body;
        if(!name || !email || !password) {
            return res.status(400).json({msg: 'Please enter all fields'});
        }else {
            const isAlreadyExist = await Users.findOne({email});
            if(isAlreadyExist) {
                return res.status(400).json({msg: 'User already exists'});
            } else {
                const newUser = new Users({name, email});
                bcryptjs.hash(password, 10, (err, hashedPassword) => {
                    newUser.set('password', hashedPassword);
                    newUser.save();
                    return res.status(200).json({msg: 'User created successfully'});
                })
            }
        }
    }catch (error) {
        console.log(error,'error')
    }
})

app.post('/api/login',async (req, res,next) => {
    try{
        const { email, password } = req.body;
        if(!email || !password) {
            return res.status(400).json({msg: 'Please enter all fields'});
        }else {
            const user = await Users.findOne({email});
            if(!user) {
                return res.status(400).json({msg: 'User does not exist'});
            } else {
                const isMatch = await bcryptjs.compare(password, user.password);
                if(!isMatch) {
                    return res.status(400).json({msg: 'Invalid credentials'});
                } else {
                    const payload = {
                        userId: user._id,
                        email: user.email
                    }
                    const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY || 'mysecretkey';
                    jwt.sign(payload, JWT_SECRET_KEY, {expiresIn:84600}, async (err, token) => {
                        await Users.updateOne({_id:user._id},{
                            $set: {token}
                        })
                        user.save();
                        return res.status(200).json({user: { id: user._id, email:user.email, name:user.name}, token: token});
                    })
                }
            }
        }
    } catch (error) {
        console.log(error,'Error')
    }
})

app.post('/api/conversations', async (req, res) => {
    try {
        const { sender, receiver } = req.body;
        const newConversation = new Conversations({members: [sender, receiver]});
        await newConversation.save();
        res.status(200).json({msg: 'Conversation created successfully'});
    } catch (error) {
        console.log(error,'error')
    }
})

app.get('/api/conversations/:userId', async (req, res) => {
    try {
        const userId = req.params.userId;
        const conversations = await Conversations.find({members : {$in: [userId] } });
        const conversationUserData = Promise.all(conversations.map(async (conversation) => {
            const receiver = conversation.members.find((member) => member !== userId);
            const user = await Users.findById(receiver);
            return {user: {email : user.email, name: user.name}, conversationId: conversation._id}
        }))
        res.status(200).json( await conversationUserData);
    } catch (error) {
        console.log(error,'error')
    }
})

app.post('/api/message', async (req, res) => {
    try {
        const { conversationId, sender, message, receiver='' } = req.body;
        if(!sender || !message) return res.status(400).json({msg: 'Please enter all fields'});
        if(!conversationId && receiver) {
            const newConversation = new Conversations({members: [sender, receiver]});
            await newConversation.save();
            const newMessage = new Messages({conversationId: newConversation._id, sender, message});
            await newMessage.save();
            return res.status(200).json({msg: 'Message sent successfully'});
        } else if(!conversationId && !receiver) {
            return res.status(400).json({msg: 'Please enter all fields'});
        }
        const newMessage = new Messages({conversationId, sender, message});
        await newMessage.save();
        res.status(200).json({msg: 'Message sent successfully'});
    } catch (error) {
        console.log(error,'error')
    }
})

app.get('/api/message/:conversationId', async (req, res) => {
    try {
        const conversationId = req.params.conversationId;
        if(conversationId==="new") return res.status(200).json([]);
        const messages = await Messages.find({conversationId});
        const messageUserData = Promise.all(messages.map(async (message) => {
            const user = await Users.findById(message.senderId);
            return {user: {email : user.email, name: user.name}, message: message.message}
        }));
        res.status(200).json(messageUserData);
    } catch (error) {
        console.log(error,'error')
    }
})

app.get('/api/users', async (req, res) => {
    try {
        const users = await Users.find();
        const usersData = Promise.all(users.map(async (user) => {
            return {user: {email : user.email, name: user.name}, userId: user._id}
        }))
        res.status(200).json(await usersData);
    } catch (error) {
        console.log(error,'error')
    }
})

const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: 'http://localhost:3000', // Replace with your client URL
        methods: ['GET', 'POST'],
    },
});

io.on('connection', (socket) => {
    console.log('A user connected');

    socket.on('sendMessage', async ({ message, receiver }) => {
        try {
            const loggedInUser = JSON.parse(localStorage.getItem('user:detail'));
            const senderId = loggedInUser.id;

            // Check if a conversation exists between the sender and receiver
            let conversation = await Conversations.findOne({
                members: { $all: [senderId, receiver] },
            });

            // If no conversation exists, create a new one
            if (!conversation) {
                conversation = new Conversations({ members: [senderId, receiver] });
                await conversation.save();
            }

            // Save the message to the database
            const newMessage = new Messages({
                conversationId: conversation._id,
                senderId,
                message,
            });
            await newMessage.save();

            // Emit the message to the receiver's socket connection
            const receiverSocket = io.sockets.sockets.get(receiver);
            if (receiverSocket) {
                receiverSocket.emit('receiveMessage', {
                    message,
                    sender: loggedInUser.name,
                });
            }
        } catch (error) {
            console.error('Error sending message:', error);
        }
    });

    socket.on('disconnect', () => {
        console.log('A user disconnected');
    });
});

app.listen(port , () => {
    console.log(`Server is running on port ${port}`);
})