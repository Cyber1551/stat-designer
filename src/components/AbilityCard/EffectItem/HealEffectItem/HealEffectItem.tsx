import { Button, Col, Input, Mentions, Row } from "antd";
import React, { ChangeEvent, FC } from "react";
import './HealEffectItem.css';
import { Ability, EffectType, Formula, HealEffect } from "../../../../interfaces/Ability";
import { useAbilityContext } from "../../../../context/AbilityContext";
import { useStatContext } from "../../../../context/StatContext";

const { Option } = Mentions;

export interface IHealEffectItem {
    ability: Ability
    effect: HealEffect
}

export const HealEffectItem: FC<IHealEffectItem> = ({ ability, effect }: IHealEffectItem) => {
    const {removeEffect} = useAbilityContext();
    const {stats} = useStatContext();
    const onFormulaChange = (text: string) => {
        console.log(text)
        const eff = new Formula();
        eff.formula = text;
        effect.amount = eff;
    }
    return (
        <>
            <Row>
                <Col style={{ width: '75%', textAlign: 'left', paddingTop: 10, paddingLeft: 10 }}>
                    {effect.name}
                </Col>
                <Col>
                    <Button style={{ paddingTop: 10 }} type={'link'}
                            onClick={() => removeEffect(ability, effect)}>X</Button>
                </Col>
            </Row>
            <Row>
                <Col style={{ paddingTop: 10 }}>
                    <Mentions placeholder={"Formula"} style={{ textAlign: 'left' }} onChange={onFormulaChange} value={effect.amount.formula}>
                        {
                            stats.map((stat) => <Option value={stat.name}>{stat.name}</Option>)
                        }
                    </Mentions>
                </Col>
            </Row>
        </>
    );
}