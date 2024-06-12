"use client"
import Link from "next/link";
import MaxWidthWrapper from "./MaxWidthWrapper";
import { Button } from "./ui/button";
import { SignedIn, SignedOut, UserButton, useUser } from '@clerk/nextjs';
import { ArrowUpRight, Menu } from "lucide-react";
import { Dialog, DialogTrigger, DialogContent, DialogClose, DialogFooter, DialogHeader, DialogTitle, DialogDescription } from "./ui/dialog";

const Navbar = () => {
    const { user } = useUser();
    const isVerified = user?.emailAddresses?.some((email) => email.id === user.primaryEmailAddressId && email.verification?.status === 'verified');

    return (
        <>
            {/* Navbar for md and lg devices */}
            <nav className="hidden sm:flex fixed h-14 inset-x-0 top-0 z-30 w-full border-b border-gray-200 bg-white/75 backdrop-blur-lg transition-all">
                <MaxWidthWrapper>
                    <div className="flex h-14 items-center justify-between">
                        <Link href="/" className="flex z-40 font-semibold text-black">
                            <span>PageSage</span>
                        </Link>

                        <div className="hidden items-center space-x-4 sm:flex">
                            {isVerified ? (
                                <SignedIn>
                                    <Button asChild className="button bg-rose-600 font-bold mr-4">
                                        <Link href="/dashboard">Dashboard <ArrowUpRight className="size-5" /></Link>
                                    </Button>
                                    <UserButton afterSignOutUrl='/' />
                                </SignedIn>
                            ) : (
                                <SignedOut>
                                    <Button asChild className="button bg-rose-600 font-bold">
                                        <Link href="/sign-in">Login</Link>
                                    </Button>
                                    <Button asChild className="button bg-rose-600 font-bold">
                                        <Link href="/sign-up">Signup</Link>
                                    </Button>
                                </SignedOut>
                            )}
                        </div>
                    </div>
                </MaxWidthWrapper>
            </nav>

            {/* Navbar for small devices */}
            <nav className="sm:hidden fixed h-14 inset-x-0 top-0 z-30 w-full border-b border-gray-200 bg-white/75 backdrop-blur-lg transition-all">
                <MaxWidthWrapper>
                    <div className="flex h-14 items-center justify-between">
                        <Link href="/" className="flex z-40 font-semibold text-black">
                            <span>PageSage</span>
                        </Link>

                        <div className="flex items-center">
                            <Dialog>
                                <DialogTrigger asChild>
                                    <Menu className="w-6 h-6 text-gray-700" />
                                </DialogTrigger>
                                <DialogContent className="sm:max-w-[425px]">
                                    <DialogHeader>
                                        <DialogTitle>
                                            Select a tab to continue
                                        </DialogTitle>
                                        <DialogDescription>
                                            Options
                                        </DialogDescription>
                                    </DialogHeader>
                                    {isVerified ? (
                                        <SignedIn>
                                            <DialogClose asChild>
                                                <Button asChild className="button bg-rose-600 font-bold w-full">
                                                    <Link href="/dashboard">Dashboard <ArrowUpRight className="size-5" /></Link>
                                                </Button>
                                            </DialogClose>
                                        </SignedIn>
                                    ) : (
                                        <SignedOut>
                                            <DialogClose asChild>
                                                <Button asChild className="button bg-rose-600 font-bold w-full">
                                                    <Link href="/sign-in">Login</Link>
                                                </Button>
                                            </DialogClose>
                                            <DialogClose asChild>
                                                <Button asChild className="button bg-rose-600 font-bold w-full">
                                                    <Link href="/sign-up">Signup</Link>
                                                </Button>
                                            </DialogClose>
                                        </SignedOut>
                                    )}
                                    <DialogFooter className="items-center">
                                        <UserButton afterSignOutUrl='/' showName />
                                    </DialogFooter>
                                </DialogContent>
                            </Dialog>
                        </div>
                    </div>
                </MaxWidthWrapper>
            </nav>
        </>
    );
};

export default Navbar;
