import { getUserData } from "@/actions/get-user-data";
import { getUserWorkspaceChannels } from "@/actions/get-user-workspace-channels";
import { getCurrentWorkspaceData, getUserWorkspaceData } from "@/actions/workspaces";
import ChatHeader from "@/components/chat-header";
import InfoSection from "@/components/info-section"
import Sidebar from "@/components/sidebar"
import TextEditor from "@/components/text-editor";
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

  const currentChannelData = userWorkspaceChannels.find(channel => channel.id === channelId);

  if (!currentChannelData) return redirect('/');

  return (
    <div className="hidden md:block">
      <div className="h-[calc(100vh-256px)] overflow-y-auto [&::-webkit-scrollbar-thumb]:rounded-[6px]  [&::-webkit-scrollbar-thumb]:bg-foreground/60  [&::-webkit-scrollbar-track]:bg-none  [&::-webkit-scrollbar]:w-2 ">
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
        <div className="p-4 relative w-full overflow-hidden">
          <ChatHeader title={currentChannelData.name} />

          <div className="mt-10">
            <Typography text="Chat Content" variant="h4" />
          </div>
        </div>
      </div>
      <div className="mt-10">
        <TextEditor />
      </div>
    </div>
  );
};

export default ChannelIdPage;