package <%= package %>;

import org.nuxeo.ecm.core.api.DocumentModel;
import org.nuxeo.ecm.core.api.adapter.DocumentAdapterFactory;

public class <%= s.capitalize(doctype) %>AdapterFactory implements DocumentAdapterFactory {

    @Override
    public Object getAdapter(DocumentModel doc, Class<?> itf) {
        if ("<%= doctype %>".equals(doc.getType()) && doc.hasSchema("dublincore")){
            return new <%= s.capitalize(doctype) %>Adapter(doc);
        }else{
            return null;
        }
    }
}
