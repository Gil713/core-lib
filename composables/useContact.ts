export const useContact = () => {
  const contacts = useState<IContact[]>("contact-list");

  const { $systemService } = useNuxtApp();

  const fetch = async () => {
    try {
      if (contacts.value) return contacts.value;

      const result = await $systemService.getContacts();
      contacts.value = result;
      return result;
    } catch (e: unknown) {
      console.log(e);
    }
  };

  return {
    fetch,
    contacts,
  };
};
