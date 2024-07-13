"use server";

import { supabaseServerClient } from "@/supabase/supabaseServer";

export const updateUserWorkspace = async (userId: string, workspaceId: string) => {
    const supabase = await supabaseServerClient();

    //Upadte the user record using Remote Procedure Call (rpc)
    const { data: updateWorkspaceDate, error: updateWorkspaceError } = await supabase.rpc("add_workspace_to_user", {
        user_id: userId,
        new_workspace: workspaceId
    });

    return [updateWorkspaceDate, updateWorkspaceError];
};