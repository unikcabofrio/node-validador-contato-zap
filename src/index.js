// src/index.js
import qrcode from 'qrcode-terminal'
import pkg from 'whatsapp-web.js';
import generatorContact from './contat.js'
import { list } from './editTxt.js';

const { Client, LocalAuth,Buttons } = pkg;
export const client = new Client({ authStrategy: new LocalAuth() });

// QR CODE PARA CONEXÃO
client.on('qr', (qr) => {
    console.log('[ NODE - WZAP] - Scan the QR code to validate WhatsApp');
    qrcode.generate(qr, { small: true });
});

client.on('ready', async () => {
    console.log('\n[ NODE - WZAP] - Customer successfully connected!');
});

client.on('message', async (message) => {

    const { body } = message;
    const { number } = await message.getContact();
    if(number === '5522992846675' || number === '5522992726827'){

        // let button = new Buttons('Button body',[{body:'bt1'},{body:'bt2'},{body:'bt3'}],'title','footer');
        // client.sendMessage(`${number}@c.us`, button);

        switch (body) {

            case 'start':
                generatorContact(client,`${number}@c.us`)
                break;

            case 'listar':
                let arrayContato = await list();
                let textSend = `*⚠ INFORMAÇÃO*`
                    +`\n🟢 Contatos Salvos: ${arrayContato.length}`

                client.sendMessage(`${number}@c.us`,textSend);
                break;

        }
       
    }
   
});


client.initialize()