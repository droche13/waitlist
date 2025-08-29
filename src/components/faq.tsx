import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "./ui/accordion";

export default function Faq() {
	return (
		<div className="flex flex-col items-center justify-center gap-6 py-10">
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
					type="single"
					collapsible
					className="w-full flex flex-col gap-4"
				>
					<AccordionItem value="item-1">
						<AccordionTrigger className="hover:no-underline">
							What exactly is Idea Factory?
						</AccordionTrigger>
						<AccordionContent className="text-muted-foreground">
							Think of Idea Factory as your backstage pass to a community of brilliant minds. We're bringing together entrepreneurs, creators, and innovators who are tired of surface-level networking. Instead of endless LinkedIn connections that go nowhere, we create real conversations through Google Meet where ideas actually take flight. Join our waitlist to be part of something that actually moves the needle.
						</AccordionContent>
					</AccordionItem>
					<AccordionItem value="item-2">
						<AccordionTrigger className="hover:no-underline">
							How do the connections actually work?
						</AccordionTrigger>
						<AccordionContent className="text-muted-foreground">
							Here's the magic: we don't just throw you into a room with random people. We match you with folks who actually get what you're building and can help you get there faster. Maybe you need a technical co-founder, or someone to bounce ideas off, or just want to learn from someone who's been in your shoes. Our Google Meet sessions are where the real magic happens – no awkward small talk, just meaningful conversations that lead somewhere.
						</AccordionContent>
					</AccordionItem>
					<AccordionItem value="item-3">
						<AccordionTrigger className="hover:no-underline">
							Why should I choose this over other networking options?
						</AccordionTrigger>
						<AccordionContent className="text-muted-foreground">
							Let's be honest – most networking feels like a waste of time. You show up to events, exchange business cards, and never hear from anyone again. Idea Factory is different because we're building a community where people actually show up and contribute. We keep the group curated so every conversation matters, and our Google Meet setup means you can connect from anywhere without the hassle of travel. It's networking that actually works.
						</AccordionContent>
					</AccordionItem>
				</Accordion>
			</div>
		</div>
	);
}
