<template>
    <div>
      <nav-header></nav-header>
      <nav-bread>
          <span slot="bread">Goods</span>
      </nav-bread>
      
      <div class="accessory-result-page accessory-page">
        <div class="container">
          <div class="filter-nav">
            <span class="sortby">Sort by:</span>
            <a href="javascript:void(0)" class="default cur">Default</a>
            <a href="javascript:void(0)" class="price" @click="sortGoods">Price <svg class="icon icon-arrow-short"><use xlink:href="#icon-arrow-short"></use></svg></a>
            <a href="javascript:void(0)" class="filterby stopPop" @click="showFilterPop">Filter by</a>
          </div>
          <div class="accessory-result">
            <!-- filter -->
            <div class="filter stopPop" id="filter" v-bind:class="{'filterby-show': filterBy }">
              <dl class="filter-price">
                <dt>Price:</dt>
                <dd>
                    <a href="javascript:void(0)" @click="setPriceFilter('all')" v-bind:class="{'cur': priceChecked == 'all'}">All</a
                ></dd>
                <dd v-for="(price, index) in priceFilter" :key="index" >
                  <a href="javascript:void(0)" @click="setPriceFilter(index)" v-bind:class="{'cur': priceChecked == index}">{{price.startPrice}} - {{price.endPrice}} </a>
                </dd>
              </dl>
            </div>

            <!-- search result accessories list -->
            <div class="accessory-list-wrap">
              <div class="accessory-list col-4">
                <ul>
                  <li v-for="(item, index) in goodsList" :key="index">
                    <div class="pic">
                      <a href="#"><img v-lazy=" 'static/' + item.productImage" alt=""></a>
                    </div>
                    <div class="main">
                      <div class="name">{{item.productName}}</div>
                      <div class="price">{{item.salePrice}}</div>
                      <div class="btn-area">
                        <a href="javascript:;" class="btn btn--m" @click="addCart(item.productId)">加入购物车</a>
                      </div>
                    </div>
                  </li>
                </ul>

                <!-- 加载中...v-infinite-scroll插件 和 loading -->
                <div v-infinite-scroll="loadMore" infinite-scroll-disabled="busy" infinite-scroll-distance="20">
                    <img src="../../static/loading-svg/loading-spinning-bubbles.svg" v-show="loading" alt="">
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="md-overlay" v-show="overLayFlag" @click="closePop"></div>
      <nav-footer></nav-footer>
    </div>
</template>
<script>
    import './../assets/css/base.css'
    import './../assets/css/product.css'
    import NavHeader from '@/components/NavHeader.vue'
    import NavFooter from '@/components/NavFooter.vue'
    import NavBread from '@/components/NavBread.vue'
    import axios from 'axios'
    export default {
        data() {
            return {
                goodsList: [],
                priceFilter: [
                    {
                        startPrice: "0.00",
                        endPrice: "500.00"
                    },
                    {
                        startPrice: "500.00",
                        endPrice: "1000.00"
                    },
                    {
                        startPrice: "1000.00",
                        endPrice: "1500.00"
                    },
                    {
                        startPrice: "1500.00",
                        endPrice: "2000.00"
                    }
                ],
                priceChecked: 'all',
                filterBy: false,
                overLayFlag: false,
                sortFlag: true,
                page: 1,
                pageSize: 8,
                busy: true,
                loading: false
            }
        },
        components: {
            NavHeader,
            NavFooter,
            NavBread
        },
        mounted: function() {
            this.getGoodsList();
        },
        methods: {
            getGoodsList(flag) {
                let param = {
                    page :this.page,
                    pageSize :this.pageSize,
                    sort :this.sortFlag? 1 : -1,
                    priceLevel: this.priceChecked
                }
                this.loading = true;
                axios.get('./goods', {params: param}).then((result) => {
                    let res = result.data;
                    if (res.status && res.status == "0") {
                        if (flag) {
                            this.goodsList = this.goodsList.concat(res.result.list); 
                        } else {
                            this.goodsList = res.result.list; 
                        }
                        res.result.count < 8 ? this.busy = true : this.busy = false;
                    } else {
                        this.goodsList = [];
                        console.log("接口数据错误");
                    }
                    this.loading = false;
                })
            },
            sortGoods() {
                this.sortFlag = !this.sortFlag;
                this.page = 1;
                this.getGoodsList();
            },
            showFilterPop() {
                this.filterBy = true;
                this.overLayFlag = true;
            },
            closePop() {
                this.filterBy = false;
                this.overLayFlag = false;
            },

            // 价格过滤
            setPriceFilter(index) {
                this.priceChecked = index;
                this.page = 1;
                this.closePop();
                this.goodsList = [];
                this.getGoodsList(true);
            },

            // 分页插件api方法
            loadMore: function() {
                this.busy = true;
                setTimeout(() => {
                    this.page++;
                    this.getGoodsList(true);
                }, 500);
            },

            // 加入购物车
            addCart: function(productId) {
                axios.post("/goods/addCart", {productId: productId}).then((result) => {
                    let res = result.data;
                    if (res.status == "0"){
                        alert(`加入成功！`);
                    } else {
                        alert(`msg:${res.msg}`);
                    }
                })
            }
        }
    }
</script>
