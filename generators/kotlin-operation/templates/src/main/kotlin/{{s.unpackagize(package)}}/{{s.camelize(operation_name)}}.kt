package <%= package %>

import org.nuxeo.ecm.automation.core.Constants
import org.nuxeo.ecm.automation.core.annotations.Context
import org.nuxeo.ecm.automation.core.annotations.Operation
import org.nuxeo.ecm.automation.core.annotations.OperationMethod
import org.nuxeo.ecm.automation.core.annotations.Param
import org.nuxeo.ecm.core.api.CoreSession
import org.nuxeo.ecm.core.api.DocumentModel
import org.nuxeo.ecm.core.api.PathRef

@Operation(id = "Document.<%= s.camelize(operation_name) %>", category = Constants.CAT_DOCUMENT, label="<%= operation_label %>", description="Describe here what your operation does.")
open class <%= s.camelize(operation_name) %> {

    @Context
    protected lateinit var session: CoreSession

    @Param(name = "path", required = false)
    protected var path: String? = null

    @OperationMethod
    fun run(): DocumentModel {
        return when {
            path.isNullOrBlank() -> session.rootDocument
            else -> session.getDocument(PathRef(path))
        }
    }
}
