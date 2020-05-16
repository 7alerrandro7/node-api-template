const chai = require("chai")
    , expect = chai.expect
    , should = chai.should();


const settings = require('../settings/settings');
// #ReWrite database config
// settings.server.port = 3030;
// settings.server.context = '/sc-event-api';
// settings.database.host = 'host';
// settings.database.user = 'user';
// settings.database.databaseName = 'database-name';
// settings.database.password = 'password';
// settings.database.poolMaxConnection = 100;
// settings.database.poolMinConnection = 100;
// settings.database.poolIdle = 1000;
// settings.database.poolAcquire = 30000;

const cardRepository = require('./../repository/card');

describe("Card api calls, must return as expected", function () {
    this.timeout(100000); //

    it("when matricula input are Alexandre Gonzalez must be return 2 cards", async function () {
        const cardResult = await cardRepository.getCardIdWithOptionalFiltersWithCache('01555201', '', '', '');
        expect(cardResult.length).to.equal(2);
    });

    it("when matricula input has 01 with prefix, must be removed and return as expected", async function () {
        const cardResult = await cardRepository.getCardIdWithOptionalFiltersWithCache('01555201', '', '', '');
        expect(cardResult.length).to.equal(2);
    });

    it("when matricula input has no prefix 01, must be removed and return as expected", async function () {
        const cardResult = await cardRepository.getCardIdWithOptionalFiltersWithCache('555201', '', '', '');
        expect(cardResult.length).to.equal(2);
    });

    it("Should iam search work as expected", async function () {
        const cardResult = await cardRepository.getCardIdWithOptionalFiltersWithCache('', '01555201', '', '');
        expect(cardResult.length).to.equal(2);
    });

    it("Should cpf search work as expected", async function () {
        const cardResult = await cardRepository.getCardIdWithOptionalFiltersWithCache('', '', '02080371797', '');
        expect(cardResult.length).to.equal(2);
    });

    it("Should cardId search work as expected", async function () {
        const cardResult = await cardRepository.getCardIdWithOptionalFiltersWithCache('', '', '', '4140087705');
        expect(cardResult.length).to.equal(1);
    });

    it("Should card return 100 repository calls with less 5 seconds and need to cache and perform it", async function () {
        const start = new Date().getTime();
        for (let i = 0; i < 100; i++) {
            await cardRepository.getCardIdWithOptionalFiltersWithCache('555201', '', '', '');
        }
        const elapsedTime = new Date().getTime() - start;
        expect(elapsedTime < 5000).to.equal(true);
    });

});
