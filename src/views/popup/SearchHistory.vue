<template>
  <div class="search-history-layout">
    <ul class="history-list">
      <li
        class="history-list-item"
        v-for="(item, index) of searchHistory"
        :key="item.timestamp"
        @mouseover="current = index"
        @mouseleave="current = null"
        @click="openSearchPage(item)"
      >
        <span class="search-text">
          <img :src="searchEngines[item.engineId]?.icon" :key="item.engineId" />
          {{ item.searchText }}
        </span>

        <a-button
          v-if="current === index"
          type="text"
          size="small"
          @click.stop="deleteHistory(index)"
        >
          <close-outlined />
        </a-button>
        <span v-else class="time-text">
          {{ timediff(item.timestamp, now) }}
        </span>
      </li>
    </ul>
  </div>
</template>

<script lang="ts" setup>
import { computed, onBeforeMount, ref } from "vue"
import { CloseOutlined } from "@ant-design/icons-vue"
import { HistoryItem, OpenPageTarget, SearchData } from "@/types"
import { timediff } from "@/utils/format"
import { useStore } from "@/store"
import { SearchActions, SearchMutations } from "@/store/search"

// Vuex
const store = useStore()
const searchHistory = computed(() => store.state.search.history),
  searchEngines = computed(() => store.state.search.searchEngines)

const current = ref()
const now = Date.now()

function openSearchPage(history: HistoryItem) {
  store.dispatch(SearchActions.openSearchPage, <SearchData>{
    engine: history.engineId,
    text: history.searchText,
    target: OpenPageTarget.Blank
  })
}

function deleteHistory(index: number) {
  store.commit(SearchMutations.deleteHistory, index)
}

function loadHistory() {
  store.commit(SearchMutations.loadHistory)
}

onBeforeMount(loadHistory)
</script>

<style lang="less">
.search-history-layout {
  .ant-divider {
    margin: 2px 0;
  }

  .history-list {
    padding: 0 4px;
    list-style: none;
  }

  .history-list-item {
    display: flex;
    align-items: center;
    justify-content: space-between;

    height: 32px;
    line-height: 32px;
    padding: 0 8px;

    &:hover {
      background-color: #eee;
      border-radius: 4px;
      cursor: pointer;
    }

    .search-text {
      display: inline-block;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      max-width: 220px;

      img {
        height: 16px;
        width: 16px;
        object-fit: contain;
        margin-right: 8px;
      }
    }

    .time-text {
      font-size: 12px;
      color: #888;
    }
  }
}
</style>
