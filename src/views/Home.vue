<template>
  <div class="w-screen mt-12 px-12">    
    <div class="flex flex-col">

      <div class="flex flex-row">
      <input type="text" placeholder="Tags" v-model="tagged" class="placeholder-indigo-500 w-48 ml-8 bg-white focus:outline-none focus:shadow-outline rounded border py-2 px-2 block relative leading-tight" />
      <input type="date" placeholder="Fromdate" v-model="fromdate" class="placeholder-indigo-500 w-48 ml-8 bg-white focus:outline-none focus:shadow-outline rounded border py-2 px-2 block relative leading-tight" />
      <input type="date" placeholder="Todate" v-model="todate" class="placeholder-indigo-500 w-48 ml-8 bg-white focus:outline-none focus:shadow-outline rounded border py-2 px-2 block relative leading-tight" />
      <select  placeholder="Sort" v-model="sort" class="placeholder-indigo-500 w-48 ml-8 bg-white focus:outline-none focus:shadow-outline rounded border py-2 px-2 block relative leading-tight" >
        <option disabled value="">Please select one</option>
        <option>activity</option>
        <option>votes</option>
        <option>hot</option>
        <option>creation</option>
        <option>week</option>
        <option>month</option>        
      </select>
      <select  placeholder="Order" v-model="order" class="placeholder-indigo-500 w-48 ml-8 bg-white focus:outline-none focus:shadow-outline rounded border py-2 px-2 block relative leading-tight" >
        <option disabled value="">Please select one</option>
        <option>asc</option>
        <option>desc</option>        
      </select>
    </div>
    <div class="flex flex-row py-3">
      <input type="date" placeholder="Min" v-model="mindate" class="placeholder-indigo-500 w-48 ml-8 bg-white focus:outline-none focus:shadow-outline rounded border py-2 px-2 block relative leading-tight" />
      <input type="date" placeholder="Max" v-model="maxdate" class="placeholder-indigo-500 w-48 ml-8 bg-white focus:outline-none focus:shadow-outline rounded border py-2 px-2 block relative leading-tight" />
      <input type="number" placeholder="Page" v-model.number="page" class="placeholder-indigo-500 w-48 ml-8 bg-white focus:outline-none focus:shadow-outline rounded border py-2 px-2 block relative leading-tight" />
      <input type="number" placeholder="PageSize" v-model.number="pagesize" class="placeholder-indigo-500 w-48 ml-8 bg-white focus:outline-none focus:shadow-outline rounded border py-2 px-2 block relative leading-tight" />
      <button class="ml-4 bg-indigo-500 text-white hover:bg-indigo-600 rounded block px-12 py-1 leading-tight" v-on:click="getStackoverflow()">Search</button>

    </div>  

    </div>
     <v-table 
     :data="result"
     :currentPage.sync=page
     :pageSize=10
     @totalPagesChanged="totalPages = $event"
     class="table-auto"
    >
        <thead slot="head">
            <th>Title</th>
            <th>Tags</th>
            <th>Link</th>
            <th>ID</th>
        </thead>
        <tbody slot="body" slot-scope="{displayData}">
            <tr v-for="row in displayData" :key="row.question_id">
              <td>{{ row.title }}</td>
              <td>{{ row.tags }}</td>
              <td>{{ row.link }}</td>
              <td>{{ row.question_id }}</td>
              <!-- <td>
                  {{ row.address.street }}, 
                  {{ row.address.city }} 
                  {{ row.address.state}}
              </td> -->
            </tr>
        </tbody>
  </v-table>
  <smart-pagination
        :currentPage.sync=page
        :totalPages="3"
      />

<!--     
    <vuetable ref="vuetable"
    :api-mode="false"
    :fields="['title', 'tags', 'link', 'question_id']"
    :data="result"  
    :css="css.table"
    :per-page=3
    pagination-path=""
    @vuetable:pagination-data="onPaginationData"
  ></vuetable>
  <div style="margin-top:10px">
    <vuetable-pagination ref="pagination"
      :css="css.pagination"
      class="pull-right"
      @vuetable-pagination:change-page="onChangePage"
    ></vuetable-pagination>
  </div> -->

  </div>
</template>

<script>
// @ is an alias to /src
import {HTTP} from '../axios-common';
// import CssConfig from "../VuetableBootstrap4Config.js";
// import VuetablePagination from "../components/VuetablePaginationBootstrap4.vue";
// import Vuetable from 'vuetable-2'
// import CssForBootstrap4 from './VuetableCssBootstrap4.js'

export default {
  name: 'Home',
  data() {
    return {
      result: [],
      tagged:"" ,
      sort:"",
      order:"",
      page:1,
      pagesize:10,
      mindate:'2021-03-20',
      maxdate:'2021-03-20',
      fromdate:'2021-03-20',
      todate:'2021-03-20',
      // css: CssConfig,
    }
  },
  components: {
    // Vuetable, 
    // VuetablePagination
    // VuetablePaginationMixin,   
  },
  methods:{
    getStackoverflow(){
      HTTP.get(`v1/api/questions?sort=${this.sort}&order=${this.order}&page=${this.page}&pagesize=${this.pagesize}&fromdate=${this.fromdate}&todate=${this.todate}&mindate=${this.mindate}&maxdate=${this.maxdate}&tagged=${this.tagged}`)
      .then(response => {
        console.log(response)
        this.result = response.data["items"]

      })
    },

    onPaginationData (paginationData) {
      this.$refs.pagination.setPaginationData(paginationData)
    },

    onChangePage (page) {
      this.$refs.vuetable.changePage(page)
    }
  },
  created() {
    this.getStackoverflow()
  },
  
}
</script>
