import AddProblem from "./AddProblem";
import AddProblem2 from "./AddProblem2";
import AddTestCases from "./AddTestCases"
import AddTestCases2 from "./AddTestCases2"
import { useSelector } from 'react-redux';

function CreateProblem() {

    const step = useSelector((state) => state.step);

    return (
        <div>
            {step == 1 && <AddProblem2 />}
            {step == 2 && <AddTestCases2 />}
        </div>
    )
}

export default CreateProblem;