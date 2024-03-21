import { DM_Sans } from 'next/font/google';
import { DM_Mono } from "next/font/google";

const dmSans = DM_Sans({ subsets: ['latin'] });
const dmMono = DM_Mono({ weight: ['300', '400', '500'], subsets: ['latin'] });

const fonts = {
    body: dmMono.style.fontFamily,
    subheading: dmSans.style.fontFamily,
    heading: dmSans.style.fontFamily,
}

export default fonts