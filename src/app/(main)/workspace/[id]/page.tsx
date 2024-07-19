import { getUserData } from "@/actions/get-user-data"
import { getCurrentWorkspaceData, getUserWorkspaceData } from "@/actions/workspaces";
import InfoSection from "@/components/info-section";
import Sidebar from "@/components/sidebar";
import Typography from "@/components/ui/typography";
import { Workspace as UserWorkspace } from "@/types/app";
import { redirect } from "next/navigation";


const Workspace = async ({ params: { id } }: { params: { id: string } }) => {
  const userData = await getUserData();

  if (!userData) return redirect('/auth');

  const [userWorkspacesData] = await getUserWorkspaceData(userData.workspaces!);
  const [currentWorkspaceData] = await getCurrentWorkspaceData(id);

  return (
    <>
      <div className="hidden md:block">
        <Sidebar
          currentWorkspaceData={currentWorkspaceData}
          userData={userData}
          userWorkspacesData={userWorkspacesData as UserWorkspace[]}
        />
        <InfoSection 
        currentWorkspaceData={currentWorkspaceData}
        userData={userData}
        />
        Workspace Workspace
        <Typography text="HELLO WORLD" />
        <Typography text="HELLO WORLD" variant="h2" />
        <Typography text="HELLO WORLD" variant="h3" />
        <Typography text="HELLO WORLD" variant="h4" />
        <Typography text="HELLO WORLD" variant="h5" />
      </div>
      <div className="md:hidden block min-h-screen">Mobile</div>
    </>
  )
}

export default Workspace;