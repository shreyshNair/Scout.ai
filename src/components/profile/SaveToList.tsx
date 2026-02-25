"use client";

import * as React from "react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
    DropdownMenuCheckboxItem,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Bookmark, Plus, List as ListIcon, Check, FolderPlus } from "lucide-react";
import { getLists, saveLists } from "@/lib/storage";
import { List } from "@/lib/types";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

interface SaveToListProps {
    companyId: string;
}

export function SaveToList({ companyId }: SaveToListProps) {
    const [lists, setLists] = React.useState<List[]>([]);

    React.useEffect(() => {
        setLists(getLists());
    }, []);

    const toggleCompanyInList = (listId: string) => {
        const updatedLists = lists.map(list => {
            if (list.id === listId) {
                const hasCompany = list.companyIds.includes(companyId);
                const newCompanyIds = hasCompany
                    ? list.companyIds.filter(id => id !== companyId)
                    : [...list.companyIds, companyId];

                if (hasCompany) {
                    toast.success(`Analysis archived from ${list.name}`);
                } else {
                    toast.success(`Analysis indexed into ${list.name}`);
                }

                return { ...list, companyIds: newCompanyIds };
            }
            return list;
        });

        setLists(updatedLists);
        saveLists(updatedLists);
    };

    const createNewList = () => {
        const name = prompt("Intelligence Repository Name:");
        if (name) {
            const newList: List = {
                id: Math.random().toString(36).substring(7),
                name,
                companyIds: [companyId],
                createdAt: new Date().toISOString()
            };
            const updatedLists = [...lists, newList];
            setLists(updatedLists);
            saveLists(updatedLists);
            toast.success(`Intelligence repository "${name}" initialized`);
        }
    };

    const isCompanyInAnyList = lists.some(l => l.companyIds.includes(companyId));

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button
                    variant="outline"
                    className={cn(
                        "rounded-xl border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-soft font-bold text-[10px] uppercase tracking-widest h-10 px-4 gap-2 transition-all",
                        isCompanyInAnyList ? "text-blue-600 border-blue-100 dark:border-blue-900/50 bg-blue-50/30" : "text-slate-600"
                    )}
                >
                    <Bookmark className={cn("w-3.5 h-3.5 transition-colors", isCompanyInAnyList && "fill-current")} />
                    {isCompanyInAnyList ? "Indexed" : "Index Signal"}
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-64 rounded-2xl border-slate-200 dark:border-slate-800 shadow-2xl p-2">
                <DropdownMenuLabel className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground/60 px-3 py-2">
                    Active Repositories
                </DropdownMenuLabel>
                <DropdownMenuSeparator className="bg-slate-100 dark:bg-slate-800 mx-2" />
                <div className="max-h-[200px] overflow-y-auto py-1">
                    {lists.length > 0 ? (
                        lists.map((list) => {
                            const isAdded = list.companyIds.includes(companyId);
                            return (
                                <DropdownMenuCheckboxItem
                                    key={list.id}
                                    checked={isAdded}
                                    onCheckedChange={() => toggleCompanyInList(list.id)}
                                    className="rounded-xl flex items-center justify-between px-3 py-2 cursor-pointer focus:bg-blue-50 dark:focus:bg-blue-900/20"
                                >
                                    <div className="flex flex-col">
                                        <span className="text-sm font-bold tracking-tight">{list.name}</span>
                                        <span className="text-[10px] text-muted-foreground">{list.companyIds.length} signals</span>
                                    </div>
                                    {isAdded && <Check className="w-3.5 h-3.5 text-blue-600" />}
                                </DropdownMenuCheckboxItem>
                            );
                        })
                    ) : (
                        <div className="px-3 py-4 text-center opacity-40">
                            <ListIcon className="w-8 h-8 mx-auto mb-2 opacity-20" />
                            <p className="text-[10px] font-bold uppercase tracking-widest">No repositories found</p>
                        </div>
                    )}
                </div>
                <DropdownMenuSeparator className="bg-slate-100 dark:bg-slate-800 mx-2" />
                <DropdownMenuItem
                    onClick={createNewList}
                    className="rounded-xl mt-1 flex items-center gap-2 px-3 py-2.5 cursor-pointer text-blue-600 focus:text-blue-700 focus:bg-blue-50 dark:focus:bg-blue-900/20 font-bold text-xs"
                >
                    <FolderPlus className="w-4 h-4" />
                    New Repository
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
