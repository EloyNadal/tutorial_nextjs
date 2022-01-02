import { render, screen } from '@testing-library/react';
import Index, { getStaticProps } from '../../pages/pokemones/index'

describe('Index', () => {

    describe('Component', () => {
        it('se renderiza', () => {

            /* render(
                <Index pokemones={[]}/>
            ) */
            //const paragraph = screen.getByText('Mis Pokemones')

            const { getByTestId } = render(
                <Index pokemones={[{ name: 'Chanchito feliz', url: '/pokemon/detalle/1' }]} />
            )
            const paragraph = getByTestId('titulo');
            expect(paragraph).toBeInTheDocument();

            const chanchito = screen.getByText('Chanchito feliz');
            const url = chanchito.getAttribute('href');
            expect(chanchito).toBeInTheDocument();
            expect(url).toEqual('/pokemones/1');
        })
    })

    describe('getStaticProps', () => {

        it('return pokemones', async () => {
            global.fetch = jest.fn()
                .mockImplementation((url) => {

                    expect(url).toBe('https://pokeapi.co/api/v2/pokemon?limit=20')
                    
                    return new Promise(resolve => {
                        resolve({
                            json: () => Promise.resolve({
                                results: 'lista de pokemones'
                            })
                        })
                    })
                })

            const { props } = await getStaticProps();
            expect(props.pokemones).toBe('lista de pokemones');
        })

    })

})