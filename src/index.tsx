import classnames from 'classnames'
import * as React from 'react'
import { forwardRef, useEffect, useState, useRef, useImperativeHandle } from 'react'

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

export default forwardRef((props: IProps , ref) => {
    const InputRef = useRef<HTMLInputElement>(null)
    const [value, setValue] = useState<string>(props.value)
    const [width, setWidth] = useState(0)
    const shrink = props.shrink || 12
    const shrinkFontSize = props.shrinkFontSize || 26
    const fontSize = props.fontSize || 36

    useImperativeHandle(ref, () => ({
        setValue: (val: string) => {
            setValue(val)
        }
    }))

    useEffect(() => {
        if (props.onChange) {
            props.onChange(value)
        }
    }, [value])

    useEffect(() => {
        if (InputRef.current) {
            const inputFontStyle = window.getComputedStyle(InputRef.current, null).getPropertyValue('font').split(' ')
            inputFontStyle.splice(1, 1, `${fontSize}px`)
            setWidth(measureText('0', inputFontStyle.join(' ')))
        }
    }, [InputRef, value])

    return (
        <div className={classnames(style.input, props.className)} onClick={() => InputRef.current?.focus()}>
            {props.prefix}
            <input
                value={value}
                onChange={e => {
                    const value = filterInput(e.target.value) || '0'
                    const inputFontStyle = window.getComputedStyle(e.target, null).getPropertyValue('font').split(' ')
                    inputFontStyle.splice(1, 1, `${value.length > shrink ? shrinkFontSize : fontSize}px`)
                    setWidth(measureText(value, inputFontStyle.join(' ')))
                    setValue(value)
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
})

