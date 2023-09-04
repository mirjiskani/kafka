const { kafka } = require("./client")

const readline = require('readline');

const rl = readline.createInterface({
    input : process.stdin,
    output:process.stdout
})


async function init(){
    console.log("connecting producer");
    const producer= kafka.producer();
    await producer.connect();
    console.log('producer connected ');
    rl.setPrompt('>');
    rl.prompt();
    rl.on('line', async function(line) {
        const [riderName,location]=line.split(' ')
        await producer.send({
            topic:'rider-update',
            messages:[
                {
                    partition:location.toLocaleLowerCase() === 'south' ? 0 :1,
                    key:'location-update',
                    value:JSON.stringify({name:riderName,loc:location})
                },
               ]
        })
    
    }).on('close',async ()=>{
    console.log('Message sent');
    await producer.disconnect();
    })
}
init();