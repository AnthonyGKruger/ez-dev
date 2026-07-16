/**
 * Composable for scroll-reveal animations.
 * Watches elements with .reveal, .reveal-l, .reveal-r classes
 * and adds .in when they enter the viewport.
 */
export default function useScrollReveal() {
  if (import.meta.server) return;

  const observer = ref<IntersectionObserver>();

  onMounted(() => {
    observer.value = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("in");
            observer.value?.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
    );

    document.querySelectorAll(".reveal, .reveal-l, .reveal-r").forEach((el) => {
      observer.value?.observe(el);
    });
  });

  onUnmounted(() => {
    observer.value?.disconnect();
  });
}
