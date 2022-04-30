/* eslint-disable prettier/prettier */
import { cat } from "./../firebase";
import Faker from "./faker";
import { getAll } from "../firebase";

export const registerCat = async (url) => {
    let allCats = await getAll("cats");
    let id = 0;
    if (allCats.length !== 0) {
        id = allCats[allCats.length - 1].id + 1
    }
    console.log("ici");
    cat(id, Faker.getSexe(),Faker.getBirthdate(),Faker.getRace(), Faker.getPoils(), Faker.getCarac(), Faker.getDescription(), Faker.getName(), Faker.getOrga(), Faker.getNumOrga(), global.session.id, url);
};
