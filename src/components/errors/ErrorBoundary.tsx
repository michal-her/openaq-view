import React from "react";

// copy-pasted from https://reactjs.org/docs/error-boundaries.html

type ErrorBoundaryProps = {
    for?: string;
};

type ErrorBoundaryState = {
    hasError: boolean;
};

export class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
    state: ErrorBoundaryState = { hasError: false };

    static getDerivedStateFromError(error: any) {
        // Update state so the next render will show the fallback UI.
        return { hasError: true };
    }

    componentDidCatch(error: any, info: any) {
        // You can also log the error to an error reporting service
        // logErrorToMyService(error, info);
        console.log(error, info);
    }

    render() {
        if (this.state.hasError) {
            // You can render any custom fallback UI
            return <h1>{`Something went wrong in ${this.props.for}. Inspect the stack-trace, please!`}</h1>;
        }

        return this.props.children;
    }
}