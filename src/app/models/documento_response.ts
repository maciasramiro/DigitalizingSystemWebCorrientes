export interface WebApiResponse {
  Data: any
  Success: boolean
  Message: any
}

export interface Documento {
  PersonasDtos: any
  Id: number
  TipoDocumento: TipoDocumento
  NumeroDocumento: string
  Apellido: string
  Nombre: string
  NumeroLegajo: string
  Sexo: string
  FechaNacimiento: string
  Anio: number
  Observaciones: string
  IdLote: number
  Estado: number
  Incompleto: boolean
  Hojas: Hoja[]
  CantidadPaginas: number
  EstadoLote: any
}

export interface TipoDocumento {
  Id: number
  Descripcion: string
}

export interface Hoja {
  Id: number
  Descripcion: any
  ImagenFrontalId: number
  ImagenReversoId: number
  Usuario: Usuario
  Estado: number
}

export interface Usuario {
  ApellidoNombre: string
  Nombre: string
  NombreInicio: string
  Id: number
  Permisos: any[]
}