
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import Stripe from "https://esm.sh/stripe@14.21.0";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const logStep = (step: string, details?: any) => {
  const detailsStr = details ? ` - ${JSON.stringify(details)}` : '';
  console.log(`[VERIFY-PAYMENT] ${step}${detailsStr}`);
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    logStep("Payment verification started");

    const { sessionId } = await req.json();
    if (!sessionId) {
      throw new Error("Session ID is required");
    }

    // Create Supabase client using service role key
    const supabaseService = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "",
      { auth: { persistSession: false } }
    );

    // Use test Stripe key (same as create-payment)
    const stripeKey = Deno.env.get("STRIPE_SECRET_KEY") || "sk_test_51234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef12";
    const stripe = new Stripe(stripeKey, { apiVersion: "2023-10-16" });

    // Retrieve checkout session
    const session = await stripe.checkout.sessions.retrieve(sessionId);
    logStep("Session retrieved", { sessionId, paymentStatus: session.payment_status });

    // Update order based on payment status
    let updateData: any = {};
    if (session.payment_status === "paid") {
      updateData = {
        payment_status: "paid",
        status: "confirmed",
        updated_at: new Date().toISOString(),
      };
    } else if (session.payment_status === "unpaid") {
      updateData = {
        payment_status: "failed",
        status: "cancelled",
        updated_at: new Date().toISOString(),
      };
    }

    if (Object.keys(updateData).length > 0) {
      const { error: updateError } = await supabaseService
        .from("orders")
        .update(updateData)
        .eq("payment_id", sessionId);

      if (updateError) {
        logStep("Order update failed", { error: updateError });
        throw new Error(`Failed to update order: ${updateError.message}`);
      }

      logStep("Order updated successfully", updateData);
    }

    return new Response(
      JSON.stringify({ 
        paymentStatus: session.payment_status,
        orderStatus: updateData.status || "pending"
      }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 200,
      }
    );

  } catch (error: any) {
    logStep("ERROR in verify-payment", { message: error.message });
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 500,
      }
    );
  }
});
