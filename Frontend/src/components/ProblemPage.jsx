import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import apiConnect from "../apiServices/apiConnect";
import Editor from 'react-simple-code-editor'
import { highlight, languages } from 'prismjs/components/prism-core';
import 'prismjs/components/prism-clike';
import 'prismjs/components/prism-javascript';
import 'prismjs/themes/prism.css';
import { NotifyContainer, notifySuccess, notifyError, notifyLoader } from './notify';
import { useSelector } from 'react-redux';


function ProblemPage() {

    const { problemId } = useParams();
    // console.log(problemId);

    const user = useSelector((state) => state.myUser);

    const [lan, setLan] = useState('cpp');
    const [problem, setProblem] = useState();
    const [allInputs, setAllInputs] = useState();
    // const [inputs, setInputs] = useState();
    const [output, setOutput] = useState('');
    const [expectedOutput, setExpectedOutput] = useState('');
    const [verdictValue, setverdictValue] = useState('');
    const [code, setCode] = useState(`#include <iostream>
using namespace std; 
int main() { 
    cout<<"Hello World"<<endl;
    return 0; 
}`);


    useEffect(() => {
        const fetchProblem = async () => {
            try {
                const promise = await apiConnect("POST", "https://online-judge-jq9r.onrender.com/api/phase1/auth/getProblemById", { problemId });
                // console.log(promise);

                if (!promise.data.success) {
                    throw new Error("Unable to Sending ProblemId to server");
                }


                setProblem(promise.data.getProblem)
                console.log(promise.data.getProblem);
            } catch (error) {
                console.log(error.message);
            }
        }

        fetchProblem();
    }, [])


    if (!problem) {
        return (
            <div className="text-3xl">Fetching Problem is under Process</div>
        )
    }

    const addCutomTestCases = (e) => {
        setAllInputs(e.target.value);
    }


    const handleRun = async () => {
        const payload = {
            lan: lan,
            code: code,
            inputs: allInputs,
            problemId: problemId
        };

        console.log(payload);

        if (!payload.code) {
            console.log("Please Enter Code");
            return;
        }
        if (!payload.inputs) {
            console.log("Please Enter Inputs");
            notifyError("Please Enter Inputs");
            return;
        }

        try {
            const resolveAfter2Seconds = new Promise(resolve => setTimeout(resolve, 4000))
            notifyLoader(resolveAfter2Seconds);

            const promise = await apiConnect("POST", 'https://online-judge-jq9r.onrender.com/api/phase1/auth/run', payload);
            
            
            // console.log(promise);
            console.log(promise.data);
            setOutput(promise.data.output);
            setExpectedOutput(promise.data.output2);
            setverdictValue(promise.data.Verdict);
        } catch (error) {
            console.log(error.response);
        }
    }

    const handleSubmit = async () => {
        // console.log(lan);
        // console.log(code);
        // console.log(allInputs);
        console.log(user._id);

        try {
            const resolveAfter2Seconds = new Promise(resolve => setTimeout(resolve, 4000))
            notifyLoader(resolveAfter2Seconds);

            const promise = await apiConnect("POST", 'https://online-judge-jq9r.onrender.com/api/phase1/auth/submitCode', { lan: 'cpp', code, problemId: problemId, userId: user._id });
            if (promise.data.success) {
                setverdictValue('Accepted');
                notifySuccess("Accepted");
            } else {
                setverdictValue('Failed');
                notifyError("Failed");
            }
        } catch (error) {
            console.log("fjdkdfsj : " + error.response);
        }
    }

    const handleLan = (e) => {
        setLan(e.target.value);
        console.log(e.target.value);
    }


    return (
        <div className="min-h-[100vh] relative z-0">
            {/* Problem Description */}
            {
                problem && (
                    <div className="border-2 border-gray-400 m-4 p-2">
                        <div className="flex flex-row gap-3">
                            <label>Problem Name:</label>
                            <p>{problem.problemName}</p>
                        </div>

                        <div className="flex flex-row gap-3">
                            <label>Difficulty:</label>
                            <p>{problem.difficulty}</p>
                        </div>

                        <div className="flex flex-row gap-3">
                            <label>Problem Description:</label>
                            <p>{problem.problemDescription}</p>
                        </div>

                        <div className="flex flex-row gap-6">
                            <label>Constraints:  </label>
                            {/* <p>{problem.constraints}</p> */}
                            {
                                problem.constraints.map((cons, idx) => { return <p key={idx}>{cons}</p> })
                            }
                        </div>

                        <div className="flex flex-row gap-3">
                            <label>Input Description:</label>
                            <p>{problem.inputDescription}</p>
                        </div>

                        <div className="flex flex-row gap-3">
                            <label>Output Description:</label>
                            <p>{problem.outputDescription}</p>
                        </div>

                        <div className="flex flex-row gap-3">Example: </div>
                        <div className="flex flex-row gap-3">
                            <label>Input: </label>
                            <p>{problem.testCases[0].input}</p>
                        </div>
                        <div className="flex flex-row gap-3">
                            <label>Output: </label>
                            <p>{problem.testCases[0].output}</p>
                        </div>

                    </div>
                )
            }


            {/* Editor */}
            <div className="m-4 mt-16 w-full">
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
                        minHeight: "200px"
                    }}>

                </Editor>

                <div className=" flex flex-row gap-4  m-2 top-3/4">
                    <div className="flex flex-col gap-3 w-[50%] m-2">
                        <label className="flex items-left">TestCases</label>
                        <textarea
                            value={allInputs}
                            placeholder="Write Sample Inputs"
                            onChange={addCutomTestCases}
                            rows={13}
                            cols={50}
                            className="border-2 border-gray-500 rounded-lg"
                        />
                    </div>

                    {
                        // (output &&
                        <div className=" flex flex-col gap-3 w-[50%] m-2 -top-20 z-10 -right-96">
                            <div className="flex flex-row gap-3">
                                <label className="flex items-left">Output</label>
                                <div className="flex flex-row gap-3">
                                    <label className="flex font-semibold">Verdict : </label>
                                    <label className={verdictValue === 'Accepted' ? "flex font-semibold text-lg text-green-700" : "flex font-semibold text-lg text-red-600"}
                                    >{verdictValue}</label>
                                </div>
                            </div>
                            <div className="flex flex-col gap-3 min-h-4">
                                <div className="flex flex-col gap-2 border-2 border-gray-300">
                                    <label className="flex ml=0 font-semibold"
                                    >Output : </label>
                                    <textarea defaultValue={output} readOnly rows={5} />
                                </div>
                                <div className="flex flex-col gap-2 border-2 border-gray-300">
                                    <label className="flex ml=0 font-semibold"
                                    >Expected Output : </label>
                                    <textarea defaultValue={expectedOutput} readOnly rows={5} />
                                </div>
                            </div>
                        </div>
                        // )
                    }

                </div>




                <div className="absolute p-2 md:top-64 md:right-4 top-52 right-32">
                    <select value={lan} onChange={handleLan}
                        className="mr-2 select-box border border-gray-300 rounded-lg py-1.5 px-4 focus:outline-none focus:border-indigo-500">
                        <option value='cpp'>C++</option>
                        <option value='c'>C</option>
                        {/* <option value='py'>Python</option>
                    <option value='java'>Java</option> */}
                    </select>
                    <button onClick={handleRun} type="button" className="text-center inline-flex items-center text-white bg-gradient-to-br from-pink-500 to-orange-400 hover:bg-gradient-to-bl focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5 me-2">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15.91 11.672a.375.375 0 0 1 0 .656l-5.603 3.113a.375.375 0 0 1-.557-.328V8.887c0-.286.307-.466.557-.327l5.603 3.112Z" />
                        </svg>
                        Run
                    </button>
                    <button onClick={handleSubmit} type="button" className="text-center inline-flex items-center text-white bg-gradient-to-br from-pink-500 to-orange-400 hover:bg-gradient-to-bl focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5 me-2">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15.91 11.672a.375.375 0 0 1 0 .656l-5.603 3.113a.375.375 0 0 1-.557-.328V8.887c0-.286.307-.466.557-.327l5.603 3.112Z" />
                        </svg>
                        Submit
                    </button>
                </div>

            </div>
            <NotifyContainer />
        </div>
    )
}

export default ProblemPage;