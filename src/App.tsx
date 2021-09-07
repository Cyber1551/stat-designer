import React, { useState } from 'react';
import './App.css';
import StatTab from "./screens/StatTab";
import { Button, Tabs } from "antd";
import { StatProvider, useStatContext } from "./context/StatContext";

const { TabPane } = Tabs;

function App() {
    const [currentTab, setCurrentTab] = useState<string>("1");
    const {addStat} = useStatContext();

    const addButtonClicked = () => {
        if (currentTab === "1") addStat();
        //if (currentTab === "2") onAddAbilityClicked();
    }

    const addButton = <Button type={'primary'} className={'add-button'} onClick={addButtonClicked}>+</Button>

    const onTabChange = (key: any) => {
        setCurrentTab(key)
    }
    return (
        <div className="App">
            <Tabs defaultActiveKey="1" activeKey={currentTab} className={'tabs'} type={"card"}
                  tabBarExtraContent={{ right: addButton }} onChange={onTabChange}>
                <TabPane tab="Stats" key="1">
                    <StatTab/>
                </TabPane>
                <TabPane tab="Abilities" key="2">
                    Content of Tab Pane 2
                </TabPane>
            </Tabs>
        </div>
    );
}

export default App;
