export interface Resource {
    id: number;
    name: string;
    url:string
}
export interface Res<T = Record<string, unknown>> {
    errCode: number;
    errMsg: string;
    data: T
}
