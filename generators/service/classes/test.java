package <%= package %>;

import static org.junit.Assert.assertNotNull;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.nuxeo.ecm.platform.test.PlatformFeature;
import org.nuxeo.runtime.test.runner.Deploy;
import org.nuxeo.runtime.test.runner.Features;
import org.nuxeo.runtime.test.runner.FeaturesRunner;

import com.google.inject.Inject;

@RunWith(FeaturesRunner.class)
@Features({ PlatformFeature.class })
@Deploy("<%= symbolicName %>")
public class Test<%= s.camelize(service_name) %> {

    @Inject
    protected <%= s.camelize(service_name) %> <%= s.decapitalize(s.camelize(service_name)) %>;

    @Test
    public void testService() {
        assertNotNull(<%= s.decapitalize(s.camelize(service_name)) %>);
    }
}
