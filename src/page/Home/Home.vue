<template>
  <div class="home-wrap">
    <!--start 头部四个信息-->
    <div class="dis-fl ju-sb pb30 info-wrap">
      <div class="dis-fl bs bkFFFFFF info-area">
        <img class="first-img" src="../../assets/img/home/shijian.png"/>
        <div class="time-ip-wrap">
          <div class="fs14 time">上次登录时间：2019-10-22 15:41</div>
          <div class="fs14">上次登录IP：172.10.20.39</div>
        </div>
      </div>
      <div @click="jumpPath('/robot')" class="dis-fl bs bkFFFFFF cuso info-area">
        <img src="../../assets/img/home/robotAcon.png"/>
        <div class="time-ip-wrap">
          <div class="fs24">1234</div>
          <div class="fs14 text cl9696AE">机器人总数</div>
        </div>
      </div>
      <div @click="jumpPath('/earningsOverview')" class="dis-fl bs bkFFFFFF cuso info-area">
        <img src="../../assets/img/home/shuliang.png"/>
        <div class="time-ip-wrap">
          <div class="fs24">1,000USDT</div>
          <div class="fs14 text cl9696AE">价值总和约</div>
        </div>
      </div>
      <div @click="jumpPath('/robot')" class="dis-fl bs bkFFFFFF cuso info-area">
        <img src="../../assets/img/home/yunxing.png"/>
        <div class="dis-fl ju-sb info-box time-ip-wrap">
          <div>
            <div class="fs24">11,045</div>
            <div class="fs14 text cl9696AE">运行中</div>
          </div>
          <div>
            <div class="fs24">1,023</div>
            <div class="fs14 text cl9696AE">暂停中</div>
          </div>
          <div>
            <div class="fs24">814</div>
            <div class="fs14 text cl9696AE">异常</div>
          </div>
        </div>
      </div>
    </div>
    <!--end 头部四个信息-->

    <!--start 收益图表-->
    <div class="br4 mb30 bkFFFFFF chart-wrap" id="earningsChart"></div>
    <!--start 收益图表-->

    <!--start 两个表格-->
    <div class="dis-fl ju-sb table-wrap">
      <div class="bkFFFFFF p30 bs br4 table-box">
        <div class="fw pb10 title">预计平仓</div>
        <el-table
          :data="tableData"
          style="width: 100%">
          <el-table-column
            label="序号"
            type="index"
            width="50"
            align="center">
          </el-table-column>

          <el-table-column
            prop="date"
            label="机器人">
          </el-table-column>
          <el-table-column
            prop="name"
            label="币对">
          </el-table-column>
          <el-table-column
            prop="address"
            label="类型">
          </el-table-column>
          <el-table-column
            prop="address"
            label="当前收益率">
          </el-table-column>
          <el-table-column
            prop="address"
            label="仓位">
          </el-table-column>
          <el-table-column
            prop="address"
            label="目标率">
          </el-table-column>
        </el-table>
      </div>
      <div class="bkFFFFFF p30 bs br4 table-box">
        <div class="fw title">预计补仓</div>
        <el-table
          :data="tableData"
          style="width: 100%">
          <el-table-column
            label="序号"
            type="index"
            width="50"
            align="center">
          </el-table-column>

          <el-table-column
            prop="date"
            label="机器人">
          </el-table-column>
          <el-table-column
            prop="name"
            label="币对">
          </el-table-column>
          <el-table-column
            prop="address"
            label="类型">
          </el-table-column>
          <el-table-column
            prop="address"
            label="当前收益率">
          </el-table-column>
          <el-table-column
            prop="address"
            label="仓位">
          </el-table-column>
          <el-table-column
            prop="address"
            label="目标率">
          </el-table-column>
        </el-table>
      </div>
    </div>
    <!--start 两个表格-->
  </div>
</template>

<script>
  import echarts from 'echarts';
  export default {
    name: "Home",
    data(){
      return {
        tableData: [
          {
            date: '2016-05-02',
            name: '王小虎',
            address: '上海市'
          }, {
            date: '2016-05-04',
            name: '王小虎',
            address: '上海市'
          }, {
            date: '2016-05-01',
            name: '王小虎',
            address: '上海市'
          }, {
            date: '2016-05-03',
            name: '王小虎',
            address: '上海市'
          }
        ]
      }
    },
    computed: {},
    created(){
    },
    mounted(){
      this.$nextTick(() => {
        this.chartConf();
      })
    },
    methods: {

      //配置收益曲线图表
      chartConf(){
        this.charts = echarts.init(document.getElementById('earningsChart'));
        let option = {
          title: {
            text: '近30天收益曲线',
            x: '30',
            y: '20',
            textStyle: {
              color: '#333333',
              fontWeight: '700',
              fontSize: 16
            }
          },
          tooltip: {
            trigger: 'axis'
          },
          legend: {
            x: 'center',
            y: '10',
            icon: 'circle',
            itemGap: 40,
            itemWidth: 8,
            data: ['BTC', 'USDT'],
            textStyle: {
              color: '#B2B2B2',
              padding: [3,1,1,1]
            }
          },
          grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
          },
          xAxis: {
            type: 'category',
            boundaryGap: false,
            axisLine: {
              lineStyle: {
                color: '#bababa'
              }
            },

            data: ['0101', '0201', '0301', '0401', '0501', '0601', '0701']
          },
          yAxis: {
            type: 'value',
            axisTick: {
              show: false
            },
            axisLabel: {
              show: false
            },
            axisLine: {
              show: false
            },
            splitLine: {
              show: false
            },
          },
          series: [
            {
              name: 'BTC',
              type: 'line',
              smooth: true,
              data: [120, 132, 101, 134, 90, 230, 210]
            },
            {
              name: 'USDT',
              type: 'line',
              smooth: true,
              data: [220, 182, 191, 234, 290, 330, 310]
            }

          ],
          color: ['#365CD9', '#FF2E2E', '#6B48FF', '#FFD058', '#43C1EA', '#12E58E'],
        };
        this.charts.setOption(option);
      },

      //点击跳转
      jumpPath(url){
        this.$router.push(url);
      }

    },
    props: {},
    watch: {},
    mixins: [],
    filters: {},
    components: {},
  }
</script>

<style scoped lang="scss">

  .home-wrap{
    & > .info-wrap{
      .info-area{
        width: 344px;
        height: 120px;
        background: rgba(255, 255, 255, 1);
        border-radius: 4px;
        padding: 30px;

        img{
          margin-top: 5px;
          height: 50px;
        }

        .first-img{
          height: 56px !important;
        }

        .time-ip-wrap{
          padding-left: 24px;

          .time{
            padding-bottom: 18px;
          }

          .text{
            padding-top: 5px;
          }
        }

        .info-box{
          width: 410px;
        }
      }

      .info-area:last-child{
        width: 536px;
      }
    }

    & > .chart-wrap{
      height: 410px;
    }

    & > .table-wrap{
      .table-box{
        width: 807px;
      }

      /deep/ .el-table{
        tr{
          border-radius: 10px;
        }

        td, th{
          border-bottom: none !important;
          padding: 5px 0 !important;
        }

        td > div{
          transition: background-color .2s;
          background-color: rgba(245, 246, 250, 1);
          padding: 3px;
        }

        th > div{
          color: #BFBFBF;
        }

        &::before{
          background-color: transparent !important;
        }

        .el-table__body tr:hover > td > div{
          background-color: #4B81E2 !important;
          color: #ffffff;
        }

      }

    }
  }

</style>
