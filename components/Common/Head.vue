<template>
  <Head>
    <Title>{{ title || Global.DEFAULT_PAGE_TITLE }}</Title>

    <Meta
      v-for="(content, name) in metaTags"
      :key="name"
      :name="name"
      :content="content"
    />
    <Meta
      v-for="(content, property) in ogTags"
      :key="property"
      :property="property"
      :content="content"
    />
    <Meta
      v-for="(content, name) in twitterTags"
      :key="name"
      :name="name"
      :content="content"
    />
    <Link rel="canonical" :href="canonicalUrl" />
    <slot name="extra-tags" />
  </Head>
</template>

<script setup lang="ts">
import { MetaTagNames } from "@/enums/HeadData";
import { Global } from "@/enums/Global";
import { useLanguageStore } from "~/store/language";
import { useRuntimeConfig, useHead } from "#app";

const runtimeConfig = useRuntimeConfig();
const storeLang = useLanguageStore();
const currentLanguage = storeLang.currentLanguage;

const props = defineProps({
  title: String,
  description: String,
  imageUrl: String,
  url: String,
  keywords: String,
  noIndex: {
    type: Boolean,
    default: false,
  },
  structuredDataType: {
    type: String,
    default: "",
  },
  structuredDataProps: {
    type: Object,
    default: () => ({}),
  },
});

const canonicalUrl = computed(() => {
  if (!props.url) return "";

  if (props.url.startsWith("http")) {
    return props.url;
  }

  const baseUrl = runtimeConfig.public.siteUrl || "https://hotelswiss.ch";
  return `${baseUrl}${props.url.startsWith("/") ? "" : "/"}${props.url}`;
});

const metaTags = computed(() => ({
  [MetaTagNames.Description]: props.description,
  [MetaTagNames.Keywords]: props.keywords,
  [MetaTagNames.Language]: currentLanguage,
  [MetaTagNames.Robots]: props.noIndex ? "noindex, nofollow" : "index, follow",
}));

const ogTags = computed(() => ({
  [MetaTagNames.OgUrl]: canonicalUrl.value,
  [MetaTagNames.OgTitle]: props.title,
  [MetaTagNames.OgDescription]: props.description,
  [MetaTagNames.OgImage]: props.imageUrl,
  [MetaTagNames.OgType]: "website",
  [MetaTagNames.OgLocale]: currentLanguage,
  [MetaTagNames.OgSiteName]: "Hotel Swiss",
}));

const twitterTags = computed(() => ({
  [MetaTagNames.TwitterCard]: "summary_large_image",
  [MetaTagNames.TwitterTitle]: props.title,
  [MetaTagNames.TwitterDescription]: props.description,
  [MetaTagNames.TwitterImage]: props.imageUrl ?? Global.PLACEHOLDER_IMAGE_URL,
}));

const structuredData = computed(() => {
  if (!props.structuredDataType) return null;

  let data = {};

  if (props.structuredDataType === "organization") {
    data = {
      "@context": "https://schema.org",
      "@type": "Organization",
      name: "Hotel Swiss",
      url: runtimeConfig.public.siteUrl || "https://hotelswiss.ch",
      logo: `${runtimeConfig.public.siteUrl || "https://hotelswiss.ch"}/assets/images/minimal-logo.svg`,
      contactPoint: {
        "@type": "ContactPoint",
        telephone: props.structuredDataProps.telephone || "+41 000 00 00",
        contactType: "customer service",
      },
    };
  } else if (props.structuredDataType === "hotel") {
    data = {
      "@context": "https://schema.org",
      "@type": "Hotel",
      name: props.structuredDataProps.name || props.title,
      description: props.description,
      image: props.imageUrl,
      url: canonicalUrl.value,
      address: props.structuredDataProps.address || {
        "@type": "PostalAddress",
        addressCountry: "Switzerland",
      },
      priceRange: props.structuredDataProps.priceRange || "$$",
      starRating: props.structuredDataProps.starRating
        ? {
            "@type": "Rating",
            ratingValue: props.structuredDataProps.starRating,
          }
        : undefined,
      telephone: props.structuredDataProps.telephone,
    };
  } else if (props.structuredDataType === "website") {
    data = {
      "@context": "https://schema.org",
      "@type": "WebSite",
      name: "Hotel Swiss",
      url: runtimeConfig.public.siteUrl || "https://hotelswiss.ch",
      potentialAction: {
        "@type": "SearchAction",
        target: {
          "@type": "EntryPoint",
          urlTemplate: `${runtimeConfig.public.siteUrl || "https://hotelswiss.ch"}/search?q={search_term_string}`,
        },
        "query-input": "required name=search_term_string",
      },
    };
  }

  return JSON.stringify({ ...data, ...props.structuredDataProps });
});

useHead(() => ({
  script: structuredData.value
    ? [
        {
          type: "application/ld+json",
          innerHTML: structuredData.value,
          key: "structured-data",
          tagPriority: "high",
        },
      ]
    : [],
}));
</script>
