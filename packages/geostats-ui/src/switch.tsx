'use client'

import React, {useRef} from 'react';
import { SwitchProps as AriaSwitchProps, Switch as AriaSwitch } from 'react-aria-components';

export type SwitchProps = {
    readonly className?: string;
} & AriaSwitchProps;


export function Switch(props : SwitchProps){

    const {className, defaultSelected, isSelected, value, isDisabled, } = props;

    return( 
        <AriaSwitch className="flex items-center gap-1 size-12" >
            <div className="w-[2rem] h-[1.143rem] border-2 border-[var(--border-color)] bg-[var(--background-color)] rounded-[1.143rem] transition-all duration-200"></div>
        </AriaSwitch>
    );
}