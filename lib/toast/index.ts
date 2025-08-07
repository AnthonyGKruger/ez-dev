import { useToast } from "primevue/usetoast";

export const addToast = (severity: string, summary: string) => {
  const toast = useToast();
  toast.add({
    severity,
    summary,
    life: 3000,
    group: "bl",
  });
};
