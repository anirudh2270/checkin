import { createFileRoute } from "@tanstack/react-router";
import { DottedGlowBackground } from "@/components/ui/dotted-glow-background";
import { GalleryVerticalEnd } from "lucide-react";
import { motion } from "motion/react";
import { SignupForm } from "@/components/signup-form";

export const Route = createFileRoute("/auth/signup")({
	component: RouteComponent,
});

function RouteComponent() {
	return (
		<div className="bg-muted flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
			<div className="flex w-full max-w-sm flex-col gap-6 relative z-50">
				<motion.a
					initial={{ opacity: 0, y: 40, scale: 1 }}
					animate={{ opacity: 1, y: 0, scale: 1 }}
					transition={{ duration: 0.4, ease: "easeOut", delay: 0.8 }}
					href="#"
					className="flex items-center gap-2 self-center font-medium">
					<div className="bg-primary text-primary-foreground flex size-6 items-center justify-center rounded-md">
						<GalleryVerticalEnd className="size-4" />
					</div>
					Acme Inc.
				</motion.a>
				<SignupForm />
			</div>
			<DottedGlowBackground
				className="pointer-events-none mask-radial-to-90% mask-radial-at-center"
				opacity={1}
				gap={30}
				radius={1.5}
				colorLightVar="--color-neutral-500"
				glowColorLightVar="--color-neutral-600"
				colorDarkVar="--color-neutral-500"
				glowColorDarkVar="--color-sky-800"
				backgroundOpacity={0}
				speedMin={0.3}
				speedMax={1.6}
				speedScale={1}
			/>
		</div>
	);
}
