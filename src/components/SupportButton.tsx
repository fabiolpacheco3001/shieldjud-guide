import { useState } from "react";
import { MessageCircleWarning, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

const SUPPORT_EMAIL = "tiago.melo@softplan.com.br";

const SupportButton = () => {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [problem, setProblem] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim() || !email.trim() || !problem.trim()) {
      toast.error("Por favor, preencha todos os campos.");
      return;
    }

    const subject = encodeURIComponent(`[Suporte ShieldJud] Problema reportado por ${name}`);
    const body = encodeURIComponent(
      `Nome: ${name}\nE-mail de contato: ${email}\n\nDescrição do problema:\n${problem}`
    );

    window.open(`mailto:${SUPPORT_EMAIL}?subject=${subject}&body=${body}`, "_self");

    toast.success("Seu app de e-mail será aberto com o relato preenchido.");
    setName("");
    setEmail("");
    setProblem("");
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          size="icon"
          className="fixed bottom-6 left-6 z-50 h-14 w-14 rounded-full shadow-lg bg-destructive text-destructive-foreground hover:bg-destructive/90 transition-colors"
          aria-label="Reportar problema"
        >
          <MessageCircleWarning size={24} />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Reportar um problema</DialogTitle>
          <DialogDescription>
            Preencha os campos abaixo. Ao enviar, seu app de e-mail abrirá com o relato pronto.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 mt-2">
          <div className="space-y-2">
            <Label htmlFor="support-name">Nome</Label>
            <Input
              id="support-name"
              placeholder="Seu nome completo"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="support-email">E-mail</Label>
            <Input
              id="support-email"
              type="email"
              placeholder="seu@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="support-problem">Descreva o problema</Label>
            <Textarea
              id="support-problem"
              placeholder="Conte o que aconteceu, qual tela estava usando, o que esperava que acontecesse..."
              value={problem}
              onChange={(e) => setProblem(e.target.value)}
              rows={4}
              required
            />
          </div>
          <Button type="submit" className="w-full gap-2">
            <Send size={16} />
            Enviar relato
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default SupportButton;
