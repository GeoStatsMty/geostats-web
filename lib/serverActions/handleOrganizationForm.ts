"use server";
import { type ServerActionResult } from "@/lib/serverActions/serverActionResult";
import { getSession } from "@auth0/nextjs-auth0";
import { decodeForm } from "@/lib/schemas/decodeForm";
import { getPersonByAuthId } from "@/lib/getPersonByAuthId";
import prisma from "@/lib/prisma";
import { put } from "@vercel/blob";
import { organizationSchema } from "@/lib/schemas/organization";
import { management } from "@/lib/auth0";
import { fileTypeFromBlob } from "file-type";
import { randomUUID } from "crypto";

const imageTypes = ["image/jpeg", "image/png", "image/webp"];

export default async function handleOrganizationForm(
  data: FormData,
): Promise<ServerActionResult> {
  const session = await getSession();

  if (session == null) {
    return {
      success: false,
      name: "Not authenticated error",
      message: "No user session available",
    };
  }

  const person = await getPersonByAuthId(session.user.sub);

  if (person == null) {
    return {
      success: false,
      name: "user data missing",
      message: "onboarding has not been completed",
    };
  }

  try {
    const organizationData = await decodeForm(
      data,
      organizationSchema.omit({ id: true }),
    );

    const logo = data.get("logo") as File | null;

    let logoUrl: string | undefined;

    if (logo != null) {
      const fileType = await fileTypeFromBlob(logo);

      if (fileType == null || !imageTypes.includes(fileType.mime)) {
        return {
          success: false,
          name: "wrong file type",
          message: "file is not a supported image format",
        };
      }

      const result = await put(`/organizationLogos/${randomUUID()}`, logo, {
        access: "public",
        contentType: fileType.mime,
      });

      logoUrl = result.url;
    }

    await prisma.organization.create({
      data: {
        ...organizationData,
        logoUrl,
        persons: {
          connect: {
            id: person.id,
          },
        },
      },
    });

    await management.users.update(
      {
        id: session.user.sub,
      },
      {
        app_metadata: {
          finished_onboarding: true,
        },
      },
    );

    return {
      success: true,
    };
  } catch (e) {
    if (e instanceof Error) {
      return {
        success: false,
        name: e.name,
        message: e.message,
      };
    }

    throw e;
  }
}