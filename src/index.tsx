import classnames from 'classnames'
import * as React from 'react'
import { useEffect, useState, useRef } from 'react'

import style from './index.stylus'

type IProps = {
    className?: string,
    onChange?: (value: string) => void,
    value: string
    prefix?: React.ReactElement | string
    suffix?: React.ReactElement | string
    maxLength?: number
    shrink?: number
    shrinkFontSize?: number
    fontSize?: number
    defaultValue?: string
}

let tCanvas: HTMLCanvasElement
function measureText(text: string, font: string): number {
    const canvas = tCanvas || (tCanvas = document.createElement('canvas'))
    const context = canvas.getContext('2d')
    if (context) {
        context.font = font
        const metrics = context.measureText(text)
        return metrics.width
    }
    return 0
}


function filterInput(val: string): string {
    const v = val
        .replace('-', '')
        .replace(/^\.+|[^\d.]/g, '')
        .replace(/^0\d+\./g, '0.')
        .replace(/\.{6,}/, '')
        .replace(/^0(\d)/, '$1')
        .replace(/^(\-)*(\d+)\.(\d{0,6}).*$/, '$1$2.$3')
    return Number(v) >= 0 ? v : ''
}

export interface IInput {
    setValue(val: string): void
}

export default (props: IProps) => {
    const InputRef = useRef<HTMLInputElement>(null)
    const defaultValue = props?.defaultValue || '0'
    const [value, setValue] = useState<string>(defaultValue)
    const [width, setWidth] = useState(0)
    const shrink = props.shrink || 12
    const shrinkFontSize = props.shrinkFontSize || 26
    const fontSize = props.fontSize || 36

    const handleWidth = (str: string): void => {
        if (!InputRef.current) return
        const inputFontStyle = window.getComputedStyle(InputRef.current, null).getPropertyValue('font').split(' ')
        inputFontStyle.splice(1, 1, `${str.length > shrink ? shrinkFontSize : fontSize}px`)
        setWidth(measureText(str, inputFontStyle.join(' ')))
    }

    useEffect(() => {
        const val = filterInput(props.value) || defaultValue
        setValue(val)
        handleWidth(val)
    }, [props.value])

    useEffect(() => {
        handleWidth(value)
    }, [InputRef.current])

    console.log(width)

    return (
        <div className={classnames(style.input, props.className)} onClick={() => InputRef.current?.focus()}>
            {props.prefix}
            <input
                value={value}
                onChange={e => {
                    const val = filterInput(e.target.value) || defaultValue
                    handleWidth(val)
                    setValue(val)
                    if (props.onChange) {
                        props.onChange(val)
                    }
                }}
                style={{
                    width,
                    fontSize: value.length > shrink ? shrinkFontSize : fontSize,
                }}
                ref={InputRef}
                maxLength={props.maxLength}
            />
            {props.suffix}
        </div>
    )
}

