import classnames from 'classnames'
import * as React from 'react'
import { useState, forwardRef, useImperativeHandle, useRef, useEffect } from 'react'

import style from './index.stylus'
import { NativeProps, withNativeProps } from './native-props'

type IProps = {
    onChange?: (value: string) => void,
    onEnterPress?: (e: React.KeyboardEvent<HTMLInputElement>) => void,
    onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void,
    value: string
    prefix?: React.ReactElement | string
    suffix?: React.ReactElement | string
    maxLength?: number
    shrink?: number
    shrinkFontSize?: number
    fontSize?: number
    defaultValue?: string
} & NativeProps<'--background' | '--color'>

let tCanvas: HTMLCanvasElement
function measureText(text: string, font: string): number {
    const canvas = tCanvas || (tCanvas = document.createElement('canvas'))
    const context = canvas.getContext('2d')
    if(!context) return 0
    context.font = font
    const metrics = context.measureText(text)
    return metrics.width
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

export interface InputRef {
    focus: () => void
    blur: () => void
    clear: () => void
}

export default forwardRef<InputRef, IProps>((props, ref) => {
    const InputRef = useRef<HTMLInputElement>(null)
    const defaultValue = props?.defaultValue || '0'
    const [value, setValue] = useState<string>(defaultValue)
    const [width, setWidth] = useState(0)
    const shrink = props.shrink || 12
    const shrinkFontSize = props.shrinkFontSize || 26
    const fontSize = props.fontSize || 36

    const handleWidth = (str: string): void => {
        if (!InputRef.current) return
        const inputStyle = window.getComputedStyle(InputRef.current, null)
        const lineHeight = inputStyle.getPropertyValue('line-height')
        const fontWeight = inputStyle.getPropertyValue('font-weight')
        const fontFamily = inputStyle.getPropertyValue('font-family')
        setWidth(measureText(str, `${fontWeight} ${str.length > shrink ? shrinkFontSize : fontSize}px / ${lineHeight} ${fontFamily}`))
    }

    const handleKeydown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (props.onEnterPress && (e.code === 'Enter' || e.keyCode === 13)) {
            props.onEnterPress(e)
        }
        props.onKeyDown?.(e)
    }

    useImperativeHandle(ref, () => ({
        clear: () => {
            setValue(defaultValue)
        },
        focus: () => {
            InputRef.current?.focus()
        },
        blur: () => {
            InputRef.current?.blur()
        }
    }))

    useEffect(() => {
        const val = filterInput(props.value) || defaultValue
        setValue(val)
        handleWidth(val)
    }, [props.value])

    useEffect(() => {
        handleWidth(value)
    }, [InputRef.current])

    return withNativeProps(props,(
        <div className={classnames(style.input, props.className)} onClick={() => InputRef.current?.focus()}>
            {props.prefix}
            <input
                value={value}
                onKeyDown={handleKeydown}
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
    ))
})

