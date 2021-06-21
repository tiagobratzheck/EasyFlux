import * as Tools from './calculationTools';


export const getColorPicker = (value) => {
    if (value < 89) {
        return "#E70303"
    } else if (value > 89 && value < 91) {
        return "#FE7402"
    } else if (value > 91 && value < 93) {
        return "#FABB09"
    } else if (value > 93 && value < 95) {
        return "#62FA09"
    } else if (value > 95 && value < 96) {
        return "#86D723"
    } else if (value > 96 && value < 97) {
        return "#23D748"
    } else if (value > 97) {
        return "#0DB337"
    }
}

export const getColor = (realizado, arealizar) => {
    let fluxo = Tools.getContasPagas(realizado, arealizar);
    return getColorPicker(fluxo);
}

export const getColorTablePicker = (value) => {
    if (value < 89) {
        return { color: "#E70303" }
    } else if (value > 89 && value < 91) {
        return { color: "#FE7402" }
    } else if (value > 91 && value < 93) {
        return { color: "#FABB09" }
    } else if (value > 93 && value < 95) {
        return { color: "#62FA09" }
    } else if (value > 95 && value < 96) {
        return { color: "#86D723" }
    } else if (value > 96 && value < 97) {
        return { color: "#23D748" }
    } else if (value > 97) {
        return { color: "#0DB337" }
    }
}