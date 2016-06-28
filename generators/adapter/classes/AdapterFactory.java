package <%= package %>;

import org.nuxeo.ecm.core.api.DocumentModel;
import org.nuxeo.ecm.core.api.adapter.DocumentAdapterFactory;

public class <%= s.capitalize(doctype) %>AdapterFactory implements DocumentAdapterFactory {

    @Override
    public Object getAdapter(DocumentModel doc, Class<?> itf) {
        if (doc.getType() == "<%= doctype %>"){
            return new <%= s.capitalize(doctype) %>Adapter(doc);
        }else{
            return null;
        }
    }
}
