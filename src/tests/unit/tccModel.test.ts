import TCC from '../../domain/models/TCC';

// describe(): Usamos essa função para agrupar nossos testes, criando uma "suite de testes" que pode ser usada para descrever um conjunto de testes relacionados.
describe('Tcc Model Unit Test', () => {
    // it(): Cada função it() é um teste individual. Ela deve conter a lógica específica que estamos testando.
    it('should create a valid TCC instance', () => {
        const validTCC = new TCC({
            title: 'Análise de Algoritmos',
            student: 'Marco Abrantes',
            advisor: 'Dr. Fulano',
            submissionDate: new Date(),
        });

        // Verifica se o objeto foi criado corretamente
        // expect(): Jest fornece a função expect() para declarar as expectativas ou assertivas do teste. Por exemplo, você pode esperar que uma função retorne um valor ou que um erro seja lançado.
        expect(validTCC.title).toBe('Análise de Algoritmos');
        expect(validTCC.student).toBe('Marco Abrantes');
        expect(validTCC.advisor).toBe('Dr. Fulano');
    });

    it('should fail to create TCC without a required field', () => {
        const invalidTCC = new TCC({
            // Faltando o campo 'title'
            student: 'Marco Abrantes',
            advisor: 'Dr. Fulano',
            submissionDate: new Date(),
        });

        // Usa validateSync para validação síncrona
        const validationError = invalidTCC.validateSync();

        // Verifica se o campo "title" foi identificado como ausente
        expect(validationError?.errors.title).toBeDefined();
    });
});
