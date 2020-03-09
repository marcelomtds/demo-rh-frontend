import * as moment from 'moment';

export default class Util {

    static readonly IMAGEFORMATS = ['jpeg', 'jpg', 'png'];
    static readonly FILESIZE = 10485760;

    static isFormatoImagemValido(imagem: File): boolean {
        const array = imagem.name.split('.');
        return this.IMAGEFORMATS.findIndex(x => x.toLocaleLowerCase() === array[array.length - 1].toLocaleLowerCase()) >= 0;
    }

    static calcularIdadeAno(data: Date): number {
        return moment().diff(data, 'years');
    }

    static calcularIdadeMes(data: Date): number {
        return moment().diff(data, 'month');
    }

    static isCpfValido(cpf: string): boolean {
        if (cpf == null) {
            return false;
        }
        if (cpf.length !== 11) {
            return false;
        }
        if ((cpf === '00000000000') || (cpf === '11111111111') || (cpf === '22222222222')
            || (cpf === '33333333333') || (cpf === '44444444444') || (cpf === '55555555555')
            || (cpf === '66666666666') || (cpf === '77777777777') || (cpf === '88888888888')
            || (cpf === '99999999999')) {
            return false;
        }
        let numero = 0;
        let caracter = '';
        const numeros = '0123456789';
        let j = 10;
        let somatorio = 0;
        let resto = 0;
        let digito1 = 0;
        let digito2 = 0;
        let cpfAux = '';
        cpfAux = cpf.substring(0, 9);
        for (let i = 0; i < 9; i++) {
            caracter = cpfAux.charAt(i);
            if (numeros.search(caracter) === -1) {
                return false;
            }
            numero = Number(caracter);
            somatorio = somatorio + (numero * j);
            j--;
        }
        resto = somatorio % 11;
        digito1 = 11 - resto;
        if (digito1 > 9) {
            digito1 = 0;
        }
        j = 11;
        somatorio = 0;
        cpfAux = cpfAux + digito1;
        for (let i = 0; i < 10; i++) {
            caracter = cpfAux.charAt(i);
            numero = Number(caracter);
            somatorio = somatorio + (numero * j);
            j--;
        }
        resto = somatorio % 11;
        digito2 = 11 - resto;
        if (digito2 > 9) {
            digito2 = 0;
        }
        cpfAux = cpfAux + digito2;
        if (cpf !== cpfAux) {
            return false;
        } else {
            return true;
        }
    }

    static isTamanhoArquivoValido(arquivo: File): boolean {
        return arquivo.size < this.FILESIZE;
    }

    static convertDateToString(data: string): string {
        if (data) {
            return moment(data, 'YYYY-MM-DD').format('DDMMYYYY');
        } else {
            return null;
        }
    }

    static convertStringToDate(data: string): string {
        if (data) {
            return moment(data, 'DDMMYYYY').format('YYYY-MM-DD');
        } else {
            return null;
        }
    }

    static isDataValida(data: string): boolean {
        return moment(data, 'DDMMYYYY', true).isValid();
    }

}
