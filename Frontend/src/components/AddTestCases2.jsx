import { useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { setStep,setProblem } from '../globalStorage/SignupSlice'
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

    const handleAddTestCase = async() => {
        try {
            await apiConnect("POST", "http://localhost:4000/api/phase1/auth/addTestCase", { ...testCase, problemId: problem._id });
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
            <button type="submit" onClick={submitTestCases}
                className="bg-red-600 text-white m-2 p-2 fixed bottom-24"
            >Submit</button>
            <NotifyContainer/>
        </div>
    )
}

export default AddTestCases2;