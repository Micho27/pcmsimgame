export type uciStandings = {
    id: string,
    teams: string,
    points: number;
}

export interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
}

export type Order = 'asc' | 'desc';