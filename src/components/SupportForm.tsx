import { useState } from "react";
import { Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

const SUPPORT_EMAIL = "tiago.melo@softplan.com.br";

interface SupportFormProps {
  onSuccess?: () => void;
}

const SupportForm = ({ onSuccess }: SupportFormProps) => {
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
    onSuccess?.();
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3">
      <div className="space-y-1.5">
        <Label htmlFor="support-name" className="text-xs">Nome</Label>
        <Input
          id="support-name"
          placeholder="Seu nome completo"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="h-8 text-sm"
          required
        />
      </div>
      <div className="space-y-1.5">
        <Label htmlFor="support-email" className="text-xs">E-mail</Label>
        <Input
          id="support-email"
          type="email"
          placeholder="seu@email.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="h-8 text-sm"
          required
        />
      </div>
      <div className="space-y-1.5">
        <Label htmlFor="support-problem" className="text-xs">Descreva o problema</Label>
        <Textarea
          id="support-problem"
          placeholder="Conte o que aconteceu..."
          value={problem}
          onChange={(e) => setProblem(e.target.value)}
          rows={3}
          className="text-sm"
          required
        />
      </div>
      <Button type="submit" size="sm" className="w-full gap-2">
        <Send size={14} />
        Enviar relato
      </Button>
    </form>
  );
};

export default SupportForm;
