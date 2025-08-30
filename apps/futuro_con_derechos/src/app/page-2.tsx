import React, {useState, useRef, useEffect} from 'react';
import {Menu} from 'lucide-react';
import {Button} from 'ui';
import {Card} from 'ui';
import {Sheet, SheetContent, SheetTrigger} from 'ui';

export function LandingLofi() {
	const [sheetOpen, setSheetOpen] = useState(false);
	const [sheetHeight, setSheetHeight] = useState(0);
	const sheetContentRef = useRef<HTMLDivElement>(null);
	const cardTriggerHeight = 113; // px, igual que h-[113px] del Card

	useEffect(() => {
		if (sheetOpen) {
			setTimeout(() => {
				if (sheetContentRef.current) {
					setSheetHeight(sheetContentRef.current.offsetHeight + cardTriggerHeight);
				}
			}, 50);
		} else {
			setSheetHeight(cardTriggerHeight); // Solo el trigger cuando está cerrado
		}
	}, [sheetOpen]);

	return (
		<div className="bg-[#0A0A0A] w-full h-screen relative">
			<div className="w-full h-full bg-[#0A0A0A]" />

			{/* Logo/Title */}
			<div className="absolute top-4 left-4 z-10">
				<h1 className="font-bold text-xl text-[#FAFAFA]">Geostats</h1>
			</div>

			{/* Menu Button */}
			<div
				style={{
					bottom: `calc(2rem + ${sheetHeight}px)`,
					right: '1rem',
					transition: 'bottom 0.3s',
				}}
				className="absolute z-10"
			>
				<Button
					variant="secondary"
					size="icon"
					className="w-10 h-10 bg-[#0A0A0A] shadow-md hover:bg-[#1A1A1A]"
				>
					<Menu className="h-6 w-6 text-[#FAFAFA]" />
				</Button>
			</div>

			{/* Bottom Sheet */}
			<Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
				<SheetTrigger asChild>
					<Card
						className="absolute w-full bottom-0 h-[113px] bg-[#0A0A0A] shadow-lg rounded-t-[16px] cursor-pointer transition-transform duration-300 ease-in-out hover:translate-y-[-8px]">
						{/* Pull indicator */}
						<div
							className="absolute w-[60px] h-1.5 top-[11px] left-1/2 -translate-x-1/2 bg-[#A3A3A3] rounded-full" />

						{/* Sheet title */}
						<div className="absolute w-[361px] top-[33px] left-4 font-['Inter'] text-[#FAFAFA] text-2xl">
							Feminicidios en el Area Metropolitana
						</div>
					</Card>
				</SheetTrigger>
				<SheetContent
					side="bottom"
					className="bg-[#0A0A0A] pt-6 rounded-t-[16px] transition-transform duration-300 ease-out"
				>
					<div ref={sheetContentRef}>
						<div className="space-y-4">
						</div>
					</div>
				</SheetContent>
			</Sheet>
		</div>
	);
};
