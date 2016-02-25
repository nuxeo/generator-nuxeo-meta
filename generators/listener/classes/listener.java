package <%= package %>;
<% var interface = 'EventListener';
if (async) {
  interface = 'PostCommitFilteringEventListener';
} %>
<% if (async) { -%>
import java.util.Arrays;
import java.util.List;
<%  } -%>

import org.nuxeo.ecm.core.api.DocumentModel;
import org.nuxeo.ecm.core.event.Event;
import org.nuxeo.ecm.core.event.EventContext;
import org.nuxeo.ecm.core.event.<%= interface %>;
<% if (async) { %>import org.nuxeo.ecm.core.event.EventBundle;<% } %>
import org.nuxeo.ecm.core.event.impl.DocumentEventContext;

public class <%= s.camelize(listener_name) %> implements <%= interface %> {
  <% if (async) { %>
  protected final List<String> handled = Arrays.asList(<%- '"' + events.concat(custom_events).join('", "') + '"' %>);
  <% } %>

    @Override<% if (async) { %>
    public void handleEvent(EventBundle events) {
        for (Event event : events) {
            if (acceptEvent(event)) {
                handleEvent(event);
            }
        }
    }

    @Override
    public boolean acceptEvent(Event event) {
        return handled.contains(event.getName());
    }

  <% } %>
    public void handleEvent(Event event) {
        EventContext ctx = event.getContext();
        if (!(ctx instanceof DocumentEventContext)) {
          return;
        }

        DocumentEventContext docCtx = (DocumentEventContext) ctx;
        DocumentModel doc = docCtx.getSourceDocument();

        // Add some logic starting from here.
    }
}
