import {WheelData} from "react-custom-roulette/dist/components/Wheel/types";

const red = [0, 2, 4, 6, 8, 11, 13, 15, 17, 18, 20, 22, 24, 26, 29, 31, 33, 35];
const black = [1, 3, 5, 7, 9, 10, 12, 14, 16, 19, 21, 23, 25, 27, 28, 30, 32, 34]


const wheelData: WheelData[] = Array.from({ length: 36 }, (_, i) => ({
    option: (i + 1).toString(),
    style: {
        backgroundColor: red.includes(i) ? '#a30904' : '#1f1f21',
        textColor: 'white',
        fontFamily: 'DM Sans',
    }
}));
export default wheelData;