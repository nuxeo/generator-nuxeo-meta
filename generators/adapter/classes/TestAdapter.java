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
    String testTitle = "My Adapter Title";

    DocumentModel doc = session.createDocumentModel("/", "test-adapter", doctype);
    <%= s.capitalize(doctype) %>Adapter adapter = doc.getAdapter(<%= s.capitalize(doctype) %>Adapter.class);
    adapter.setTitle(testTitle);
    Assert.assertEquals("Document title does not match when using the adapter", testTitle, adapter.getTitle());
  }
}
