#/bin/bash
# Move to the project folder
cd ${HOME}/workspace/<%= global._options.dirname %>
# Configure the synchronize
nuxeo sync configure --params.deployment="Docker Compose Deployment" --params.serviceName="<%= global._options.dirname %>_nuxeo_1" --params.src="${HOME}/workspace/<%= project %>/studio/resources/nuxeo.war/ui" --batch
# Configure the hotreload
nuxeo hotreload configure --params.deployment="Docker Compose Deployment" --params.serviceName="<%= global._options.dirname %>_nuxeo_1" <% if (ignoredModules && ignoredModules.length > 0) { -%> --params.ignoredModules="<%= ignoredModules.join(',') %>" <% } -%> --batch
