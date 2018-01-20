<template>
  <v-container fluid>
    <v-slide-y-transition mode="out-in">
      <v-layout column align-center>
        <div id="viewerContainer">
            <div id="viewer"></div>
        </div>
      </v-layout>
    </v-slide-y-transition>
  </v-container>
</template>
<script>
import { PDFJS } from "pdfjs-dist/web/pdf_viewer.js";

PDFJS.useOnlyCssZoom = true;
PDFJS.disableTextLayer = true;
PDFJS.maxImageSize = 1024 * 1024;
PDFJS.workerSrc = "../../node_modules/pdfjs-dist/build/pdf.worker.js";
PDFJS.cMapUrl = "../../node_modules/pdfjs-dist/cmaps/";
PDFJS.cMapPacked = true;
console.log(PDFJS);


var DEFAULT_URL = "/static/Red_Hat_Enterprise_Linux-7-System_Administrators_Guide-en-US.pdf";
var DEFAULT_SCALE_DELTA = 1.1;
var MIN_SCALE = 0.25;
var MAX_SCALE = 10.0;
var DEFAULT_SCALE_VALUE = "auto";

export default {

    
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1,
h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
