"use server";

import { supabaseServerClient } from "@/supabase/supabaseServer";
import { Channel } from "@/types/app";

export const getUserWorkspaceChannels = async (
    workspaceId: string,
    userId: string
) => {
    const supabase = await supabaseServerClient();

    const { data: workspaceChannelData, error: workspaceChannelError } = await supabase
        .from('workspaces')
        .select('channels')
        .eq('id', workspaceId)
        .single();

    if (workspaceChannelError) {
        console.error(workspaceChannelError);
        return [];
    }

    const channelIds = workspaceChannelData.channels;

    if (!channelIds || channelIds.length === 0) {
        console.log('No channels found for this workspace');
        return [];
    }

    const { data: channelsData, error: channelsError } = await supabase
        .from('channels')
        .select('*')
        .in('id', channelIds);

    if (channelsError) {
        console.error(channelsError);
        return [];
    }

    const userWorkspaceChannels = channelsData.filter(channel =>
        channel.members.includes(userId)
    );

    return userWorkspaceChannels as Channel[];
};