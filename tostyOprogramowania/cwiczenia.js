const haslo = 'abccdded!';
if (haslo.length <9){
    console.log('Haslo za krotkie');
}else if(haslo.length >15){
    console.log('Haslo za dlugie');

}else if (!haslo.includes('!')){
    console.log('haslo musi miec wykrzyknik');
}else {
    console.log('haslo ok');
}