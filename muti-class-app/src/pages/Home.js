import CanvasDrawer from 'react-canvas-draw';
import Typewriter from 'typewriter-effect';
import { useRef, useState } from 'react';
import ModelV1 from '../model/modelV1';
import Tosat from '../components/Tosat';
import toast from 'react-hot-toast';
import predictionImg from '../static/imgs/prediction-img.png';

function Home() {
    const canvasData = useRef(null);
    const [isDrawing, setIsDrawing] = useState(false);
    const [disabled, setDisabled] = useState(false);
    const getCanvasData = async () => {
        if (!isDrawing) {
            toast.error('Dude Seriously ! Please draw a digit first 🥲');
            return;
        }
        const model = new ModelV1();
        const canvas = document.getElementsByTagName('canvas')[1];
        // let datasets = await tf.browser.fromPixels(canvas).data();
        setDisabled(true);
        let tensor = model.preprocessingData(canvas);
        const y_pred = await model.predict(tensor);
        toast.success(`🤖 My Prediction: ${y_pred}`);
        canvasData.current.clear();
        setIsDrawing(false);
        setTimeout(() => {
            setDisabled(false);
        }, 4000);
    };
    const clearCanvas = () => {
        canvasData.current.clear();
        setIsDrawing(false);
    };

    return (
        <>
            <div className="bg-amber-400 h-screen flex justify-center ">
                <Tosat />
                <div className="flex flex-col items-center justify-center">
                    <div className="text-xl text-center">
                        <Typewriter
                            onInit={(typewriter) => {
                                typewriter
                                    .typeString('Try to draw 0-9 numbers, to make the Machine predit it')
                                    .pauseFor(2500)
                                    .start();
                            }}
                        />
                    </div>
                    <span className="mb-10 mt-5">👇🏻👇🏻👇🏻</span>
                    <CanvasDrawer
                        onChange={() => setIsDrawing(true)}
                        ref={canvasData}
                        brushRadius={10}
                        lazyRadius={0}
                        className="main-canvas"
                        canvasHeight={420}
                        canvasWidth={420}
                    />
                    <div className="flex flex-row justify-between w-[400px] mt-5">
                        <button className="cursor-pointer" onClick={clearCanvas}>
                            Erase
                        </button>
                        <button className="cursor-pointer " onClick={() => getCanvasData()} disabled={disabled}>
                            submit to check 🤖
                        </button>
                    </div>
                </div>
            </div>
            <div className="bg-amber-400 h-screen flex flex-col items-center justify-center">
                <span className="mb-10 text-2xl">Result of this model confusion matrix prediction</span>
                <img src={predictionImg} alt="" className="w-[600px]" />
            </div>
        </>
    );
}

export default Home;
