import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import {
	InputOTP,
	InputOTPGroup,
	InputOTPSeparator,
	InputOTPSlot,
} from "@/components/ui/input-otp";
import { motion, type HTMLMotionProps } from "motion/react";
import TermsService from "./terms-service";

export function OTPForm({ className, ...props }: HTMLMotionProps<"div">) {
	return (
		<motion.div
			initial={{ opacity: 1, y: 12 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.8, ease: "easeOut" }}
			className={cn("flex flex-col gap-6 w-full ", className)}
			{...props}>
			<Card className="shadow-2xl w-full">
				<CardHeader className="text-center">
					<CardTitle className="text-xl">Enter verification code</CardTitle>
					<CardDescription>
						Enter 6-digit code from your authenticator app to verify your
						account
					</CardDescription>
				</CardHeader>
				<CardContent>
					<form>
						<FieldGroup>
							<Field>
								<FieldLabel htmlFor="otp" className="sr-only">
									Verification code
								</FieldLabel>
								<InputOTP
									maxLength={6}
									id="otp"
									required
									containerClassName="gap-4 justify-center">
									<InputOTPGroup className="gap-2.5 *:data-[slot=input-otp-slot]:h-16 *:data-[slot=input-otp-slot]:w-12 *:data-[slot=input-otp-slot]:rounded-md *:data-[slot=input-otp-slot]:border *:data-[slot=input-otp-slot]:text-xl">
										<InputOTPSlot index={0} />
										<InputOTPSlot index={1} />
										<InputOTPSlot index={2} />
									</InputOTPGroup>
									<InputOTPSeparator />
									<InputOTPGroup className="gap-2.5 *:data-[slot=input-otp-slot]:h-16 *:data-[slot=input-otp-slot]:w-12 *:data-[slot=input-otp-slot]:rounded-md *:data-[slot=input-otp-slot]:border *:data-[slot=input-otp-slot]:text-xl">
										<InputOTPSlot index={3} />
										<InputOTPSlot index={4} />
										<InputOTPSlot index={5} />
									</InputOTPGroup>
								</InputOTP>
							</Field>
							<Field>
								<Button type="submit">Verify</Button>
							</Field>
						</FieldGroup>
					</form>
				</CardContent>
			</Card>
			<TermsService />
		</motion.div>
	);
}
