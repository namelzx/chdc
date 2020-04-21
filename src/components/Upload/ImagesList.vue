<template>
  <div>
    <el-upload
      :action="baseURL+url+'?housing_id='+housing_id"
      list-type="picture-card"
      :on-preview="handlePictureCardPreview"
      :on-remove="handleRemove"
      :on-success="handleSuccess"
      :file-list="arrlist"
    >
      <i class="el-icon-plus"></i>
    </el-upload>
    <el-dialog :visible.sync="dialogVisible">
      <img width="100%" :src="dialogImageUrl" alt>
    </el-dialog>
  </div>
</template>

<script>
import { delImages } from "@/api/images";

  export default {
    props:{
      housing_id:String,
      url:String,
      arrlist:Array,
      type:Number
    },
    data() {
      return {
                fileList: [{name: 'food.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'}, {name: 'food2.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'}],

        baseURL: process.env.VUE_APP_BASE_API, 
        dialogImageUrl: '',
        dialogVisible: false
      };
    },
    methods: {
      handleRemove(file, fileList) {
        var temp={
          id:file.id,
          type:this.type
        }
        delImages(temp).then(res=>{
          console.log(res)
        })
      },
      handlePictureCardPreview(file) {
        this.dialogImageUrl = file.url;
        this.dialogVisible = true;
      },
      handleSuccess(){
          
      }
    }
  }
</script>

<style>
</style>
