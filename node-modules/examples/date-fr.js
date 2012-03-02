var strftime = require('prettydate').strftime;

strftime.addLocale('fr',
{
        a: ['dim', 'lun', 'mar', 'mer', 'jeu', 'ven', 'sam'],
        A: ['dimanche', 'lundi', 'mardi', 'mercredi', 'jeudi', 'vendredi', 'samedi'],
        b: ['jan', 'fév', 'mar', 'avr', 'mai', 'jun', 'jui', 'aoû', 'sep', 'oct', 'nov', 'déc'],
        B: ['janvier', 'février', 'mars', 'avril', 'mai', 'juin', 'juillet', 'août', 'septembre', 'octobre', 'novembre', 'décembre'],
        c: '%a %d %b %Y %T %Z',
        p: ['', ''],
        P: ['', ''],
        x: '%d.%m.%Y',
        X: '%T'
});

console.log(strftime(new Date, "%c", "fr"))
