import Image from "next/image";
import type { Profile } from "@/lib/github";

/** Foto de perfil do GitHub, no topo da página inicial. */
export function ProfileAvatar({ profile }: { profile: Profile }) {
  return (
    <Image
      src={profile.avatarUrl}
      alt={`Foto de perfil de ${profile.name ?? profile.login}`}
      width={112}
      height={112}
      className="size-28 rounded-full ring-1 ring-foreground/10 mx-auto md:mx-0"
      priority
    />
  );
}
