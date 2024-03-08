"use client";

import { useAccount } from "wagmi";
import { useProfiles } from "@lens-protocol/react-web";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function ProfileWrapper() {
  const { address } = useAccount();

  if (!address) return null;

  return <Profile address={address} />;
}

function Profile({ address }) {
  const { data } = useProfiles({
    where: {
      ownedBy: [address],
    },
  });

  if (!data || !data.length) {
    return (
      <div className="p-10">
        <CreateProfilePlaceHolder />
      </div>
    );
  }
  const profile = data[data.length - 1];
  if (!profile) return null;

  return (
    <main className="px-10 py-14">
      <div>
        <a
          rel="no-opener"
          target="_blank"
          href={`https://share.lens.xyz/u/${profile.handle?.localName}.${profile.handle?.namespace}`}
        >
          <div className="border rounded-lg p-10">
            <div>
              {profile.metadata?.picture?.__typename === "ImageSet" && (
                <Image
                  width={500}
                  height={500}
                  alt="Profile Picture"
                  src={profile?.metadata?.picture?.optimized?.uri!}
                  className="rounded w-[200px]"
                />
              )}
            </div>
            <div className="mt-4">
              <p className="text-lg">{profile?.metadata?.displayName}</p>
              <p className="text-muted-foreground font-medium">
                {profile?.handle?.localName}.{profile?.handle?.namespace}
              </p>
            </div>
          </div>
        </a>
      </div>
    </main>
  );
}

function CreateProfilePlaceHolder() {
  return (
    <div className="flex h-[450px] shrink-0 items-center justify-center rounded-md border border-dashed">
      <div className="mx-auto flex max-w-[420px] flex-col items-center justify-center text-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          className="h-10 w-10 text-muted-foreground"
          viewBox="0 0 24 24"
        >
          <circle cx="12" cy="11" r="1" />
          <path d="M11 17a1 1 0 0 1 2 0c0 .5-.34 3-.5 4.5a.5.5 0 0 1-1 0c-.16-1.5-.5-4-.5-4.5ZM8 14a5 5 0 1 1 8 0" />
          <path d="M17 18.5a9 9 0 1 0-10 0" />
        </svg>

        <h3 className="mt-4 text-lg font-semibold">
          You don&apos;t have a profile yet.
        </h3>
        <p className="mb-4 mt-2 text-sm text-muted-foreground">
          Get started by creating a new profile.
        </p>
        <Link href="/create-profile">
          <Button>Create Profile</Button>
        </Link>
      </div>
    </div>
  );
}
