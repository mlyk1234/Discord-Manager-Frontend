export interface IListAlert {
    id: number,
    channel: string,
    watch: string,
    condition: string,
    price_target: number,
    trigger_once: boolean,
    currency?: string,
    enabled: boolean,
    createdDate: Date
};