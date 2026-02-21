import {
	InputOTP,
	InputOTPGroup,
	InputOTPSlot,
} from "@/components/ui/input-otp";
import { motion, type HTMLMotionProps } from "motion/react";
import TermsService from "./terms-service";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Badge } from "./ui/badge";
import { Copy } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { GetRequest } from "@/networkHandler";

export function Setup2FA({ className, ...props }: HTMLMotionProps<"div">) {
	const { data, isFetching } = useQuery({
		queryKey: ["fetchTOTPSecret"],
		queryFn: () => {
			return GetRequest({
				url: `/auth/setup_2fa`,
			});
		},
	});

	return (
		<>
			<motion.div
				initial={{ opacity: 1, y: 12 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.8, ease: "easeOut" }}
				className={cn("flex flex-col gap-6 w-full ", className)}
				{...props}>
				<Card className="shadow-2xl w-full">
					<CardHeader className="text-center">
						<CardTitle className="text-xl">Setup Authenticator App</CardTitle>
						<CardDescription>
							Each time you log in, you will need to enter a 6-digit code from
							your authenticator app.
						</CardDescription>
					</CardHeader>
					<CardContent>
						<form className="flex flex-col gap-4">
							{/* setp 1 */}
							<div>
								<div className="flex gap-3 items-center">
									<Badge variant={"outline"}>Step 1</Badge>
									<h5 className="font-medium">Scan QR code</h5>
								</div>
								<p className="text-muted-foreground text-sm mt-1">
									Scan the QR code below or enter the secret key into your
									authenticator app.
								</p>

								<div className="p-3 rounded-md bg-secondary mt-3 flex flex-wrap gap-4">
									<div>
										<img
											src={data?.data?.qrCode}
											className="w-full h-full"
											alt="QR Code"
										/>
									</div>

									<div>
										<span className="text-sm font-medium">
											Can't scan the QR code?
										</span>

										<div className="flex flex-col gap-2 justify-start mt-2">
											<span className="text-xs text-muted-foreground">
												Enter this secret instead:
											</span>
											<div className="font-mono text-xs bg-background p-2 rounded-md">
												{data?.data?.secret}
											</div>
											<Button
												variant="outline"
												type="button"
												size="sm"
												className="text-xs w-28">
												<Copy className="w-3 h-3" /> Copy Secret
											</Button>
										</div>
									</div>
								</div>
							</div>
							{/* setp 2 */}
							<div>
								<div className="flex gap-3 items-center">
									<Badge className="" variant={"outline"}>
										Step 2
									</Badge>
									<h5 className="font-medium">Get 6-digit code</h5>
								</div>
								<p className="text-muted-foreground text-sm mt-1">
									Enter the 6-digit code from your authenticator app.
								</p>

								<div className="mt-3 flex flex-col gap-2">
									<span className="text-xs font-medium">
										Enter verification code
									</span>
									<InputOTP maxLength={6} required>
										<InputOTPGroup>
											<InputOTPSlot index={0} />
											<InputOTPSlot index={1} />
											<InputOTPSlot index={2} />
											<InputOTPSlot index={3} />
											<InputOTPSlot index={4} />
											<InputOTPSlot index={5} />
										</InputOTPGroup>
									</InputOTP>
								</div>

								<Button className="mt-3" type="submit">
									Enable 2FA
								</Button>
							</div>
						</form>
					</CardContent>
				</Card>
				<TermsService />
			</motion.div>
		</>
	);
}

export default Setup2FA;
