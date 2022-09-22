import app from '../src/app'
import supertest from 'supertest';
import { prisma } from "../src/database"
import { faker } from "@faker-js/faker"

// beforeAll(async () => {
//     await prisma.$executeRaw`TRUNCATE TABLE recommendations`;
// });

describe('Test the recommendations post  ', () => {

    it("given a recommendations with duplicate name it should return 409", async () => {

        let name = faker.music.songName()

        const body = {
            name: name,
            youtubeLink: `https://www.youtube.com/watch?${name}`
        }

        const firstTry = await supertest(app).post("/recommendations").send(body);
        expect(firstTry.status).toEqual(201);

        const secondTry = await supertest(app).post("/recommendations").send(body);
        expect(secondTry.status).toEqual(409);
    });

    it("given a recommendations upvote it should return 200", async () => {
        const upvote = await supertest(app).post("/recommendations/10/upvote")
        expect(upvote.status).toEqual(200);
    });

    // it("given a recommendations downvote name it should return 200", async () => {
    //     const downvote = await supertest(app).post("/recommendations/10/downvote")
    //     expect(downvote.status).toEqual(200);
    // });

});

describe('Test the recommendations get  ', () => {

    it("get all recommendations it should return 200", async () => {

        const recommendationsGetAll = await supertest(app).get("/recommendations")
        console.log(recommendationsGetAll.body)
        expect(recommendationsGetAll.status).toEqual(200);

    });

    it("get all recommendations with the wanted id it should return 200", async () => {
        const recommendationsGetId = await supertest(app).get("/recommendations/10")
        expect(recommendationsGetId.status).toEqual(200);
    });

    it("get all recommendations ramdonly it should return 200", async () => {
        const recommendationsGetramdonly = await supertest(app).get("/recommendations/random")
        expect(recommendationsGetramdonly.status).toEqual(200);
    });

    it("get all recommendations following the amount passed it should return 200", async () => {
        const recommendationsGetamount = await supertest(app).get("/recommendations/top/2")
        expect(recommendationsGetamount.status).toEqual(200);
    });
});

