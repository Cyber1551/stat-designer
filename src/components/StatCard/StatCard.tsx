import React, { ChangeEvent, FC, useState } from 'react';
import './StatCard.css';
import { Card, Col, Input, Mentions, Row, Form, Tooltip } from "antd";
import StatGridItem from "./StatGridItem";
import { IStat } from "../../interfaces/Stat";
import { useStatContext } from "../../context/StatContext";

const { Option } = Mentions;

export interface IStatCard {
    stat: IStat;
}


export const StatCard: FC<IStatCard> = ({ stat }: IStatCard) => {
    const { removeStat, stats, updateStatTitle } = useStatContext();
    const [prefix, setPrefix] = useState<string>('@');


    const onStatRemove = (e: any) => {
        removeStat(stat.id);
    }

    const onTitleChange = (e: ChangeEvent<HTMLInputElement>) => {
        updateStatTitle(stat.id, e.target.value)
    }

    const title = (
        <Row>
            <Col style={{ width: '5%' }}>@</Col>
            <Col style={{ width: '95%' }}>
                <Input bordered={false}
                       spellCheck={false} defaultValue={stat.name} onBlur={onTitleChange}/>
            </Col>
        </Row>
    )
    const onFormulaSearch = (value: string) => {

    }

    return (
        <Col>
            <Card title={title} className={'stat-card'} bodyStyle={{ padding: 0 }}
                  extra={<a onClick={onStatRemove}>X</a>}>
                <Mentions placeholder={"Formula"} style={{ textAlign: 'left' }} onChange={onFormulaSearch} defaultValue={"@LEVEL"}>
                    {
                        //(prefix === '@') && stats.map((stat) => <Option value={stat.name}>{stat.name}</Option>)

                        ['LEVEL'].map((obj) => <Option value={obj}>{obj}</Option> )
                    }
                </Mentions>
                <StatGridItem header={true}/>
                {stat.levels.map((lvl) => <StatGridItem level={lvl.level} value={lvl.value}/>)}
            </Card>
        </Col>
    )
}