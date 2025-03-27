import React, { useState } from "react";
import ClientList from "@/components/clients/ClientList";
import ClientForm from "@/components/clients/ClientForm";
import { useToast } from "@/components/ui/use-toast";
import { useLanguage } from "@/lib/LanguageContext";

type View = "list" | "create" | "edit";

interface ClientsPageProps {
  clients: any[];
  setClients: React.Dispatch<React.SetStateAction<any[]>>;
}

const ClientsPage = ({ clients, setClients }: ClientsPageProps) => {
  const { t } = useLanguage();
  const { toast } = useToast();
  const [view, setView] = useState<View>("list");
  const [selectedClient, setSelectedClient] = useState<any>(null);

  const handleCreateClient = () => {
    setSelectedClient(null);
    setView("create");
  };

  const handleEditClient = (id: string) => {
    const client = clients.find((c) => c.id === id);
    if (client) {
      setSelectedClient(client);
      setView("edit");
    }
  };

  const handleDeleteClient = (id: string) => {
    setClients(clients.filter((c) => c.id !== id));
    toast({
      title: t("clientDeleted"),
      description: t("clientDeletedDescription"),
    });
  };

  const handleSaveClient = (client: any) => {
    if (view === "edit") {
      setClients(clients.map((c) => (c.id === client.id ? client : c)));
      toast({
        title: t("clientUpdated"),
        description: t("clientUpdatedDescription"),
      });
    } else {
      setClients([client, ...clients]);
      toast({
        title: t("clientCreated"),
        description: t("clientCreatedDescription"),
      });
    }
    setView("list");
  };

  const handleCancel = () => {
    setSelectedClient(null);
    setView("list");
  };

  return (
    <div>
      {view === "list" && (
        <ClientList
          clients={clients}
          onCreateClient={handleCreateClient}
          onEditClient={handleEditClient}
          onDeleteClient={handleDeleteClient}
        />
      )}

      {(view === "create" || view === "edit") && (
        <ClientForm
          client={selectedClient}
          onSave={handleSaveClient}
          onCancel={handleCancel}
        />
      )}
    </div>
  );
};

export default ClientsPage;
