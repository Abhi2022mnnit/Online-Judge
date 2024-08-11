import { useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { setStep, setProblem, setEdit } from '../globalStorage/SignupSlice'
import { NotifyContainer, notifySuccess, notifyError } from './notify';
import { useNavigate } from "react-router-dom";
import apiConnect from "../apiServices/apiConnect";


function AddTestCases2() {

    const dispatch = useDispatch();
    const problem = useSelector((state) => state.problem);
    const [testCase, setTestCase] = useState({
        input: '',
        output: ''
    });

    const addTestCase = (e) => {
        setTestCase((prev) => ({                        // setCase((prev) => ({}))
            ...prev,
            [e.target.name]: e.target.value,
        })
        )
    }

    const handlePrev = () => {
        dispatch(setEdit(true));
        dispatch(setStep(1));
    }

    const handleAddTestCase = async () => {
        try {
            const promise = await apiConnect("POST", "https://online-judge-jq9r.onrender.com/api/phase1/auth/addTestCase", { ...testCase, problemId: problem._id });

            if (!promise.data.success) {
                throw new error("Error in sending Problem Api to server");
            }

            dispatch(setProblem(promise.data.problem));

            notifySuccess("TestCase Added");
        } catch (error) {
            notifyError('Submitted Failed at TestCase: ');
            console.log(error.message);
        }
    }

    const homeNavigate = useNavigate();

    const submitTestCases = () => {
        dispatch(setProblem(null));
        dispatch(setStep(1));
        homeNavigate('/dashboard/profile');
        notifySuccess('Submitted');
    }

    const removeTestCase = async (element) => {
        try {
            const promise = await apiConnect("POST", "https://online-judge-jq9r.onrender.com/api/phase1/auth/removeTestCase", element);

            if (!promise.data.success) {
                throw new error("Error in sending Problem Api to server");
            }

            dispatch(setProblem(promise.data.problemDetails));

            notifySuccess("TestCase Removed");
        } catch (error) {
            notifyError('Submitted Failed at TestCase: ');
            console.log(error.message);
        }

    }

    return (
        <div>
            <div className="border-2 border-gray-500 w-[50%] mt-5 mx-auto">
                <form className="flex flex-col gap-5 item-center justify-between p-5">
                    <div className="flex flex-row gap-4 item-center">
                        <label>Sample Input</label>
                        <input type="text" onChange={(addTestCase)}
                            name='input'
                            value={testCase.input}
                            className="border-2 border-gray-500"
                            placeholder="Add Input"
                        ></input>
                    </div>
                    <div className="flex flex-row gap-4 item-center">
                        <label>Sample Output</label>
                        <input type="text" onChange={addTestCase}
                            name='output'
                            value={testCase.output}
                            className="border-2 border-gray-500"
                            placeholder="Add Output"
                        ></input>
                    </div>
                </form>
                <button type='submit' onClick={handleAddTestCase}
                    className="bg-red-600 text-white m-2 p-2"
                >Add TestCase</button>
            </div>
            <div className="flex flex-row gap-96 ml-64 mt-4">
                <button type="submit" onClick={handlePrev}
                    className="bg-gray-500 text-white m-2 p-2 bottom-24 hover:bg-gray-700 rounded-lg"
                >Prev</button>
                <button type="submit" onClick={submitTestCases}
                    className="bg-red-600 text-white m-2 p-2 bottom-24 hover:bg-red-700 ronded-lg"
                >Submit</button>
            </div>

            {
                problem && problem.testCases.map((element, index) => {
                    return (
                        <div className="border-2 border-black">
                        <p className="text-xl font-bold">TestCase {index+1}: </p> 
                        <div className="flex flex-row gap-2 justify-center text-black font-bold text-xl">
                            
                            <div className="mx-2 border-2">Input: {element.input}</div>
                            <div className="mx-2 border-2">Output: {element.output}</div>
                            
                            <p onClick={() => removeTestCase(element)}
                                className="font-semibold border-2 border-red-300 text-red-600 hover:text-red-500 cursor-pointer">Delete</p>
                        </div>
                       </div> 
                    )
                })




            }


            <NotifyContainer />
        </div>
    )
}

export default AddTestCases2;