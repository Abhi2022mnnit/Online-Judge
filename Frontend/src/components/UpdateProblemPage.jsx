import { useState, useEffect } from "react";
import apiConnect from "../apiServices/apiConnect";
import { NotifyContainer, notifySuccess } from './notify';
import { useParams } from "react-router-dom";
import { setEdit, setStep, setProblem } from "../globalStorage/SignupSlice";

import AddProblem from "./AddProblem";
import AddProblem2 from "./AddProblem2";
import AddTestCases from "./AddTestCases"
import AddTestCases2 from "./AddTestCases2"
import { useDispatch, useSelector } from 'react-redux';

function updateProblemPage() {

    // const [newConstraints, setNewConstriants] = useState();
    // const [problem, setProblem] = useState(null);
    // // const [newProblem, setNewProblem] = useState({problemName: '',
    // //     difficulty: '',
    // //     problemDescription: '',
    // //     constraints: [],
    // //     inputDescription: '',
    // //     outputDescription: '',
    // //     code: '',
    // //     testCases: []
    // // });



    // const addConstraints = (e) => {
    //     problem.constraints.push(newConstraints);
    //     // console.log(newConstraints);
    //     setNewConstriants('');
    // }

    // const removeConstraints = (ele) => {
    //     const pc = problem.constraints.filter((cons) => cons !== ele);
    //     problem.constraints = pc;
    //     console.log(problem.constraints);
    //     setNewConstriants('');

    // }

    const step = useSelector((state) => state.step);
    const edit = useSelector((state) => state.edit);
    const problem = useSelector((state) => state.problem);
    const { problemId } = useParams();
    const dispatch = useDispatch();
    
 

    useEffect(() => {
        const fetchPrevProblem = async () => {
            try {
                console.log(problemId);
                const promise = await apiConnect("POST", "https://online-judge-jq9r.onrender.com/api/phase1/auth/getCreatedProblemById", { problemId });
                if (!promise.data.success) {
                    throw new Error("No problems Found in database!!!");
                }

                console.log(promise.data.problemDetails);
                dispatch(setProblem(promise.data.problemDetails));
                dispatch(setEdit(true));
                dispatch(setStep(1));
            }
            catch (error) {
                console.log("Error in fetching all Problems from server" + error.message);
            }
        }

        fetchPrevProblem();

    }, []);

    return (
        <div>
            {step == 1 && <AddProblem2 />}
            {step == 2 && <AddTestCases2 />}
        </div>
    )
}

export default updateProblemPage;

