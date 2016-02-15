package <%= package %>;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertTrue;

import java.io.IOException;

import javax.inject.Inject;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.nuxeo.ecm.automation.client.Session;
import org.nuxeo.ecm.automation.client.model.Document;
import org.nuxeo.ecm.automation.test.EmbeddedAutomationServerFeature;
import org.nuxeo.ecm.core.test.DefaultRepositoryInit;
import org.nuxeo.ecm.core.test.annotations.Granularity;
import org.nuxeo.ecm.core.test.annotations.RepositoryConfig;
import org.nuxeo.runtime.test.runner.Deploy;
import org.nuxeo.runtime.test.runner.Features;
import org.nuxeo.runtime.test.runner.FeaturesRunner;
import org.nuxeo.runtime.test.runner.Jetty;

@RunWith(FeaturesRunner.class)
@Features(EmbeddedAutomationServerFeature.class)
@RepositoryConfig(init = DefaultRepositoryInit.class, cleanup = Granularity.METHOD)
@Jetty(port = 18080)
@Deploy("<%= symbolicName %>")
public class Test<%= s.camelize(operation_name) %> {

      @Inject
      protected Session clientSession;

      @Test
      public void shouldCallTheOperation() throws IOException {
          Object response = clientSession.newRequest(<%= s.camelize(operation_name) %>.ID).execute();
          assertTrue(response.getClass().equals(Document.class));
          Document root = (Document) response;
          assertEquals("/", root.getPath());
      }

      @Test
      public void shouldCallWithParameters() throws IOException {
          String path = "/default-domain";
          Object response = clientSession.newRequest(<%= s.camelize(operation_name) %>.ID).set("path", path).execute();
          assertTrue(response.getClass().equals(Document.class));
          Document root = (Document) response;
          assertEquals(path, root.getPath());
      }
}
