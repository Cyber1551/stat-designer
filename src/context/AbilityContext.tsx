import React, { ReactElement, useContext, useState } from "react";
import {
    Ability,
    AbilityType,
    DamageEffect,
    Effect,
    EffectType,
    HealEffect,
    OverTimeAbility
} from "../interfaces/Ability";

export interface IAbilityContext {
    abilities:Ability[];
    addAbility: Function;
    updateAbility: Function;
    removeAbility:Function;
    findAbilityById:Function;
    addEffect: Function;
    removeEffect:Function;
    updateEffect:Function;
}

export const AbilityContext = React.createContext<IAbilityContext>({
    abilities: [],
    addAbility: () => {},
    updateAbility: () => {},
    removeAbility: () => {},
    findAbilityById: () => {},
    addEffect: () => {},
    removeEffect: () => {},
    updateEffect: () => {}
});

export const AbilityProvider = (props: { children: ReactElement | ReactElement[] }) => {
    const [abilities, setAbilities] = useState<Ability[]>([]);


    const addAbility = (type: AbilityType) => {
        switch (type) {
            case AbilityType.OverTime:
                const newAbilityOnHit = new OverTimeAbility(
                    abilities.length,
                    `ON_HIT${abilities.length}`
                    );
                setAbilities((old) => [...old, newAbilityOnHit]);
                break;
        }

    }
    const updateAbility = (id: number, ability: Ability) => {
        const foundA = findAbilityById(id, ability.abilityType);
        if (foundA && foundA.abilityType === ability.abilityType) {
            const index = abilities.indexOf(foundA);
            const copy = [...abilities]
            copy[index] = ability;
            setAbilities(copy);
        }
    }

    const removeAbility = (id: number) => {
        const newAbilities = abilities.filter((a) => a.id !== id)
        setAbilities(newAbilities)
    }
    const findAbilityById = (id: number, type:AbilityType) : Ability | undefined => {
        return abilities.find((ab) => ab.id === id);
    }

    const addEffect = (ability: Ability, type:string) => {
        const ab = findAbilityById(ability.id, ability.abilityType);

        if (ab) {
            const copy = [...ab.effects];
            switch(type) {
                case EffectType[EffectType.Damage]:
                    copy.push(new DamageEffect(ab));
                    break;
                case EffectType[EffectType.Heal]:
                    copy.push(new HealEffect(ab))
                    break;
            }
            updateAbility(ab.id, {...ab, effects: copy})
        }
    }
    const updateEffect = () => {

    }
    const removeEffect = (ability: Ability, effect: Effect) => {
        const newComp = ability.effects.filter((a) => a !== effect)
        updateAbility(ability.id, {...ability, effects: newComp})
    }

    return (
        <AbilityContext.Provider
            value={{
                abilities,
                addAbility,
                updateAbility,
                removeAbility,
                findAbilityById,
                addEffect,
                removeEffect,
                updateEffect
            }}
            {...props}
        />
    );
};
export const useAbilityContext = (): IAbilityContext => {
    const context = useContext<IAbilityContext>(AbilityContext);
    if (context === undefined) {
        throw new Error("Must be inside provider");
    }
    return context;
};


