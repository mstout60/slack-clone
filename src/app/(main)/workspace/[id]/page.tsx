import { getUserData } from "@/actions/get-user-data"
import { getCurrentWorkspaceData, getUserWorkspaceData } from "@/actions/workspaces";
import Sidebar from "@/components/sidebar";
import { Workspace as UserWorkspace } from "@/types/app";
import { redirect } from "next/navigation";


const Workspace = async ({ params: { id } }: { params: { id: string } }) => {
  const userData = await getUserData();

  if (!userData) return redirect('/auth');

  const [userWorkspacesData, userWorkspacesError] = await getUserWorkspaceData(userData.workspaces!);

  const [currentWorkspaceData, currentWorkspaceError] = await getCurrentWorkspaceData(id);



  return (
    <>
      <div className="hidden md:block">
        <Sidebar
          currentWorkspaceData={currentWorkspaceData}
          userData={userData}
          userWorkspacesData={userWorkspacesData as UserWorkspace[]}
        />
      </div>
      <div className="md:hidden block min-h-screen">Mobile</div>
    </>
  )
}

export default Workspace