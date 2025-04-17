import { memo, useContext } from "react";
import { ReactNode } from "react";
import { ModuleContext } from "../boards/board";

interface FetchErrorAwareProps {
	loading: boolean;
	error: string | null;
	children: ReactNode;
	loadingChildren?: ReactNode;
}

export const FetchErrorAware = memo(({ loading, error, children, loadingChildren }: FetchErrorAwareProps) => {
	const { name } = useContext(ModuleContext);
	if (error) {
		return <div className="fetchErrorAware">
			<p><b>Error in module '{name}'</b></p>
			<p>{error}</p>
		</div>;
	}
	if (children) {
		return <>{children}</>;
	}
	if (loading) {
		return <>{loadingChildren}</>;
	}
});
FetchErrorAware.displayName = "FetchErrorAware";
