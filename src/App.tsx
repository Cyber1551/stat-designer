import React, { useState } from 'react';
import './App.css';
import StatTab from "./screens/StatTab";
import { Button, Dropdown, Menu, Tabs } from "antd";
import { StatProvider, useStatContext } from "./context/StatContext";
import { useAbilityContext } from "./context/AbilityContext";
import { AbilityType } from "./interfaces/Ability";
import AbilityTab from "./screens/AbilityTab";

const { TabPane } = Tabs;

function App() {
    const [currentTab, setCurrentTab] = useState<string>("1");
    const {addStat} = useStatContext();
    const {addAbility} = useAbilityContext();

    const addButtonClicked = () => {
        if (currentTab === "1") addStat();
       // if (currentTab === "2") addAbility(AbilityType.OnHit);
        //if (currentTab === "2") onAddAbilityClicked();
    }

    const addButton = <Button type={'primary'} className={'add-button'} onClick={addButtonClicked}>+</Button>

    const addMenu = <Menu>
        <Menu.Item onClick={() => addAbility(AbilityType.OverTime)}>
            Over Time
        </Menu.Item>
        <Menu.Item onClick={() => addAbility(AbilityType.Passive)}>
            Passive
        </Menu.Item>
        <Menu.Item onClick={() => addAbility(AbilityType.Active)}>
            Active
        </Menu.Item>
    </Menu>

    const dropDown = <Dropdown overlay={addMenu} placement={"bottomCenter"}>
        <Button type={'primary'} className={'add-button'}>+</Button>
    </Dropdown>
    const onTabChange = (key: any) => {
        setCurrentTab(key)
    }
    return (
        <div className="App">
            <Tabs defaultActiveKey="1" activeKey={currentTab} className={'tabs'} type={"card"}
                  tabBarExtraContent={{ right: currentTab === '1' ? addButton : dropDown }} onChange={onTabChange}>
                <TabPane tab="Stats" key="1">
                    <StatTab/>
                </TabPane>
                <TabPane tab="Abilities" key="2">
                    <AbilityTab />
                </TabPane>
            </Tabs>
        </div>
    );
}

export default App;
