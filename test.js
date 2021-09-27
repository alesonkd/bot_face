var frase = new Array ();
frase[0] = "Olá, espero que você esteja no melhor dia da sua vida! Obrigada, por aceitar meu convite no Facebook :)";
frase[1] = "Olá, espero que você esteja muito bem! Valeu por aceitar minha solicitação de amizade 🤝";
frase[2] = "Juntos somos mais fortes! Obrigado por aceitar o convite de amizade que te enviei ✌️"

function obterFrase() {    
     var i = Math.floor(3*Math.random());
     await inputMsg[0].type(frase[i] + "\n");
     
   }

