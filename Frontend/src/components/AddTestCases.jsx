import { useState, useEffect } from "react";
import {useDispatch, useSelector} from 'react-redux';
import {setStep} from '../globalStorage/SignupSlice'
import { NotifyContainer, notifySuccess } from './notify';
import apiConnect from '../apiServices/apiConnect';
import {useNavigate} from 'react-router-dom';

function AddTestCases() {

    const dispatch = useDispatch();

    const [testCase, setTestCase] = useState({
        input: '',
        output: ''
    });

    const problem = useSelector((state) => state.problem);

    const addTestCase = (e) => {
        setTestCase((prev) => ({                        // setCase((prev) => ({}))
            ...prev,
            [e.target.name]: e.target.value,
        })
        )

    }

    const handleAddTestCase = async () => {
        console.log("TestCase Added");
        notifySuccess("TestCase Added");
        
        try{
            await apiConnect("POST", "http://localhost:4000/api/phase1/auth/addTestCase", {...testCase, problemId: problem._id});
        }catch(error){
            console.log(error.message);
        }
    }

    const homeNavigate = useNavigate();

    const submitTestCases = () => {
        dispatch(setStep(1));
        homeNavigate('/dashboard/profile');
    }

    const handlePrev = () => {
        dispatch(setStep(1));
    }

    useEffect(() => {
        const notify = () => {
            notifySuccess("Problem Added");
        }
        notify();
    },[])

    return (
        <div>
            <div className="border-2 border-gray-500 w-[50%] mt-5 mx-auto">
                <form className="flex flex-col gap-5 item-center justify-between p-5">
                    <div className="flex flex-row gap-4 item-center">
                        <label>Sample Input</label>
                        <input type="text" onChange={addTestCase}
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
            <NotifyContainer />
        </div>
    )
}

export default AddTestCases;