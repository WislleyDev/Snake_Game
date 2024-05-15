function identificarTipoDispositivo() {
    const userAgent = navigator.userAgent;
    const platform = navigator.platform;
    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(userAgent)) {
        return 'Celular';
    } else if (/Windows|Win16|Win32|Win64/i.test(platform)) {
        return 'PC';
    } else if (/Macintosh|MacIntel|MacPPC|Mac68K/i.test(platform)) {
        return 'Mac';
    } else if (/Linux/i.test(platform)) {
        // Verifica se é uma Smart TV baseada em Linux
        if (/SMART-TV|SmartTV|smarttv|Smart|HbbTV|NetCast|Linux/i.test(userAgent)) {
            return 'TV';
        } else {
            // Se não for uma Smart TV, assume-se que seja um dispositivo Linux não específico
            return 'Linux';
        }
    } else {
        return 'Desconhecido';
    }
}
function identificarDispositivo() {
const userAgent = navigator.userAgent;
const platform = navigator.platform;

if (/Android/i.test(userAgent)) {
return 'Android';
} else if (/iPhone|iPad|iPod/i.test(userAgent)) {
return 'iOS';
} else if (/Windows Phone/i.test(userAgent)) {
return 'Windows Phone';
} else if (/Linux/i.test(platform)) {
return 'Linux';
} else if (/Macintosh|MacIntel|MacPPC|Mac68K/i.test(platform)) {
return 'Mac';
} else if (/Windows|Win16|Win32|Win64/i.test(platform)) {
return 'Windows';
} else {
return 'Desconhecido';
}
}

// Obtém informações sobre o dispositivo
const tipoDispositivo = identificarDispositivo();
const larguraTela = window.screen.width;
const alturaTela = window.screen.height;
const tipoDispositivo2 = identificarTipoDispositivo();