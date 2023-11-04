<template>
  <div>
    <base-card>
      <h1>Menu for day</h1>
      <div class="time-row">
        <p class="time-text">Date: </p>
        <base-date-select-box
            class="select-box"
            label="Date"
            :max-date="maxDate"
            :min-date="minDate"
            :time-picker="false"
            @selected="dateFromSelected"
            @cleared="reservationsDateFromCleared"
        ></base-date-select-box>
      </div>

      <base-button :disabled="isSearchButtonDisabled" @click="menuSearchHandle" mode="color-two">
        <div>
          <base-button-spinner :isLoading="!!isMenuSearchLoading"></base-button-spinner>
        </div>
        <span class="transition-off" v-if="!isMenuSearchLoading">Search</span>
      </base-button>

      <base-button class="button-add" :disabled="isSearchButtonDisabled || isButtonDisabled" @click="addMenuHandle">Add dish to the menu</base-button>
      <p v-if="menuSearchError" class="error">{{ menuSearchError }}</p>
      <p v-if="isMenuAddError" class="error">{{ isMenuAddError }}</p>
    </base-card>

    <TableElement @row-selected="handleTodayMenuSelected" :columns="['ID', 'NAME', 'MENU']" :data="menu"></TableElement>

    <base-dialog :show="deleteMenuDialog" @close="closeDeleteMenuDialog" title="Delete dish from the menu">
      <p class="dialog-text">Do you want to delete this dish from this date menu?</p>
      <template v-slot:actions>
        <BaseButton class="action-button" @click="closeDeleteMenuDialog" mode="color-two">Back</BaseButton>
        <BaseButton @click="deleteMenuHandle" :disabled="isButtonDisabled">
          <div>
            <base-button-spinner :isLoading="!!isMenuDeleteLoading"></base-button-spinner>
          </div>
          <span class="transition-off" v-if="!isMenuDeleteLoading">Delete</span>
        </BaseButton>
      </template>
    </base-dialog>

    <base-dialog :show="addMenuDialog" @close="closeAddMenuDialog" title="Add dish to the menu">
      <p class="dialog-text">Select dish from the list below:</p>

      <base-spinner v-if="isAllDishesLoading"></base-spinner>
      <p v-else-if="allDishesError" class="error">{{ allDishesError }}</p>
      <div v-else>
        <base-select-box
            class="select-box"
            label="Select Dish"
            :options="getAllDishes.map(dish => dish.name)"
            @selected="dishToAddSelected"
        ></base-select-box>

        <base-select-box
            class="select-box"
            label="Select Menu Type"
            :options="['BREAKFAST', 'LUNCH', 'DINNER']"
            @selected="menuTypeToAddSelected"
        ></base-select-box>
      </div>

      <template v-slot:actions>
        <BaseButton class="action-button" @click="closeAddMenuDialog" mode="color-two">Back</BaseButton>
        <BaseButton @click="addDishHandle" :disabled="isAddButtonDisabled">
          <div>
            <base-button-spinner :isLoading="!!isMenuAddLoading"></base-button-spinner>
          </div>
          <span class="transition-off" v-if="!isMenuAddLoading">Add</span>
        </BaseButton>
      </template>
    </base-dialog>

    <base-card>
      <h1>All dishes</h1>
      <base-button class="add-dish-button" :disabled="isButtonDisabled" @click="addNewDishHandle">Add new dish to the database</base-button>
      <p v-if="menuSearchError" class="error">{{ addDishError }}</p>
      <p v-if="deleteDishError" class="error">{{ deleteDishError }}</p>
      <p v-if="updateDishError" class="error">{{ updateDishError }}</p>
    </base-card>
    <TableElement @row-selected="handleDishSelected" :columns="['ID', 'NAME']" :data="getAllDishes.map(dish => ({ id: dish.id, name: dish.name }))"></TableElement>

    <base-dialog :show="dishAddDialog" @close="closeDishAddDialog" title="Add new dish">
      <base-input class="input-fields" name="newDish" v-model="newDishName" placeholder="Name"></base-input>
      <base-input class="input-fields" name="newDish" v-model="newDishDescription" placeholder="Description"></base-input>
      <base-input name="newDish" v-model="newDishPhoto" placeholder="Photo link"></base-input>

      <template v-slot:actions>
        <BaseButton class="action-button" @click="closeDishAddDialog" mode="color-two">Back</BaseButton>
        <BaseButton @click="addDishDishHandle" :disabled="isAddDishButtonDisabled || isButtonDisabled">
          <div>
            <base-button-spinner :isLoading="!!isAddDishLoading"></base-button-spinner>
          </div>
          <span class="transition-off" v-if="!isAddDishLoading">Add</span>
        </BaseButton>
      </template>
    </base-dialog>

    <base-dialog :show="dishEditDialog" @close="closeDishEditDialog" title="Edit or delete dish">

      <base-input class="input-fields" name="editDishName" v-model="editDishName" placeholder="Name"></base-input>
      <base-input class="input-fields" name="editDishDescription" v-model="editDishDescription" placeholder="Description"></base-input>
      <base-input name="editDishPhoto" v-model="editDishPhoto" placeholder="Photo link"></base-input>

      <template v-slot:actions>
        <BaseButton class="action-button" @click="closeDishEditDialog" mode="color-two">Back</BaseButton>
        <BaseButton class="action-button" @click="deleteDishHandle" :disabled="isButtonDisabled">
          <div>
            <base-button-spinner :isLoading="!!isDishDeleteLoading"></base-button-spinner>
          </div>
          <span class="transition-off" v-if="!isDishDeleteLoading">Delete dish</span>
        </BaseButton>
        <BaseButton @click="updateDishHandle" :disabled="isEditDishButtonDisabled || isButtonDisabled">
          <div>
            <base-button-spinner :isLoading="!!isUpdateDishLoading"></base-button-spinner>
          </div>
          <span class="transition-off" v-if="!isUpdateDishLoading">Save changes</span>
        </BaseButton>
      </template>
    </base-dialog>

  </div>
</template>

<script>

import {defineComponent} from "vue";
import BaseButton from "@/components/ui/BaseButton.vue";
import BaseCard from "@/components/ui/BaseCard.vue";
import BaseButtonSpinner from "@/components/ui/BaseButtonSpinner.vue";
import TableElement from "@/components/service/TableElement.vue";
import BaseDialog from "@/components/ui/BaseDialog.vue";
import BaseSelectBox from "@/components/ui/BaseSelectBox.vue";
import BaseSpinner from "@/components/ui/BaseSpinner.vue";
import BaseInput from "@/components/ui/BaseInput.vue";

export default defineComponent({
  components: {BaseInput, BaseSpinner, BaseSelectBox, BaseDialog, TableElement, BaseButtonSpinner, BaseCard, BaseButton},
  data() {
    return {
      maxDate: 90,
      minDate: 0,
      dateFormatted: null,
      isButtonDisabled: false,
      deleteMenuDialog: false,
      menuElementToDelete: null,
      addMenuDialog: false,
      selectedAddValue: null,
      selectedMenuType: null,
      dishAddDialog: false,
      dishEditDialog: false,
      newDishName: null,
      newDishDescription: null,
      newDishPhoto: null,
      editDishId: null,
      editDishName: null,
      editDishDescription: null,
      editDishPhoto: null,
    }
  },
  methods: {
    dateFromSelected(date) {
      this.dateFormatted = this.fetchFormattedDate(date);
    },
    reservationsDateFromCleared() {
      this.dateFormatted = null;
    },
    async menuSearchHandle() {
      if (!this.dateFormatted) return;
      this.isButtonDisabled = true;
      await this.$store.dispatch('menu/fetchMenuForDay', this.dateFormatted);
      this.isButtonDisabled = false;
    },
    handleTodayMenuSelected(menuElement) {
      this.menuElementToDelete = menuElement;
      this.deleteMenuDialog = !this.deleteMenuDialog;
    },
    addMenuHandle() {
      this.addMenuDialog = !this.addMenuDialog;
      this.selectedAddValue = null;
      this.selectedMenuType = null;
      this.isButtonDisabled = true;
    },
    addNewDishHandle() {
      this.dishAddDialog = !this.dishAddDialog;
    },
    closeDishAddDialog() {
      this.dishAddDialog = false;
    },
    fetchFormattedDate(timestamp) {
      // Getting the date in the format "yyyy-MM-dd"
      const dateObj = new Date(timestamp);
      return `${dateObj.getFullYear()}-${String(dateObj.getMonth() + 1).padStart(2, '0')}-${String(dateObj.getDate()).padStart(2, '0')}`;
    },
    async fetchAllDishes() {
      await this.$store.dispatch('menu/fetchAllDishes');
    },
    closeDeleteMenuDialog() {
      this.deleteMenuDialog = false;
    },
    closeAddMenuDialog() {
      this.addMenuDialog = false;
      this.isButtonDisabled = false;
    },
    closeDishEditDialog() {
      this.dishEditDialog = false;
    },
    async deleteMenuHandle() {
      this.isButtonDisabled = true;
      await this.$store.dispatch('menu/deleteElementFromMenu',
          {
            date: this.dateFormatted,
            id: this.menuElementToDelete.id,
            type: this.menuElementToDelete.menuType
          });
      await this.menuSearchHandle();
      this.deleteMenuDialog = false;
      this.isButtonDisabled = false;
    },
    async addDishHandle() {
      this.isButtonDisabled = true;
      await this.$store.dispatch('menu/addElementToMenu',
          {
            id: this.getAllDishes.find(dish => dish.name === this.selectedAddValue).id,
            date: this.dateFormatted,
            menuTypeName: this.selectedMenuType
          });
      this.isButtonDisabled = false;
      this.addMenuDialog = false;
      await this.menuSearchHandle();
    },
    async addDishDishHandle() {
      this.isButtonDisabled = true;
      await this.$store.dispatch('menu/addDish',
          {
            name: this.newDishName,
            description: this.newDishDescription,
            photoDirectory: this.newDishPhoto
          });
      await this.fetchAllDishes();
      this.dishAddDialog = false;
      this.isButtonDisabled = false;
    },
    dishToAddSelected(option) {
      this.selectedAddValue = option;
    },
    menuTypeToAddSelected(option) {
      this.selectedMenuType = option;
    },
    handleDishSelected(dish) {
      this.editDishId = dish.id;
      this.editDishName = dish.name;
      this.editDishDescription = this.getAllDishes.find(d => d.id === dish.id).description;
      this.editDishPhoto = this.getAllDishes.find(d => d.id === dish.id).photoDirectory;
      this.dishEditDialog = true;
    },
    async deleteDishHandle() {
      this.isButtonDisabled = true;
      await this.$store.dispatch('menu/deleteDish', this.editDishId);
      await this.fetchAllDishes();
      this.dishEditDialog = false;
      this.isButtonDisabled = false;
    },
    async updateDishHandle() {
      this.isButtonDisabled = true;
      await this.$store.dispatch('menu/updateDish',
          {
            id: this.editDishId,
            name: this.editDishName,
            description: this.editDishDescription,
            photoDirectory: this.editDishPhoto
          });
      await this.fetchAllDishes();
      this.dishEditDialog = false;
      this.isButtonDisabled = false;
    }
  },
  computed: {
    menu() {
      return this.$store.getters['menu/getMenuForDay'];
    },
    isMenuSearchLoading() {
      return this.$store.getters['menu/isMenuForDayLoading'];
    },
    menuSearchError() {
      return this.$store.getters['menu/menuForDayError'];
    },
    isMenuDeleteLoading() {
      return this.$store.getters['menu/isDeleteElementFromMenuLoading'];
    },
    isSearchButtonDisabled() {
      return !this.dateFormatted;
    },
    getAllDishes() {
      return this.$store.getters['menu/getAllDishes'];
    },
    isAllDishesLoading() {
      return this.$store.getters['menu/isAllDishesLoading'];
    },
    allDishesError() {
      return this.$store.getters['menu/allDishesError'];
    },
    isAddButtonDisabled() {
      return !this.selectedAddValue || !this.selectedMenuType;
    },
    isMenuAddLoading() {
      return this.$store.getters['menu/isAddElementToMenuLoading'];
    },
    isMenuAddError() {
      return this.$store.getters['menu/addElementToMenuError'];
    },
    isAddDishLoading() {
      return this.$store.getters['menu/isAddDishLoading'];
    },
    addDishError() {
      return this.$store.getters['menu/addDishError'];
    },
    isAddDishButtonDisabled() {
      return !this.newDishName || !this.newDishDescription || !this.newDishPhoto;
    },
    isEditDishButtonDisabled() {
      return !this.editDishName || !this.editDishDescription || !this.editDishPhoto;
    },
    isDishDeleteLoading() {
      return this.$store.getters['menu/isDeleteDishLoading'];
    },
    isUpdateDishLoading() {
      return this.$store.getters['menu/isUpdateDishLoading'];
    },
    deleteDishError() {
      return this.$store.getters['menu/deleteDishError'];
    },
    updateDishError() {
      return this.$store.getters['menu/updateDishError'];
    },
  },
  created() {
    this.fetchAllDishes();
  }
})
</script>

<style scoped>
h1 {
  font-weight: 500;
}

.select-box {
  margin-bottom: 15px;
  margin-top: 15px;
}

.time-row {
  display: flex;
  align-items: center;
}

.time-text {
  font-size: 18px;
  margin-right: 15px;
}

.error {
  color: red;
  margin-bottom: 10px;
  margin-top: 10px;
}

.button-add {
  margin-left: 5px;
}

.dialog-text {
  font-weight: 500;
  margin-left: 10px;
  margin-bottom: 5px;
}

.action-button {
  margin-right: 5px;
}

.add-dish-button {
  margin-top: 10px;
}

.input-fields {
  margin-bottom: 5px;
}

@media (max-width: 1000px) {
  .card {
    margin-left: 20px;
    margin-right: 20px;
  }

  h1 {
    font-size: 21px;
  }

  .time-text {
    font-size: 15px;
  }

  .button-add {
    margin-left: 0;
    margin-top: 5px;
  }
}
</style>