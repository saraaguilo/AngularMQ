//Interfaz de 'Song'

export interface Song {
    
    songName: string;
    categoryName: string;
    releaseyear: Date;
    author: string; //id
    _id: string;
    createdAt?: string; 
    updatedAt?: string;
    fecha:Date;
   
}