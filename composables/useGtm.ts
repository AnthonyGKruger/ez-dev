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

  const trackFormSubmit = (label: string, success: boolean) => {
    pushEvent({
      event: "contact-form-submit",
      category: "forms",
      action: "submit",
      label,
      value: 1,
    });
  };

  const trackFormVerification = (success: boolean) => {
    pushEvent({
      event: "contact-form-submit",
      category: "forms",
      action: "verify",
      label: success ? "turnstile-success" : "turnstile-failed",
      value: 1,
    });
  };

  const trackFeatureUsage = (
    feature: string,
    additionalData?: Record<string, any>,
  ) => {
    pushEvent({
      event: feature,
      category: "features",
      action: feature,
      label: feature,
      value: 1,
      ...additionalData,
    });
  };

  const trackCookieAction = (action: "accept" | "reject") => {
    pushEvent({
      event: `${action}-cookie`,
      category: "cookies",
      action: `${action}-cookie`,
      label: `${action}ed-cookie`,
      value: 1,
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
