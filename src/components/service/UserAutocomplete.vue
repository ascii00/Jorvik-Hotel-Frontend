<template>
  <div>
    <p v-if="error">{{ error }}</p>
    <div v-else class="autocomplete">
      <input
          v-model="searchQuery"
          @input="onInput"
          @blur="onBlur"
          placeholder="Type to search..."
      />
      <div v-if="results.length" class="dropdown">
        <div
            v-for="result in results"
            :key="result.id"
            class="dropdown-item"
            @click="selectItem(result)"
        >
          {{ result.firstName }} {{ result.lastName }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import debounce from 'lodash.debounce';

export default {
  data() {
    return {
      searchQuery: '',
      results: [],
    };
  },
  created() {
    this.debouncedSearch = debounce(this.search, 500);
  },
  methods: {
    onInput() {
      this.debouncedSearch();
    },
    async search() {
      if (this.searchQuery.trim() === '') {return}
      await this.$store.dispatch('user/fetchUserByName', this.searchQuery);
      this.results = this.items.filter(item => {
        const fullName = `${item.firstName} ${item.lastName}`.toLowerCase();
        return fullName.includes(this.searchQuery.toLowerCase());
      });
    },
    onBlur() {
      setTimeout(() => {
        this.results = [];
      }, 100);
    },
    selectItem(item) {
      this.searchQuery = item.firstName + ' ' + item.lastName;
      this.results = [];
      this.$emit('user-selected', item);
    }
  },
  computed: {
    items() {
      return this.$store.getters['user/usersByName'];
    },
    error() {
      return this.$store.getters['user/errorUserByName'];
    }
  }
};
</script>

<style scoped>

input {
  width: 100%;
  margin-bottom: 10px;
  padding: 8px;
  border: 1px solid #e0e0e0;
  border-radius: 4px;
  outline: none;
}

input:hover {
  border-color: #c4c4c4;
}

input:focus {
  border-color: #c4c4c4;
}

.autocomplete {
  position: relative;
}

.dropdown {
  border-radius: 4px;
  position: absolute;
  width: 100%;
  max-height: 200px;
  overflow-y: auto;
  border: 1px solid #ccc;
  background-color: #fff;
  z-index: 10;
}

.dropdown-item {
  padding: 10px;
  cursor: pointer;
}

.dropdown-item:hover {
  background-color: #e6e6e6;
}
</style>