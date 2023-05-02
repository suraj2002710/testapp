const express=require('express');
const app=express()
const FCM=require('fcm-node');

const serverkey="AAAAR6dVltk:APA91bG_lgE-_ea5UYvmH407_FDr8nOxugSq-WvVYWSOXmkAVDXVrD7cBKp2kYv_MvJwVLsaG_kxIWosVqK5syRWzSVlTf_0cjJScMSfiyINA8pshOseLYbe9ECKYmdGvl9gnBikp2JE"
var fcm = new FCM(serverkey);
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.post('/', (req, res) =>{
        const {token}=req.body
        var message = { //this may vary according to the message type (single recipient, multicast, topic, et cetera)
            to: token, 
            collapse_key: 'your_collapse_key',
            
            notification: {
                title: 'Title of your push notification', 
                body: 'Body of your push notification' 
            },}

            fcm.send(message, function(err, response){
                if (err) {
                    console.log("Something has gone wrong!");
                } else {
                    console.log("Successfully sent with response: ", response);
                    res.send("success")
                }
            });
})

app.listen(5200,()=>{
    console.log("server started");
})