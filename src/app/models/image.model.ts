export class Image {

    
	type:string;
	imageName:string;
	link:string;
	imageSize:string;

    constructor( type:string, imageName:string, link:string, imageSize:string){
        
        this.type = type;
        this.imageName = imageName;
        this.link = link;
        this.imageSize = imageSize;
    }

}
