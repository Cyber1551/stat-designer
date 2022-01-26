import React, { FC, useState } from 'react';
import './AbilityTab.css';
import { Button, Card, Col, Layout, Row } from "antd";
import StatCard from "../../components/StatCard";
import { IStat } from "../../interfaces/Stat";
import { useStatContext } from "../../context/StatContext";
import { useAbilityContext } from "../../context/AbilityContext";
import AbilityCard from "../../components/AbilityCard";
const {Content} = Layout;



export const AbilityTab = () => {
    const {abilities} = useAbilityContext();
    return (
        <Layout className={'ability-tab'}>
            <Content className={'section ability'}>
                <Row gutter={12}>
                    {abilities.map((ab) => <AbilityCard key={ab.name} ability={ab}/>)}
                </Row>
            </Content>
        </Layout>
    )
}