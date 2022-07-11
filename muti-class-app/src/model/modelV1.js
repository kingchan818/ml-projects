import * as tf from '@tensorflow/tfjs';
// import app from './initFirebase';
// import { getStorage } from 'firebase/storage';

export default class ModelV1 {
    model;
    class = '0123456789';
    constructor() {
        this.model = this.loadModel().then();
    }

    preprocessingData(pixelData) {
        return tf.tidy(() => {
            // convert the pixel data into a tensor with 1 data channel per pixel
            // i.e. from [h, w, 4] to [h, w, 1]
            let tensor = tf.browser.fromPixels(pixelData, 1);
            // pad it until square, such that w = h = max(w, h)

            // scale it down to smaller than target
            tensor = tf.image.resizeBilinear(tensor, [28, 28]);

            // tensor = tensor.div(255);
            // console.log(tensor);
            // Reshape again to fit training model [1, 28, 28]
            return tensor.reshape([1, 28, 28]);
        });
    }

    async loadModel() {
        const file = tf.io.browserHTTPRequest('https://static.filminal.io/static/muti-classification/model.json');
        await file.load();
        return await tf.loadLayersModel(file);
    }

    async predict(data) {
        // prediction of img must have a shape of (1,28,28)
        const prediction = await (await this.model).predict(data).as1D();
        // console.log(prediction.dataSync());
        const argMax = prediction.argMax().dataSync()[0];
        // console.log(argMax);
        return argMax;
    }
}
