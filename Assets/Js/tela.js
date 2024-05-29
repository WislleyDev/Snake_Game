function checkDimensions() {
    let alturaDoScore = document.querySelector('.score').offsetHeight;
    let alturaDosControles = document.querySelector('#controles').offsetHeight;
    let juntos = alturaDoScore + alturaDosControles + 10;
    let alturaDoCorpo = document.body.offsetHeight;
    let calculo = alturaDoCorpo - juntos;

    if (alturaDoCorpo <= 900 || tipoDispositivo2 == 'Celular') {
        console.log(12345);
        canvas.style.width = `${calculo}px`;
    }
}

window.addEventListener('resize', checkDimensions);
checkDimensions(); // Verifica as dimensões inicialmente
