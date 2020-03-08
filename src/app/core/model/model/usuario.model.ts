
export class Usuario {

    constructor(
        public id?: number,
        public nomeCompleto?: string,
        public perfilDescricao?: string,
        public cpf?: string,
        public imagem?: string,
        public senha?: string,
        public sexoId?: number,
        public sexoDescricao?: string
    ) { }

}
