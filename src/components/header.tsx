"use client";

import { cn } from "~/lib/utils";
import { useScroll } from "~/hooks/use-scroll";
import { Button } from "./ui/button";

export default function Header() {
	const scrolled = useScroll();

	const scrollToSection = (sectionId: string) => {
		const element = document.getElementById(sectionId);
		if (element) {
			element.scrollIntoView({ behavior: 'smooth' });
		}
	};

	return (
		<div className="sticky top-0 z-50 pb-6">
			<header
				className={cn(
					"py-4 flex flex-row items-center md:px-10 sm:px-6 px-4",
					"bg-background/20 backdrop-blur-md border-b border-border/20",
					"transition-all duration-300"
				)}
			>
				{/* Logo/Brand */}
				<div className="flex items-center flex-1">
					<button 
						onClick={() => scrollToSection('hero')}
						className="text-xl font-bold text-foreground hover:text-primary transition-colors"
					>
						Idea Factory
					</button>
				</div>

				{/* Navigation Links - Centered */}
				<nav className="hidden md:flex items-center gap-6 flex-1 justify-center">
					<button
						onClick={() => scrollToSection('demo')}
						className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
					>
						Our Mission
					</button>
					<button
						onClick={() => scrollToSection('faq')}
						className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
					>
						How it Works
					</button>
				</nav>

				{/* CTA Button */}
				<div className="flex items-center flex-1 justify-end">
					<Button
						onClick={() => scrollToSection('hero')}
						className="bg-[#e5ff00] hover:bg-[#d4e600] text-black font-medium px-6 py-2 rounded-full transition-all duration-300 hover:scale-105"
					>
						Join Waitlist
					</Button>
				</div>
			</header>
		</div>
	);
}
