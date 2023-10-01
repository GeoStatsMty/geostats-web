"use client";
import React, { useState } from "react";
import { LabeledInput } from "@/components/LabeledInput";
import { NumberInput } from "@/components/NumberInput";
import LabeledCheckbox from "@/components/LabeledCheckbox";
import Collapsible from "@/components/Collapsible";
import Separator from "@/components/Separator";
import ODSSelector from "@/components/ODSSelector";
import { LabeledSelect } from "@/components/LabeledSelect";
import {
  CLUNIStatus,
  DonationAuthStatus,
} from "@/lib/models/incorporatedOrgData";
import { type CorporationType } from "@/lib/models/corporationType";
import { Button } from "@/components/Button";

export default function GeneralDataForm({
  corporationTypes,
}: {
  corporationTypes: CorporationType[];
}) {
  const [showIncFields, setShowIncFields] = useState(false);
  return (
    <form className="max-w-2xl w-full pt-4 flex flex-wrap items-end gap-x-2 mb-32">
      <h1 className="text-4xl basis-full mb-2">Registra tu organización</h1>
      <h2 className="text-2xl w-fit mb-2"> Datos generales </h2>
      <p className="text-xs text-stone-300 grow mb-2">
        * marca un campo requerido
      </p>
      <LabeledInput label="Nombre" required className="grow basis-9/12" />
      <NumberInput
        required
        label="Año de fundación"
        defaultValue={2023}
        className="basis-2/12"
      />
      <LabeledInput
        label="Teléfono de contacto"
        type="tel"
        className="flex-initial grow basis-full sm:basis-5/12"
      />
      <LabeledInput
        label="Correo eléctronico de contacto"
        type="email"
        className="flex-initial grow basis-full sm:basis-5/12"
      />
      <LabeledInput label="Página web" type="url" className="grow basis-full" />
      <LabeledCheckbox
        label="La organización esta incorporada legalmente."
        onCheckedChange={(state) => {
          setShowIncFields(state === true);
        }}
        className="basis-full"
      />
      <Collapsible open={showIncFields} className="basis-full">
        <div className="flex flex-wrap items-end gap-x-2">
          <Separator />
          <h2 className="text-2xl mb-2">Información legal</h2>
          <p className="text-xs text-stone-300 grow mb-2">
            * marca un campo requerido
          </p>
          <LabeledInput
            required
            label="Razón social"
            className="grow basis-9/12"
          />
          <LabeledSelect
            label="Tipo"
            className="basis-2/12"
            required
            values={corporationTypes.map((corpType) => corpType.id.toString())}
            labels={corporationTypes.map(
              (corpType) => corpType.shortName ?? corpType.name,
            )}
          />

          <LabeledInput label="RFC" className="grow basis-8/12" />
          <NumberInput
            label="Año de incorporación"
            defaultValue={2023}
            className="basis-3/12"
            required
          />
          <LabeledSelect
            label="Estatus de CLUNI"
            className="grow basis-full sm:basis-5/12"
            placeholder="Selecciona un valor"
            values={[
              CLUNIStatus.Active,
              CLUNIStatus.Inactive,
              CLUNIStatus.InProgress,
              CLUNIStatus.No,
            ]}
            labels={[
              "Contamos con CLUNI activa",
              "Contamos con CLUNI, actualmente inactiva",
              "Trámite en proceso",
              "No contamos con CLUNI",
            ]}
          />
          <LabeledSelect
            label="Estatus de donataria autorizada"
            className="grow basis-full sm:basis-5/12"
            placeholder="Selecciona un valor"
            values={[
              DonationAuthStatus.NotAuthorized,
              DonationAuthStatus.Authorized,
              DonationAuthStatus.InProgress,
              DonationAuthStatus.InRecovery,
            ]}
            labels={[
              "No contamos con donataria autorizada",
              "Sí contamos con donataria autorizada",
              "En proceso de autorización",
              "En proceso de recuperación",
            ]}
          />
        </div>
      </Collapsible>
      <Collapsible open={!showIncFields} className="basis-full mt-2">
        <LabeledCheckbox label="Quiero incorporarme legalmente." />
      </Collapsible>
      <Separator />
      <h2 className="text-2xl mb-2">Redes sociales</h2>
      <p className="text-xs text-stone-300 grow basis-6/12 mb-2">
        * marca un campo requerido
      </p>
      <LabeledInput
        label="Facebook"
        type="url"
        className="grow basis-full sm:basis-5/12"
      />
      <LabeledInput
        label="Instagram"
        type="url"
        className="grow basis-full sm:basis-5/12"
      />
      <LabeledInput
        label="Twitter"
        type="url"
        className="grow basis-full sm:basis-5/12"
      />
      <LabeledInput
        label="TikTok"
        type="url"
        className="grow basis-full sm:basis-5/12"
      />
      <LabeledInput label="YouTube" type="url" className="flex-auto" />
      <LabeledInput label="LinkedIn" type="url" className="flex-auto" />
      <Separator />
      <h2 className="text-xl mb-2 basis-full">ODS</h2>
      <p className="text-md text-stone-300 mb-2 basis-full">
        Objetivo de desarrollo sustentable en el cual se enfoca tu organización.
      </p>
      <ODSSelector />
      <Separator />
      <Button label="Confirmar" type="submit" />
    </form>
  );
}