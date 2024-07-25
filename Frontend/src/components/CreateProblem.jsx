import AddProblem from "./AddProblem";
import AddTestCases from "./AddTestCases"
import { useSelector } from 'react-redux';

function CreateProblem() {

    const step = useSelector((state) => state.step);

    return (
        <div>
            {step == 1 && <AddProblem />}
            {step == 2 && <AddTestCases />}
        </div>
    )
}

export default CreateProblem;