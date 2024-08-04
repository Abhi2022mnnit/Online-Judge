import { useState, useEffect } from "react";
import apiConnect from "../apiServices/apiConnect";
import { NotifyContainer, notifySuccess } from './notify';
import { useParams } from "react-router-dom";
import { setProblem } from "../globalStorage/SignupSlice";


function updateProblemPage() {

    const { problemId } = useParams();
    const [newConstraints, setNewConstriants] = useState();
    const [problem, setProblem] = useState(null);
    // const [newProblem, setNewProblem] = useState({problemName: '',
    //     difficulty: '',
    //     problemDescription: '',
    //     constraints: [],
    //     inputDescription: '',
    //     outputDescription: '',
    //     code: '',
    //     testCases: []
    // });

    useEffect(() => {
        const fetchPrevProblem = async () => {
            try {
                console.log(problemId);
                const promise = await apiConnect("POST", "http://localhost:4000/api/phase1/auth/getCreatedProblemById", { problemId });
                if (!promise.data.success) {
                    throw new Error("No problems Found in database!!!");
                }

                setProblem(promise.data.problemDetails);
                console.log(problem);

            }
            catch (error) {
                console.log("Error in fetching all Problems from server" + error.message);
            }
        }

        fetchPrevProblem();

    }, [])

    const addConstraints = (e) => {
        problem.constraints.push(newConstraints);
        // console.log(newConstraints);
        setNewConstriants('');
    }

    const removeConstraints = (ele) => {
        const pc = problem.constraints.filter((cons) => cons !== ele);
        problem.constraints = pc;
        console.log(problem.constraints);
        setNewConstriants('');

    }

    return (
        <div className='flex-col item-center justify m-4'>
            <form onSubmit={(e) => submitform(e)}>
                <label>Problem Name</label>
                <input type="text" className="inputTag" name='problemName' id='problemName' defaultValue={problem?.problemName} ></input>
                <br /><br />

                <label>Problem Difficuty</label>
                <input type="text" className="inputTag" name='difficulty' defaultValue={problem?.difficulty} ></input>
                <br /><br />

                <label>Problem Description</label>
                <textarea type="text" className="inputTag" name='problemDescription' defaultValue={problem?.problemDescription} ></textarea>
                <br /><br />

                <label>Problem constraints</label>
                <input type="text" className="inputTag" name='constraints' value={newConstraints} onChange={(e) => setNewConstriants(e.target.value)} />
                <button type="button" onClick={addConstraints}
                    className="bg-red-600 text-white m-2 rounded-lg p-2 mx-4 hover:bg-red-700">Add</button>

                {
                    problem?.constraints.map((element, index) => {
                        return (<div><p className="mr-10 inline">{element}</p>  <span onClick={() => removeConstraints(element)} className=" cursor-pointer mr-2 text-red-600 font-bold" >X</span> </div>)
                    })
                }


                <label>Problem inputDescription</label>
                <textarea type="text" className="inputTag" name='inputDescription' defaultValue={problem?.inputDescription}></textarea>
                <br /><br />

                <label>Problem outputDescription</label>
                <textarea type="text" className="inputTag" name='outputDescription' defaultValue={problem?.outputDescription} ></textarea>
                <br /><br />

                <div className="flex flex-col gap-2">
                    <label className="ml-0">Problem Code</label>
                    <textarea type="text" className="inputTag" name='code' defaultValue={problem?.code} rows={4} cols={50}></textarea>

                </div>

                <button type='submit'
                    className="bg-red-600 text-white m-2 rounded-lg p-2 mx-4 hover:bg-red-700"
                >Next
                </button>
            </form>
            <NotifyContainer />
        </div>
    )
}

export default updateProblemPage;