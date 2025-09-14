import {type ClassValue, clsx} from "clsx";
import {twMerge} from "tailwind-merge";

export function cn(...inputs: ClassValue[]){
    return twMerge(clsx(inputs))
}

export const formatSize = (sizeInBytes: number)=>{

    if(sizeInBytes == 0) return '0 Bytes';

    const b=1024;
    const sizes= ['Bytes','KB','MB','GB','TB'];

    // Determine the appropriate unit by calculating the log
    const i = Math.floor(Math.log(sizeInBytes)/ Math.log(b));

    // Format with 2 decimal places and round
    return parseFloat((sizeInBytes / Math.pow(b, i)).toFixed(2)) + ' ' + sizes[i];
};

export const generateUUID = () => crypto.randomUUID();
