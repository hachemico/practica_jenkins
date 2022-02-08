#!/bin/bash

const PARAM_EJECUTOR = process.argv[2];
const PARAM_MOTIVO = process.argv[3];

console.log(usuario)
console.log(password)

git config --global user.email \'hachemico@gmail.com\'
git config --global user.name '\hachemico\'

git set-url origin https://github.com/hachemico/practica_jenkins.git
git add .
git commit -m 'Pipeline ejecutada por $PARAM_EJECUTOR . MOTIVO: $PARAM_MOTIVO "
git push origin main