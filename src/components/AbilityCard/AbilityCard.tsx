import React, { ChangeEvent, FC, useState } from 'react';
import './AbilityCard.css';
import { Card, Col, Input, Mentions, Row, Form, Tooltip, Button, Select, Dropdown, Menu } from "antd";
import { useStatContext } from "../../context/StatContext";
import { Ability, EffectType } from "../../interfaces/Ability";
import { useAbilityContext } from "../../context/AbilityContext";
import EffectItem from "./EffectItem";

const { Option } = Mentions;

export interface IAbilityCard {
    ability: Ability;
}


export const AbilityCard: FC<IAbilityCard> = ({ ability }: IAbilityCard) => {
    const { stats } = useStatContext();
    const {addAbility, removeAbility, updateAbility, addEffect} = useAbilityContext();

    const onStatRemove = (e: any) => {
        removeAbility(ability.id, ability.abilityType);
    }

    const onTitleChange = (e: ChangeEvent<HTMLInputElement>) => {
        updateAbility(ability.id, {...ability, name: e.target.value});
    }

    const title = (
        <Row>
            <Col style={{ width: '95%' }}>
                <Input bordered={false}
                       spellCheck={false} defaultValue={ability.name} onBlur={onTitleChange}/>
            </Col>
        </Row>
    )
    const onFormulaSearch = (value: string) => {
        updateAbility(ability.id, {...ability, })
    }

    const testEval = () => {

    }


    const menu = <Menu>
        {Object.keys(EffectType).map((key) => {
            let num = Number(key);
            if (!isNaN(num))
            {
                return <Menu.Item onClick={() => addEffect(ability, EffectType[num])}>{EffectType[num].toString()}</Menu.Item>
            }
        })}
        </Menu>
    return (
        <Col>
            <Card title={title} className={'ability-card'} bodyStyle={{ padding: 0 }}
                  extra={<a onClick={onStatRemove}>X</a>}>
                <Mentions placeholder={"Attacks Per Second"} style={{ textAlign: 'left' }} onChange={onFormulaSearch}>
                    {
                       stats.map((stat) => <Option value={stat.name}>{stat.name}</Option>)
                    }
                </Mentions>
                <br />
                {ability.effects.map((comp) => <EffectItem effect={comp} ability={ability}></EffectItem>)}
                <br />
                <Dropdown overlay={menu} placement={"bottomCenter"}>
                    <Button>Add Component</Button>
                </Dropdown>
                <br />
                <Button onClick={() => testEval()}>Test</Button>
                {/*<StatGridItem header={true}/>*/}
                {/*stat.levels.map((lvl) => <StatGridItem level={lvl.level} value={lvl.value}/>)*/}
            </Card>
        </Col>
    )
}