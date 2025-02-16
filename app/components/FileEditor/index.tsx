import Editor from "./Editor";
import FileTree from "./FileTree";

export default function FileEditor(){
    return (
        <div className="flex justify-between">
            <FileTree />
            <Editor />
        </div>
    )
}