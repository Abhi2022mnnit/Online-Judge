import { useState } from 'react'
import '../App.css'
import apiConnect from '../apiServices/apiConnect';
import { NotifyContainer, notifySuccess } from './notify';
import { useDispatch } from 'react-redux';
import { setStep, setProblem } from '../globalStorage/SignupSlice';


function AddProblem() {

    const [problem, setproblem] = useState({
        problemName: '',
        difficulty: '',
        problemDescription: '',
        constraints: [],
        inputDescription : '',
        outputDescription : '',
        code: ''
    });

    const [constraints, setConstraints] = useState('');

    const textboxChange = (e) => {
        setproblem((prev) => ({
            ...prev,
            [e.target.name]: e.target.value
        })
        )
    }

    const addConstraints = (e) => {
        problem.constraints.push(constraints);
        setConstraints('');
        console.log(problem.constraints);
        notifySuccess('Constraint Added');      // toaster
    }

    const dispatch = useDispatch();

    const handleSubmit = async (e) => {
    e.preventDefault();
        try {
            console.log(problem);
            const promise = await apiConnect("POST", "http://localhost:4000/api/phase1/auth/addProblem", problem);

            if (!promise.data.success) {
                throw new error("Error in sending Problem Api to server");
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

    return (
        <div className='flex-col item-center justify m-4'>
            <form>
                <label>Problem Name</label>
                <input type="text" className="inputTag" name='problemName' value={problem.problemName} onChange={textboxChange}></input>
                <br /><br />

                <label>Problem Difficuty</label>
                <input type="text" className="inputTag" name='difficulty' value={problem.difficulty} onChange={textboxChange}></input>
                <br /><br />

                <label>Problem Description</label>
                <input type="text" className="inputTag" name='problemDescription' value={problem.problemDescription} onChange={textboxChange}></input>
                <br /><br />

                <label>Problem constraints</label>
                <input type="text" className="inputTag" name='constraints' value={constraints} onChange={(e) => setConstraints(e.target.value)}></input>
                <button type="button" onClick={addConstraints}
                    className="bg-red-600 text-white m-2 rounded-lg p-2 mx-4 hover:bg-red-700">Add</button>
                <br /><br />

                <label>Problem inputDescription</label>
                <input type="text" className="inputTag" name='inputDescription' value={problem.inputDescription} onChange={textboxChange}></input>
                <br /><br />

                <label>Problem outputDescription</label>
                <input type="text" className="inputTag" name='outputDescription' value={problem.outputDescription} onChange={textboxChange}></input>
                <br /><br />

                <label>Problem Code</label>
                <input type="text" className="inputTag" name='code' value={problem.code} onChange={textboxChange}></input>
            </form>
            <button type='submit' onClick={handleSubmit}
                className="bg-red-600 text-white m-2 rounded-lg p-2 mx-4 hover:bg-red-700"
            >Submit
            </button>
            <NotifyContainer />
        </div>

    )
}

export default AddProblem;