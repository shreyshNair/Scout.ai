"use client";

import * as React from "react";
import { useParams, useRouter } from "next/navigation";
import { mockCompanies } from "@/lib/mock-data";
import { ProfileOverview } from "@/components/profile/ProfileOverview";
import { SignalsTimeline } from "@/components/profile/SignalsTimeline";
import { NotesPanel } from "@/components/profile/NotesPanel";
import { ScorePanel } from "@/components/profile/ScorePanel";
import { EnrichmentPanel } from "@/components/profile/EnrichmentPanel";
import { SaveToList } from "@/components/profile/SaveToList";
import { Button } from "@/components/ui/button";
import { Share2, Download, AlertCircle } from "lucide-react";

export default function CompanyProfilePage() {
    const params = useParams();
    const router = useRouter();
    const companyId = params.id as string;

    const company = React.useMemo(() =>
        mockCompanies.find(c => c.id === companyId),
        [companyId]);

    if (!company) {
        return (
            <div className="h-[calc(100vh-64px)] flex flex-col items-center justify-center p-8 text-center">
                <AlertCircle className="w-12 h-12 text-slate-300 mb-4" />
                <h1 className="text-2xl font-bold text-slate-900">Company Not Found</h1>
                <p className="text-muted-foreground mt-2 max-w-sm">
                    We couldn't find the company you're looking for. It might have been removed or the ID is incorrect.
                </p>
                <Button
                    variant="outline"
                    className="mt-6"
                    onClick={() => router.push('/companies')}
                >
                    Return to Companies
                </Button>
            </div>
        );
    }

    const handleShare = () => {
        navigator.clipboard.writeText(window.location.href);
        alert("URL copied to clipboard!"); // Ideally a toast
    };

    const handleExport = () => {
        const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(company, null, 2));
        const downloadAnchorNode = document.createElement('a');
        downloadAnchorNode.setAttribute("href", dataStr);
        downloadAnchorNode.setAttribute("download", `${company.id}.json`);
        document.body.appendChild(downloadAnchorNode);
        downloadAnchorNode.click();
        downloadAnchorNode.remove();
    };

    return (
        <div className="p-8 max-w-[1400px] mx-auto pb-20">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
                {/* Left Column (60%) */}
                <div className="lg:col-span-7 space-y-12">
                    <ProfileOverview company={company} />

                    <div className="grid grid-cols-1 gap-12 pt-6">
                        <SignalsTimeline signals={company.signals} />
                        <NotesPanel companyId={company.id} />
                    </div>
                </div>

                {/* Right Column (40%) */}
                <div className="lg:col-span-5 space-y-8">
                    <ScorePanel company={company} />

                    <div className="space-y-4">
                        <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">Actions</h3>
                        <div className="grid grid-cols-2 gap-3">
                            <SaveToList companyId={company.id} />
                            <Button variant="outline" size="sm" className="gap-2" onClick={handleShare}>
                                <Share2 className="w-4 h-4" />
                                Share
                            </Button>
                            <Button variant="outline" size="sm" className="gap-2" onClick={handleExport}>
                                <Download className="w-4 h-4" />
                                Export JSON
                            </Button>
                        </div>
                    </div>

                    <EnrichmentPanel companyId={company.id} website={company.website} />
                </div>
            </div>
        </div>
    );
}
