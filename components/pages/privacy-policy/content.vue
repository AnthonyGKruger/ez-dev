<script setup lang="ts">
const { t } = useTranslate();

const topics = [
  { num: "01", title: "What information I collect", body: "I collect information about you when you complete a form on my website. The information you give me may include your name, company name and email address." },
  { num: "02", title: "How I use the information", body: "I collect information to better understand how visitors use my website, to improve it, and to respond to you if you contact me through the site." },
  { num: "03", title: "Access & corrections", body: "You have the right to request a copy of the information I hold about you if you have contacted me before. Email me and I'll provide it." },
  { num: "04", title: "Cookies", body: "I may use cookies to give you the best experience and help improve the site. A cookie is a small file placed on your device when you visit a website — you can manage or delete cookies as you wish." },
  { num: "05", title: "Other websites", body: "My website may link to other websites. This privacy policy only applies to this website, so when you follow links elsewhere you should read their own policies." },
  { num: "06", title: "Changes to this policy", body: "I keep this privacy policy under regular review and will post any updates on this page." },
  { num: "07", title: "How to contact me", body: "Please get in touch if you have any questions about this privacy policy or the information I hold about you." },
];
</script>

<template>
  <section class="max-w-[820px] mx-auto px-7 pt-20 pb-24">
    <!-- Section header -->
    <div class="flex items-center gap-5 mb-5">
      <div class="mono text-[13px] tracking-[.16em] text-primary-gold">
        // PRIVACY POLICY
      </div>
      <div class="flex-1 h-px bg-primary-gold/20"></div>
    </div>
    <h1 class="text-[48px] font-black tracking-[-0.02em] text-[#f4f7fa]">
      All about privacy
    </h1>
    <p class="text-base leading-relaxed text-[oklch(80%_0.02_250)] mt-6 mb-2">
      This privacy policy applies to ezdev.solutions and explains how I use any
      personal information I collect about you when you use this website.
    </p>
    <p class="mono text-xs tracking-[.06em] text-[oklch(62%_0.02_250)] mb-10">
      LAST UPDATED 02/09/2025
    </p>

    <div class="flex flex-col gap-8">
      <div
        v-for="t in topics"
        :key="t.num"
        class="border-l-2 border-primary-gold/50 pl-[22px]"
      >
        <div class="flex items-baseline gap-3">
          <span class="mono text-[13px] text-primary-gold">{{ t.num }}</span>
          <h2 class="text-[22px] font-bold text-[#f4f7fa]">{{ t.title }}</h2>
        </div>
        <p class="text-[15px] leading-relaxed text-[oklch(78%_0.02_250)] mt-3">
          {{ t.body }}
        </p>
      </div>
    </div>

    <div
      class="mt-10 p-6 border border-primary-gold/30 rounded-2xl bg-surface-bg"
    >
      <p class="mono text-xs tracking-[.1em] text-primary-gold mb-2">CONTACT</p>
      <p class="text-[15px] leading-relaxed text-[oklch(80%_0.02_250)]">
        Questions about this policy or the information I hold about you? Email
        <a
          href="mailto:anthony@ezdev.solutions"
          class="text-light-gold"
        >anthony@ezdev.solutions</a>.
      </p>
    </div>
  </section>
</template>
