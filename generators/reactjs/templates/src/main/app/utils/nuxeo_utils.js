const Nuxeo = require('nuxeo/dist/nuxeo');
import { merge } from 'lodash';
import { flashErrors } from '../actions/error_actions'

let _nuxeo;
let _store;

const DEFAULTS = {
    method: "get",
    adapter: undefined,
    path: "/",
    schemas: ["*"],
    data: undefined,
    operation: undefined,
    success: (res) => {
        console.log(res)
    },
    fail: (res) => {
        flashErrors(res)(_store.dispatch);
    }
};

const NuxeoUtils = {
  signIn(signIn, callback) {
      let nuxeo = new Nuxeo({
          baseURL: signIn.url,
         //  auth: {
         //    method: 'basic',
         //    username: signIn.username,
         //    password: signIn.password
         // },
      });
      _nuxeo = nuxeo;
      NuxeoUtils.crudUtil({
          success: function (res) {
              _nuxeo.login().then(callback);
          }
      });
  },

    // _nuxeo.header('X-NXDocumentProperties', '*');
    // _nuxeo.enrichers({document: ['subtypes']});

  batchUpload(params){
      var blob = new Nuxeo.Blob({
          content: params.data.file,
          name: params.data.file.name,
          mimeType: params.data.file.type,
          size: params.data.file.size
      });
      _nuxeo.batchUpload()
          .upload(blob)
          .then((res) => {
              let data = {
                  "upload-batch": res.blob["upload-batch"],
                  "upload-fileId": res.blob["upload-fileId"]
              };

              let finalDoc = {
                  "entity-type": "document",
                  "name":`${params.data.title}`,
                  "type": "File",
                  "properties": {
                      "file:content": data,
                  }
              };
              NuxeoUtils.crudUtil({
                  method: "create",
                  path: params.path,
                  data: finalDoc,
                  success: params.success
              })
          });
  },


  attachFile(node, upload, success) {
    let blob = new Nuxeo.Blob({content: upload.file});
      const batch = _nuxeo.batchUpload();
      _nuxeo.Promise.all([batch.upload(blob)])
          .then((values) => {
              let batchBlob = values[0].blob;
              node.item.set({ 'file:content': batchBlob });
              return node.item.save({ schemas: ['dublincore', 'file'] });
          })
          .then(success);
  },

  crudUtil(params) {
      let finalParams = merge({}, DEFAULTS, params);
      let path = finalParams.path;
      if (finalParams.adapter) {
          path += `/@${finalParams.adapter}`;
      }
      if (finalParams.operation) {
          path += `/${finalParams.operation}`;
      }

      switch (finalParams.method.toLowerCase()) {

          case "get":
          _nuxeo.repository()
              .schemas(finalParams.schemas)
              .headers({'X-NXenrichers.document':'thumbnail'})
              .fetch(path)
              .then(finalParams.success)
              .catch(finalParams.fail);
              break;
          case "delete":
          _nuxeo.repository()
              .schemas(finalParams.schemas)
              .delete(path)
              .then(finalParams.success)
              .catch(finalParams.fail);
              break;
          case "update":
          _nuxeo.repository()
              .schemas(finalParams.schemas)
              .update(finalParams.data)
              .then(finalParams.success)
              .catch(finalParams.fail);
              break;
          case "create":
          _nuxeo.repository()
              .schemas(finalParams.schemas)
              .create(path, finalParams.data)
              .then(finalParams.success)
              .catch(finalParams.fail);
              break;
          default:
              throw "Method does not exist";
      }
  },

  getConfiguration() {
      _nuxeo.request('api/v1/config/types')
          .get()
          .then((res) => {
              debugger;
          })
  },

  addStore(store){
      _store = store;
  },

  getSubTypes() {
      _nuxeo.request('/')
          .enrichers({'document': ['subtypes']})
          .get()
          .then((res) => {
              debugger
          })
  }
};

Object.keys(NuxeoUtils).forEach((key) => {
    window[key] = NuxeoUtils[key]
})

export default NuxeoUtils;