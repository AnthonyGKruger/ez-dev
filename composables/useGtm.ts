export const useGtm = () => {
  const { $gtm } = useNuxtApp();

  const pushEvent = (event: {
    event: string;
    category?: string;
    action?: string;
    label?: string;
    value?: number | string;
    [key: string]: any;
  }) => {
    $gtm.pushEvent(event);
  };

  const trackFormSubmit = (success: boolean) => {
    pushEvent({
      event: "contact-form-submit",
      value: `form submitted ${success}`,
    });
  };

  const trackFormVerification = (success: boolean) => {
    pushEvent({
      event: "contact-form-verification",
      value: success ? "turnstile-success" : "turnstile-failed",
    });
  };

  const trackFeatureUsage = (
    feature: string,
    additionalData?: Record<string, any>,
  ) => {
    pushEvent({
      event: feature,
      ...additionalData,
    });
  };

  const trackCookieAction = (action: "accept" | "reject") => {
    pushEvent({
      event: `cookie-consent`,
      value: `${action}ed-cookie`,
    });
  };

  return {
    pushEvent,
    trackFormSubmit,
    trackFormVerification,
    trackFeatureUsage,
    trackCookieAction,
  };
};
