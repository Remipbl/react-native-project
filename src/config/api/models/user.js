// @flow
export class User {
    id: string;
    email: string;
    username: string;
    image: string;

    constructor(id: string, email: string, username: string, image: string = null) {
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
    getDatasToJSON(): {id: string, email: string, username: string, image: string} {
        return {id: this.id, email: this.email, username: this.username, image: this.image};
    }
}