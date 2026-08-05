import { createHmac, timingSafeEqual } from "node:crypto";
import { revalidateTag } from "next/cache";
import { GITHUB_CACHE_TAG } from "@/lib/github";

/**
 * Webhook do GitHub para atualizar o site na hora, sem esperar o tempo de
 * cache expirar.
 *
 * Configure em Settings › Webhooks do repositório de perfil:
 * - Payload URL: https://<dominio>/api/github/revalidate
 * - Content type: application/json
 * - Secret: o mesmo valor de GITHUB_WEBHOOK_SECRET
 * - Eventos: Pushes e Repositories (o topic `portfolio` dispara `repository`)
 */
export async function POST(request: Request) {
  const secret = process.env.GITHUB_WEBHOOK_SECRET;

  if (!secret) {
    return Response.json(
      { error: "GITHUB_WEBHOOK_SECRET não configurado." },
      { status: 501 },
    );
  }

  // O corpo cru é obrigatório: a assinatura é calculada sobre os bytes
  // exatos enviados pelo GitHub.
  const body = await request.text();
  const signature = request.headers.get("x-hub-signature-256");

  if (!signature || !isValidSignature(body, signature, secret)) {
    return Response.json({ error: "Assinatura inválida." }, { status: 401 });
  }

  revalidateTag(GITHUB_CACHE_TAG, "max");

  return Response.json({ revalidated: true });
}

function isValidSignature(body: string, signature: string, secret: string) {
  const expected = `sha256=${createHmac("sha256", secret).update(body).digest("hex")}`;
  const received = Buffer.from(signature);
  const digest = Buffer.from(expected);

  return (
    received.length === digest.length && timingSafeEqual(received, digest)
  );
}
