import Button from "../ui/buttonStyle";
import { redirect } from 'next/navigation';

interface FolderProps {
    folder: {
        id: number;
        name: string;
    }
}

function handleFolderClick(folderID: number) {
    redirect(`/dashboard/folders/${folderID}`);

}


export default function FolderCard({ folder }: FolderProps) {
    
    return (
        <Button variant={"white"} onClick={() => handleFolderClick(folder.id)} className="w-30 h-10">
            {folder.name}
        </Button>
    );
}
