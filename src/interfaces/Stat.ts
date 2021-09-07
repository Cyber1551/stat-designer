export interface ILevel {
    level: number,
    value: number
}

export interface IStat {
    id: number;
    name: string;
    value: number;
    levels: ILevel[]
}