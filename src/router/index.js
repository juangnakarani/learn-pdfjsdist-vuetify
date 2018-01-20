import Vue from 'vue'
import Router from 'vue-router'
import PDFViewer from '@/components/PDFViewer'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'PDFViewer',
      component: PDFViewer
    }
  ]
})
