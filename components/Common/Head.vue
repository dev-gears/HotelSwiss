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
    <slot name="extra-tags" />
  </Head>
</template>

<script setup lang="ts">
import { MetaTagNames } from "@/enums/HeadData";
import { Global } from "@/enums/Global";

const props = defineProps({
  title: String,
  description: String,
  imageUrl: String,
  url: String,
});

const metaTags = computed(() => ({
  [MetaTagNames.Description]: props.description,
}));

const ogTags = computed(() => ({
  [MetaTagNames.OgUrl]: props.url,
  [MetaTagNames.OgTitle]: props.title,
  [MetaTagNames.OgDescription]: props.description,
  [MetaTagNames.OgImage]: props.imageUrl,
}));

const twitterTags = computed(() => ({
  [MetaTagNames.TwitterCard]: "summary_large_image",
  [MetaTagNames.TwitterTitle]: props.title,
  [MetaTagNames.TwitterDescription]: props.description,
  [MetaTagNames.TwitterImage]: props.imageUrl ?? Global.PLACEHOLDER_IMAGE_URL,
}));
</script>
