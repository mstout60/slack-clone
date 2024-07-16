import { RiHome2Fill } from 'react-icons/ri';
import { PiChatsTeardrop } from 'react-icons/pi'

import { Workspace } from "@/types/app";
import { FC, useState } from "react"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Typography from "@/components/ui/typography";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import CreateWorkspace from '@/components/create-workspace';
import { useRouter } from 'next/navigation';
import ProgressBar from './progress-bar';
import { cn } from '@/lib/utils';
import { useColorPreferences } from '@/providers/color-preferences';


type SidebarNavProps = {
    userWorkspacesData: Workspace[];
    currentWorkspaceData: Workspace;
};

const SidebarNav: FC<SidebarNavProps> = ({ currentWorkspaceData, userWorkspacesData }) => {
    const router = useRouter();
    const [switchingWorkspace, setSwitchingWorkspace] = useState(false);
    const { color } = useColorPreferences();

    let backgroundColor = 'bg-primary-dark';
    if (color === 'green') {
      backgroundColor = 'bg-green-700';
    } else if (color === 'blue') {
      backgroundColor = 'bg-blue-700';
    }

    const switchWorkspace = (id: string) => {
        setSwitchingWorkspace(true);
        router.push(`/workspace/${id}`);
        setSwitchingWorkspace(false);
    };

    return (
        <nav>
            <ul className="flex flex-col space-y-4">
                <li>
                    <div className="cursor-pointer items-center text-white mb-4 w-10 h-10 rounded-lg overflow-hidden">
                        <Popover>
                            <PopoverTrigger>
                                <Avatar>
                                    <AvatarImage
                                        src={currentWorkspaceData.image_url || ''}
                                        alt={currentWorkspaceData.name}
                                        className="object-cover w-full h-full"
                                    />
                                    <AvatarFallback className="bg-neutral-700">
                                        <Typography
                                            text={currentWorkspaceData.name.slice(0, 2)}
                                            variant="p"
                                        />
                                    </AvatarFallback>
                                </Avatar>
                            </PopoverTrigger>
                            <PopoverContent className="p-0" side="bottom">
                                <Card className="w-[350px] border-0">
                                    <CardContent className="flxe p-0 flex-col">
                                        {switchingWorkspace ?
                                            (<div className='m-2'>
                                                <ProgressBar />
                                            </div>
                                            ) : (
                                                userWorkspacesData.map(workspace => {
                                                    const isActive = workspace.id === currentWorkspaceData.id;
                                                    return (
                                                        <div
                                                            key={workspace.id}
                                                            className={cn(
                                                                isActive && `${backgroundColor} text-white`,
                                                                'cursor-pointer px-2 py-1 flex gap-2'
                                                              )}
                                                            onClick={() => 
                                                                !isActive && switchWorkspace(workspace.id)}
                                                        >
                                                            <Avatar>
                                                                <AvatarImage
                                                                    src={workspace.image_url || ''}
                                                                    alt={workspace.name}
                                                                    className="object-cover w-full h-full"
                                                                />
                                                                <AvatarFallback>
                                                                    <Typography
                                                                        variant="p"
                                                                        text={workspace.name.slice(0, 2)}
                                                                    />
                                                                </AvatarFallback>
                                                            </Avatar>
                                                            <div>
                                                                <Typography
                                                                    variant="p"
                                                                    text={workspace.name}
                                                                    className="text-sm"
                                                                />
                                                                <Typography
                                                                    variant="p"
                                                                    text={workspace.invite_code || ''}
                                                                    className="text-xs lg:text-xs"
                                                                />
                                                            </div>
                                                        </div>
                                                    );
                                                })
                                            )}
                                        <Separator />
                                        <CreateWorkspace />
                                    </CardContent>
                                </Card>
                            </PopoverContent>
                        </Popover>
                    </div>
                    <div className='flex flex-col items-center cursor-pointer group text-white'>
                        <div className='p-2 rounded-lg bg-[rgba(255,255,255, 0.3)]'>
                            <RiHome2Fill
                                size={20}
                                className="group-hover:scale-125 transition-all duration-300"
                            />
                        </div>
                        <Typography
                            variant='p'
                            text="Home"
                            className='text-sm lg:text-sm md:text-sm'
                        />
                    </div>
                </li>
                <li>
                    <div className='flex flex-col items-center cursor-pointer group text-white'>
                        <div className='p-2 rounded-lg bg-[rgba(255,255,255, 0.3)]'>
                            <PiChatsTeardrop
                                size={20}
                                className="group-hover:scale-125 transition-all duration-300"
                            />
                        </div>
                        <Typography
                            variant='p'
                            text="Dms"
                            className='text-sm lg:text-sm md:text-sm'
                        />
                    </div>
                </li>
            </ul>
        </nav>
    )
}

export default SidebarNav