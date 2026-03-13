import { characters } from './characters';
import { initialState } from './initialState';
import { chapter1Scenes } from './chapter1';
import { chapter2Scenes } from './chapter2';
import { chapter3Scenes } from './chapter3';
import { chapter4Scenes } from './chapter4';
import { chapter5Scenes } from './chapter5';

const storyData = {
    "__comment__": "Brutalist Government Tax Adventure - Dynamic Multi-file Export",
    characters,
    initialState,
    scenes: {
        ...chapter1Scenes,
        ...chapter2Scenes,
        ...chapter3Scenes,
        ...chapter4Scenes,
        ...chapter5Scenes
    }
};

export default storyData;
