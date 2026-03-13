import { characters } from './characters';
import { initialState } from './initialState';
import { chapter1Scenes } from './chapter1';
import { chapter2Scenes } from './chapter2';

const storyData = {
    "__comment__": "Brutalist Government Tax Adventure - Dynamic Multi-file Export",
    characters,
    initialState,
    scenes: {
        ...chapter1Scenes,
        ...chapter2Scenes
    }
};

export default storyData;
