import { Button, Col, Input, Mentions, Row } from "antd";
import React, { ChangeEvent, FC } from "react";
import './EffectItem.css';
import { Ability, Effect, EffectType, HealEffect } from "../../../interfaces/Ability";
import { HealEffectItem } from "./HealEffectItem/HealEffectItem";

const { Option } = Mentions;

export interface IEffectItem {
    ability:Ability
    effect:Effect
}

export const EffectItem:FC<IEffectItem> = ({ability, effect}:IEffectItem) => {
    const getEffectType = () => {
        switch(effect.type) {
            case EffectType.Heal:
                return <HealEffectItem ability={ability} effect={effect as HealEffect} />
                break;
        }
    }

    return (
        <Col style={{ padding: 0 }}>
            <div className={'effect-item'}>
                {getEffectType()}
            </div>
        </Col>
    );
}