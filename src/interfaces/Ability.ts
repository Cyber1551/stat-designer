export class Ability {
    public id: number;
    public name: string;
    public abilityType: AbilityType;
    public effects: Effect[];

    constructor(_id:number, _name:string, _at: AbilityType) {
        this.id = _id;
        this.name = _name;
        this.abilityType = _at;
        this.effects = [];
    }
}
export class OverTimeAbility extends Ability {
    public ticksPerSecond: number;
    public ticksPerSecondFormula: string;

    constructor(_id:number, _name:string, baseValue?: number) {
        super(_id, _name, AbilityType.OverTime);
        this.ticksPerSecond = baseValue ? baseValue : 0;
        this.ticksPerSecondFormula = baseValue ? `${baseValue}` : "";
    }
}

export enum AbilityType {
    OverTime,
    Passive,
    Active,
}

export class Formula {
    public formula: string;
    public result: number;

    constructor(baseValue?: number) {
        this.result = baseValue ? baseValue : 0;
        this.formula = baseValue ? `${baseValue}` : "";
    }
}

export enum EffectType {
    Heal,
    Damage
}

export const HealType:string = EffectType[EffectType.Heal];

export class Effect {
    public name: string;
    public type: EffectType;
    public id: number;
    public ability: Ability;

    constructor(ability: Ability, type:EffectType) {
        this.name = EffectType[type].toString();
        this.ability = ability;
        this.id = ability.effects.length;
        this.type = type;
    }
}

export class HealEffect extends Effect {
    public amount: Formula;

    constructor(ability: Ability, baseValue?: number) {
        super(ability, EffectType.Heal);
        this.amount = new Formula(baseValue);
    }
}

export class DamageEffect extends Effect {
    public amount: Formula;
    constructor(ability: Ability,  baseValue?: number) {
        super(ability, EffectType.Damage);
        this.amount = new Formula(baseValue);
    }
}

