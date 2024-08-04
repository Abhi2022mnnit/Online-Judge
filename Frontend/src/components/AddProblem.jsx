import { useState, useEffect } from 'react'
import '../App.css'
import apiConnect from '../apiServices/apiConnect';
import { NotifyContainer, notifySuccess } from './notify';
import { useDispatch, useSelector } from 'react-redux';
import { setStep, setProblem } from '../globalStorage/SignupSlice';


function AddProblem() {

    const token = useSelector((state) => state.myToken);
    
    const [problem, setproblem] = useState({
        problemName: '',
        difficulty: '',
        problemDescription: '',
        constraints: [''],
        inputDescription: '',
        outputDescription: '',
        code: ''
    });

    const [problem2,setproblem2]=useState([]);
    const [cons, setCons] = useState('');

    const textboxChange = (e) => {
        localStorage.removeItem("Problem");
        setproblem((prev) => ({
            ...prev,
            [e.target.name]: e.target.value
        })
        )
    }

    const addConstraints = (e) => {
        console.log(cons);
        console.log(typeof problem[0].constraints);
        console.log(problem[0]);
        // problem[0]?.constraints.push(cons);
        // problem[0]?.constraints += cons;
        // console.log(problem.constraints);
        notifySuccess('Constraint Added');      // toaster
    }

    const dispatch = useDispatch();

    const handleSubmit = async (e) => {
        e.preventDefault();
        dispatch(setProblem(problem));
        dispatch(setStep(2));
        localStorage.setItem("Problem", JSON.stringify(problem));

        // const formData = new FormData(e.target);
        // formData.forEach((value, key) => {
        //     problem[key] = value; 
        // });

    }
    //     try {
    //         // console.log(problem);
    //         // console.log(token);

    //         const ob = {
    //             ...problem,
    //             token
    //         }

    //         const promise = await apiConnect("POST", "http://localhost:4000/api/phase1/auth/addProblem", ob);

    //         if (!promise.data.success) {
    //             throw new error("Error in sending Problem Api to server");
    //         }

    //         notifySuccess('Submitted');         //toaster
    //         // promise.data.problem._id;
    //         console.log(promise.data.problem);
    //         dispatch(setProblem(promise.data.problem));
    //         dispatch(setStep(2));

    //     } catch (error) {
    //         console.log(error.message);
    //     }
    // }


    //-----------------------------------------------------------------------------------
    // Trying to handle Previous Button...
    

    const [problemData,setproblemData]=useState();
    // console.log(problem[0].length)


    useEffect(()=>{
        setproblemData(localStorage.getItem("Problem"));

    },[])
    

    useEffect(()=>{
        const fillProblemData = () => {
        const problemData = localStorage.getItem("Problem");

            if(problemData){
                console.log("problemData : " + problemData);
                const theProblem = JSON.parse(problemData);
                console.log(typeof theProblem);

                let newprob = [theProblem];
                setproblem(newprob)
                // problem2?.map((item,index)=>{
                //     console.log(item[index])
                // })
                // console.log("thw problem ",problem2);
                // problem.problemName = theProblem.problemName;
                // setProblem(theProblem);

            }
        }

        fillProblemData();
    },[problemData])
    //-----------------------------------------------------------------------------------

    const submitform = (e)=>{
        e.preventDefault();
        const data = {};
        const formData = new FormData(e.target);
        formData.forEach((value, key) => {
            data[key] = value;
        });
        
        if(localStorage.getItem("Problem")){
            localStorage.removeItem("Problem");
        }

        localStorage.setItem("Problem", JSON.stringify(data));
        dispatch(setProblem(data));
        dispatch(setStep(2));
    }

    return (
        <div className='flex-col item-center justify m-4'>
            <form onSubmit={(e)=> submitform(e)}>
                <label>Problem Name</label>
                <input type="text" className="inputTag" name='problemName' id='problemName' defaultValue={problem[0]?.problemName} ></input>
                <br /><br />

                <label>Problem Difficuty</label>
                <input type="text" className="inputTag" name='difficulty' defaultValue={problem[0]?.difficulty} ></input>
                <br /><br />

                <label>Problem Description</label>
                <input type="text" className="inputTag" name='problemDescription' defaultValue={problem[0]?.problemDescription} ></input>
                <br /><br />

                <label>Problem constraints</label>
                <input type="text" className="inputTag" name='constraints' defaultValue={cons} onChange={(e) => setCons(e.target.value)}></input>
                <button type="button" onClick={addConstraints}
                    className="bg-red-600 text-white m-2 rounded-lg p-2 mx-4 hover:bg-red-700">Add</button>
                <br /><br />

                <label>Problem inputDescription</label>
                <input type="text" className="inputTag" name='inputDescription' defaultValue={problem[0]?.inputDescription}></input>
                <br /><br />

                <label>Problem outputDescription</label>
                <input type="text" className="inputTag" name='outputDescription' defaultValue={problem[0]?.outputDescription} ></input>
                <br /><br />

                <label>Problem Code</label>
                <input type="text" className="inputTag" name='code' defaultValue={problem[0]?.code} ></input>
            <button type='submit' 
                className="bg-red-600 text-white m-2 rounded-lg p-2 mx-4 hover:bg-red-700"
                >Next
            </button>
                </form>
            <NotifyContainer />
        </div>

    )
}

export default AddProblem;