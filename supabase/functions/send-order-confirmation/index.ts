
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import nodemailer from "npm:nodemailer@6.9.7";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface OrderConfirmationRequest {
  orderData: {
    id: string;
    first_name: string;
    last_name: string;
    email: string;
    phone_number: string;
    address: string;
    city: string;
    state: string;
    zip_code: string;
    total_amount: number;
    payment_status: string;
    items: Array<{
      service_title: string;
      service_price: number;
      quantity: number;
    }>;
  };
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { orderData }: OrderConfirmationRequest = await req.json();
    console.log("Received order data:", orderData);

    // Create transporter using Gmail
    const transporter = nodemailer.createTransporter({
      service: 'gmail',
      auth: {
        user: 'vizibly3@gmail.com',
        pass: 'ibkh fupf fouc ghem'
      }
    });

    // Calculate total items
    const totalItems = orderData.items.reduce((sum, item) => sum + item.quantity, 0);

    // Create HTML email content
    const htmlContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Order Confirmation</title>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: linear-gradient(135deg, #0056b3, #67b2e8); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
          .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
          .order-details { background: white; padding: 20px; border-radius: 8px; margin: 20px 0; }
          .item { border-bottom: 1px solid #eee; padding: 15px 0; }
          .item:last-child { border-bottom: none; }
          .total { font-size: 18px; font-weight: bold; color: #0056b3; text-align: right; margin-top: 20px; }
          .contact-info { background: #e8f4fd; padding: 20px; border-radius: 8px; margin-top: 20px; }
          .footer { text-align: center; margin-top: 30px; color: #666; font-size: 14px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>Order Confirmation</h1>
            <p style="margin: 0; font-size: 18px;">Thank you for your order!</p>
          </div>
          
          <div class="content">
            <h2>Hi ${orderData.first_name},</h2>
            <p>We're excited to confirm that we've received your order. Our team will be in touch soon to schedule your service.</p>
            
            <div class="order-details">
              <h3 style="color: #0056b3; margin-top: 0;">Order Details</h3>
              <p><strong>Order ID:</strong> ${orderData.id}</p>
              <p><strong>Total Items:</strong> ${totalItems}</p>
              <p><strong>Payment Status:</strong> ${orderData.payment_status}</p>
              
              <h4>Services Ordered:</h4>
              ${orderData.items.map(item => `
                <div class="item">
                  <strong>${item.service_title}</strong><br>
                  Quantity: ${item.quantity} × $${item.service_price.toFixed(2)} = $${(item.quantity * item.service_price).toFixed(2)}
                </div>
              `).join('')}
              
              <div class="total">
                Total Amount: $${orderData.total_amount.toFixed(2)}
              </div>
            </div>
            
            <div class="contact-info">
              <h3 style="color: #0056b3; margin-top: 0;">Service Address</h3>
              <p>
                ${orderData.address}<br>
                ${orderData.city}, ${orderData.state} ${orderData.zip_code}
              </p>
              <p><strong>Phone:</strong> ${orderData.phone_number}</p>
            </div>
            
            <p>Our certified technicians will contact you within 24 hours to schedule your service at a time that's convenient for you.</p>
            
            <p>If you have any questions or need to make changes to your order, please don't hesitate to contact us.</p>
            
            <div class="footer">
              <p>Thank you for choosing Smart Doorstep!</p>
              <p>Best regards,<br>The Smart Doorstep Team</p>
            </div>
          </div>
        </div>
      </body>
      </html>
    `;

    // Send email regardless of payment status (for testing mode)
    const mailOptions = {
      from: 'Smart Doorstep <vizibly3@gmail.com>',
      to: orderData.email,
      subject: `Order Confirmation - ${orderData.id}`,
      html: htmlContent
    };

    console.log("Sending email to:", orderData.email);
    const result = await transporter.sendMail(mailOptions);
    console.log("Email sent successfully:", result.messageId);

    return new Response(
      JSON.stringify({ 
        success: true, 
        messageId: result.messageId,
        message: "Order confirmation email sent successfully" 
      }),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
          ...corsHeaders,
        },
      }
    );
  } catch (error: any) {
    console.error("Error in send-order-confirmation function:", error);
    return new Response(
      JSON.stringify({ 
        error: error.message,
        success: false 
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);
