'use client';
import { ReactNode } from 'react';
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from 'ui';

export default function DesktopLayout({ children }: { children: ReactNode }) {
    return (
        <div className="h-screen w-screen bg-neutral-800 overflow-hidden">
            <ResizablePanelGroup direction="horizontal">
                <ResizablePanel defaultSize={75} minSize={50}>
                    {children}
                </ResizablePanel>
                <ResizableHandle
                    className="w-1 hover:bg-neutral-700 transition-colors cursor-col-resize"
                />
                <ResizablePanel defaultSize={25} minSize={15}>
                    <div className="h-full bg-neutral-900 p-4 overflow-auto">
                        <h1 className="text-white text-2xl mb-4">
                            Feminicidios en el Area Metropolitana
                        </h1>
                        <div className="space-y-2">
                            <p className='text-[#A3A3A3]'>
                                Lorem Ipsum is simply dummy text of the printing
                                and typesetting industry. Lorem Ipsum has been
                                the industry&apos;s standard dummy text ever
                                since the unknown printer took a galley of type
                                and scrambled it to make a type specimen book.
                                It has survived not only five centuries, but
                                also the leap into electronic typesetting,
                                remaining essentially unchanged. It was
                                popularised in the 1960s with the the release of
                                Letraset sheets containing Lorem Ipsum passages,
                                and more recently with desktop publishing
                                software like Aldus PageMaker including versions
                                of Lorem Ipsum.
                            </p>
                        </div>
                    </div>
                </ResizablePanel>
            </ResizablePanelGroup>
        </div>
    );
}