import { User, Workspace } from "@/types/app";
import { FC } from "react";
import SidebarNav from "@/components/sidebar-nav";

type SidebarProps = {
    userWorkspacesData: Workspace[];
    currentWorkspaceData: Workspace;
    userData: User;
}

const Sidebar: FC<SidebarProps> = ({ userWorkspacesData, currentWorkspaceData, userData }) => {

    return <aside
        className={`
        fixed
        top-0
        left-0
        pt-[68px]
        pb-8
        z-30
        flex
        flex-col
        justify-between
        items-center
        h-screen
        w-20
        `}
    >
        <SidebarNav 
        currentWorkspaceData={currentWorkspaceData}
        userWorkspacesData={userWorkspacesData}
        />
    </aside>
}

export default Sidebar;