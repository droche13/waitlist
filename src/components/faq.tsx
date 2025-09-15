import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "./ui/accordion";

export default function Faq() {
	return (
		<div className="flex flex-col items-center justify-center gap-6 py-10 px-4 sm:px-0">
			<div className="flex flex-col items-center justify-center gap-2 max-w-md">
				<h2 className="sm:text-3xl text-2xl font-semibold text-foreground">
					How it Works
				</h2>
				<p className="sm:text-base text-sm text-muted-foreground text-center">
					Find out how we grow real networks that can help you succeed.
				</p>
			</div>
			<div className="w-full max-w-lg">
				<Accordion
					type="multiple"
					className="w-full flex flex-col gap-4"
				>
					<AccordionItem value="item-1">
						<AccordionTrigger className="hover:no-underline">
							The Idea
						</AccordionTrigger>
						<AccordionContent className="text-muted-foreground">
							Skipping the LinkedIn bullsh*t. We're building a community to easily connect real people, explore real ideas, and gain real momentum.
						</AccordionContent>
					</AccordionItem>
					<AccordionItem value="item-2">
						<AccordionTrigger className="hover:no-underline">
							How It Works
						</AccordionTrigger>
						<AccordionContent className="text-muted-foreground">
							Join the waitlist, get matched with like-minded builders, easily connect via Google Meet. No complicated onboarding, no monthly fees, no BS. Just real people having real conversations.
						</AccordionContent>
					</AccordionItem>
					<AccordionItem value="item-3">
						<AccordionTrigger className="hover:no-underline">
							What You Get
						</AccordionTrigger>
						<AccordionContent className="text-muted-foreground">
							Co-founders, advisors, customers, or just someone to bounce ideas off. Skip the years of cold outreach and awkward networking events. Get straight to the people who can actually help you build something.
						</AccordionContent>
					</AccordionItem>
				</Accordion>
			</div>
		</div>
	);
}
