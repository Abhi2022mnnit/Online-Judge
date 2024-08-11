import Editor from 'react-simple-code-editor'
import styled from 'styled-components'
import { highlight, languages } from 'prismjs/components/prism-core';
import 'prismjs/components/prism-clike';
import 'prismjs/components/prism-javascript';
import 'prismjs/themes/prism.css';
import { useState } from 'react';
import apiConnect from '../apiServices/apiConnect'

function ide() {

    const [lan, setLan] = useState('cpp');
    const [input, setInput] = useState();
    const [output, setOutput] = useState();
    const [code, setCode] = useState(`#include <iostream>
using namespace std; 
int main() { 
    cout<<"Hello World"<<endl;
    return 0; 
}`);

    const handleRun = async () => {
        console.log(input)
        if (!input) {
            try {
                const promise = await apiConnect("POST", "http://localhost:4000/api/phase1/auth/runCodeByIDEWithoutIp", { lan: 'cpp', code });
                if (!promise.data.success) {
                    throw new Error("Fail to run Code");
                }

                setOutput(promise.data.output);
            } catch (error) {
                console.log(error.message);
            }
        }
        else {
            try {
                const promise = await apiConnect("POST", "http://localhost:4000/api/phase1/auth/runCodeByIDEWithIp", { lan, code, input });
                if (!promise.data.success) {
                    throw new Error("Fail to run Code");
                }

                setOutput(promise.data.output);
                console.log(promise.data.output)
            } catch (error) {
                console.log(error.message);
            }
        }
    }

    const handleLan = (e) => {
        setLan(e.target.value);
        // console.log(e.target.value);
    }


    return (

        <div className='min-h-[100vh] mt-24 relative z-0'>
            <button onClick={handleRun} type="button" className="absolute -top-20 right-9 flex text-center inline-flex items-right text-white bg-gradient-to-br from-pink-500 to-orange-400 hover:bg-gradient-to-bl focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5 me-2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.91 11.672a.375.375 0 0 1 0 .656l-5.603 3.113a.375.375 0 0 1-.557-.328V8.887c0-.286.307-.466.557-.327l5.603 3.112Z" />
                </svg>
                Run
            </button>
                <select value={lan} onChange={handleLan}
                className="absolute -top-20 right-36 mr-2 select-box border border-gray-300 rounded-lg py-2 px-4 mb-1 focus:outline-none focus:border-indigo-500">
                    <option value='cpp'>C++</option>
                    <option value='c'>C</option>
                    {/* <option value='py'>Python</option>
                    <option value='java'>Java</option> */}
                </select>

                {/* Editor */}
                <div className='flex flex-row gap-5'>
                    <div className="m-4 w-full">
                        <Editor
                            value={code}
                            onValueChange={(code) => setCode(code)}
                            highlight={code => highlight(code, languages.js)}
                            className=" absolute mr-7 border-2 border-gray-500 mb-4"
                            padding={10}
                            style={{
                                fontFamily: '"Fira code", "Fira Mono", monospace',
                                fontSize: 16,
                                backgroundColor: '#f7fafc',
                                height: '100%',
                                overflowY: 'auto',
                                minHeight: "200px",
                            }}>
                        </Editor>
                    </div>

                    <div className='flex flex-col gap-9 ml-4 mr-2 -mt-9 w-[40%]'>
                        <div className="flex flex-col gap-3">
                            <label className='flex font-semibold text-lg items-left'>Input</label>
                            <textarea rows={5} cols={30} placeholder='Input' value={input} onChange={(e) => setInput(e.target.value)}
                                className='border-4 border-gray-500 rounded-lg' />
                        </div>
                        <div className="flex flex-col gap-3">
                            <label className='flex font-semibold text-lg items-left'>Output</label>
                            <textarea rows={5} cols={30} placeholder='Output' defaultValue={output}
                                className='border-4 border-gray-500 rounded-lg' />
                        </div>
                    </div>
                </div>
        </div>
    )
}

export default ide;