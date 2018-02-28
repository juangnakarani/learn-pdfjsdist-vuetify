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

var DEFAULT_URL ="/static/list-instrument_3a88fa884e22e7fc9e74234807c3bd59e212a9b9_226213962.pdf";
var DEFAULT_SCALE_DELTA = 1.1;
var MIN_SCALE = 0.25;
var MAX_SCALE = 10.0;
var DEFAULT_SCALE_VALUE = "auto";
var USE_ONLY_CSS_ZOOM = true;
var TEXT_LAYER_MODE = 0; // DISABLE
var PDFViewerApplication = {
  pdfLoadingTask: null,
  pdfDocument: null,
  pdfViewer: null,
  pdfHistory: null,
  pdfLinkService: null
};

export default {
  methods: {
    openPDF(params) {
      console.log("open pdf method");
      if (this.pdfLoadingTask) {
        // We need to destroy already opened document
        return this.close().then(
          function() {
            // ... and repeat the open() call.
            return this.open(params);
          }.bind(this)
        );
      }

      var url = params.url;
      // var url = '/assets/test.pdf';
      var self = this;
      // this.setTitleUsingUrl(url);

      // Loading document.
      var loadingTask = PDFJS.getDocument(url);
      this.pdfLoadingTask = loadingTask;

      return loadingTask.promise.then(
        function(pdfDocument) {
          // Document loaded, specifying document for the viewer.
          console.log(self.pdfViewer);
          self.pdfDocument = pdfDocument;

          self.pdfViewer.setDocument(pdfDocument);

          self.pdfLinkService.setDocument(pdfDocument);
          self.pdfHistory.initialize(pdfDocument.fingerprint);

          //   this.loadingBar.hide();
          //   this.setTitleUsingMetadata(pdfDocument);
        },
        function(exception) {
          var message = exception && exception.message;
          var l10n = self.l10n;
          var loadingErrorMessage;

          if (exception instanceof PDFJS.InvalidPDFException) {
            // change error message also for other builds
            loadingErrorMessage = l10n.get(
              "invalid_file_error",
              null,
              "Invalid or corrupted PDF file."
            );
          } else if (exception instanceof PDFJS.MissingPDFException) {
            // special message for missing PDFs
            loadingErrorMessage = l10n.get(
              "missing_file_error",
              null,
              "Missing PDF file."
            );
          } else if (exception instanceof PDFJS.UnexpectedResponseException) {
            loadingErrorMessage = l10n.get(
              "unexpected_response_error",
              null,
              "Unexpected server response."
            );
          } else {
            loadingErrorMessage = l10n.get(
              "loading_error",
              null,
              "An error occurred while loading the PDF."
            );
          }

          loadingErrorMessage.then(function(msg) {
            self.error(msg, { message: message });
          });
          // self.loadingBar.hide();
        }
      );
    }
  },
  mounted() {
    // initUI: function pdfViewInitUI() {
    console.log("hai init ui");
    var linkService = new PDFJS.PDFLinkService();
    this.pdfLinkService = linkService;

    this.l10n = PDFJS.NullL10n;

    var container = document.getElementById("viewerContainer");
    console.log("container");
    console.log(container);
    var pdfViewer = new PDFJS.PDFViewer({
      container: container,
      linkService: linkService,
      l10n: this.l10n,
      useOnlyCssZoom: USE_ONLY_CSS_ZOOM,
      textLayerMode: TEXT_LAYER_MODE,
    });
    this.pdfViewer = pdfViewer;
    // console.log(this.pdfViewer);
    linkService.setViewer(pdfViewer);

    this.pdfHistory = new PDFJS.PDFHistory({
      linkService: linkService
    });
    linkService.setHistory(this.pdfHistory);

    
    this.openPDF({
      url: DEFAULT_URL
    });

  }
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
