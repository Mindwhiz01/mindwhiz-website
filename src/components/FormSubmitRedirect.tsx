"use client";

// ---------------------------------------------------------------------------
// Sends visitors to /thank-you after they submit an embedded LeadConnector
// form.
//
// The forms are cross-origin iframes, so we cannot observe their submit event
// directly. What we can do is listen to the postMessage traffic the iframe
// sends its parent. Reading the shipped embed script
// (https://link.msgsndr.com/js/form_embed.js) the messages are ARRAYS whose
// first element is the action name, and the handled set is:
//
//   iframeLoaded | fetch-query-params | fetch-sticky-contacts
//   set-sticky-contacts | modify-parent-url
//
// "set-sticky-contacts" is the one that matters: it is the WRITE the iframe
// performs once a contact has been created, and the embed script's own handler
// stores `leadCollected: true` off the back of it. That makes it our submit
// signal.
//
// Note "modify-parent-url" is NOT a redirect - the vendor handler only calls
// history.replaceState, which rewrites the address bar without navigating. And
// the builder's own "On Submit -> Open URL" setting navigates the IFRAME, so
// the thank-you page would render squashed inside the 666px embed box. Doing
// the top-level navigation here avoids both problems.
// ---------------------------------------------------------------------------

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { markLeadSaved } from "@/lib/leadEvent";

const ALLOWED_ORIGINS = [
  "https://api.leadconnectorhq.com",
  "https://link.msgsndr.com",
];

const SUBMIT_ACTION = "set-sticky-contacts";

// The iframe can also write sticky-contact data while it boots, restoring a
// returning visitor's details. Ignoring messages that land in the first moments
// after mount keeps that from bouncing someone straight to the thank-you page
// without submitting anything.
const IGNORE_WINDOW_MS = 2500;

export default function FormSubmitRedirect({
  to = "/thank-you",
}: {
  to?: string;
}) {
  const router = useRouter();

  useEffect(() => {
    const mountedAt = Date.now();
    let fired = false;

    function onMessage(event: MessageEvent) {
      if (fired) return;
      if (!ALLOWED_ORIGINS.includes(event.origin)) return;
      if (!Array.isArray(event.data) || event.data[0] !== SUBMIT_ACTION) return;
      if (Date.now() - mountedAt < IGNORE_WINDOW_MS) return;

      fired = true;
      // Mint the conversion ID here, not on the thank-you page: this message is
      // the iframe's post-save write, so it is the only point at which we know
      // the lead actually landed in the CRM. A Submit click alone never gets
      // here, and neither does a direct visit to the thank-you URL.
      markLeadSaved();
      router.push(to);
    }

    window.addEventListener("message", onMessage);
    return () => window.removeEventListener("message", onMessage);
  }, [router, to]);

  return null;
}
