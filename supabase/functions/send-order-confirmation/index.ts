
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import * as nodemailer from "npm:nodemailer@6.9.7";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface OrderConfirmationRequest {
  customerName: string;
  customerEmail: string;
  orderId: string;
  orderItems: Array<{
    title: string;
    quantity: number;
    price: number;
  }>;
  totalAmount: number;
  orderDate: string;
}

const handler = async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    console.log('Processing order confirmation email request...');
    
    const { customerName, customerEmail, orderId, orderItems, totalAmount, orderDate }: OrderConfirmationRequest = await req.json();

    console.log('Order details:', { customerName, customerEmail, orderId, totalAmount });

    // Create transporter with Gmail configuration
    const transporter = nodemailer.createTransporter({
      service: 'gmail',
      auth: {
        user: 'vizibly3@gmail.com',
        pass: 'ibkh fupf fouc ghem'
      }
    });

    const itemsHtml = orderItems.map(item => `
      <tr style="border-bottom: 1px solid #e5e7eb;">
        <td style="padding: 12px 0; color: #374151;">${item.title}</td>
        <td style="padding: 12px 0; text-align: center; color: #374151;">${item.quantity}</td>
        <td style="padding: 12px 0; text-align: right; color: #374151;">$${(item.price * item.quantity).toFixed(2)}</td>
      </tr>
    `).join('');

    const emailHtml = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Order Confirmation</title>
        </head>
        <body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background-color: #f9fafb;">
          <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
            
            <!-- Header -->
            <div style="background: linear-gradient(135deg, #0056b3 0%, #67b2e8 100%); padding: 40px 30px; text-align: center;">
              <h1 style="margin: 0; color: #ffffff; font-size: 28px; font-weight: bold;">Order Confirmed!</h1>
              <p style="margin: 10px 0 0 0; color: #ffffff; font-size: 16px; opacity: 0.9;">Thank you for choosing OnAssist</p>
            </div>

            <!-- Content -->
            <div style="padding: 40px 30px;">
              <h2 style="margin: 0 0 20px 0; color: #1f2937; font-size: 20px;">Hello ${customerName},</h2>
              
              <p style="margin: 0 0 30px 0; color: #4b5563; font-size: 16px; line-height: 1.6;">
                We're excited to confirm that your order has been successfully placed! Our team will contact you soon to schedule your services.
              </p>

              <!-- Order Details -->
              <div style="background-color: #f8fafc; border-radius: 8px; padding: 25px; margin-bottom: 30px;">
                <h3 style="margin: 0 0 15px 0; color: #1f2937; font-size: 18px;">Order Details</h3>
                
                <div style="margin-bottom: 20px;">
                  <p style="margin: 0; color: #6b7280; font-size: 14px;">Order ID</p>
                  <p style="margin: 5px 0 0 0; color: #1f2937; font-weight: 600; font-family: monospace;">#${orderId.slice(0, 8).toUpperCase()}</p>
                </div>
                
                <div>
                  <p style="margin: 0; color: #6b7280; font-size: 14px;">Order Date</p>
                  <p style="margin: 5px 0 0 0; color: #1f2937; font-weight: 600;">${new Date(orderDate).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
                </div>
              </div>

              <!-- Order Items -->
              <div style="margin-bottom: 30px;">
                <h3 style="margin: 0 0 20px 0; color: #1f2937; font-size: 18px;">Services Ordered</h3>
                
                <table style="width: 100%; border-collapse: collapse;">
                  <thead>
                    <tr style="background-color: #f3f4f6;">
                      <th style="padding: 15px 0; text-align: left; color: #374151; font-weight: 600; font-size: 14px;">Service</th>
                      <th style="padding: 15px 0; text-align: center; color: #374151; font-weight: 600; font-size: 14px;">Qty</th>
                      <th style="padding: 15px 0; text-align: right; color: #374151; font-weight: 600; font-size: 14px;">Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    ${itemsHtml}
                  </tbody>
                </table>
                
                <div style="margin-top: 20px; padding-top: 20px; border-top: 2px solid #e5e7eb;">
                  <div style="display: flex; justify-content: space-between; align-items: center;">
                    <span style="color: #1f2937; font-size: 18px; font-weight: bold;">Total Amount:</span>
                    <span style="color: #0056b3; font-size: 24px; font-weight: bold;">$${totalAmount.toFixed(2)}</span>
                  </div>
                </div>
              </div>

              <!-- Next Steps -->
              <div style="background-color: #eff6ff; border-left: 4px solid #0056b3; padding: 20px; margin-bottom: 30px;">
                <h3 style="margin: 0 0 10px 0; color: #1e40af; font-size: 16px;">What's Next?</h3>
                <ul style="margin: 0; padding-left: 20px; color: #1e40af;">
                  <li style="margin-bottom: 8px;">Our team will contact you within 24 hours to schedule your services</li>
                  <li style="margin-bottom: 8px;">We'll confirm the appointment date and time that works best for you</li>
                  <li>Our certified technicians will arrive ready to provide excellent service</li>
                </ul>
              </div>

              <p style="margin: 0 0 20px 0; color: #4b5563; font-size: 16px; line-height: 1.6;">
                If you have any questions about your order, please don't hesitate to contact our customer support team.
              </p>

              <div style="text-align: center; margin-top: 30px;">
                <a href="tel:(555) 123-4567" style="display: inline-block; background-color: #0056b3; color: #ffffff; text-decoration: none; padding: 12px 30px; border-radius: 6px; font-weight: 600; margin-right: 15px;">Call Us</a>
                <a href="mailto:support@onassist.com" style="display: inline-block; background-color: #6b7280; color: #ffffff; text-decoration: none; padding: 12px 30px; border-radius: 6px; font-weight: 600;">Email Support</a>
              </div>
            </div>

            <!-- Footer -->
            <div style="background-color: #f9fafb; padding: 30px; text-align: center; border-top: 1px solid #e5e7eb;">
              <p style="margin: 0 0 10px 0; color: #6b7280; font-size: 14px;">Thank you for choosing OnAssist!</p>
              <p style="margin: 0; color: #9ca3af; font-size: 12px;">
                This email was sent regarding your order. If you have any questions, please contact our support team.
              </p>
            </div>
          </div>
        </body>
      </html>
    `;

    console.log('Sending email to:', customerEmail);

    // Send email using nodemailer
    const mailOptions = {
      from: '"OnAssist" <vizibly3@gmail.com>',
      to: customerEmail,
      subject: `✅ Your OnAssist Order is Confirmed - Order #${orderId.slice(0, 8).toUpperCase()}`,
      html: emailHtml
    };

    const emailResult = await transporter.sendMail(mailOptions);
    console.log('Email sent successfully:', emailResult);

    return new Response(JSON.stringify({ 
      success: true, 
      message: "Order confirmation email sent successfully",
      recipient: customerEmail,
      messageId: emailResult.messageId
    }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        ...corsHeaders,
      },
    });
  } catch (error: any) {
    console.error("Error sending order confirmation email:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);
