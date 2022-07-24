[![release](https://github.com/moeui/react-auto-size-input/actions/workflows/release.yml/badge.svg)](https://github.com/moeui/react-auto-size-input/actions/workflows/release.yml)

# react-auto-size-input

Adjust the width according to the text, and can reach a certain length to reduce the font size.

## Install

    yarn add @moeui/react-auto-size-input // or npm i @moeui/react-auto-size-input -S

## Use

    import Input from '@moeui/react-auto-size-input'

     <Input value={value} onChange={val => setValue(val)} />

## Props

| Name           | Description                                         | Type                                 | Default    |
| -------------- | --------------------------------------------------- | ------------------------------------ | ---------- |
| value          | input value                                         | `string`                             | `'0'`      |
| onChange       | Triggered when the input content is changed         | `(value: string) => void`            | -          |
| onKeyDown      | Triggered when the input content is onKeyDowned     | `(e: KeyboardEvent) => void`         | -          |
| className      | Input class name                                    | `string`                             | -          |
| prefix         | The prefix icon for the Input                       | `() => React.ReactElement \| string` | -          |
| suffix         | The suffix dom for the Input	                       | `() => React.ReactElement \| string` | -          |
| maxLength      | The maximum number of characters the user can enter | `number`                             | 20         |
| shrink         | Text shrinks the length limit                       | `number`                             | 12         |
| shrinkFontSize | Text shrinks font size                              | `number`                             | 26         |
| fontSize 	     | Text font size                                      | `number`                             | 36         |
| defaultValue   | input value is empty displayed value                | `string`                             | `'0'`      |

## Ref

| Name          | Description                  | Type                         |
| ------------- | ---------------------------- | ---------------------------- |
| blur          | Let the input box lose focus | `() => void`                 |
| clear         | Clear the input content      | `() => void`                 |
| focus         | Let the input box get focus  | `() => void`                 |

### CSS Variables

| Name                | Description             | Default                  |
| ------------------- | ----------------------- | ------------------------ |
| --color             | Text color.             | -                        | 
| --background        | The input background    | -                        | 