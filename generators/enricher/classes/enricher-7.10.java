<%
entity_type = typeof entity_type_c !== 'undefined' ? entity_type_c : entity_type;
-%>
package <%= package %>;

import static org.nuxeo.ecm.core.io.registry.reflect.Instantiations.SINGLETON;
import static org.nuxeo.ecm.core.io.registry.reflect.Priorities.REFERENCE;

import java.io.IOException;
import java.util.Collections;

import org.codehaus.jackson.JsonGenerator;
import <%= entity_type %>;
import org.nuxeo.ecm.core.io.marshallers.json.enrichers.AbstractJsonEnricher;
import org.nuxeo.ecm.core.io.registry.reflect.Setup;

/**
 * Enrich {@link <%= s.strRight(entity_type, '.') %>} Json.
 * <p>
 * Format is:
 * </p>
 * <pre>
 * {@code
 * {
 *   ...
 *   "contextParameters": {
*     "<%= s.underscored(enricher_name) %>": { ... }
 *   }
 * }}
 * </pre>
 */
@Setup(mode = SINGLETON, priority = REFERENCE)
public class <%= s.classify(enricher_name) %>Enricher extends AbstractJsonEnricher<<%= s.strRightBack(entity_type, '.')%>> {

    public static final String NAME = "<%= s.underscored(enricher_name) %>";

    public <%= s.classify(enricher_name) %>Enricher() {
        super(NAME);
    }

    @Override
    public void write(JsonGenerator jg, <%= s.strRightBack(entity_type, '.')%> obj) throws IOException {
        // How to instanciate a Session if `obj` is a DocumentModel
        //try (SessionWrapper wrapper = ctx.getSession(obj)) {
        //    CoreSession session = wrapper.getSession();
        //    ...
        //}

        jg.writeFieldName(NAME);
        jg.writeObject(Collections.EMPTY_MAP);
    }
}
