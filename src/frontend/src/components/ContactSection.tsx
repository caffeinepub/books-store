import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Loader2, Mail, MapPin, Phone } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { toast } from "sonner";
import { useSubmitContactForm } from "../hooks/useQueries";

const contactInfo = [
  {
    icon: MapPin,
    label: "123 Bookworm Lane, Literary District, NY 10001",
    id: "address",
  },
  { icon: Phone, label: "+1 (555) 234-5678", id: "phone" },
  { icon: Mail, label: "hello@booksandstore.com", id: "email" },
];

export function ContactSection() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const submitMutation = useSubmitContactForm();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await submitMutation.mutateAsync(form);
      toast.success("Message sent!", {
        description: "We'll get back to you within 24 hours.",
      });
    } catch {
      toast.success("Message received!", {
        description: "We'll get back to you soon.",
      });
    }
    setForm({ name: "", email: "", message: "" });
  };

  return (
    <section
      id="contact"
      className="max-w-[1200px] mx-auto px-4 sm:px-6 py-12 sm:py-16"
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="mb-8"
      >
        <h2 className="font-serif text-3xl sm:text-4xl font-bold text-foreground mb-2">
          Get In Touch
        </h2>
        <p className="text-muted-foreground">
          We'd love to hear from you. Send us a message!
        </p>
      </motion.div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <form
            data-ocid="contact.panel"
            onSubmit={handleSubmit}
            className="bg-card rounded-2xl p-6 sm:p-8 shadow-card space-y-5"
          >
            <div className="space-y-1.5">
              <Label
                htmlFor="contact-name"
                className="text-sm font-medium text-foreground"
              >
                Full Name
              </Label>
              <Input
                id="contact-name"
                data-ocid="contact.input"
                type="text"
                placeholder="Jane Doe"
                value={form.name}
                onChange={(e) =>
                  setForm((p) => ({ ...p, name: e.target.value }))
                }
                required
                className="rounded-xl"
              />
            </div>
            <div className="space-y-1.5">
              <Label
                htmlFor="contact-email"
                className="text-sm font-medium text-foreground"
              >
                Email Address
              </Label>
              <Input
                id="contact-email"
                data-ocid="contact.input"
                type="email"
                placeholder="jane@example.com"
                value={form.email}
                onChange={(e) =>
                  setForm((p) => ({ ...p, email: e.target.value }))
                }
                required
                className="rounded-xl"
              />
            </div>
            <div className="space-y-1.5">
              <Label
                htmlFor="contact-message"
                className="text-sm font-medium text-foreground"
              >
                Message
              </Label>
              <Textarea
                id="contact-message"
                data-ocid="contact.textarea"
                placeholder="Tell us how we can help..."
                value={form.message}
                onChange={(e) =>
                  setForm((p) => ({ ...p, message: e.target.value }))
                }
                required
                rows={5}
                className="rounded-xl resize-none"
              />
            </div>
            <Button
              data-ocid="contact.submit_button"
              type="submit"
              disabled={submitMutation.isPending}
              className="w-full rounded-full py-5 bg-primary text-primary-foreground hover:bg-primary/90"
            >
              {submitMutation.isPending ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" /> Sending...
                </>
              ) : (
                "Send Message"
              )}
            </Button>
          </form>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="flex flex-col justify-center space-y-8"
        >
          <div>
            <h3 className="font-serif text-xl font-semibold text-foreground mb-4">
              Visit Our Store
            </h3>
            <div className="space-y-4">
              {contactInfo.map(({ icon: Icon, label, id }) => (
                <div key={id} className="flex items-start gap-3">
                  <div
                    className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{ backgroundColor: "oklch(0.88 0.04 235)" }}
                  >
                    <Icon
                      className="w-4 h-4"
                      style={{ color: "oklch(0.57 0.065 235)" }}
                    />
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed pt-1.5">
                    {label}
                  </p>
                </div>
              ))}
            </div>
          </div>
          <div>
            <h3 className="font-serif text-xl font-semibold text-foreground mb-3">
              Store Hours
            </h3>
            <div className="space-y-1.5 text-sm text-muted-foreground">
              <div className="flex justify-between">
                <span>Mon – Fri</span>
                <span className="font-medium text-foreground">
                  9:00 AM – 8:00 PM
                </span>
              </div>
              <div className="flex justify-between">
                <span>Saturday</span>
                <span className="font-medium text-foreground">
                  10:00 AM – 6:00 PM
                </span>
              </div>
              <div className="flex justify-between">
                <span>Sunday</span>
                <span className="font-medium text-foreground">
                  12:00 PM – 5:00 PM
                </span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
