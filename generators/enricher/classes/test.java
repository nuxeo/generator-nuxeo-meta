<%
entity_type = typeof entity_type_c !== 'undefined' ? entity_type_c : entity_type;

// Find expected JsonWriter.
jsonWriter = ''
switch(entity_type) {
  case 'org.nuxeo.ecm.core.api.DocumentModel':
    jsonWriter = 'org.nuxeo.ecm.core.io.marshallers.json.document.DocumentModelJsonWriter';
    initObj = 'DocumentModel obj = session.getDocument(new PathRef("/"));';
    obj_type = 'document';
    break;
  case 'org.nuxeo.ecm.core.api.NuxeoPrincipal':
    jsonWriter = 'org.nuxeo.ecm.platform.usermanager.io.NuxeoPrincipalJsonWriter';
    initObj = 'NuxeoPrincipal obj = (NuxeoPrincipal)session.getPrincipal();';
    obj_type = 'user';
    break;
  default:
    jsonWriter = package + '.' + s.classifiy(entity_type_c) + 'JsonWriter';
    initObj = s.strRightBack(entity_type, '.') + ' obj = new ' + s.strRightBack(entity_type, '.') + ';';
    obj_type = 'MASHALLED_TYPE';
}
-%>
package <%= package %>;

import javax.inject.Inject;

import org.junit.Test;
import org.nuxeo.ecm.core.api.CoreSession;
import org.nuxeo.ecm.core.api.PathRef;
import org.nuxeo.ecm.platform.test.PlatformFeature;
import <%= entity_type %>;
import <%= jsonWriter %>;
import org.nuxeo.ecm.core.io.marshallers.json.AbstractJsonWriterTest;
import org.nuxeo.ecm.core.io.marshallers.json.JsonAssert;
import org.nuxeo.ecm.core.io.registry.context.RenderingContext.CtxBuilder;
import org.nuxeo.runtime.test.runner.Deploy;
import org.nuxeo.runtime.test.runner.Features;

@Features({PlatformFeature.class})
@Deploy({"<%= symbolicName %>"})
public class <%= s.classify(enricher_name) %>EnricherTest extends AbstractJsonWriterTest.Local<<%= s.strRightBack(jsonWriter, '.')%>, <%= s.strRightBack(entity_type, '.')%>> {

    public <%= s.classify(enricher_name) %>EnricherTest() {
        super(<%= s.strRightBack(jsonWriter, '.')%>.class, <%= s.strRightBack(entity_type, '.')%>.class);
    }

    @Inject
    private CoreSession session;

    @Test
    public void test() throws Exception {
        <%- initObj %>
        JsonAssert json = jsonAssert(obj, CtxBuilder.enrich("<%= obj_type %>", <%= s.classify(enricher_name) %>Enricher.NAME).get());
        json = json.has("contextParameters").isObject();
        json.properties(1);
        json.has(<%= s.classify(enricher_name) %>Enricher.NAME).isObject();
    }
}
