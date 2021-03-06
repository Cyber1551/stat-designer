import React, { ReactElement, useContext, useState } from "react";
import { IStat } from "../interfaces/Stat";

export interface IStatContext {
    stats:IStat[]
    addStat:Function
    removeStat:Function
    updateStatTitle:Function
    findStatByName: Function
    evalStat:Function
}

export const StatContext = React.createContext<IStatContext>({
    stats: [],
    addStat: Function,
    removeStat: Function,
    updateStatTitle:Function,
    findStatByName:Function,
    evalStat: Function
});

export const StatProvider = (props: { children: ReactElement | ReactElement[] }) => {
    const [stats, setStats] = useState<IStat[]>([]);
    const addStat = () => {
        const newStat: IStat = {
            id: stats.length,
            name: `STAT${stats.length}`,
            value: 0,
            levels:[...[1,2,3,4,5,6,7,8,9,10].map((value) => {
                return {
                    level: value,
                    value: value
                }
            })]
        }
        setStats((old) => [...old, newStat]);
    }
    const removeStat = (statId: number) => {
        const newStats = stats.filter((s) => s.id !== statId)
        setStats(newStats)
    }
    const findStatById = (id: number) => {
        return stats.find((stat) => stat.id === id);
    }

    const findStatByName = (name: string) => {
        return stats.find((stat) => stat.name === name)
    }
    const updateStatTitle = (statId: number, title:string) => {
        const foundStat = findStatById(statId);
        if (foundStat) {
            const index = stats.indexOf(foundStat);
            const copy = [...stats]
            copy[index].name = title;
            setStats(copy);
        }
    }
    const evalStat = (stat:string, level: number) => {
        const found = findStatByName(stat);
        if (found) {
            const foundL = found.levels[level + 1]
            if (foundL)
            {
                return foundL.value;
            }
            return 0;
        }
        return null;
    }
    return (
        <StatContext.Provider
            value={{
                stats: stats,
                addStat: addStat,
                removeStat: removeStat,
                updateStatTitle: updateStatTitle,
                findStatByName,
                evalStat
            }}
            {...props}
        />
    );
};
export const useStatContext = (): IStatContext => {
    const context = useContext<IStatContext>(StatContext);
    if (context === undefined) {
        throw new Error("Must be inside provider");
    }
    return context;
};


