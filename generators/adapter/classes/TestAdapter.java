package <%= package %>;

import javax.inject.Inject;

import org.junit.Assert;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.nuxeo.ecm.core.api.CoreSession;
import org.nuxeo.ecm.core.api.DocumentModel;
import org.nuxeo.ecm.core.test.CoreFeature;
import org.nuxeo.runtime.test.runner.Deploy;
import org.nuxeo.runtime.test.runner.Features;
import org.nuxeo.runtime.test.runner.FeaturesRunner;
import <%= package %>.<%= s.capitalize(doctype) %>Adapter;

@RunWith(FeaturesRunner.class)
@Features(CoreFeature.class)
@Deploy({"<%= symbolicName %>"})
public class Test<%= s.capitalize(doctype) %>Adapter {
  @Inject
  CoreSession session;

  @Test
  public void shouldCallTheAdapter() {
    String doctype = "<%= doctype %>";

    DocumentModel doc = session.createDocumentModel("/", "test-adapter", doctype);
    doc = session.createDocument(doc);
    session.save();
    <%= s.capitalize(doctype) %>Adapter adapter = doc.getAdapter(<%= s.capitalize(doctype) %>Adapter.class);
    Assert.assertNotNull("The adapter can't be used on the " + doctype + " document type", adapter);
  }
}
