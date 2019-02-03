// @flow
export class User {
    id: string;
    email: string;
    f_name: string;
    l_name: string;
    age: number;
    nationality: string;
    gender: string;
    image: string;

    constructor(id: string, email: string, f_name: string, l_name: string, age: number, nationality: string, gender: string, image: string = null) {
        this.id = id;
        this.email = email;
        this.f_name = f_name;
        this.l_name = l_name;
        this.age = age;
        this.nationality = nationality;
        this.gender = gender;
        this.image = image
    }

    /**
     * Return user params to json format
     * 
     * @return {{id: string, email: string, password: string, f_name: string, l_name: string, age: number, gender: string, nationality: string, image: any}}
     */
    getDatasToJSON(): {id: string, email: string, password: string, f_name: string, l_name: string, age: number, gender: string, nationality: string, image: any} {
        return {id: this.id, email: this.email, f_name: this.f_name, l_name: this.l_name, age: this.age, gender: this.gender, nationality: this.nationality, image: this.image};
    }
}