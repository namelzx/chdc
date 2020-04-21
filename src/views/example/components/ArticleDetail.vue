<template>
  <div class="createPost-container">
    <sticky v-show="vShouw" :z-index="10" :class-name="'sub-navbar draft'">
      <el-button v-loading="loading" type="warning" @click="submitForm">保存</el-button>
    </sticky>
    <el-form ref="postForm" :model="postForm" class="form-container" label-width="80px">
      <div class="createPost-main-container">
        <el-tabs type="border-card" v-model="activeName">
          <el-tab-pane label="房源信息" name="first">
            <el-row :gutter="10">
              <el-col :xs="4" :sm="4" :md="4" :lg="4" :xl="4">
                <el-form-item label="楼盘名称">
                  <el-input v-model="temp.name"></el-input>
                </el-form-item>
              </el-col>
              <el-col :xs="4" :sm="4" :md="4" :lg="4" :xl="4">
                <el-form-item label="楼栋">
                  <el-input v-model="temp.loudong"></el-input>
                </el-form-item>
              </el-col>
              <el-col :xs="4" :sm="4" :md="4" :lg="4" :xl="4">
                <el-form-item label="单元">
                  <el-input v-model="temp.danyuan"></el-input>
                </el-form-item>
              </el-col>
              <el-col :xs="4" :sm="4" :md="4" :lg="4" :xl="4">
                <el-form-item label="房号">
                  <el-input v-model="temp.fanghao"></el-input>
                </el-form-item>
              </el-col>
              <el-col :xs="4" :sm="4" :md="4" :lg="4" :xl="4">
                <el-form-item label="总层">
                  <el-input v-model="temp.zongceng"></el-input>
                </el-form-item>
              </el-col>
              <el-col :xs="4" :sm="4" :md="4" :lg="4" :xl="4">
                <el-form-item label="楼层">
                  <el-input v-model="temp.louceng"></el-input>
                </el-form-item>
              </el-col>

              <el-col :xs="4" :sm="4" :md="4" :lg="4" :xl="4">
                <el-form-item label="区域">
                  <el-input v-model="temp.quyu"></el-input>
                </el-form-item>
              </el-col>

              <el-col :xs="4" :sm="4" :md="4" :lg="4" :xl="4">
                <el-form-item label="片区">
                  <el-input v-model="temp.pianqu"></el-input>
                </el-form-item>
              </el-col>

              <el-col :xs="4" :sm="4" :md="4" :lg="4" :xl="4">
                <el-form-item label="建筑结构">
                  <el-input v-model="temp.jiegou"></el-input>
                </el-form-item>
              </el-col>
              <el-col :xs="4" :sm="4" :md="4" :lg="4" :xl="4">
                <el-form-item label="年代">
                  <el-input v-model="temp.niandai"></el-input>
                </el-form-item>
              </el-col>

              <el-col :xs="4" :sm="4" :md="4" :lg="4" :xl="4">
                <el-form-item label="朝向">
                  <el-input v-model="temp.chaoxiang"></el-input>
                </el-form-item>
              </el-col>

              <el-col :xs="4" :sm="4" :md="4" :lg="4" :xl="4">
                <el-form-item label="用途">
                  <el-input v-model="temp.yongtu"></el-input>
                </el-form-item>
              </el-col>

              <el-col :xs="4" :sm="4" :md="4" :lg="4" :xl="4">
                <el-form-item label="面积">
                  <el-input v-model="temp.jianmian"></el-input>
                </el-form-item>
              </el-col>

              <el-col :xs="4" :sm="4" :md="4" :lg="4" :xl="4">
                <el-form-item label="套内面积">
                  <el-input v-model="temp.taonei"></el-input>
                </el-form-item>
              </el-col>

              <el-col :xs="4" :sm="4" :md="4" :lg="4" :xl="4">
                <el-form-item label="房型">
                  <el-input v-model="temp.fangxing"></el-input>
                </el-form-item>
              </el-col>

              <el-col :xs="4" :sm="4" :md="4" :lg="4" :xl="4">
                <el-form-item label="占地">
                  <el-input v-model="temp.zhandi"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-divider content-position="left">交易情况</el-divider>

            <!--  交易情况 -->
            <el-row :gutter="10">
              <el-col :xs="4" :sm="4" :md="4" :lg="4" :xl="4">
                <el-form-item label="钥匙">
                  <el-select v-model="temp.yaoshi" placeholder="请选择">
                    <el-option
                      v-for="item in ysMap"
                      :key="item.index"
                      :label="item.name"
                      :value="item.index"
                    ></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :xs="4" :sm="4" :md="4" :lg="4" :xl="4">
                <el-form-item label="状态">
                  <el-select v-model="temp.youxiao" placeholder="请选择">
                    <el-option
                      v-for="item in statusOpt"
                      :key="item.index"
                      :label="item.name"
                      :value="item.index"
                    ></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :xs="4" :sm="4" :md="4" :lg="4" :xl="4">
                <el-form-item label="公私">
                  <el-select v-model="temp.gongsi" placeholder="请选择">
                    <el-option
                      v-for="item in gongsiOpt"
                      :key="item.index"
                      :label="item.name"
                      :value="item.index"
                    ></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :xs="4" :sm="4" :md="4" :lg="4" :xl="4">
                <el-form-item label="税费">
                  <el-select v-model="temp.tax" placeholder="请选择">
                    <el-option
                      v-for="item in taxOpt"
                      :key="item.index"
                      :label="item.name"
                      :value="item.index"
                    ></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :xs="4" :sm="4" :md="4" :lg="4" :xl="4">
                <el-form-item label="付佣">
                  <el-select v-model="temp.commission" placeholder="请选择">
                    <el-option
                      v-for="item in commissionOpt"
                      :key="item.index"
                      :label="item.name"
                      :value="item.index"
                    ></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :xs="4" :sm="4" :md="4" :lg="4" :xl="4">
                <el-form-item label="付款">
                  <el-select v-model="temp.payway" placeholder="请选择">
                    <el-option
                      v-for="item in paywayOpt"
                      :key="item.index"
                      :label="item.name"
                      :value="item.index"
                    ></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :xs="4" :sm="4" :md="4" :lg="4" :xl="4">
                <el-form-item label="产权">
                  <el-select v-model="temp.rights" placeholder="请选择">
                    <el-option
                      v-for="item in rightsOpt"
                      :key="item.index"
                      :label="item.name"
                      :value="item.index"
                    ></el-option>
                  </el-select>
                </el-form-item>
              </el-col>

              <el-col :xs="4" :sm="4" :md="4" :lg="4" :xl="4">
                <el-form-item label="特征">
                  <el-select v-model="temp.tz" placeholder="请选择">
                    <el-option
                      v-for="item in tzOpt"
                      :key="item.index"
                      :label="item.name"
                      :value="item.index"
                    ></el-option>
                  </el-select>
                </el-form-item>
              </el-col>

              <el-col :xs="4" :sm="4" :md="4" :lg="4" :xl="4">
                <el-form-item label="证件">
                  <el-select v-model="temp.zj" placeholder="请选择">
                    <el-option
                      v-for="item in zjOpt"
                      :key="item.index"
                      :label="item.name"
                      :value="item.index"
                    ></el-option>
                  </el-select>
                </el-form-item>
              </el-col>

              <el-col :xs="4" :sm="4" :md="4" :lg="4" :xl="4">
                <el-form-item label="现状">
                  <el-select v-model="temp.chushou" placeholder="请选择">
                    <el-option
                      v-for="item in chushouOpt"
                      :key="item.index"
                      :label="item.name"
                      :value="item.index"
                    ></el-option>
                  </el-select>
                </el-form-item>
              </el-col>

              <el-col :xs="4" :sm="4" :md="4" :lg="4" :xl="4">
                <el-form-item label="装修">
                  <el-select v-model="temp.zhuangxiu" placeholder="请选择">
                    <el-option
                      v-for="item in zhuangxiuOpt"
                      :key="item.index"
                      :label="item.name"
                      :value="item.index"
                    ></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :xs="4" :sm="4" :md="4" :lg="4" :xl="4">
                <el-form-item label="家居">
                  <el-select v-model="temp.household" placeholder="请选择">
                    <el-option
                      v-for="item in householdOpt"
                      :key="item.index"
                      :label="item.name"
                      :value="item.index"
                    ></el-option>
                  </el-select>
                </el-form-item>
              </el-col>

              <el-col :xs="4" :sm="4" :md="4" :lg="4" :xl="4">
                <el-form-item label="报价(万元)">
                  <el-input v-model="temp.baojia"></el-input>
                </el-form-item>
              </el-col>

              <el-col :xs="4" :sm="4" :md="4" :lg="4" :xl="4">
                <el-form-item label="底价(万元)">
                  <el-input :type="islowprice" v-model="temp.fangjia"></el-input>
                </el-form-item>
              </el-col>

              <el-col :xs="4" :sm="4" :md="4" :lg="4" :xl="4">
                <el-form-item label="建面报价单价(元)">
                  {{temp.baojia*10000/temp.jianmian|jsjm}}
                  <!-- <el-input v-model="temp.mianprice"></el-input> -->
                </el-form-item>
              </el-col>

              <el-col :xs="4" :sm="4" :md="4" :lg="4" :xl="4">
                <el-form-item label="购买时间">
                  <el-select v-model="temp.timetype" placeholder="请选择">
                    <el-option
                      v-for="item in timeTypeOpt"
                      :key="item.index"
                      :label="item.name"
                      :value="item.index"
                    ></el-option>
                  </el-select>
                </el-form-item>
              </el-col>

              <el-col :xs="4" :sm="4" :md="4" :lg="4" :xl="4">
                <el-form-item label="有效时间">
                  <el-date-picker
                    v-model="temp.youxiaotime"
                    type="daterange"
                    range-separator="至"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期"
                  ></el-date-picker>
                </el-form-item>
              </el-col>
            </el-row>

            <el-row>
              <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
                <el-form-item label="备注">
                  <el-input
                    type="textarea"
                    :autosize="{ minRows: 2, maxRows: 4}"
                    placeholder="请输入内容"
                    v-model="temp.desc"
                  ></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <!-- 用户信息 -->
            <el-divider content-position="left">业主信息</el-divider>

            <el-row :gutter="10">
              <el-col :xs="5" :sm="5" :md="5" :lg="5" :xl="5">
                <el-form-item label="业主姓名">
                  <el-input v-model="temp.username"></el-input>
                </el-form-item>
              </el-col>
              <el-col :xs="5" :sm="5" :md="5" :lg="5" :xl="5">
                <el-form-item label="手机1">
                  <el-input :type="istype" v-model="temp.phone1"></el-input>
                </el-form-item>
              </el-col>
              <el-col :xs="5" :sm="5" :md="5" :lg="5" :xl="5">
                <el-form-item label="手机2">
                  <el-input :type="istype" v-model="temp.phone2"></el-input>
                </el-form-item>
              </el-col>
              <el-col :xs="5" :sm="5" :md="5" :lg="5" :xl="5">
                <el-form-item label="联系人">
                  <el-input v-model="temp.contactandphone"></el-input>
                </el-form-item>
              </el-col>
              <el-col :xs="5" :sm="5" :md="5" :lg="5" :xl="5">
                <el-form-item label="业主关系">
                  <el-select v-model="temp.between" placeholder="请选择">
                    <el-option
                      v-for="item in betweenOpt"
                      :key="item.index"
                      :label="item.name"
                      :value="item.index"
                    ></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :xs="5" :sm="5" :md="5" :lg="5" :xl="5">
                <el-form-item label="信息来源">
                  <el-select v-model="temp.source" placeholder="请选择">
                    <el-option
                      v-for="item in sourceOpt"
                      :key="item.index"
                      :label="item.name"
                      :value="item.index"
                    ></el-option>
                  </el-select>
                </el-form-item>
              </el-col>

              <el-col :xs="5" :sm="5" :md="5" :lg="5" :xl="5">
                <el-form-item label="委托">
                  <el-select v-model="temp.entrust" placeholder="请选择">
                    <el-option
                      v-for="item in entrustOpt"
                      :key="item.index"
                      :label="item.name"
                      :value="item.index"
                    ></el-option>
                  </el-select>
                </el-form-item>
              </el-col>

              <el-col :xs="5" :sm="5" :md="5" :lg="5" :xl="5">
                <el-form-item label="权属来源">
                  <el-select v-model="temp.belong" placeholder="请选择">
                    <el-option
                      v-for="item in belongOpt"
                      :key="item.index"
                      :label="item.name"
                      :value="item.index"
                    ></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>

            <div class="gj-content">
              <div class="gj" style="width: 70%;float: left;">
                <el-tabs v-model="activeTag">
                  <el-tab-pane label="跟进记录" name="first">
                    <el-table :data="followlist" style="width: 100%">
                      <el-table-column prop="str" label="跟进内容" width="180"></el-table-column>
                      <el-table-column label="操作人" width="180">
                        <template slot-scope="scope">
                          <span v-if="scope.row.admin">{{ scope.row.admin.username}}</span>
                          <span v-else>该员工已离开</span>
                        </template>
                      </el-table-column>
                      <el-table-column label="操作时间">
                        <template slot-scope="scope">
                          <span>{{ scope.row.create_time | parseTime('{y}-{m}-{d} {h}:{i}')}}</span>
                        </template>
                      </el-table-column>
                    </el-table>
                  </el-tab-pane>
                  <!-- <el-tab-pane label="勘察记录" name="second">配置管理</el-tab-pane>
                  <el-tab-pane label="查电话记录" name="third">角色管理</el-tab-pane>
                  <el-tab-pane label="归属人变动记录" name="fourth">定时任务补偿</el-tab-pane>-->
                </el-tabs>
              </div>
              <div
                style="width: 20%;float: left;    margin-top: 38px;    text-align: center;    border: 1px solid #d3dce6;    padding: 10px;"
              >
                <el-row :gutter="20">
                  <el-col :span="12">
                    <div class="grid-content bg-purple">
                      <el-button size="mini" @click="viewPhone">查电话</el-button>
                    </div>
                  </el-col>

                  <el-col :span="12">
                    <div class="grid-content bg-purple">
                      <el-button size="mini" @click="viewPrice">查底价</el-button>
                    </div>
                  </el-col>
                  <el-col :span="12">
                    <div class="grid-content bg-purple">
                      <el-button size="mini" @click="dialogVisible=true">打跟进</el-button>
                    </div>
                  </el-col>

                  <el-col :span="12">
                    <div class="grid-content bg-purple">
                      <el-button size="mini" @click="handelactiveName">查首勘</el-button>
                    </div>
                  </el-col>
                  <el-dialog title="打跟进" :visible.sync="dialogVisible" width="80%">
                    <el-collapse v-model="gjNames" @change="handleChange">
                      <el-collapse-item title="无效" name="1">
                        <el-radio-group v-model="follow.radio">
                          <el-radio label="电话无法接通">电话无法接通</el-radio>
                          <el-radio label="没接">没接</el-radio>
                          <el-radio label="关机">关机</el-radio>
                          <el-radio label="停机">停机</el-radio>
                          <el-radio label="挂了">挂了</el-radio>
                          <el-radio label="一会儿再打">一会儿再打</el-radio>
                        </el-radio-group>
                      </el-collapse-item>

                      <el-collapse-item title="基本信息" name="2">
                        <el-radio-group v-model="follow.base">
                          <el-radio label="地址有误">地址有误</el-radio>
                          <el-radio label="装修情况有误">装修情况有误</el-radio>
                          <el-radio label="户型有误">户型有误</el-radio>
                          <el-radio label="房间面积有误">房间面积有误</el-radio>
                          <el-radio label="证件有误">证件有误</el-radio>
                          <el-radio label="朝向有误">朝向有误</el-radio>
                          <el-radio label="用途有误">用途有误</el-radio>
                          <el-radio label="产权有误">产权有误</el-radio>
                          <el-radio label="联系方式变化">联系方式变化</el-radio>
                        </el-radio-group>
                        <el-input
                          type="textarea"
                          :rows="2"
                          placeholder="补充"
                          v-model="follow.basedesc"
                        ></el-input>
                      </el-collapse-item>
                      <el-collapse-item title="看房方式" name="3">
                        <el-input
                          type="textarea"
                          :rows="2"
                          placeholder="输入约勘情况如： 联系xxx开门 、已经拿到钥匙、"
                          v-model="follow.look"
                        ></el-input>
                      </el-collapse-item>

                      <el-collapse-item title="约勘" name="4">
                        <el-radio-group v-model="follow.survey">
                          <el-radio label="越勘成功">越勘成功</el-radio>
                          <el-radio label="约勘失败">约勘失败</el-radio>
                          <el-radio label="取消勘察">取消勘察，时间另行通知</el-radio>
                        </el-radio-group>
                        <el-input
                          type="textarea"
                          :rows="2"
                          placeholder="输入约勘情况如： 补充说明"
                          v-model="follow.surveydesc"
                        ></el-input>
                      </el-collapse-item>

                      <el-collapse-item title="交易状态" name="5">
                        <el-radio-group v-model="follow.deal">
                          <el-radio label="交易状态改变，目前业主只考虑出售">交易状态改变，目前业主只考虑出售</el-radio>
                          <el-radio label="交易状态改变，目前业主只考虑出租">交易状态改变，目前业主只考虑出租</el-radio>
                          <el-radio label="交易状态改变，目前业主只考虑租/售均考虑">交易状态改变，目前业主只考虑租/售均考虑</el-radio>
                        </el-radio-group>
                        <el-input
                          type="textarea"
                          :rows="2"
                          placeholder="补充说明，如报价情况等"
                          v-model="follow.dealdesc"
                        ></el-input>
                      </el-collapse-item>

                      <el-collapse-item title="自定义" name="6">
                        <el-input
                          type="textarea"
                          :rows="2"
                          placeholder="请输入你需要"
                          v-model="follow.desc"
                        ></el-input>
                      </el-collapse-item>
                    </el-collapse>

                    <span slot="footer" class="dialog-footer">
                      <el-button @click="dialogVisible = false">取 消</el-button>
                      <el-button type="primary" @click="handelGenjin">确 定</el-button>
                    </span>
                  </el-dialog>
                </el-row>
              </div>
            </div>
          </el-tab-pane>
          <el-tab-pane label="首勘照片" name="second">
            <Upload :housing_id="housing_id" :type="1" :url="skupload" :arrlist="images" />
          </el-tab-pane>
          <el-tab-pane label="业主委托证书" name="third">
            <Upload :housing_id="housing_id" :type="2" :url="wtupload" :arrlist="entrust" />
          </el-tab-pane>
        </el-tabs>
      </div>
    </el-form>
  </div>
</template>

<script>
import Tinymce from "@/components/Tinymce";
import Upload from "@/components/Upload/ImagesList";
import MDinput from "@/components/MDinput";
import Sticky from "@/components/Sticky"; // 粘性header组件
import { validURL } from "@/utils/validate";
import { fetchArticle, postDataData, postFollow } from "@/api/housing";
import { searchUser } from "@/api/remote-search";
import Warning from "./Warning";
import { SourceUrlDropdown } from "./Dropdown";
import { mapGetters } from "vuex";
import { parseTime } from "@/utils";

const defaultForm = {};

export default {
  name: "ArticleDetail",

  props: {
    isEdit: {
      type: Boolean,
      default: false
    }
  },
  components: {
    Upload,
    Sticky
  },

  data() {
    return {
      vShouw: false,
      follow: {
        base: "",
        basedesc: "",
        deal: "",
        dealdesc: "",
        desc: "",
        look: "",
        radio: "",
        survey: "",
        surveydesc: ""
      },
      dialogVisible: false,
      postForm: Object.assign({}, defaultForm),
      gjNames: undefined,
      images: [],
      skupload: "/skupload",
      wtupload: "/wtupload",
      temp: {},
      housing_id: 0,
      postForm: Object.assign({}, defaultForm),
      loading: false,
      activeName: "first",
      activeTag: "first",
      followlist: [],
      istype: "password",
      islowprice: "password",
      statusOpt: [
        {
          index: 1,
          name: "有效"
        },
        {
          index: 2,
          name: "无效"
        }
      ], //状态
      gongsiOpt: [
        {
          index: 1,
          name: "公盘"
        },
        { index: 2, name: "私盘" }
      ], //公私

      timeTypeOpt: [
        {
          index: 1,
          name: "不满两年"
        },
        { index: 2, name: "满两年" },
        { index: 3, name: "满五唯一" }
      ], //购买时间
      taxOpt: [
        { index: 1, name: "净收" },
        {
          index: 2,
          name: "买家承担"
        },
        {
          index: 3,
          name: "各付各的"
        }
      ], //税费
      commissionOpt: [
        { index: 1, name: "付佣" },
        {
          index: 2,
          name: "不付"
        }
      ], //付佣
      paywayOpt: [
        { index: 1, name: "不限" },
        {
          index: 2,
          name: "一次性"
        },
        {
          index: 3,
          name: "按揭"
        }
      ], //付佣
      rightsOpt: [
        { index: 1, name: "商品房" },
        {
          index: 2,
          name: "商住两用"
        },
        {
          index: 3,
          name: "经济适用"
        },
        {
          index: 4,
          name: "公房"
        },
        {
          index: 5,
          name: "其他"
        },
          {
          index: 6,
          name: "自建楼"
        },
        {
          index: 7,
          name: "宅基地"
        }
      ], //产权
      zjOpt: [
        {
          index: 1,
          name: "证在银行"
        },
        {
          index: 2,
          name: "证在手上"
        },
        {
          index: 3,
          name: "其他"
        }
      ], //证件
      tzOpt: [
        {
          index: 1,
          name: "全程房"
        },
        {
          index: 2,
          name: "托管房"
        },
        {
          index: 3,
          name: "精耕房"
        },
        {
          index: 4,
          name: "普通房"
        }
      ], //钥匙
      ysMap: [
        { index: 1, name: "有" },
        {
          index: 2,
          name: "无"
        }
      ],
      chushouOpt: [
        { index: 1, name: "出售" },
        {
          index: 2,
          name: "出租"
        },
        {
          index: 3,
          name: "空置"
        }
      ], //现状
      zhuangxiuOpt: [
        { index: 1, name: "毛坯" },
        {
          index: 2,
          name: "简单装修"
        },
        {
          index: 3,
          name: "中等装修"
        },
        {
          index: 4,
          name: "精装修"
        },
        {
          index: 5,
          name: "豪华装修"
        },
        {
          index: 6,
          name: "其他"
        }
      ], //装修
      householdOpt: [
        { index: 1, name: "无" },
        {
          index: 2,
          name: "送部分"
        },
        {
          index: 3,
          name: "全送"
        },
        {
          index: 4,
          name: "其他"
        }
      ],
      sourceOpt: [
        { index: 1, name: "上门" },
        {
          index: 2,
          name: "来电"
        },
        {
          index: 3,
          name: "驻守"
        },
        {
          index: 4,
          name: "贴条"
        },
        {
          index: 5,
          name: "朋友"
        },
        {
          index: 6,
          name: "老客户介绍"
        },
        {
          index: 7,
          name: "网络"
        },
        {
          index: 8,
          name: "扫街"
        }
      ], //信息来源
      entrustOpt: [
        { index: 1, name: "未签" },
        {
          index: 2,
          name: "签约"
        },
        {
          index: 3,
          name: "独家"
        },
        {
          index: 4,
          name: "贴条"
        },
        {
          index: 5,
          name: "限时"
        },
        {
          index: 5,
          name: "收购"
        }
      ], //委托
      belongOpt: [
        { index: 1, name: "买卖" },
        {
          index: 2,
          name: "继承"
        },
        {
          index: 3,
          name: "赠与"
        },
        {
          index: 4,
          name: "拍卖"
        },
        {
          index: 5,
          name: "司法"
        }
      ], //权属来源
      betweenOpt: [
        { index: 1, name: "亲属" },
        {
          index: 2,
          name: "朋友"
        },
        {
          index: 3,
          name: "中介"
        },
        {
          index: 4,
          name: "其他"
        }
      ] //亲属关系
    };
  },
  filters:{
    jsjm(e){
      return parseFloat(e).toFixed(2);
    }
  },
  computed: {
    ...mapGetters(["sidebar", "avatar", "device", "name", "info"])
  },
  watch:{
    "temp.baojia":function(val){
     
    }
  },

  created() {
    if (this.isEdit) {
      const id = this.$route.params && this.$route.params.id;
      this.fetchData(id);
      this.housing_id = id;
    } else {
      this.postForm = Object.assign({}, defaultForm);
    }
    if (this.info.is_edit === 1) {
      this.vShouw = true;
    }
  },

  methods: {
    handelactiveName() {
      this.activeName = "second";
    },
    viewPhone() {
      console.log(this.info.is_phone);
      if (this.info.is_phone === 1) {
        this.istype = "text";
      } else {
        this.$message({
          message: "你没有这个权限",
          type: "warning"
        });
      }
    },
    viewPrice() {
      if (this.info.is_price === 1) {
        this.islowprice = "text";
      } else {
        this.$message({
          message: "你没有这个权限",
          type: "warning"
        });
      }
    },
    handleChange() {
      // this.dialogVisible=false
    },
    handelGenjin() {
      var temp = this.follow;
      console.log(this.name);
      var post = {};
      post.str =
        temp.base +
        temp.basedesc +
        temp.deal +
        temp.dealdesc +
        temp.desc +
        temp.look +
        temp.radio +
        temp.survey +
        temp.surveydesc;
      post.username = this.name;
      post.housing_id = this.housing_id;
      if (post.str.length < 1) {
        this.$message({
          message: "最少选择一项跟进",
          type: "warning"
        });
        return;
      }
      postFollow(post).then(res => {
        this.dialogVisible = false;
        this.followlist.unshift(res.data);
        this.$notify({
          title: "成功",
          message: "跟进成功",
          type: "success",
          duration: 2000
        });
      });
    },
    handleClose() {
      this.dialogVisible = false;
    },
    fetchData(id) {
      fetchArticle(id)
        .then(response => {
          console.log(response);
          this.temp = response.data;
          this.images = response.images;
          this.entrust = response.entrust;
          this.followlist = response.follow;
        })
        .catch(err => {
          console.log(err);
        });
    },

    submitForm() {
      this.temp.admin_id = this.info.id;
      this.temp.mianprice=parseFloat(this.temp.baojia)*10000/parseFloat(this.temp.jianmian)
      this.temp.mianprice=parseFloat(  this.temp.mianprice).toFixed(2)
      postDataData(this.temp).then(res => {
        this.$notify({
          title: "成功",
          message: "保存成功",
          type: "success",
          duration: 2000
        });
        this.$router.go(-1); //返回上一层
      });
    },
    draftForm() {
      if (
        this.postForm.content.length === 0 ||
        this.postForm.title.length === 0
      ) {
        this.$message({
          message: "请填写必要的标题和内容",
          type: "warning"
        });
        return;
      }
      this.$message({
        message: "保存成功",
        type: "success",
        showClose: true,
        duration: 1000
      });
      this.postForm.status = "draft";
    }
  }
};
</script>

<style lang="scss" scoped>
@import "~@/styles/mixin.scss";
.el-col {
  border-radius: 4px;
}
.bg-purple-dark {
  background: #99a9bf;
}
.bg-purple {
  background: #d3dce6;
}
.bg-purple-light {
  background: #e5e9f2;
}
.grid-content {
  border-radius: 4px;
  min-height: 36px;
}
.bg-purple {
  background: none;
}

@import "~@/styles/mixin.scss";
.createPost-container {
  position: relative;
  .createPost-main-container {
    padding: 40px 45px 20px 50px;
    .postInfo-container {
      position: relative;
      @include clearfix;
      margin-bottom: 10px;
      .postInfo-container-item {
        float: left;
      }
    }
  }
  .word-counter {
    width: 40px;
    position: absolute;
    right: 10px;
    top: 0px;
  }
}
.article-textarea /deep/ {
  textarea {
    padding-right: 40px;
    resize: none;
    border: none;
    border-radius: 0px;
    border-bottom: 1px solid #bfcbd9;
  }
}
.el-form-item__label {
  font-size: 10px !important;
}
.el-input--medium {
  .el-input__inner {
    height: 25px;
    line-height: 25px;
  }
}
.gj-content >>> .el-collapse-item__wrap,
.gj-content >>> .el-collapse-item__content {
  text-align: left;
}
</style>
