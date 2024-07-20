import { getUserData } from "@/actions/get-user-data";
import { getUserWorkspaceChannels } from "@/actions/get-user-workspace-channels";
import { getCurrentWorkspaceData, getUserWorkspaceData } from "@/actions/workspaces";
import InfoSection from "@/components/info-section"
import Sidebar from "@/components/sidebar"
import Typography from "@/components/ui/typography"

import { Workspace as UserWorkspace } from "@/types/app";
import { redirect } from "next/navigation";


const ChannelIdPage = async (
  { params: { workspaceId, channelId },
  }: {
    params: {
      workspaceId: string,
      channelId: string,
    };
  }) => {
  const userData = await getUserData();

  if (!userData) return redirect('/auth');


  const [userWorkspacesData] = await getUserWorkspaceData(userData.workspaces!);
  const [currentWorkspaceData] = await getCurrentWorkspaceData(workspaceId);
  const userWorkspaceChannels = await getUserWorkspaceChannels(currentWorkspaceData.id, userData.id);

  return (
    <div className="hidden md:block">
      <Sidebar
        currentWorkspaceData={currentWorkspaceData}
        userData={userData}
        userWorkspacesData={userWorkspacesData as UserWorkspace[]}
      />
      <InfoSection
        currentWorkspaceData={currentWorkspaceData}
        userData={userData}
        userWorkspaceChannels={userWorkspaceChannels}
        currentChannelId={channelId}
      />
      <div className="p-2">
        <Typography text="Channel ID Page" variant="p" />
      </div>
    </div>
  )
}

export default ChannelIdPage