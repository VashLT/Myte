import React from 'react';
import { render, unmountComponentAtNode } from 'react-dom';

export const renderAt = (component: React.ReactElement, containerId: string) => {
    const container = document.getElementById(containerId) as HTMLElement;
    unmountComponentAtNode(container);
    render(
        component,
        container
    );
}