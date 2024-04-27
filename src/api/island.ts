import axios from "axios";
import { IIsland } from "../interfaces/data-interface";

export async function getAllIsland() {
    let data = await axios.get<IIsland[]>(
        `${import.meta.env.VITE_API_URL}/island/getAllIsland/`
    );
    return data;
}
