import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import dynamic from "next/dynamic";
import { EditorState } from "draft-js";
import {useState, useEffect} from "react";
import { db } from '../firebase';
import { useRouter } from "next/dist/client/router";
import {convertFromRaw, convertToRaw} from "draft-js";
import {useSession} from "next-auth/client";
import {useDocumentOnce} from "react-firebase-hooks/firestore";

// EDITOR MODULE IS NEEDED ONLY AT CLIENT SIDE
const Editor = dynamic(() => import("react-draft-wysiwyg").then((module) => module.Editor),
{
    ssr: false
});
// import { Editor } from "react-draft-wysiwyg";

function TextEditor() {
    const [session] = useSession();
    const router = useRouter();
    const {id} = router.query;
    const [editorState, setEditorState] = useState(EditorState.createEmpty());
    const [snapshot, loadingSnapshot] = useDocumentOnce(db.collection("userDocs").doc(session.user.email).collection("docs").doc(id));

    const onEditorStateChange = (editorState) => {
        setEditorState(editorState);
        
        db.collection("userDocs").doc(session?.user?.email).collection("docs").doc(id).set({
            // CONVERTS CONTENT IN JSON FORMAT
            editorState: convertToRaw(editorState.getCurrentContent())
        }, {merge: true})
    }

    console.log(editorState);

    useEffect(() => {
        if(snapshot?.data()?.editorState) {
            setEditorState(EditorState.createWithContent(convertFromRaw(snapshot?.data()?.editorState)));
        }
    }, [snapshot]);

    return (
        <div className=" bg-[#F8F9FA] min-h-screen pb-16" >
            <Editor editorState={editorState} onEditorStateChange={onEditorStateChange} toolbarClassName="flex sticky top-0 z-50 !justify-center mx-auto" editorClassName="mt-6 p-10 bg-white shadow-lg max-w-5xl mx-auto mb-12 border" />
        </div>
    )
}

export default TextEditor
