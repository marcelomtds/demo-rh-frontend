
export class Colaborador {

    constructor(
        public id?: number,
        public nomeCompleto?: string,
        public dataNascimento?: string,
        public cpf?: string,
        public imagem?: string,
        public nomeImagem?: string,
        public sexoId?: number,
        public sexoDescricao?: string,
        public cargoId?: number,
        public cargoDescricao?: string
    ) { }

}
