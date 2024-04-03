const mongoose = require('mongoose');

const url = 'mongodb+srv://chat_app_admin:Pratham))312@cluster604.jdcfxuy.mongodb.net/?retryWrites=true&w=majority&appName=Cluster604'

mongoose.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log('DB Connected')).catch(err => console.log('DB Connection Error: ' ,e))