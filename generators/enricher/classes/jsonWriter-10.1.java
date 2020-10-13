package <%= package %>;

import static javax.ws.rs.core.MediaType.APPLICATION_JSON_TYPE;
import static org.nuxeo.ecm.core.io.registry.MarshallingConstants.WILDCARD_VALUE;
import static org.nuxeo.ecm.core.io.registry.reflect.Instantiations.SINGLETON;
import static org.nuxeo.ecm.core.io.registry.reflect.Priorities.REFERENCE;

import java.io.IOException;

import javax.inject.Inject;

import com.fasterxml.jackson.core.JsonGenerator;
import <%= entity_type_c %>;
import org.nuxeo.ecm.core.api.CoreSession;
import org.nuxeo.ecm.core.io.marshallers.json.ExtensibleEntityJsonWriter;
import org.nuxeo.ecm.core.io.registry.reflect.Setup;

import com.thoughtworks.xstream.io.json.JsonWriter;

@Setup(mode = SINGLETON, priority = REFERENCE)
public class <%= s.strRightBack(entity_type_c, '.')%>JsonWriter extends ExtensibleEntityJsonWriter<<%= s.strRightBack(entity_type_c, '.')%>> {

    public static final String ENTITY_TYPE = "<%= s.underscored(s.strRightBack(entity_type_c, '.')).toLowerCase() %>";

    public <%= s.strRightBack(entity_type_c, '.')%>JsonWriter() {
        super(ENTITY_TYPE, <%= s.strRightBack(entity_type_c, '.')%>.class);
    }

    @Override
    protected void writeEntityBody(<%= s.strRightBack(entity_type_c, '.')%> obj, JsonGenerator jg) throws IOException {
        // jg.writeStringField("field", obj.getMyValue());
        // jg.writeBooleanField("booleanField", obj.getMyBooleanValue());

        // jg.writeArrayFieldStart("arrayField");
        // for (String value : obj.getArray()) {
        //     jg.writeString(value);
        // }
        // jg.writeEndArray();
    }
}
