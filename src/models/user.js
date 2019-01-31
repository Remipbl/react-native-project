export class User {
    id;
    email;
    username;
    image;

    constructor(id, email, username, image = null) {
        this.id = id;
        this.email = email;
        this.username = username;
        this.image = image
    }

    /**
     * Return user params to json format
     * 
     * @return {{id: string, email: string, username: string, image: string}}
     */
    getDatasToJSON() {
        return {id: this.id, email: this.email, username: this.username, image: this.image};
    }
}