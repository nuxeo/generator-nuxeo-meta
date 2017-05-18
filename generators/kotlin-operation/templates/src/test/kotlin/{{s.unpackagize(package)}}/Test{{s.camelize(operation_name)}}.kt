package <%= package %>

import com.google.inject.Inject
import org.junit.Assert.assertEquals
import org.junit.Test
import org.junit.runner.RunWith
import org.nuxeo.ecm.automation.AutomationService
import org.nuxeo.ecm.automation.OperationContext
import org.nuxeo.ecm.automation.test.AutomationFeature
import org.nuxeo.ecm.core.api.CoreSession
import org.nuxeo.ecm.core.api.DocumentModel
import org.nuxeo.runtime.test.runner.Deploy
import org.nuxeo.runtime.test.runner.Features
import org.nuxeo.runtime.test.runner.FeaturesRunner
import java.util.*

@RunWith(FeaturesRunner::class)
@Features(AutomationFeature::class)
@Deploy("<%= symbolicName %>")
open class Test<%= s.camelize(operation_name) %> {

    @Inject
    protected var session: CoreSession? = null

    @Inject
    protected var automationService: AutomationService? = null

    @Test
    fun shouldCallTheOperation() {
        val ctx = OperationContext(session)

        val doc = automationService!!.run(ctx, "Document.<%= s.camelize(operation_name) %>") as DocumentModel
        assertEquals("/", doc.pathAsString)
    }

    @Test
    fun shouldCallWithParameters() {
        val path = "/default-domain"
        val ctx = OperationContext(session)
        val params = HashMap<String, Any>()
        params.put("path", path)

        val doc = automationService!!.run(ctx, "Document.<%= s.camelize(operation_name) %>", params) as DocumentModel
        assertEquals(path, doc.pathAsString)
    }
}
