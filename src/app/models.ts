export interface Usuario{
    payload: any;
    uid:string;
    nombre:string;
    email:string;
    password:string;

}

export interface Producto{

    id:number;
    nombre:string;
    calorias:number;
    exitencias:number;
    precio:number;
    fecha:string
}