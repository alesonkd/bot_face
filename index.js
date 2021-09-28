const model = require('./utils/modelLoader');
const puppeteer = require('puppeteer');
const fs = require('fs');
const os = require('os');
require ('dotenv').config();

const ids = [];

model.User.findAll({}).then((data) => {
  data.forEach(item => {
    ids.push(item.id_profile);
  });
}).catch((error) => {
  console.log(error)
});

async function roboFace() {
 
  const browser = await puppeteer.launch({ headless: false, waitUntil: 'load', timeout: 0 });
  const context = browser.defaultBrowserContext();

  context.overridePermissions("https://www.facebook.com", ["geolocation", "notifications"]);
  const page = await browser.newPage();

  await page.setDefaultNavigationTimeout(0);

  await page.goto('https://www.facebook.com/');

  await page.type('#email', process.env.LOGIN);
  await page.type('#pass', process.env.PASSWORD);
  await page.click('[type="submit"]');

  await page.waitForNavigation();

  for (const id of ids) {
    try {
      var frase = new Array();
      frase[0] = "Olá, espero que você esteja no melhor dia da sua vida! Obrigada, por aceitar meu convite no Facebook :)";
      frase[1] = "Olá, espero que você esteja muito bem! Valeu por aceitar minha solicitação de amizade 🤝";
      frase[2] = "Juntos somos mais fortes! Obrigado por aceitar o convite de amizade que te enviei ✌️";
    
      function obterFrase() {
        var i = Math.floor(3 * Math.random());
        return frase[i];
      }

      await page.goto(`https://www.facebook.com/${id}`);

      try {
        await page.waitForSelector('[aria-label="Adicionar"]');
      } catch (e) {
        continue;
      }

      let add = 1;

      const botaoAdd = await page.$x('/html/body/div[1]/div/div[1]/div/div[3]/div/div/div[1]/div[1]/div/div/div[3]/div/div/div/div[2]/div/div/div/div[1]') || "";
      if (botaoAdd !== "") {
        await botaoAdd[0].click();
      } else {
        add = 0;
      }

      model.User.update(
        { add: add },
        { where: { id: id } }
      ).then(result =>
        handleResult(result)
      ).catch(err =>
        handleError(err)
      )

      const botaoMsg = await page.$x('/html/body/div[1]/div/div[1]/div/div[3]/div/div/div[1]/div[1]/div/div/div[3]/div/div/div/div[2]/div/div/div/div[2]') || "";
      if (botaoMsg !== "") {
        await botaoMsg[0].click();
        let message = 1;
        try {
          await page.waitForXPath('/html/body/div[1]/div/div[1]/div/div[5]/div/div[1]/div[1]/div[1]/div/div/div/div/div/div/div[2]');
        } catch (e) {
          message = 0;
          continue;
        }

        model.User.update(
          { message: message },
          { where: { id: id } }
        ).then(result =>
          handleResult(result)
        ).catch(err =>
          handleError(err)
        )

      }

      const inputMsg = await page.$x('/html/body/div[1]/div/div[1]/div/div[5]/div/div[1]/div[1]/div[1]/div/div/div/div/div/div/div[2]');
      await inputMsg[0].type(obterFrase() + "\n");

      await page.$x('/html/body/div[1]/div/div[1]/div/div[5]/div/div[1]/div[1]/div[1]/div/div/div/div/div/div/div[1]/div/div/div[3]/span[4]/div');

    } catch (e) {
    fs.appendFile("error.log", e + os.EOL, function (err) {
      return;
    });
  }
} 

await browser.close();
}

roboFace();