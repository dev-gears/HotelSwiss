import { mount } from "@vue/test-utils";
import { describe, it, expect, vi } from "vitest";
import SelectButton from "@/components/ui/Select/SelectButton.vue";

// Mock PrimeVue component
vi.mock("primevue/selectbutton", () => ({
  default: {
    name: "PrimeSelectButton",
    props: {
      modelValue: null,
      options: Array,
      optionLabel: String,
      optionValue: String,
      optionDisabled: String,
      multiple: Boolean,
      unselectable: Boolean,
      pt: Object,
    },
    emits: ["update:modelValue"],
    template: `
      <div class="p-selectbutton">
        <button 
          v-for="(option, i) in options" 
          :key="i"
          class="p-button"
          @click="$emit('update:modelValue', option.value)"
        >
          {{ option.label }}
        </button>
      </div>
    `,
  },
}));

describe("SelectButton", () => {
  const options = [
    { label: "Option 1", value: "option1" },
    { label: "Option 2", value: "option2" },
    { label: "Option 3", value: "option3" },
  ];

  it("renders correctly with default props", () => {
    const wrapper = mount(SelectButton, {
      props: {
        options,
        modelValue: "option1",
      },
    });
    expect(wrapper.find(".p-selectbutton").exists()).toBe(true);
    expect(wrapper.findAll(".p-button").length).toBe(3);
  });

  it("emits update:modelValue event when an option is selected", async () => {
    const wrapper = mount(SelectButton, {
      props: {
        options,
        modelValue: "option1",
      },
    });

    await wrapper.findAll(".p-button")[1].trigger("click");
    expect(wrapper.emitted("update:modelValue")).toBeTruthy();
    expect(wrapper.emitted("update:modelValue")[0][0]).toBe("option2");
  });

  it("applies the correct size classes based on size prop", () => {
    const wrapper = mount(SelectButton, {
      props: {
        options,
        modelValue: "option1",
        size: "large",
      },
    });

    const ptProp = wrapper.vm.ptProps;
    // We're checking that the ptProps would generate a class string containing the large size
    // The actual class is added by PrimeVue using the pt prop
    expect(
      ptProp.button({ context: { active: true, disabled: false, index: 0 } })
        .class,
    ).toContain("px-5 py-2.5");
  });

  it("applies the correct variant classes based on variant prop", () => {
    const wrapper = mount(SelectButton, {
      props: {
        options,
        modelValue: "option1",
        variant: "primary",
      },
    });

    const ptProp = wrapper.vm.ptProps;
    // Check that active buttons get the primary active style
    expect(
      ptProp.button({ context: { active: true, disabled: false, index: 0 } })
        .class,
    ).toContain("bg-primary text-white");

    // Check that inactive buttons get the primary inactive style
    expect(
      ptProp.button({ context: { active: false, disabled: false, index: 1 } })
        .class,
    ).toContain("bg-white dark:bg-dark-400");
  });

  it("handles multiple selection when multiple prop is true", async () => {
    const wrapper = mount(SelectButton, {
      props: {
        options,
        modelValue: ["option1"],
        multiple: true,
      },
    });

    await wrapper.findAll(".p-button")[1].trigger("click");
    expect(wrapper.emitted("update:modelValue")).toBeTruthy();
    // In a real component, PrimeVue would handle adding to the array
    // but in our mock it just emits the clicked value directly
    expect(wrapper.emitted("update:modelValue")[0][0]).toBe("option2");
  });
});
