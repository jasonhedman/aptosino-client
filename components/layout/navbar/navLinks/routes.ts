import { IconType } from "react-icons";

import {MdCasino} from "react-icons/md";
import {FaHouse} from "react-icons/fa6";
import {ImClubs} from "react-icons/im";

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
    },
    {
        name: "Club",
        href: "/club",
        icon: ImClubs
    }
];