import { IconType } from "react-icons";

import {MdCasino} from "react-icons/md";
import {FaHouse} from "react-icons/fa6";

export interface Route {
    name: string;
    href: string;
    icon: IconType
}

export const routes: Route[] = [
    {
        name: "Games",
        href: "/",
        icon: MdCasino
    },
    {
        name: "Stake",
        href: "/stake",
        icon: FaHouse
    }
];