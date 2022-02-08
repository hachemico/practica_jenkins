
 PARAM_EJECUTOR = process.argv[2];
 PARAM_MOTIVO = process.argv[3];
 TOKEN = process.argv[4];


console.log(PARAM_EJECUTOR);
console.log(PARAM_MOTIVO);

git config --global user.email \'hachemico@gmail.com\'
git config --global user.name \'hachemico\'
git set-url origin https://github.com/hachemico/practica_jenkins.git
git add .
git commit -m 'Pipeline ejecutada por $PARAM_EJECUTOR . MOTIVO: $PARAM_MOTIVO "
git push origin main