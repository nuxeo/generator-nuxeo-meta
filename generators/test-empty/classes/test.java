package <%= package %>;
<% 
var feature;
var f_package;

switch (runner_feature) {
  case 'CoreFeature':
    feature = 'CoreFeature';
    f_package = 'org.nuxeo.ecm.core.test';
    break;
  case 'PlatformFeature':
    feature = 'PlatformFeature'
    f_package = 'org.nuxeo.ecm.platform.test';
    break;
  case 'AutomationFeature':
    feature = 'AutomationFeature'
    f_package = 'org.nuxeo.ecm.automation.test';
    break;
  case 'EmbeddedAutomationServerFeature':
    feature = 'EmbeddedAutomationServerFeature';
    f_package = 'org.nuxeo.ecm.automation.test';
    break;
  case 'AuditFeature':
    feature = 'AuditFeature';
    f_package = 'org.nuxeo.ecm.platform.audit';
    break;
  default:
    break;
}
%>
import static org.junit.Assert.*;

import javax.inject.Inject;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.nuxeo.ecm.core.api.CoreSession;
import org.nuxeo.ecm.core.test.DefaultRepositoryInit;
import org.nuxeo.ecm.core.test.annotations.Granularity;
import org.nuxeo.ecm.core.test.annotations.RepositoryConfig;
import org.nuxeo.runtime.test.runner.Deploy;
import org.nuxeo.runtime.test.runner.Features;
import org.nuxeo.runtime.test.runner.FeaturesRunner;<% if (f_package) { %>
import <%= f_package + '.' + feature %>;
<% } -%>

/**
 * Empty Unit Testing class.
 * <p/>
 * 
 * @see <a href="https://doc.nuxeo.com/corg/unit-testing/">Unit Testing</a>
 */
@RunWith(FeaturesRunner.class)<% if (feature) { %>
@Features(<%= feature %>.class)
<% } %>@RepositoryConfig(init = DefaultRepositoryInit.class, cleanup = Granularity.METHOD)
@Deploy("<%= symbolicName %>")
public class <%= s.camelize(test_name) %> {

    @Inject
    protected CoreSession session;

    @Test
    public void emptyTest() {
        assertNull(null);
    }
}
