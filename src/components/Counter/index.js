/* userRef useEffect实验 */
import { useState, useRef, useEffect } from 'react'
import React from 'react';

function Counter() {
    const [count, setCount] = useState(0);
    const prevCount = usePrevious(count);
    const add = () => {
        setCount(count + 1)
    }
    return (
        <>
            <h1>Now: {count}, before: {prevCount}</h1>
            <button onClick={add}>add</button>
        </>
    );
}

function usePrevious(value) {
    const ref = useRef();
    useEffect(() => {
        ref.current = value;
        console.log('effect ref.current = value', value)
    }); //Effect默认是渲染完成才执行，所以会滞后
    console.log('usePrevious ref.current', ref.current, 'input value', value)
    return ref.current;
}


function TextInputWithFocusButton() {
    const inputEl = useRef(null);   //useRef绑定DOM元素
    const onButtonClick = () => {
      // `current` 指向已挂载到 DOM 上的文本输入元素
      inputEl.current.focus();
    };
    return (
      <>
        <input ref={inputEl} type="text" />
        <button onClick={onButtonClick}>Focus the input</button>
      </>
    );
  }

export default Counter
export {TextInputWithFocusButton}