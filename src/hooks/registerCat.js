/* eslint-disable prettier/prettier */
import { cat } from "./../firebase";
import Faker from "./faker";
import { getAll } from "../firebase";

export const registerCat = async (url) => {
    let allCats = await getAll("cats");
    let id = 0;
    if (allCats.length !== 0) {
        id = allCats.reduce((oldCat, currentCat) => oldCat.id > currentCat.id ? oldCat : currentCat).id + 1;
    }
    let sexe = Faker.getSexe();
    let age = Faker.getBirthdate().toLocaleDateString();
    let description = Faker.getDescription();
    let name = Faker.getName();
    let userId = global.session.id;
    let poils = Faker.getPoils();
    let caractere = Faker.getCarac();
    let race = Faker.getRace();
    let numTelOrga = Faker.getNumOrga();
    let organisation = Faker.getOrga();
    global.cats.push(id, sexe, age, race, poils, caractere, description, name, organisation, numTelOrga, userId, url);
    cat(id, sexe, age, race, poils, caractere, description, name, organisation, numTelOrga, userId, url);
};
