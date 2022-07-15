import CanvasDrawer from 'react-canvas-draw';
import Typewriter from 'typewriter-effect';
import { useRef, useState, useEffect } from 'react';
import ModelV1 from '../model/modelV1';
import Tosat from '../components/Tosat';
import toast from 'react-hot-toast';
import { Bar } from 'react-chartjs-2';
import { options } from '../chart/chart.data';
import predictionImg from '../static/imgs/prediction-img.png';

function Home() {
    const canvasData = useRef(null);
    const [isDrawing, setIsDrawing] = useState(false);
    const [chartData, setChartData] = useState({});
    // const [disabled, setDisabled] = useState(false);
    const getCanvasData = async () => {
        if (!isDrawing) {
            toast.error('Dude Seriously ! Please draw a digit first 🥲');
            return;
        }
        const model = new ModelV1();
        const canvas = document.getElementsByTagName('canvas')[1];
        // let datasets = await tf.browser.fromPixels(canvas).data();
        // setDisabled(true);
        let tensor = model.preprocessingData(canvas);
        const { y_pred, y_prods } = await model.predict(tensor);
        toast.success(`🤖 My Prediction: ${y_pred}`);
        canvasData.current.clear();
        setIsDrawing(false);

        const labels = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];

        const data = {
            labels: labels,
            datasets: [
                {
                    label: 'Predictions',
                    data: y_prods.dataSync(),
                    backgroundColor: '#FABF24',
                    borderColor: '#FABF24',
                },
            ],
        };

        setChartData(data);
        console.log(chartData);
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
                        brushRadius={15}
                        lazyRadius={0}
                        className="main-canvas"
                        canvasHeight={420}
                        canvasWidth={420}
                    />
                    <div className="flex flex-row justify-between w-[400px] mt-5">
                        <button className="cursor-pointer" onClick={clearCanvas}>
                            Erase
                        </button>
                        <button className="cursor-pointer " onClick={() => getCanvasData()}>
                            submit to check 🤖
                        </button>
                    </div>
                    <div className="flex flex-col items-center justify-center mt-10">
                        <span className="mb-10 text-2xl">Result of probabilities </span>
                        {/* <img src={predictionImg} alt="" className="w-[600px]" /> */}
                        {Object.keys(chartData).length > 0 ? (
                            <Bar data={chartData} options={options} style={{ background: '#fff' }} />
                        ) : (
                            <Typewriter
                                onInit={(typewriter) => {
                                    typewriter.typeString('Try to draw something please').pauseFor(2500).start();
                                }}
                            />
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}

export default Home;
