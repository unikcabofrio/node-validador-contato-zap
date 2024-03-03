import { save, list } from './editTxt.js';

let OpSufix = ['99600-99653', '99700-99999', '98100-98187', '98800-98839', '98841-98849', '98851-98854', '98857-98859', '98861-98879', '97400-97406', '99101-99105', '99200-99219', '99221-99229', '99231-99239', '99241-99249', '99251-99259', '99261-99269', '99271-99279', '99281-99293'];

let textClintCordial = [
    'Olá, tudo bem com você?',
    'Oi, como você está?',
    'Que bom que te encontrei, tenho uma coisa para te falar.',
    'Você não vai acreditar nessa novidade.',
]

let textClintCap = [
    'Oferecemos planos de TV Online para você e sua família desfrutarem de momentos únicos.',
    'Não perca mais tempo procurando um app de filmes, series e canais de TV.',
    'Já pensou ter todas as plataformas de streming em um só lugar?',
    'Economize mais de R$ 200,00 todos os meses.'
]


export default async function generatorContact(client, _serialized) {

    if (!isWithinWorkingHours()) {
        client.sendMessage(_serialized,'*⚠ INFORMAÇÃO*\nFora do horário de funcionamento. A função será ignorada.')
        console.log('\n\n[ NODE - WZAP] - Fora do horário de funcionamento. A função será ignorada.\n\n');
        return;
    }

    let countSendMsg = 0

    let maxNumber = 10000;
    let arrayContato = await list();

    let lastNumber = 0;

    if (arrayContato.length > 0) {
        lastNumber = arrayContato[arrayContato.length - 1].trim();
        lastNumber = lastNumber.split('-');
        lastNumber = parseInt(lastNumber[1]) + 1;
    }

    console.log(`[ NODE - WZAP] - starting carrier verification`);

    for (const sufix of OpSufix) {

        if (!isWithinWorkingHours()) {break}
        const splitSufix = sufix.split('-');

        for (let i_sufix = parseInt(splitSufix[0]); i_sufix <= parseInt(splitSufix[1]); i_sufix++) {

            if (!isWithinWorkingHours()) {break}
            
            for (let i = lastNumber; i < maxNumber; i++) {

                if (!isWithinWorkingHours()) {break}
                const sufix_contato = String(i).padStart(4, '0');
                const contato = `5522${i_sufix}-${sufix_contato}`;

                await client.isRegisteredUser(`5522${i_sufix}${sufix_contato}@c.us`)
                    .then(async result => {
                        if (result) {
                            const delayTime = Math.floor(Math.random() * (60 - 40 + 1) + 40);
                            await new Promise(resolve => setTimeout(resolve, delayTime * 1000));

                            console.log(`[ NODE - WZAP] - Contact ( ${contato} ) Validated `);
                            save(contato);
                            countSendMsg ++

                            let text = `${textClintCordial[Math.floor(Math.random() * (3 - 0) + 0)]}😊`
                                +`\n${textClintCap[Math.floor(Math.random() * (3 - 0) + 0)]}`
                                +`\n`
                                +`\nTemos planos a partir de R$ 24,90/mensais 🤑🤑`
                                +`\nCom nosso pacote, você terá *2 telas disponíveis* para utilizar *simultaneamente*.`
                                +`\n`
                                +`\nO que acha de fazer um teste *GRÁTIS*? 🥰`
                                +`\nEntre em contato com:`
                                +`\n5522992846675`

                            // enviando msg marketing para o cliente
                            client.sendMessage(`5522${i_sufix}${sufix_contato}@c.us`,text);
                        }
                    });
            }
        }
    }

    arrayContato = await list();

    let textSend = `*⚠ INFORMAÇÃO*`
        +`\nPrograma finalizado, horário de atendimento encerrado.`
        +`\n`
        +`\n🟢 Mensagem: ${countSendMsg}`
        +`\n🟢 Contatos: ${arrayContato.length}`

    client.sendMessage(_serialized,textSend);
    console.log('\n\n[ NODE - WZAP] - Programa finalizado horário de atendimento encerrado.\n\n')
}

function isWithinWorkingHours() {
    const currentHour = new Date().getHours();
    return currentHour >= 7 && currentHour < 18;
}
