<template>
  <div class="home-wrap">
    <!--start 头部四个信息-->
    <div class="dis-fl ju-sb pb30 info-wrap">
      <div class="dis-fl bs bkFFFFFF info-area">
        <img class="first-img" src="../../assets/img/home/shijian.png"/>
        <div class="time-ip-wrap">
          <div class="fs14 time">上次登录：{{login_record_created_at}}</div>
          <div class="fs14">上次登录IP：{{login_record_ip}}</div>
        </div>
      </div>
      <div @click="jumpPath('/robot')" class="dis-fl bs bkFFFFFF cuso info-area">
        <img src="../../assets/img/home/robot.png"/>
        <div class="time-ip-wrap">
          <div class="fs24">{{total_robot_amount}}</div>
          <div class="fs14 text cl9696AE">机器人总数</div>
        </div>
      </div>
      <div @click="jumpPath('/earningsOverview')" class="dis-fl bs bkFFFFFF cuso info-area">
        <img src="../../assets/img/home/zonghe.png"/>
        <div class="time-ip-wrap">
          <div class="fs24">{{total_profit_amount}} {{total_profit_currency}}</div>
          <div class="fs14 text cl9696AE">价值总和约</div>
        </div>
      </div>
      <div @click="jumpPath('/robot')" class="dis-fl bs bkFFFFFF cuso info-area">
        <img src="../../assets/img/home/yunxing.png"/>
        <div class="dis-fl ju-sb info-box time-ip-wrap">
          <div>
            <div class="fs24 cl3EC980">{{run_status_running}}</div>
            <div class="fs14 text cl9696AE">运行中</div>
          </div>
          <div>
            <div class="fs24 clFF8400">{{run_status_stop}}</div>
            <div class="fs14 text cl9696AE">暂停中</div>
          </div>
          <div>
            <div class="fs24 clFF2E2E">{{run_status_warning}}</div>
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
          :data="CloseOutTableData"
          style="width: 100%">
          <el-table-column
            label="序号"
            type="index"
            width="50"
            align="center">
          </el-table-column>
          <el-table-column
            prop="robot_name"
            label="机器人">
          </el-table-column>
          <el-table-column
            prop="name"
            label="币对">
            <template slot-scope="scope">
              {{scope.row.base_currency}}/
              {{scope.row.quote_currency}}
            </template>
          </el-table-column>
          <el-table-column
            prop="type_zh"
            label="类型">
          </el-table-column>
          <el-table-column
            label="当前收益率">
            <template slot-scope="scope">
              {{scope.row.income_rate}} %
            </template>
          </el-table-column>
          <el-table-column
            prop="currency_amount"
            label="仓位">
          </el-table-column>
          <el-table-column
            prop="income_rate_flag"
            label="目标率">
          </el-table-column>
        </el-table>
      </div>
      <div class="bkFFFFFF p30 bs br4 table-box">
        <div class="fw title">预计补仓</div>
        <el-table
          :data="CoverTableData"
          style="width: 100%">
          <el-table-column
            label="序号"
            type="index"
            width="50"
            align="center">
          </el-table-column>

          <el-table-column
            prop="robot_name"
            label="机器人">
          </el-table-column>
          <el-table-column
            prop="name"
            label="币对">
            <template slot-scope="scope">
              {{scope.row.base_currency}}/
              {{scope.row.quote_currency}}
            </template>
          </el-table-column>
          <el-table-column
            prop="type_zh"
            label="类型">
          </el-table-column>
          <el-table-column
            label="当前收益率">
            <template slot-scope="scope">
              {{scope.row.income_rate}} %
            </template>
          </el-table-column>
          <el-table-column
            prop="currency_amount"
            label="仓位">
          </el-table-column>
          <el-table-column
            prop="income_rate_flag"
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
        //上次登录时间
        login_record_ip: '',
        //上次登录ip
        login_record_created_at: '',
        //机器人总算
        total_robot_amount: '',
        //数量
        total_profit_amount: '',
        //币种
        total_profit_currency: '',
        //运行中
        run_status_running: '',
        //暂停中
        run_status_stop: '',
        //异常
        run_status_warning: '',
        //预计平仓表格数据
        CloseOutTableData: [],
        //预计补仓表格数据
        CoverTableData: []
      }
    },
    computed: {},
    created(){
    },
    mounted(){
      this.$nextTick(() => {
        this.chartConf();
        this.getHeadData();
        this.getEarningsData();
        this.getTableData();
      })
    },
    methods: {
      //获得上方统计的数据
      getHeadData(){
        let data = {
          "login_record": {
            "ip": "127.0.0.1",
            "created_at": "2019-10-24 16:32:58"
          },
          "total_robot_amount": "10",
          "total_profit_amount": {
            "currency": "USDT",
            "amount": "3.00002132"
          },
          "run_status": {
            "running": 42,
            "stop": 16,
            "warning": 7
          }
        };

        this.login_record_ip = data.login_record.ip;
        this.login_record_created_at = data.login_record.created_at;
        this.total_robot_amount = data.total_robot_amount;
        this.total_profit_amount = data.total_profit_amount.amount;
        this.total_profit_currency = data.total_profit_amount.currency;
        this.run_status_running = data.run_status.running;
        this.run_status_stop = data.run_status.stop;
        this.run_status_warning = data.run_status.warning;
      },

      //获得收益曲线数据
      getEarningsData(){
        let data = {
          "income_chart": {
            "data": [
              {
                "currency": "BTC",
                "data": {
                  "2019-09-29": "0.00000000",
                  "2019-09-30": "0.00000000",
                  "2019-10-01": "0.00000000",
                }
              },
              {
                "currency": "USDT",
                "data": {
                  "2019-09-29": "0.00000000",
                  "2019-09-30": "0.00000000",
                  "2019-10-01": "0.00000000",
                  "2019-10-02": "0.00000000",
                }
              }
            ]
          }
        };

        let arr = data.income_chart.data;
        let legendArr = [];
        let xAxisArr = [];
        let seriesArr = [];
        arr.forEach(item => {
          item.xAxisArr = Object.keys(item.data);
          item.valueArr = Object.values(item.data);
          let obj = {
            name: item.currency,
            type: 'line',
            smooth: true,
            data: item.valueArr
          };
          legendArr.push(item.currency);
          xAxisArr.push(item.xAxisArr);
          seriesArr.push(obj);
        });
        this.chartConf(legendArr, xAxisArr, seriesArr)
      },

      //配置收益曲线图表
      chartConf(legendArr, xAxisArr, seriesArr){
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
            data: legendArr,
            textStyle: {
              color: '#B2B2B2',
              padding: [3, 1, 1, 1]
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

            data: xAxisArr,
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
          series: seriesArr,
          color: ['#365CD9', '#FF2E2E', '#6B48FF', '#FFD058', '#43C1EA', '#12E58E'],
        };
        this.charts.setOption(option);
      },

      //获取表格的数据
      getTableData(){
        let data = {
          "expected_buy": [
            {
              "robot_name": "机器人名称",
              "base_currency": "ETH",
              "quote_currency": "USDT",
              "income_rate": "0",
              "type_zh": "做多",
              "currency_amount": "0.00000000",
              "currency": "eth",
              "income_rate_flag": "4"
            }
          ],
          "expected_sell": [
            {
              "robot_name": "机器人名称",
              "base_currency": "ETH",
              "quote_currency": "USDT",
              "income_rate": "0",
              "type_zh": "做多",
              "currency_amount": "0.00000000",
              "currency": "eth",
              "income_rate_flag": "4"
            }
          ]
        };
        this.CloseOutTableData = data.expected_sell;
        this.CoverTableData = data.expected_buy;
      },

      //点击跳转
      jumpPath(url){
        this.$router.push(url);
      },

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
          padding-left: 0 !important;
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
