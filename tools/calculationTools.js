

export const getContasPagas = (pagas, apagar) => {    
    const result = (pagas / apagar) * 100    
    return result.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")
}

export const getClientesRecebidos = (recebidos, areceber) => {
    const result = (recebidos / areceber) * 100
    return result.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")
}

export const getFluxo = (recebidos, pagos) => {
    const result = (recebidos - pagos);
    //.toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'});
    return result.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")
}

export const getIndice = (recebidos, pagos) => {
    let fluxo = parseFloat(getFluxo(recebidos, pagos));
    if (fluxo >= 0) {
        return "SUPERÁVIT";
    } else if (fluxo < 0) {
        return "DÉFICIT"
    }
}

export const getStyle = (recebidos, pagos) => {
    let fluxo = parseFloat(getFluxo(recebidos, pagos));
    if (fluxo >= 0) {
        return { color: '#1203E7' }
    } else if (fluxo < 0) {
        return { color: '#E70303' }
    }
}