export class PersonaRequest{
    Apellido:string;
    Nombre:string;
    NroDocumento:string;
    NroLegajo:string;
    constructor(apellido:string, nombre:string, nroDocumento:string,nroLegajo:string){
        this.Apellido=apellido;
        this.Nombre=nombre;
        this.NroDocumento=nroDocumento;
        this.NroLegajo=nroLegajo
    };
} 