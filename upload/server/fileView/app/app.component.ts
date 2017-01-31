/**
 * Created by Administrator on 2016/10/28 0028.
 */
import { Component } from '@angular/core';


@Component({
    selector: 'my-app',
    template: `
    <div class="file-preview-frame">
            <div class="v-meta v-meta-album">
                <p class="item long">
                <em class="label">标题</em>：<a class="important"><b>{{title}}</b></a>
             </p>
            </div>
            <div class="v-meta v-meta-album">
            <p class="item short">
              <em class="label">作者</em>：<a>{{author}}</a>
             </p>
            <p class="item short">
              <em class="label">上传</em>：<a>{{uploadTime}}</a>
             </p> 
            </div>
            <video class="kv-preview-data" width="100%" min-height="350" controls="">
                <source src={{source}} type="video/mp4">
            </video>
             <div class="v-meta v-meta-album">
                <p class="item long">
                <em class="label">简介</em>：<a>{{summry}}</a>
             </p>
            </div>
            <div class="v-meta v-meta-album">
                <p class="item long">
                <em class="label">备注</em>：<a class="remark">{{remark}}</a>
             </p>
            </div>
    </div> 
    
    `,
    styles: [`
    .file-preview-frame {
    position: relative;
    display: table;
    margin: 8px;
    min-height: 160px;
    width:30%;
    border: 1px solid #ddd;
    box-shadow: 1px 1px 5px 0 #a2958a;
    padding: 6px;
    float: left;
    /*text-align: center;*/
    vertical-align: middle;
}
.v-meta-album .short {
    width: 50%;
}
.long {
    width: 85%;
}
.remark {
    font-size: 10px;
    color: #999;
}
.important {
    text-align: center;
    font-size: 14px;

}
.v-meta-album .item {
    vertical-align: top;
    margin-bottom: 3px;
}
.v-meta-album .item .label {
    letter-spacing: 0px;
    width: 36px;
    height: 22px;
    vertical-align: top;
    white-space: nowrap;
    word-break: keep-all;
    text-overflow: clip;
    overflow: hidden;
}
em, i {
    font-style: normal;
}
p {
    margin: 0;
    padding: 0;
}
p {
    /*两个P在一行 */
    display: inline;
    -webkit-margin-before: 1em;
    -webkit-margin-after: 1em;
    -webkit-margin-start: 0px;
    -webkit-margin-end: 0px;
}
.v-info-album .v-info-album-content .v-meta-album {
    margin-left: 250px;
    position: relative;
    padding: 5px 0;
}
.v-meta-album {
    position: relative;
    font-size: 12px;
    line-height: 22px;
    color: #999;
}
.v-meta-album .item a {
    padding: 0 3px;
}
.v-meta-album a, .v-meta-album a:hover {
    color: #212121;
}

a {
    text-decoration: none;
    background-color: transparent;
}

    `],
})

export class AppComponent{
    title = "元旦前奏曲";
    author = "温宝福 00388224";
    source = "./1-元旦前奏.mp4";
    uploadTime = "2017-12-11 01:46:16";
    summry = "这个视频是和SE在讨论完WDE未来架构后录制的，主要涉及以后未来的方向和发展前景这个视频是和SE在讨论完WDE未来架构后录制的，主要涉及以后未来的方向和发展前景这个视频是和SE在讨论完WDE未来架构后录制的，主要涉及以后未来的方向和发展前景";
    remark = "这个视频是和SE在讨论完WDE未来架构后录制的，主要涉及以后未来的方向和发展前景这个视频是和SE在讨论完WDE未来架构后录制的，主要涉及以后未来的方向和发展前景这个视频是和SE在讨论完WDE未来架构后录制的，主要涉及以后未来的方向和发展前景";

 };
 

