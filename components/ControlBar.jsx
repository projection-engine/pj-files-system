import PropTypes from "prop-types";
import styles from '../styles/Control.module.css'
import {Button, Dropdown, DropdownOption, DropdownOptions} from "@f-ui/core";
import React from "react";
import Search from "../../../components/search/Search";
import ImportHandler from "./ImportHandler";

export default function ControlBar(props) {

    return (
        <>
            <Search searchString={props.searchString} setSearchString={props.setSearchString} width={'50%'}/>
            <div style={{display: 'flex', justifyContent: 'space-between', width: '100%'}}>

                <div className={styles.pathWrapper}>
                    <div className={styles.divider}/>
                    {props.path.map((p, i) => (
                        <React.Fragment key={p.path}>
                            <Button className={styles.button}

                                    styles={{fontWeight: 'normal', minWidth: '60px'}}

                                    onClick={() => {
                                        const found = props.hook.items.find(i => i.id === p.path)
                                        if (found)
                                            props.hook.setCurrentDirectory(found)
                                        else
                                            props.hook.setCurrentDirectory({
                                                id: '\\'
                                            })
                                    }}>

                                {p.name}

                            </Button>
                            {i < props.path.length - 1 ?
                                <span className={'material-icons-round'}
                                      style={{fontSize: '1.2rem', height: 'fit-content'}}>chevron_right</span> : null}
                        </React.Fragment>
                    ))}
                </div>
                <div className={styles.pathWrapper} style={{gap: '4px'}}>
                    <div className={styles.divider}/>
                    <Button
                        variant={"outlined"}
                        disabled={props.path.length <= 1}
                        className={styles.settingsButton}

                        onClick={() => {
                            const found = props.hook.items.find(i => i.id === props.hook.currentDirectory.parent)
                            if (found)
                                props.hook.setCurrentDirectory(found)
                        }}
                    >
                        <span className={'material-icons-round'}>arrow_upward</span>
                    </Button>
                    <Button className={styles.settingsButton} onClick={() => props.hook.refreshFiles()}
                            variant={"outlined"}>
                        <span className={'material-icons-round'}>refresh</span>
                    </Button>
                    <div className={styles.divider}/>
                    <Dropdown
                        variant={'outlined'}
                        className={styles.settingsButton}
                    >
                        <span className={'material-icons-round'} style={{fontSize: '1.1rem'}}>view_headline</span>View
                        <DropdownOptions>
                            <DropdownOption option={{
                                icon: props.visualizationType === 0 ? <span className={'material-icons-round'}
                                                                            style={{fontSize: '1.1rem'}}>check</span> : null,
                                label: 'Big card',
                                onClick: () => props.setVisualizationType(0)
                            }}/>
                            <DropdownOption option={{
                                icon: props.visualizationType === 1 ? <span className={'material-icons-round'}
                                                                            style={{fontSize: '1.1rem'}}>check</span> : null,
                                label: 'Small card',
                                onClick: () => props.setVisualizationType(1)
                            }}/>
                            <DropdownOption option={{
                                icon: props.visualizationType === 2 ? <span className={'material-icons-round'}
                                                                            style={{fontSize: '1.1rem'}}>check</span> : null,
                                label: 'List',
                                onClick: () => props.setVisualizationType(2)
                            }}/>
                        </DropdownOptions>
                    </Dropdown>

                    <ImportHandler {...props}/>
                </div>
            </div>
        </>
    )
}

ControlBar.propTypes = {
    visualizationType: PropTypes.number,
    setVisualizationType: PropTypes.func,


    searchString: PropTypes.string,
    setSearchString: PropTypes.func,
    path: PropTypes.arrayOf(PropTypes.object),

    hook: PropTypes.object.isRequired,

}
