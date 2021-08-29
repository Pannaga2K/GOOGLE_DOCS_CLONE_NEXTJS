import Button from "@material-tailwind/react/Button";
import Icon from "@material-tailwind/react/Icon";
import { useRouter } from "next/dist/client/router";
import { db } from '../firebase';
import {useSession} from "next-auth/client";

function DocumentRow({id, fileName, date}) {
    const router = useRouter();
    const [session] = useSession();

    const deleteDoc = () => {
        db.collection("userDocs").doc(session?.user?.email).collection("docs").doc(id).delete();
    }

    return (
        <div className="flex items-center justify-between p-4 rounded-lg hover:bg-gray-100 hover:shadow-lg text-gray-700 text-sm cursor-pointer"  >
            <div className="flex flex-1 items-center " onClick={() => router.push(`/doc/${id}`)} >
                <Icon name="article" size="2xl" color="blue" />
                <div className="flex flex-1 jsutify-between" >
                    <p className="flex-grow pl-5 w-10 pr-10 truncate" >{fileName}</p>
                    <p className="pr-5 text-sm" >{date?.toDate().toLocaleString()}</p>
                </div>
            </div>
            <Button color="gray" buttonType="outline" rounded={true} iconOnly={true} ripple="dark" className="border-0" onClick={deleteDoc}>
                <Icon name="close" size="2xl" />
            </Button>
        </div>
    )
}

export default DocumentRow;
