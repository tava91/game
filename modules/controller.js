import {onInit} from '../app.js';

const onModelsLoad = ()=>{
     fetch('/models/equipment.json')
        .then(res => res.json())
        .then((out) => {
            console.log('Output: ', out);
            onInit(out);
    }).catch(err => console.error(err));
};
onModelsLoad();
