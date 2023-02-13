export interface IListAlert {
    id: number,
    channel: string,
    watch: string,
    condition: string,
    price_target: string | number,
    currency: string
};