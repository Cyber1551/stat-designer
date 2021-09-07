import React, { FC, useState } from 'react';
import './StatTab.css';
import { Button, Card, Col, Layout, Row } from "antd";
import StatCard from "../../components/StatCard";
import { IStat } from "../../interfaces/Stat";
import { useStatContext } from "../../context/StatContext";
const {Content} = Layout;



export const StatTab= () => {
    const {stats} = useStatContext();

    return (
        <Layout className={'stat-tab'}>
            <Content className={'section stats'}>
                <Row gutter={12}>
                    {stats.map((stat) => <StatCard key={stat.name} stat={stat}/>)}
                </Row>
            </Content>
        </Layout>
    )
}