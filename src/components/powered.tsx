import { NextjsLogo, NotionLogo, ResendLogo, UpstashLogo } from "./svgs";
import { VercelLogo } from "./svgs";
import Image from "next/image";

export default function Powered() {
	return (
		<div className="flex flex-col items-center justify-center gap-12 py-12">
			<div className="flex flex-col items-center justify-center gap-2">
				<h3 className="text-foreground text-2xl font-semibold">Powered by</h3>
				<p className="text-muted-foreground text-base text-center">
					Easily connect with other entrepreneurs, innovators, and creators via Google Meet.
				</p>
			</div>
			<div className="flex items-center sm:gap-12 gap-6">
				{/* <NotionLogo />
				<ResendLogo />
				<VercelLogo />
				<NextjsLogo className="!dark:text-foreground" />
				<UpstashLogo /> */}
				<Image
					src="/googlemeet.png"
					alt="Google Meet"
					width={960}
					height={320}
					className="h-24 w-auto"
				/>
			</div>
		</div>
	);
}
