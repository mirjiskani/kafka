const { kafka } = require("./client");
const group = process.argv[2];
async function init(){
     const consumer = kafka.consumer({groupId:group});
     console.log('consumer connecting');
     await consumer.connect()
     console.log('consumer connected.');
     await consumer.subscribe({topics:['rider-update'],fromBeginning:true});
     await consumer.run({
        eachMessage:async ({ topic, partition, message, heartbeat, pause }) => {
            console.log(`Group: ${group} Topic:${topic}; Patition: ${partition}; Message: `,message.value.toString());
        }
     })
     
}
init();