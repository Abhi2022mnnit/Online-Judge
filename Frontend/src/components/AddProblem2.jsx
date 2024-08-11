import { useState, useEffect } from 'react'
import '../App.css'
import apiConnect from '../apiServices/apiConnect';
import { NotifyContainer, notifySuccess } from './notify';
import { useDispatch, useSelector } from 'react-redux';
import { setStep, setProblem } from '../globalStorage/SignupSlice';
import { useForm } from "react-hook-form";


function AddProblem2() {

    const problem = useSelector((state) => state.problem);
    const { handleSubmit, setValue, register } = useForm();
    const edit = useSelector((state) => state.edit);


    useEffect(() => {
        if (edit) {
            setValue("problemName", problem.problemName);
            setValue("difficulty", problem.difficulty);
            setValue("problemDescription", problem.problemDescription);
            setValue("inputDescription", problem.inputDescription);
            setValue("outputDescription", problem.outputDescription);
            setValue("code", problem.code);
        }
    }, [edit, problem])

    const token = useSelector((state) => state.myToken);
    // const [problem, setproblem] = useState({
    //     problemName: '',
    //     difficulty: '',
    //     problemDescription: '',
    //     constraints: [],
    //     inputDescription : '',
    //     outputDescription : '',
    //     code: ''
    // });


    const [constraints, setConstraints] = useState([]);
    const [newConstraints, setNewConstraints] = useState('');

    // const textboxChange = (e) => {
    //     setproblem((prev) => ({
    //         ...prev,
    //         [e.target.name]: e.target.value
    //     })
    //     )
    // }

    const addConstraints = (newConstraints) => {
        if (newConstraints) {
            // console.log("ADFfad");
            constraints.push(newConstraints);
            // setNewConstraints('');
            console.log(constraints);
            notifySuccess('Constraint Added');      // toaster
        }
    }

    const dispatch = useDispatch();

    const submitHandler = async (data) => {
        if (edit) {
            try {
                const prevConst = problem.constraints;
                prevConst.concat(constraints);
                const promise = await apiConnect("POST", "https://online-judge-jq9r.onrender.com/api/phase1/auth/editProblem", {...data, constraints: prevConst, problemId: problem._id });

                if (!promise.data.success) {
                    throw new error("Error in sending Problem Api to server");
                }

                notifySuccess('Submitted');         //toaster
                // promise.data.problem._id;
                console.log(promise.data.problemDetails);
                dispatch(setProblem(promise.data.problemDetails));
                dispatch(setStep(2));

            }catch (error) {
                console.log(error.message);
            }
            
        }
        else {
            try {
                console.log(data);
                const promise = await apiConnect("POST", "https://online-judge-jq9r.onrender.com/phase1/auth/addProblem", { ...data, constraints: constraints });

                if (!promise.data.success) {
                    throw new Error("Error in sending Problem Api to server");
                }

                notifySuccess('Submitted');         //toaster
                // promise.data.problem._id;
                console.log(promise.data.problem);
                dispatch(setProblem(promise.data.problem));
                dispatch(setStep(2));

            } catch (error) {
                console.log(error.message);
            }
        }
    }

    return (
        <div className='flex-col item-center justify m-4'>
            <form onSubmit={handleSubmit(submitHandler)}>
                <label>Problem Name</label>
                <input type="text" className="inputTag" name='problemName' {...register("problemName", { register: true })} required/>

                <label>Problem Difficuty</label>
                <input type="text" className="inputTag" name='difficulty' {...register("difficulty", { register: true })} required/>

                <label>Problem Description</label>
                <input type="text" className="inputTag" name='problemDescription' {...register("problemDescription", { register: true })} required/>

                <label>Problem constraints</label>
                <input type="text" className="inputTag" name='newConstraints' value={newConstraints} onChange={(e) => setNewConstraints(e.target.value)} required></input>
                <button type="button" onClick={() => addConstraints(newConstraints)}
                    className="bg-red-600 text-white m-2 rounded-lg p-2 mx-4 hover:bg-red-700">Add</button>
                <br /><br />

                <label>Problem inputDescription</label>
                <input type="text" className="inputTag" name='inputDescription' {...register("inputDescription", { register: true })} required/>

                <label>Problem outputDescription</label>
                <input type="text" className="inputTag" name='outputDescription' {...register("outputDescription", { register: true })} required/>

                <label>Problem Code</label>
                <input type="text" className="inputTag" name='code' {...register("code", { register: true })} required/>
                <button type='Submit' className="bg-red-600 text-white m-2 rounded-lg p-2 mx-4 hover:bg-red-700"
                >Submit
                </button>
            </form>
            <NotifyContainer />
        </div>

    )
}

export default AddProblem2;