import { Col, Input, Row } from "antd";
import React, { FC } from "react";
import './StatGridItem.css';
import { IStat } from "../../../interfaces/Stat";

export interface IStatGridItem {
    level?: number,
    value?: number,
    header?: boolean
}

export const StatGridItem:FC<IStatGridItem> = ({level, value, header}:IStatGridItem) => {
    return (
        <Col style={{ padding: 0 }}>
            <div className={'stat-grid-item'}>
                <Row>
                    <Col style={{ height: 40, width: '25%', paddingTop: 10}} >
                        {header ? 'Level' : level}
                    </Col>
                    <Col style={{ height: 40, width: '75%', paddingRight: 5 }}>
                        {header ? <span style={{float:'right', paddingTop: 10}}>Value</span> : <Input style={{ height: 40, textAlign: 'right'}} bordered={false} defaultValue={value}/>}
                    </Col>
                </Row>
            </div>
        </Col>
    );
}