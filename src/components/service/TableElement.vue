<template>
  <base-card>
    <div>
      <input class="input-search" v-model="searchValue" placeholder="Search..." />
      <table>
        <thead>
        <tr>
          <th v-for="column in columns" :key="column">{{ column }}</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="(row, rowIndex) in filteredData" :key="rowIndex">
          <td v-for="(value, colIndex) in row" :key="colIndex" @click="toggleRow(rowIndex)">
            {{ value }}
          </td>
        </tr>
        </tbody>
      </table>

      <div class="pagination-control">
        <button class="pagination-control-button" @click="prevPage" :disabled="currentPage <= 0">
          <svg class="pagination-control-button-svg" xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 320 512"><!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l192 192c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L77.3 256 246.6 86.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-192 192z"/></svg>
        </button>
        <p class="pagination-count">{{ currentPage + 1 }} / {{ maxPage + 1 }}</p>
        <button class="pagination-control-button" @click="nextPage" :disabled="currentPage >= maxPage">
          <svg class="pagination-control-button-svg" xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 320 512"><!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M310.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-192 192c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L242.7 256 73.4 86.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l192 192z"/></svg>
        </button>
      </div>
    </div>
  </base-card>
</template>

<script>
import BaseCard from "@/components/ui/BaseCard.vue";

export default {
  components: {BaseCard},
  props: {
    columns: {
      type: Array,
      default: () => [],
    },
    data: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      searchValue: "",
      currentPage: 0,
      itemsPerPage: 10
    };
  },
  computed: {
    filteredDataWithoutSlice() {
      if (!this.searchValue) return this.data;

      const searchTerm = this.searchValue.toLowerCase();
      return this.data.filter((room) =>
          Object.values(room).some((value) =>
              String(value).toLowerCase().includes(searchTerm)
          )
      );
    },
    filteredData() {
      let start = this.currentPage * this.itemsPerPage;
      let end = start + this.itemsPerPage;
      return this.filteredDataWithoutSlice.slice(start, end);
    },
    maxPage() {
      return Math.ceil(this.filteredDataWithoutSlice.length / this.itemsPerPage) - 1;
    }
  },
  methods: {
    nextPage() {
      if (this.currentPage < this.maxPage) {
        this.currentPage++;
      }
    },
    prevPage() {
      if (this.currentPage > 0) {
        this.currentPage--;
      }
    },
    toggleRow(index) {
      const selectedData = this.filteredData[index];
      this.$emit('row-selected', selectedData);
    }
  },
  watch: {
    searchValue() {
      this.currentPage = 0;
    }
  },
};
</script>

<style scoped>
.card {
  margin-left: 100px;
  margin-right: 100px;
  max-width: 100%;
}

table {
  border-collapse: collapse;
  border: 1px solid #e0e0e0;
  width: 100%;
}

th {
  border: 1px solid #e0e0e0;
}

td {
  cursor: pointer;
}

th, td {
  text-align: center;
  width: 20%;
  padding: 15px 22px;
}

thead th {
  background-color: #eaeaea;
  font-weight: bold;
}

tr:nth-child(odd) {
  background-color: #f5f5f5;
}

tr:hover {
  background-color: #e0e0e0;
}

input {
  margin-bottom: 10px;
  padding: 8px;
  border: 1px solid #e0e0e0;
  border-radius: 4px;
}

button {
  background-color: #e0e0e0;
  padding: 5px 10px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button:hover {
  background-color: #d0d0d0;
}

.pagination-control {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  margin-top: 10px;
}

.pagination-control-button {
  background-color: white;
  border: 2px solid #e0e0e0;
  padding: 5px 7px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.pagination-control-button-svg {
  fill: #656565;
  height: 13px;
}

.pagination-count {
  margin-right: 5px;
  margin-left: 5px;
}

.input-search {
  outline: none;
}

.input-search:hover {
  border-color: #c4c4c4;
}

.input-search:focus {
  border-color: #c4c4c4;
}

@media (max-width: 1000px) {
  .card {
    margin-left: 20px;
    margin-right: 20px;
  }

  .pagination-control {
    justify-content: center;
  }
}
</style>
