import { Client } from '@elastic/elasticsearch';

interface TestDocument {
    name: string;
    age: number;
    occupation: string;
}

const node = process.env.ELASTICSEARCH_NODE;
if (!node) {
    throw new Error(
        'Missing elasticsearch node from required environment variables'
    );
}

const username = process.env.ELASTICSEARCH_USER;
if (!username) {
    throw new Error(
        'Missing elasticsearch username from required environment variables'
    );
}

const password = process.env.ELASTICSEARCH_PASSWORD;
if (!password) {
    throw new Error(
        'Missing elasticsearch password from required environment variables'
    );
}

const client = new Client({
    node,
    auth: {
        username,
        password,
    },
});

describe('Elasticsearch Connection Integration Test', () => {
    const indexName = 'test-index';

    beforeAll(async () => {
        const createResponse = await client.indices.create({
            index: indexName,
        });

        expect(createResponse.acknowledged).toBe(true);

        const document: TestDocument = {
            name: 'Marco Abrantes',
            age: 23,
            occupation: 'Developer',
        };

        const response = await client.index<TestDocument>({
            index: indexName,
            document,
        });

        expect(response.result).toBe('created');

        // garantir que o índice esteja sincronizado antes de realizar a busca
        await client.indices.refresh({ index: indexName });
    });

    afterAll(async () => {
        const deleteResponse = await client.indices.delete({
            index: indexName,
        });

        // acknowledged:  indica se a operação foi reconhecida com sucesso pelo cluster do Elasticsearch
        expect(deleteResponse.acknowledged).toBe(true);

        await client.close();
    });

    it('Should search for a document in the index', async () => {
        const searchResponse = await client.search<TestDocument>({
            index: indexName,
            query: {
                match: {
                    name: 'Marco Abrantes',
                },
            },
        });

        expect(searchResponse.hits.hits.length).toBeGreaterThan(0);
        expect(searchResponse.hits.hits[0]._source?.name).toBe(
            'Marco Abrantes'
        );
        expect(searchResponse.hits.hits[0]._source?.occupation).toBe(
            'Developer'
        );
    });
});
