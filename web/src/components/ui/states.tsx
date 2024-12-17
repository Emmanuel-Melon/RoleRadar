import { AlertCircle, FolderOpen } from "lucide-react";
import { Button } from '@/components/ui/button';

interface StateProps {
    title: string;
    description: string;
    action?: {
        label: string;
        onClick: () => void;
    };
}

export function EmptyState({ title, description, action }: StateProps) {
    return (
        <div className="flex min-h-[400px] flex-col items-center justify-center rounded-md border border-dashed p-8 text-center animate-in fade-in-50">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-muted">
                <FolderOpen className="h-6 w-6 text-muted-foreground" />
            </div>
            <h3 className="mt-4 text-lg font-semibold">{title}</h3>
            <p className="mb-4 mt-2 text-sm text-muted-foreground">{description}</p>
            {action && (
                <Button onClick={action.onClick} size="sm">
                    {action.label}
                </Button>
            )}
        </div>
    );
}

export function ErrorState({ title, description, action }: StateProps) {
    return (
        <div className="flex min-h-[400px] flex-col items-center justify-center rounded-md border border-destructive p-8 text-center animate-in fade-in-50">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-destructive/10">
                <AlertCircle className="h-6 w-6 text-destructive" />
            </div>
            <h3 className="mt-4 text-lg font-semibold">{title}</h3>
            <p className="mb-4 mt-2 text-sm text-muted-foreground">{description}</p>
            {action && (
                <Button onClick={action.onClick} variant="outline" size="sm">
                    {action.label}
                </Button>
            )}
        </div>
    );
} 