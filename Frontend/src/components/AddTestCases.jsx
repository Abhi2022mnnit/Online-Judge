import { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { setStep,setProblem } from '../globalStorage/SignupSlice'
import { NotifyContainer, notifySuccess, notifyError } from './notify';
import apiConnect from '../apiServices/apiConnect';
import { useNavigate } from 'react-router-dom';

function AddTestCases() {

    const dispatch = useDispatch();
    const token = useSelector((state) => state.myToken);

    const [testCase, setTestCase] = useState({
        input: '',
        output: ''
    });

    const [allTestCases, setAllTestCases] = useState([]);
    const [problemId, setProblemId] = useState();
    const problem = useSelector((state) => state.problem);

    const addTestCase = (e) => {
        setTestCase((prev) => ({                        // setCase((prev) => ({}))
            ...prev,
            [e.target.name]: e.target.value,
        })
        )

    }

    const handleAddTestCase = async () => {

        allTestCases.push(testCase);

        console.log("TestCase Added");

        notifySuccess("TestCase Added");
    }

    const homeNavigate = useNavigate();

    const submitTestCases = async () => {
        dispatch(setStep(1));
        try {
            console.log(problem);
            console.log(token);

            const ob = {
                ...problem,
                token
            }

            const promise = await apiConnect("POST", "http://localhost:4000/api/phase1/auth/addProblem", ob);

            if (!promise.data.success) {
                throw new error("Error in sending Problem Api to server");
            }

            notifySuccess('Submitted');         //toaster
            // promise.data.problem._id;
            // console.log(promise.data.problem);
            dispatch(setProblem(promise.data.problem));
            setProblemId(promise.data.problem._id);
            // dispatch(setStep(2));

        } catch (error) {
            console.log(error.message);
        }

        allTestCases.map(  async(element, index) => {
            try {
                await apiConnect("POST", "http://localhost:4000/api/phase1/auth/addTestCase", { ...element, problemId: problemId });
            } catch (error) {
                notifyError('Submitted Failed at TestCase: ' + index+1); 
                console.log(error.message);
            }
        })

        homeNavigate('/dashboard/profile');
        notifySuccess('Submitted');         //toaster
    }

    const handlePrev = () => {
        dispatch(setStep(1));
    }

    useEffect(() => {
        const notify = () => {
            notifySuccess("Problem Added");
        }
        notify();
    }, [])

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