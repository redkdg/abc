import React, { useState } from "react";
import ItemList from "@/components/items/ItemList";
import ItemForm from "@/components/items/ItemForm";
import { useToast } from "@/components/ui/use-toast";
import { useLanguage } from "@/lib/LanguageContext";

type View = "list" | "create" | "edit";

interface ItemsPageProps {
  items: any[];
  setItems: React.Dispatch<React.SetStateAction<any[]>>;
}

const ItemsPage = ({ items, setItems }: ItemsPageProps) => {
  const { t } = useLanguage();
  const { toast } = useToast();
  const [view, setView] = useState<View>("list");
  const [selectedItem, setSelectedItem] = useState<any>(null);

  const handleCreateItem = () => {
    setSelectedItem(null);
    setView("create");
  };

  const handleEditItem = (id: string) => {
    const item = items.find((i) => i.id === id);
    if (item) {
      setSelectedItem(item);
      setView("edit");
    }
  };

  const handleDeleteItem = (id: string) => {
    setItems(items.filter((i) => i.id !== id));
    toast({
      title: t("itemDeleted"),
      description: t("itemDeletedDescription"),
    });
  };

  const handleSaveItem = (item: any) => {
    if (view === "edit") {
      setItems(items.map((i) => (i.id === item.id ? item : i)));
      toast({
        title: t("itemUpdated"),
        description: t("itemUpdatedDescription"),
      });
    } else {
      setItems([item, ...items]);
      toast({
        title: t("itemCreated"),
        description: t("itemCreatedDescription"),
      });
    }
    setView("list");
  };

  const handleCancel = () => {
    setSelectedItem(null);
    setView("list");
  };

  return (
    <div>
      {view === "list" && (
        <ItemList
          items={items}
          onCreateItem={handleCreateItem}
          onEditItem={handleEditItem}
          onDeleteItem={handleDeleteItem}
        />
      )}

      {(view === "create" || view === "edit") && (
        <ItemForm
          item={selectedItem}
          onSave={handleSaveItem}
          onCancel={handleCancel}
        />
      )}
    </div>
  );
};

export default ItemsPage;
