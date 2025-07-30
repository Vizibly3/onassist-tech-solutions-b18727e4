import React, { useState } from "react";
import { Helmet } from "react-helmet-async";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useDynamicSiteConfig } from "@/hooks/useDynamicSiteConfig";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import {
  Handshake,
  TrendingUp,
  Users,
  Award,
  CheckCircle,
  ArrowRight,
  Star,
  Building,
  Lightbulb,
  Target,
  Send,
  User,
  Mail,
  Phone,
  MessageSquare,
} from "lucide-react";

interface PartnerFormData {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  subject: string;
  message: string;
}

interface FormErrors {
  firstName?: string;
  lastName?: string;
  email?: string;
  phoneNumber?: string;
  subject?: string;
  message?: string;
}

const PartnerPage = () => {
  const { config } = useDynamicSiteConfig();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<PartnerFormData>({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    subject: "",
    message: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.firstName.trim()) {
      newErrors.firstName = "First name is required";
    }

    if (!formData.lastName.trim()) {
      newErrors.lastName = "Last name is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!formData.phoneNumber.trim()) {
      newErrors.phoneNumber = "Phone number is required";
    } else if (
      !/^[+]?[1-9][\d]{0,15}$/.test(
        formData.phoneNumber.replace(/[\s\-()]/g, "")
      )
    ) {
      newErrors.phoneNumber = "Please enter a valid phone number";
    }

    if (!formData.subject.trim()) {
      newErrors.subject = "Subject is required";
    }

    if (!formData.message.trim()) {
      newErrors.message = "Message is required";
    } else if (formData.message.length < 10) {
      newErrors.message = "Message must be at least 10 characters long";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (field: keyof PartnerFormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      toast.error("Please fill in all required fields correctly");
      return;
    }

    setIsSubmitting(true);

    try {
      // Insert partner application into database
      const { data, error } = await supabase
        .from("partner_applications")
        .insert([
          {
            first_name: formData.firstName,
            last_name: formData.lastName,
            email: formData.email,
            phone_number: formData.phoneNumber,
            subject: formData.subject,
            message: formData.message,
          },
        ])
        .select();

      if (error) {
        console.error("Error submitting application:", error);
        toast.error("Failed to submit application. Please try again.");
        return;
      }

      toast.success(
        "Partner application submitted successfully! We'll get back to you within 24 hours."
      );

      // Reset form
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        phoneNumber: "",
        subject: "",
        message: "",
      });
      setErrors({});
    } catch (error) {
      console.error("Error submitting application:", error);
      toast.error("Failed to submit application. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const scrollToForm = () => {
    const formSection = document.getElementById("partner-form");
    if (formSection) {
      formSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <Layout>
      <Helmet>
        <title>Partner With Us | {config.name}</title>
        <meta
          name="description"
          content={`Join ${config.name}'s partner network and grow your business with our premium tech support services. Exclusive partnership opportunities available.`}
        />
      </Helmet>

      {/* Hero Section */}
      <div className="relative bg-gradient-to-br from-onassist-primary via-blue-600 to-purple-700 text-white overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage:
                'url(\'data:image/svg+xml;utf8,<svg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"><g fill="%23ffffff" fill-opacity="0.3"><circle cx="30" cy="30" r="8"/><circle cx="10" cy="10" r="4"/><circle cx="50" cy="50" r="6"/></g></svg>\')',
            }}
          ></div>
        </div>

        <div className="relative container mx-auto px-4 py-20">
          <div className="max-w-4xl mx-auto text-center">
            <Badge className="bg-white/20 text-white mb-6 px-6 py-2 backdrop-blur-sm">
              <Handshake className="w-4 h-4 mr-2" />
              Partnership Program
            </Badge>

            <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
              Partner With{" "}
              <span className="text-yellow-300">{config.name}</span>
            </h1>
            <p className="text-2xl opacity-90 mb-8 leading-relaxed">
              Join our exclusive network of partners and unlock new revenue
              streams with premium tech support services.
            </p>

            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Button
                size="lg"
                onClick={scrollToForm}
                className="bg-white text-onassist-primary hover:bg-gray-100 font-bold px-8 py-4 rounded-full shadow-2xl"
              >
                <Users className="w-5 h-5 mr-2" />
                Become a Partner
              </Button>

              <Button
                size="lg"
                variant="outline"
                onClick={scrollToForm}
                className="border-2 border-white  hover:bg-white text-onassist-primary font-bold px-8 py-4 rounded-full backdrop-blur-sm"
              >
                <Lightbulb className="w-5 h-5 mr-2" />
                Learn More
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">
              Why Partner with{" "}
              <span className="text-onassist-primary">{config.name}</span>?
            </h2>
            <p className="text-xl text-gray-600">
              Empower your business with our trusted tech support solutions and
              expand your service offerings.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: TrendingUp,
                title: "Revenue Growth",
                description:
                  "Unlock new revenue streams by offering our premium tech support services to your clients.",
              },
              {
                icon: Award,
                title: "Trusted Brand",
                description:
                  "Partner with a recognized and respected brand in the tech support industry.",
              },
              {
                icon: Handshake,
                title: "Mutual Success",
                description:
                  "Benefit from a partnership built on shared goals and collaborative growth strategies.",
              },
              {
                icon: Building,
                title: "Comprehensive Support",
                description:
                  "Gain access to our full suite of support resources, training, and marketing materials.",
              },
              {
                icon: Target,
                title: "Expanded Reach",
                description:
                  "Extend your market presence and reach new customers with our proven solutions.",
              },
              {
                icon: Star,
                title: "Exclusive Benefits",
                description:
                  "Enjoy exclusive partner benefits, including priority support and customized solutions.",
              },
            ].map((feature, index) => {
              const FeatureIcon = feature.icon;
              return (
                <Card
                  key={index}
                  className="shadow-lg hover:shadow-2xl transition-all duration-300 border-0 bg-white hover:-translate-y-2"
                >
                  <CardContent className="p-6">
                    <div className="bg-gradient-to-br from-onassist-primary to-blue-600 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6">
                      <FeatureIcon className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="font-bold text-xl mb-2">{feature.title}</h3>
                    <p className="text-gray-600 text-center">
                      {feature.description}
                    </p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-4xl font-bold text-center mb-12">
              Partner Program{" "}
              <span className="text-onassist-primary">Benefits</span>
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <div>
                <h3 className="text-2xl font-bold mb-4">
                  <CheckCircle className="w-6 h-6 mr-2 inline-block align-middle text-green-500" />
                  Increased Revenue
                </h3>
                <p className="text-gray-600">
                  Generate new income streams by offering our tech support
                  services to your existing customer base.
                </p>
              </div>

              <div>
                <h3 className="text-2xl font-bold mb-4">
                  <CheckCircle className="w-6 h-6 mr-2 inline-block align-middle text-green-500" />
                  Enhanced Customer Loyalty
                </h3>
                <p className="text-gray-600">
                  Provide added value to your customers with reliable tech
                  support, increasing their satisfaction and loyalty.
                </p>
              </div>

              <div>
                <h3 className="text-2xl font-bold mb-4">
                  <CheckCircle className="w-6 h-6 mr-2 inline-block align-middle text-green-500" />
                  Marketing Support
                </h3>
                <p className="text-gray-600">
                  Access a range of marketing materials and resources to promote
                  your partnership with {config.name}.
                </p>
              </div>

              <div>
                <h3 className="text-2xl font-bold mb-4">
                  <CheckCircle className="w-6 h-6 mr-2 inline-block align-middle text-green-500" />
                  Technical Training
                </h3>
                <p className="text-gray-600">
                  Receive comprehensive training on our services to ensure your
                  team is well-equipped to support your customers.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-24 bg-gradient-to-br from-blue-700 to-purple-800 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-8">
            Ready to Elevate Your Business?
          </h2>
          <p className="text-xl mb-12">
            Join the {config.name} partner program today and start offering
            top-notch Smart Doorstep support services to your clients.
          </p>
          <Button
            size="lg"
            onClick={scrollToForm}
            className="bg-yellow-400 text-blue-800 hover:bg-yellow-500 font-bold px-8 py-4 rounded-full shadow-2xl"
          >
            Get Started Now <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
        </div>
      </section>

      {/* Partner Application Form Section */}
      <section id="partner-form" className="py-24 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold mb-4">
                <span className="text-onassist-primary">Become a Partner</span>
              </h2>
              <p className="text-xl text-gray-600">
                Fill out the form below and we'll get back to you within 24
                hours
              </p>
            </div>

            <div className="bg-white rounded-2xl shadow-2xl p-8 md:p-12">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="firstName" className="text-sm font-medium">
                      First Name *
                    </Label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                      <Input
                        id="firstName"
                        type="text"
                        placeholder="Enter your first name"
                        value={formData.firstName}
                        onChange={(e) =>
                          handleInputChange("firstName", e.target.value)
                        }
                        className={`pl-10 ${
                          errors.firstName
                            ? "border-red-500 focus:border-red-500"
                            : ""
                        }`}
                      />
                    </div>
                    {errors.firstName && (
                      <p className="text-red-500 text-sm">{errors.firstName}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="lastName" className="text-sm font-medium">
                      Last Name *
                    </Label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                      <Input
                        id="lastName"
                        type="text"
                        placeholder="Enter your last name"
                        value={formData.lastName}
                        onChange={(e) =>
                          handleInputChange("lastName", e.target.value)
                        }
                        className={`pl-10 ${
                          errors.lastName
                            ? "border-red-500 focus:border-red-500"
                            : ""
                        }`}
                      />
                    </div>
                    {errors.lastName && (
                      <p className="text-red-500 text-sm">{errors.lastName}</p>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-sm font-medium">
                      Email Address *
                    </Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                      <Input
                        id="email"
                        type="email"
                        placeholder="Enter your email address"
                        value={formData.email}
                        onChange={(e) =>
                          handleInputChange("email", e.target.value)
                        }
                        className={`pl-10 ${
                          errors.email
                            ? "border-red-500 focus:border-red-500"
                            : ""
                        }`}
                      />
                    </div>
                    {errors.email && (
                      <p className="text-red-500 text-sm">{errors.email}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label
                      htmlFor="phoneNumber"
                      className="text-sm font-medium"
                    >
                      Phone Number *
                    </Label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                      <Input
                        id="phoneNumber"
                        type="tel"
                        placeholder="Enter your phone number"
                        value={formData.phoneNumber}
                        onChange={(e) =>
                          handleInputChange("phoneNumber", e.target.value)
                        }
                        className={`pl-10 ${
                          errors.phoneNumber
                            ? "border-red-500 focus:border-red-500"
                            : ""
                        }`}
                      />
                    </div>
                    {errors.phoneNumber && (
                      <p className="text-red-500 text-sm">
                        {errors.phoneNumber}
                      </p>
                    )}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="subject" className="text-sm font-medium">
                    Subject *
                  </Label>
                  <Input
                    id="subject"
                    type="text"
                    placeholder="Enter subject (e.g., Partnership Inquiry)"
                    value={formData.subject}
                    onChange={(e) =>
                      handleInputChange("subject", e.target.value)
                    }
                    className={
                      errors.subject
                        ? "border-red-500 focus:border-red-500"
                        : ""
                    }
                  />
                  {errors.subject && (
                    <p className="text-red-500 text-sm">{errors.subject}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message" className="text-sm font-medium">
                    Message *
                  </Label>
                  <div className="relative">
                    <MessageSquare className="absolute left-3 top-3 text-gray-400 w-4 h-4" />
                    <Textarea
                      id="message"
                      placeholder="Tell us about your business and partnership goals..."
                      value={formData.message}
                      onChange={(e) =>
                        handleInputChange("message", e.target.value)
                      }
                      className={`pl-10 min-h-[120px] resize-none ${
                        errors.message
                          ? "border-red-500 focus:border-red-500"
                          : ""
                      }`}
                    />
                  </div>
                  {errors.message && (
                    <p className="text-red-500 text-sm">{errors.message}</p>
                  )}
                  <p className="text-xs text-gray-500">
                    Minimum 10 characters required
                  </p>
                </div>

                <div className="pt-6">
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-gradient-to-r from-onassist-primary to-blue-600 hover:from-onassist-primary/90 hover:to-blue-600/90 text-white font-bold py-4 rounded-xl shadow-lg transition-all duration-300"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                        Submitting...
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4 mr-2" />
                        Submit Application
                      </>
                    )}
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default PartnerPage;
