<template>

  <BaseButton class="action-button" @click="closeEmailEditDialog" mode="color-two">Cancel</BaseButton>
  <BaseDialog :show="showEmailEditDialog" @close="closeEmailEditDialog" title="Edit email">
    <p>Enter your new email address</p>
    <template v-slot:actions>
      <BaseButton class="action-button" @click="closeEmailEditDialog" mode="color-two">Cancel</BaseButton>
      <BaseButton @click="editEmail">Edit</BaseButton>
    </template>
  </BaseDialog>

</template>

<script>

import {defineComponent} from "vue";
import BaseDialog from "@/components/ui/BaseDialog.vue";
import BaseButton from "@/components/ui/BaseButton.vue";

export default defineComponent({
  components: {BaseButton, BaseDialog},
  data() {
    return {
      showEmailEditDialog: true,
    }
  },
  methods: {
    editEmailDialogOpen() {
      this.showEmailEditDialog = true;
    },
    closeEmailEditDialog() {
      this.showEmailEditDialog = false;
    },
    editEmail() {
      this.closeEmailEditDialog();
    }
  }
})
</script>