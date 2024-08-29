export class MovieCover {


    id: string;
    type: string;
    imageName: string;
    link: string;

    constructor(id: string, type: string, imageName: string, link: string) {
        this.id = id;
        this.type = type;
        this.imageName = imageName;
        this.link = link;
    }

}
