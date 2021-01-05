# vim:set ft=dockerfile:
ARG BASE_IMAGE

FROM ${BASE_IMAGE}

ARG VERSION
ARG SCM_REF
ARG BUILD_TAG
ARG CLID
ARG PACKAGES

LABEL com.customer.sample.version=${VERSION}
LABEL com.customer.sample.scm-ref=${SCM_REF}
LABEL com.customer.sample.build-tag=${BUILD_TAG}

COPY --chown=nuxeo:0 target/<%= global._options.dirname %>-package-*.zip /home/nuxeo/local-packages/<%= global._options.dirname %>-package.zip

<% if ( v.isBefore('11.4')) { -%>
RUN /install-local-packages.sh /home/nuxeo/local-packages/<%= global._options.dirname %>-package.zip
<% } else { -%>
RUN /install-packages.sh --offline /home/nuxeo/local-packages/<%= global._options.dirname %>-package.zip
<% } -%>
<% if (typeof studio_package !== 'undefined') { -%>
RUN /install-packages.sh --clid ${CLID} ${PACKAGES}
<% } -%>
