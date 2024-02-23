import { IconType } from "react-icons";

export interface Route {
    name: string;
    href: string;
    icon: IconType
}

export const routes: Route[] = [];