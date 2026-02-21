import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import GoogleLogo from "@/assets/images/google.svg";
import {
	Field,
	FieldDescription,
	FieldError,
	FieldGroup,
	FieldLabel,
	FieldSeparator,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { motion, type HTMLMotionProps } from "motion/react";
import { signupSchema } from "@/validationSchema";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { PostRequest } from "@/networkHandler";
import type z from "zod";
import TermsService from "./terms-service";
import { useNavigate } from "@tanstack/react-router";

export function SignupForm({ className, ...props }: HTMLMotionProps<"div">) {
	const navigate = useNavigate();
	const mutation = useMutation({
		mutationFn: (data: object) => PostRequest({ url: "auth/signup", data }),
		onSuccess: () => {
			navigate({
				to: "/auth/2fa",
			});
		},
	});

	const form = useForm<z.infer<typeof signupSchema>>({
		resolver: zodResolver(signupSchema),
		defaultValues: {
			email: "",
			fullName: "",
		},
	});

	function onSubmit(data: z.infer<typeof signupSchema>) {
		mutation.mutate(data);
	}

	return (
		<motion.div
			initial={{ opacity: 1, y: 12 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.8, ease: "easeOut" }}
			className={cn("flex flex-col gap-6 ", className)}
			{...props}>
			<Card className="shadow-2xl">
				<CardHeader className="text-center">
					<CardTitle className="text-xl">Create your account</CardTitle>
					<CardDescription>
						Sign up with your Apple or Google account
					</CardDescription>
				</CardHeader>
				<CardContent>
					<form id="form-signup" onSubmit={form.handleSubmit(onSubmit)}>
						<FieldGroup>
							<Field>
								<Button disabled variant="outline" type="button">
									<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
										<path
											d="M12.152 6.896c-.948 0-2.415-1.078-3.96-1.04-2.04.027-3.91 1.183-4.961 3.014-2.117 3.675-.546 9.103 1.519 12.09 1.013 1.454 2.208 3.09 3.792 3.039 1.52-.065 2.09-.987 3.935-.987 1.831 0 2.35.987 3.96.948 1.637-.026 2.676-1.48 3.676-2.948 1.156-1.688 1.636-3.325 1.662-3.415-.039-.013-3.182-1.221-3.22-4.857-.026-3.04 2.48-4.494 2.597-4.559-1.429-2.09-3.623-2.324-4.39-2.376-2-.156-3.675 1.09-4.61 1.09zM15.53 3.83c.843-1.012 1.4-2.427 1.245-3.83-1.207.052-2.662.805-3.532 1.818-.78.896-1.454 2.338-1.273 3.714 1.338.104 2.715-.688 3.559-1.701"
											fill="currentColor"
										/>
									</svg>
									Sign up with Apple
								</Button>
								<Button variant="outline" type="button">
									<img src={GoogleLogo} width={18} height={18} alt="Google" />
									Sign up with Google
								</Button>
							</Field>
							<FieldSeparator className="*:data-[slot=field-separator-content]:bg-card">
								Or continue with
							</FieldSeparator>

							<Controller
								name="fullName"
								control={form.control}
								render={({ field, fieldState }) => (
									<Field>
										<FieldLabel
											data-invalid={fieldState.invalid}
											htmlFor="fullName">
											Full Name
										</FieldLabel>
										<Input
											{...field}
											id="fullName"
											type="text"
											placeholder="John Doe"
											required
										/>
										{fieldState.invalid && (
											<FieldError errors={[fieldState.error]} />
										)}
									</Field>
								)}></Controller>

							<Controller
								name="email"
								control={form.control}
								render={({ field, fieldState }) => (
									<Field>
										<FieldLabel
											data-invalid={fieldState.invalid}
											htmlFor="email">
											Email
										</FieldLabel>
										<Input
											{...field}
											id="email"
											type="email"
											placeholder="m@example.com"
											required
										/>
										<FieldDescription className="text-[0.83rem]">
											{" "}
											We'll use this to contact you. We will not share your
											email with anyone else.
										</FieldDescription>
										{fieldState.invalid && (
											<FieldError errors={[fieldState.error]} />
										)}
									</Field>
								)}></Controller>

							<Field>
								<Button
									type="submit"
									loading={mutation.isPending}
									form="form-signup">
									Create Account
								</Button>
								<FieldDescription className="text-center">
									Already have an account? <a href="/auth/login">Sign in</a>
								</FieldDescription>
							</Field>
						</FieldGroup>
					</form>
				</CardContent>
			</Card>
			<TermsService />
		</motion.div>
	);
}
