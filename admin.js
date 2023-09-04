// init function 
const {kafka} = require('./client');

async function init(){
    const admin = kafka.admin();
    console.log("Admin connecting");
    await admin.connect();
    console.log("admin connected successfully");
    
    console.log('creating topics');
    await admin.createTopics({
        topics:[{
            topic:'rider-update',
            numPartitions:2
        }]
    })
    console.log('topic created');
    await admin.disconnect();
}
init();