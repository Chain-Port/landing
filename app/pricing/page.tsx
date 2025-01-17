import React from "react";
import type { Metadata } from "next";
import { CallToAction } from "@/components/call-to-action";
import { siteConfig } from "@/lib/config";
import { FAQ } from "./faq";
import { Pricing } from "./pricing";

export const runtime = "edge";

const config = siteConfig.pricingPage;

export const metadata: Metadata = {
  title: "turbocharger pricing plans: Free, Personal, Pro",
};

export default function PricingPage() {
  return (
    <div className="container max-w-7xl pt-12">
      <Pricing />
      <FAQ />
      <CallToAction
        className="mt-36"
        logo={false}
        headline={config.cta.headline}
        subheadline={config.cta.subheadline}
        cta={config.cta.cta}
      />
    </div>
  );
}
