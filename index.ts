/* eslint-disable prettier/prettier */
import { getResource } from './src/helpers';
import { ApiResponse, Episode, Info } from './src/interfaces';

const getR = (url?: string): Promise<any> => {
    return new Promise((res, reject) => {
        getResource(`${url || 'https://rickandmortyapi.com/api/episode'}`).then((r: ApiResponse<Info<Episode>> | unknown) => {
            const api: ApiResponse<Info<Episode>> = r as ApiResponse<Info<Episode>>;
            res(api.data);
        }).catch(e => reject(e))
    });
}
const getAll = async () => {

    let episodes: Episode[] = [];
    // get all episode
    try {
        const data: Info<Episode[]> = await getR();
        episodes = data.results as Episode[];
        let next_page: string = data.info?.next as string;
        // get all the episodes on all the pages
        while (next_page) {
            const data2: Info<Episode[]> = await getR(next_page);
            const results: Episode[] = data2.results as Episode[]
            if (results) {
                episodes = [...episodes, ...results]
            }
            next_page = data2.info?.next as string;
        }
        console.log(episodes.length)
    } catch (error) {
        console.log('error getting episodes :>>', error)
        console.log('-----------------------------------------------------')
    }

    if (episodes.length) {
        for (let i = 0; i < episodes.length; i++) {
            const episode: Episode = episodes[i];
            const characters: string[] = episode.characters as string[];
            try {
                const promises = characters.map(character => getR(character))
                episode.characters = await Promise.all(promises).catch(e => { throw e; })
            } catch (error) {
                console.log('error getting characters :>>', error)
                console.log('-----------------------------------------------------')
            }
        }
        console.log('-----------------------------------------------------')
        console.log('First episode details :>>', episodes[0].characters)
        console.log('-----------------------------------------------------')
        console.log('All Episodes  :>>', episodes)
        console.log('-----------------------------------------------------')
    }
}

getAll()
