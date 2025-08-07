<script setup lang="ts">
import Button from "~/src/volt/Button.vue";
</script>

<template>
  <section class="lg:py-20 pb-9 bg-alternative-blue dark:bg-transparent">
    <div class="container px-6 m-auto">
      <div class="grid grid-cols-4 gap-6 md:grid-cols-4 lg:grid-cols-12">
        <div class="col-span-4 lg:col-span-5 self-center">
          <PagesAboutHeroImage />
        </div>
        <div class="col-span-4 lg:col-span-7 bg-transparent">
          <h1
            class="text-5xl text-light-gold md:font-extrabold text-center lg:text-left"
          >
            About Me!
          </h1>

          <p class="text-xl tracking-wide mt-5 text-white">
            {{
              `Fueled by a passion for technology and a knack for
            problem-solving, I'm a Full Stack Web Developer with a drive to
            craft intuitive and impactful web experiences.`
            }}
          </p>

          <p class="text-xl tracking-wide mt-5 text-white">
            {{
              `My journey began in the dynamic world of retail, where I honed my leadership and customer-centric skills
            as a Branch Manager. While exceeding sales targets and building a thriving team, I discovered a hidden
            passion for web development. This led me to pursue a Bachelor's degree in Information Technology, graduating
            in 2021 with a comprehensive understanding of web principles.`
            }}
          </p>

          <p class="text-xl tracking-wide mt-5 text-white">
            {{
              `Now, I'm eager to combine my technical expertise with my customer-first approach to become a valuable
            asset to your team. Whether you're looking to build a brand-new website, revamp an existing one, or
            integrate innovative features, I'm confident I can deliver solutions that exceed expectations.`
            }}
          </p>

          <p class="text-xl tracking-wide mt-5 text-white">
            {{
              `Let's build the web together! I'm excited to discuss your project and showcase how my unique blend of
            experience and technical knowledge can bring your vision to life. Feel free to reach out through my contact
            form and let's connect!`
            }}
          </p>

          <div class="pt-9">
            <NuxtLink to="/contact-me" class="mt-5"
              ><Button>Let's Chat</Button></NuxtLink
            >
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped></style>
