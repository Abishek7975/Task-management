import { Heading } from "./heading"
import { SubHeading } from "./subheading"
import { Button } from "./button"
import { Appbar } from "./appbar"

export const TaskCard = function ({title,description,status,priority,dueDate,buttonText, updateOnClick, deleteOnClick}){
    return <div>
    <Appbar/>
        <div className="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
        <Heading label = {title}></Heading>
        <SubHeading label={description}></SubHeading>

        <div className="text-gray-700 dark:text-gray-300 mt-4">
                <p>
                    <span className="font-semibold">Status:</span> {status}
                </p>
                <p>
                    <span className="font-semibold">Priority:</span> {priority}
                </p>
                <p>
                    <span className="font-semibold">Due Date:</span> {dueDate}
                </p>
            </div>
        <div className="flex flex-wrap gap-8">
        <Button onClick={updateOnClick} label={<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6">
  <path stroke-linecap="round" stroke-linejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99" />
</svg>}></Button>
        <Button onClick={deleteOnClick} label={<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6">
  <path stroke-linecap="round" stroke-linejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
</svg>}></Button>
    </div>
    </div>
    </div>
}

