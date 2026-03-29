import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { CheckCircle, Loader2 } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { toast } from "sonner";
import { useActor } from "../hooks/useActor";

export function ContactSection() {
  const { actor } = useActor();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) {
      toast.error("Please fill in all fields.");
      return;
    }
    setLoading(true);
    try {
      if (actor) {
        await actor.submitContactForm({ name, email, message });
      }
      setSuccess(true);
      setName("");
      setEmail("");
      setMessage("");
      toast.success("Message sent! We'll get back to you soon.");
    } catch {
      toast.error("Failed to send message. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="max-w-xl mx-auto"
      >
        <div className="text-center mb-10">
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-foreground">
            Get in Touch
          </h2>
          <p className="text-muted-foreground mt-2 text-sm">
            Have a question? We&apos;d love to hear from you.
          </p>
        </div>

        {success ? (
          <div
            className="bg-card rounded-2xl shadow-card p-10 text-center flex flex-col items-center gap-3"
            data-ocid="contact.success_state"
          >
            <CheckCircle className="w-12 h-12 text-green-500" />
            <h3 className="font-serif text-xl font-bold text-foreground">
              Message Sent!
            </h3>
            <p className="text-muted-foreground text-sm">
              We&apos;ll get back to you within 24 hours.
            </p>
            <Button
              variant="outline"
              onClick={() => setSuccess(false)}
              className="mt-2"
            >
              Send Another
            </Button>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="bg-card rounded-2xl shadow-card p-8 flex flex-col gap-5"
            data-ocid="contact.panel"
          >
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="contact-name">Name</Label>
              <Input
                id="contact-name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your name"
                autoComplete="name"
                data-ocid="contact.input"
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="contact-email">Email</Label>
              <Input
                id="contact-email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                autoComplete="email"
                data-ocid="contact.input"
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="contact-message">Message</Label>
              <Textarea
                id="contact-message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="How can we help you?"
                rows={5}
                data-ocid="contact.textarea"
              />
            </div>
            <Button
              type="submit"
              disabled={loading}
              className="w-full rounded-xl"
              data-ocid="contact.submit_button"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Sending…
                </>
              ) : (
                "Send Message"
              )}
            </Button>
          </form>
        )}
      </motion.div>
    </section>
  );
}
