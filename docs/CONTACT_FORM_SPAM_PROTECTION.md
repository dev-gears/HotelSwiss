// Add reCAPTCHA with fallback validation to the ContactForm component

## Option 1: Add Google reCAPTCHA v3 (Invisible)

1. Register your site with Google reCAPTCHA: https://www.google.com/recaptcha/admin

2. Create a plugin file `plugins/recaptcha.client.ts`:

```typescript
import { defineNuxtPlugin } from "#app";

export default defineNuxtPlugin((nuxtApp) => {
  // Initialize reCAPTCHA with your site key
  const recaptchaScript = document.createElement("script");
  recaptchaScript.src =
    "https://www.google.com/recaptcha/api.js?render=YOUR_SITE_KEY";
  document.head.appendChild(recaptchaScript);

  // Add a helper function to execute reCAPTCHA
  const verifyRecaptcha = (): Promise<string> => {
    return new Promise((resolve, reject) => {
      if (!window.grecaptcha) {
        reject(new Error("reCAPTCHA is not loaded"));
        return;
      }

      window.grecaptcha.ready(() => {
        window.grecaptcha
          .execute("YOUR_SITE_KEY", { action: "submit" })
          .then(resolve)
          .catch(reject);
      });
    });
  };

  // Provide the helper function to components
  nuxtApp.provide("verifyRecaptcha", verifyRecaptcha);
});
```

3. Add TypeScript declarations in `types/recaptcha.d.ts`:

```typescript
declare global {
  interface Window {
    grecaptcha: {
      ready: (callback: () => void) => void;
      execute: (
        siteKey: string,
        options: { action: string },
      ) => Promise<string>;
    };
  }
}

declare module "#app" {
  interface NuxtApp {
    $verifyRecaptcha: () => Promise<string>;
  }
}

export {};
```

4. Update your ContactForm component to use reCAPTCHA:

```typescript
try {
  // Try to get reCAPTCHA token if available
  let token = "";
  try {
    const { $verifyRecaptcha } = useNuxtApp();
    if ($verifyRecaptcha) {
      token = await $verifyRecaptcha();
      // You can include this token in your API call for verification
    }
  } catch (recaptchaError) {
    console.warn("reCAPTCHA not available:", recaptchaError);
  }

  // Add the token to the email data or headers
  const apiOptions = token
    ? {
        headers: { "X-Recaptcha-Token": token },
      }
    : undefined;

  // Send the email using the API
  await sendEmail(emailData, apiOptions);
} catch (error) {
  // Error handling
}
```

## Option 2: Use a Client-Side Email Service as Fallback

For situations where the API email service fails, you can implement a fallback to a client-side service like EmailJS:

1. Sign up for EmailJS (https://www.emailjs.com/)

2. Install the package:

```bash
npm install @emailjs/browser
```

3. Create a fallback email service:

```typescript
import emailjs from "@emailjs/browser";

// Function to send email via EmailJS
const sendViaEmailJS = async (data: any) => {
  const templateParams = {
    from_name: data.from_name,
    to_name: "Hotel Staff",
    hotel_name: data.hotel_name,
    email: data.from_email,
    message: data.message,
    subject: data.subject,
  };

  return emailjs.send(
    "YOUR_SERVICE_ID",
    "YOUR_TEMPLATE_ID",
    templateParams,
    "YOUR_PUBLIC_KEY",
  );
};

// In your submitForm function:
try {
  await sendEmail(emailData);
} catch (error) {
  console.error("API email failed, trying fallback:", error);

  // If API call fails with authentication error, try EmailJS
  if (
    error?.data?.error &&
    typeof error.data.error === "string" &&
    error.data.error.includes("Authentication Required")
  ) {
    try {
      await sendViaEmailJS({
        from_name: name.value,
        hotel_name: props.hotelTitle || "Hotel Swiss",
        from_email: email.value,
        message: message.value,
        subject: subject,
      });

      // Show success message if fallback works
      toast.add({
        severity: "success",
        summary: $t("ContactForm.notifications.success.title"),
        detail: $t("ContactForm.notifications.success.message"),
        life: 5000,
      });

      // Form submitted successfully via fallback
      return;
    } catch (fallbackError) {
      console.error("Fallback email also failed:", fallbackError);
    }
  }

  // Show error notification
  toast.add({
    severity: "error",
    summary: $t("ContactForm.notifications.authError.title"),
    detail: $t("ContactForm.notifications.authError.message"),
    life: 7000,
  });
}
```

## Additional Security Measures

You already have:

1. Honeypot fields
2. Timing-based checks

Consider adding:

1. Rate limiting: Limit submissions from the same IP
2. Browser fingerprinting: Block submissions from known bot fingerprints
3. Require form inputs to be focused before submission

These solutions provide both spam protection and reliable email delivery even when the backend API is having issues.
