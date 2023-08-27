export interface DataPersona {
    name: string,
    lastname: string,
    email: string,
    userlol: string,
    password: string
}

export interface Evento {
    id: string;
    idType: string;
    title: string,
    start: Date,
    end: Date,
    participantes?: string[]
}

export interface EventType {
    id: string;
    jugadoresPorEquipo: number;
    mapa: string;
    reglas: string[]
}

export interface EventoVM {
    id: string,
    title: string,
    start: string,
    end: string,
    jugadoresPorEquipo: number;
    mapa: string;
    reglas: string[]
}