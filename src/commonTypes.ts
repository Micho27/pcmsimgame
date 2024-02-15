import { GoogleSpreadsheetRow } from "google-spreadsheet";

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

export interface ResultsTableObject {
    rider:string;
    team:string;
    points:number;
}

export type Order = 'asc' | 'desc';
export type TeamLevels = 'All' | 'wt' | 'pt' | 'ct';
export const lastRace = 'Clasica de Almeria';

//bare bones manual assigning of level to each team.
//in future will replace with a query to the race days sheets and store in redux
const wtTeams = ['Alpecin - Deceuninck',
    'Bahrain Victorious',
    'BORA - hansgrohe',
    'EF Education - EasyPost',
    'Groupama - FDJ',
    'GW Erco Shimano',
    'HTC - Columbia Highroad',
    'INEOS Grenadiers',
    'Lidl-Trek',
    'Lotto Dstny',
    'Mapei – GB',
    'Soudal - Quick Step',
    'Team Dimension Data',
    'Team Visma | Lease a Bike',
    'UAE Team Emirates'
];

const ptTeams = [
    'Arkéa - B&B Hotels',
    'BIC – Citroën',
    'Bolton Equities Black Spoke',
    'CIC U Nantes Atlantique',
    'Decathlon AG2R La Mondiale Team',
    'Intermarché - Wanty',
    'Leopard TOGT Pro Cycling',
    'Santander - Vittel Pro Cycling Team',
    'Team dsm-firmenich PostNL',
    'Team Flanders - Baloise',
    'Team Once',
    'Trinity Racing',
    'Tudor Pro Cycling Team',
    'Uno-X Mobility',
    'Voltas - Tartu2024 by CCN'
];

const ctTeams = [
    'Adria Mobil',
    'An Post Cycling Team',
    'ATT Investments',
    'BEAT Cycling',
    'Burgos - BH',
    'Equipo Kern Pharma',
    'Euskaltel - Euskadi',
    'Metec - Solarwatt p/b Mantel',
    'Monster Energy Cycling Team',
    'Sabgal/Anicolor',
    'Saint Piran',
    'Skoda Pro Cycling',
    'Sport Lisboa e Benfica',
    'St Michel - Mavic - Auber93',
    'Team ColoQuick',
    'Team Coop - Repsol',
    'Team corratec - Vini Fantini',
    'Team Diamant',
    'Team Embrace the World',
    'Team Kubota Sake',
    'Team Lotto Kern-Haus PSD Bank',
    'Team Medellín - EPM',
    'Team Polti Kometa',
    'TotalEnergies',
    'Van Rysel - Roubaix',
    'VF Group-Bardiani CSF - Faizanè'
];

const combineTeams = () => {
    const teams= new Map();

    wtTeams.forEach((teamName,index) => {
        teams.set(teamName,'wt');
        //wt and pt have same number of teams so can gimmick in pt here
        teams.set(ptTeams[index],'pt')
    });

    ctTeams.forEach((teamName) => {
        teams.set(teamName,'ct');
    })

    return teams;
};

export const teamLevelsCombinedMap = combineTeams();

//optional filter and column to be filtered
export const stableSort=(array: Array<GoogleSpreadsheetRow> , order:string, sortColumn:string, filter?:String,column?:string) => {
    let filterArray=array;
    
    if(filter !== 'All' && column) {
        filterArray=array.filter((row) => teamLevelsCombinedMap.get(row.get(column)) === filter);
    }

    return filterArray.sort((a:GoogleSpreadsheetRow,b) => {
        return order === 'desc' ? b.get(sortColumn)-a.get(sortColumn):a.get(sortColumn)-b.get(sortColumn);
    });
};