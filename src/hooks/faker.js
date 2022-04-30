/* eslint-disable prettier/prettier */
import { names, races, poils, caracteres, organisations } from "./fake.json";
import { faker } from "@faker-js/faker";

export default class Faker {
    static getName = () => {
        return names[Math.floor(Math.random() * names.length)];
    }
    static getSexe = () => {
        return Math.random() > 0.5 ? "M" : "F";
    }

    static getBirthdate = () => {
        return faker.date.past(10); // renvoie une date entre aujourd'hui et -10 ans (l'age du chat)
    }

    static getRace = () => {
        return races[Math.floor(Math.random() * races.length)];
    }

    static getPoils = () => {
        return poils[Math.floor(Math.random * poils.length)];
    }

    static getCarac = () => {
        return caracteres[Math.floor(Math.random * caracteres.length)];
    }

    static getOrga = () => {
        return organisations[Math.floor(Math.random * organisations.length)];
    }

    static getNumOrga = () => {
        return faker.phone.phoneNumber("+33 06 ## ## ## ##");
    }

    static getDescription = () => {
        return "";
    }
}
