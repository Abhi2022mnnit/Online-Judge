import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import apiConnect from "../apiServices/apiConnect";
import Editor from 'react-simple-code-editor'
import { highlight, languages } from 'prismjs/components/prism-core';
import 'prismjs/components/prism-clike';
import 'prismjs/components/prism-javascript';
import 'prismjs/themes/prism.css';

function ProblemPage() {

    const { problemId } = useParams();
    console.log(problemId);

    const [problem, setProblem] = useState();
    const [allInputs, setAllInputs] = useState();
    // const [inputs, setInputs] = useState();
    const [output, setOutput] = useState('');
    const [code, setCode] = useState(` #include <iostream>
using namespace std; 
  int main() { 
cout<<"Hello WOrld"<<endl;
int a,b;
cin>>a>>b;
cout<<a<<b;
      return 0; }`);


    useEffect(() => {
        const fetchProblem = async () => {
            try {
                const promise = await apiConnect("POST", "http://localhost:4000/api/phase1/auth/getProblemById", { problemId });
                // console.log(promise);

                if (!promise.data.success) {
                    throw new Error("Unable to Sending ProblemId to server");
                }


                setProblem(promise.data.getProblem)
                // console.log(problem);
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


    const handleSubmit = async () => {
        const payload = {
            lan: 'cpp',
            code,
            inputs: allInputs
        };

        console.log(payload);

        try {
            const { data } = await apiConnect("POST", 'http://localhost:4000/api/phase1/auth/run', payload);
            console.log(data);
            setOutput(data.output);
        } catch (error) {
            console.log(error.response);
        }
    }



    return (
        <div>
            {/* Problem Description */}
            {
                problem && (
                    <div className="border-2 border-gray-500">
                        <label>
                            Problem Name:
                            <textarea
                                name="problemName"
                                defaultValue={problem.problemName}
                                rows={4}
                                cols={40}
                                readonly='readonly'
                                disabled={true}
                            />
                        </label>

                        <label>
                            Difficulty:
                            <textarea
                                name="problemName"
                                defaultValue={problem.difficulty}
                                rows={4}
                                cols={40}
                                readonly='readonly'
                                disabled={true}
                            />
                        </label>
                        <label>
                            Problem Description:
                            <textarea
                                name="problemName"
                                defaultValue={problem.problemDescription}
                                rows={4}
                                cols={40}
                                readonly='readonly'
                                disabled={true}
                            />
                        </label>
                        <label>
                            Constraints:
                            <textarea
                                name="problemName"
                                defaultValue={problem.constraints}
                                rows={4}
                                cols={40}
                                readonly='readonly'
                                disabled={true}
                            />
                        </label>
                        <label>
                            Input Description:
                            <textarea
                                name="problemName"
                                defaultValue={problem.inputDescription}
                                rows={4}
                                cols={40}
                                readonly='readonly'
                                disabled={true}
                            />
                        </label>
                        <label>
                            Output Description:
                            <textarea
                                name="problemName"
                                defaultValue={problem.outputDescription}
                                rows={4}
                                cols={40}
                                readonly='readonly'
                                disabled={true}
                            />
                        </label>


                    </div>
                )
            }

            <div className="flex flex-row gap-4">
                <div className="flex flex-col gap-5 w-[50%]">
                    <label>Custom TestCases</label>
                    <textarea
                        value={allInputs}
                        placeholder="Write Sample Inputs"
                        onChange={addCutomTestCases}
                        rows={6}
                        cols={50}
                        className="border-2 border-gray-500 rounded-lg"
                    // disabled={true}
                    />
                </div>

                {
                    (output &&
                    <div className="flex flex-col gap-5 w-[50%]">
                        <label>Custom TestCases</label>
                        <textarea
                            value={output}
                            onChange={addCutomTestCases}
                            rows={6}
                            cols={50}
                            className="border-2 border-gray-500 rounded-lg"
                            disabled={true}
                        />
                    </div>
                    )
                }

            </div>


            {/* Editor */}
            <div className="m-4 w-full">
                <Editor
                    value={code}
                    onValueChange={(code) => setCode(code)}
                    highlight={code => highlight(code, languages.js)}
                    padding={10}
                    style={{
                        fontFamily: '"Fira code", "Fira Mono", monospace',
                        fontSize: 12,
                        outline: 'none',
                        border: 'none',
                        backgroundColor: '#f7fafc',
                        height: '100%',
                        overflowY: 'auto'
                    }}>

                </Editor>

                <button onClick={handleSubmit} type="button" className="text-center inline-flex items-center text-white bg-gradient-to-br from-pink-500 to-orange-400 hover:bg-gradient-to-bl focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5 me-2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.91 11.672a.375.375 0 0 1 0 .656l-5.603 3.113a.375.375 0 0 1-.557-.328V8.887c0-.286.307-.466.557-.327l5.603 3.112Z" />
                    </svg>
                    Run
                </button>

            </div>

        </div>
    )
}

export default ProblemPage;