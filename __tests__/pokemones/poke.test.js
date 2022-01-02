import { render, screen, waitFor } from '@testing-library/react';
import Poke from '../../pages/pokemones/poke'

describe('Poke', () => {

    it('render pokemones', async () => {

        const mockResults = [{ name: 'chanchito', url: 'http://www.dominio.com/pokemones/1' }];

        global.fetch = jest.fn()
            .mockImplementation((url) => {
                expect(url).toBe('https://pokeapi.co/api/v2/pokemon?limit=20')

                return new Promise(resolve => {
                    resolve({
                        json: () => Promise.resolve({
                            results: mockResults
                        })
                    })
                })
            });

        render(
            <Poke />
        );

        const loading = screen.getByText('Cargando...');
        expect(loading).toBeInTheDocument();

        await waitFor(() => screen.getByText('Mis Pokemones'));

        const element = screen.getByTestId(1);
        const anchor = element.children[0];
        expect(anchor).toHaveAttribute('href', '/pokemones/1');
        expect(anchor).toHaveTextContent('chanchito');
    });

})