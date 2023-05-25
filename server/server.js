const apiServ = require('./pres/apiPres');
//const consolePres = require(__dirname + '/' +'pres/consolePres');
//const consolePres = require( __dirname + '/' +'./pres/consolePres');
const port = 3001;

async function main(){
  //pour lancer l'api 
  apiServ.start(port);

  //pour lancer la pres console
  //consolePres.start();

}

main();
