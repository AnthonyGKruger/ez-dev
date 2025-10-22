export default () => {
  const isOpen = useState("devToolsOpen", () => false);
  const isTranslationDebug = useCookie("dev-translation-debug", {
    default: () => false,
    watch: true,
  });

  const toggle = () => {
    isOpen.value = !isOpen.value;
  };

  const close = () => {
    isOpen.value = false;
  };

  const toggleTranslationDebug = () => {
    isTranslationDebug.value = !isTranslationDebug.value;
  };

  return {
    isOpen,
    isTranslationDebug,
    toggle,
    close,
    toggleTranslationDebug,
  };
};
