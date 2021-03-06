import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import connectAndFetch from "utils/connectAndFetch";
import Utility from "frontend/components/utility";
import Resource from "frontend/components/resource";
import { entityStoreActions, fatalErrorActions } from "actions";
import { select } from "utils/entityUtils";
import { resourcesAPI, resourceCollectionsAPI, requests } from "api";
import lh from "helpers/linkHandler";
import LoadingBlock from "global/components/loading-block";
import BackLink from "frontend/components/back-link";
import HeadContent from "global/components/HeadContent";
import some from "lodash/some";
import withSettings from "hoc/with-settings";
import CheckFrontendMode from "global/containers/CheckFrontendMode";

const { request, flush } = entityStoreActions;

export class ResourceDetailContainer extends PureComponent {
  static fetchData = (getState, dispatch, location, match) => {
    const resourceFetch = resourcesAPI.show(match.params.resourceId);
    const resourceAction = request(resourceFetch, requests.feResource);
    const { promise: one } = dispatch(resourceAction);
    const promises = [one];
    if (match.params.resourceCollectionId) {
      const collectionFetch = resourceCollectionsAPI.show(
        match.params.resourceCollectionId
      );
      const collectionAction = request(
        collectionFetch,
        requests.feResourceCollection
      );
      const { promise: two } = dispatch(collectionAction);
      promises.push(two);
    }
    return Promise.all(promises);
  };

  static mapStateToProps = state => {
    return {
      resourceCollection: select(
        requests.feResourceCollection,
        state.entityStore
      ),
      resource: select(requests.feResource, state.entityStore),
      visibility: state.ui.transitory.visibility
    };
  };

  static propTypes = {
    project: PropTypes.object,
    resourceCollection: PropTypes.object,
    settings: PropTypes.object.isRequired,
    resource: PropTypes.object,
    dispatch: PropTypes.func,
    visibility: PropTypes.object
  };

  UNSAFE_componentWillMount() {
    if (this.props.resource && this.props.resourceCollection) {
      if (
        !this.collectionIncludesResource(
          this.props.resourceCollection,
          this.props.resource
        )
      ) {
        this.props.dispatch(fatalErrorActions.trigger404());
      }
    }
  }

  componentWillUnmount() {
    this.props.dispatch(flush(requests.feResource));
  }

  collectionIncludesResource(collection, resource) {
    return some(collection.relationships.resources, collectionResource => {
      return collectionResource.id === resource.id;
    });
  }

  collectionUrl() {
    return lh.link(
      "frontendProjectResourceCollection",
      this.props.project.attributes.slug,
      this.props.resourceCollection.attributes.slug
    );
  }

  projectUrl() {
    return lh.link(
      "frontendProjectResources",
      this.props.project.attributes.slug
    );
  }

  resourceUrl() {
    return lh.link(
      "frontendProjectResource",
      this.props.project.attributes.slug,
      this.props.resource.attributes.slug
    );
  }

  render() {
    const { project, resource, resourceCollection, settings } = this.props;

    if (!project || !resource) {
      return <LoadingBlock />;
    }

    return (
      <div>
        <CheckFrontendMode debugLabel="ResourceDetail" isProjectSubpage />

        <HeadContent
          title={`\u201c${resource.attributes.titlePlaintext}\u201d Resource on ${settings.attributes.general.installationName}`}
          description={resource.attributes.captionPlaintext}
          image={
            resource.attributes.attachmentStyles.mediumSquare ||
            resource.attributes.variantThumbnailStyles.mediumSquare
          }
        />
        {resourceCollection ? (
          <BackLink.Register
            backText="Back to Collection"
            link={this.collectionUrl()}
            title={resourceCollection.attributes.title}
          />
        ) : (
          <BackLink.Register
            backText="Back to Book Resources"
            link={this.projectUrl()}
            title={project.attributes.titlePlaintext}
          />
        )}
        {resource ? (
          <Resource.Detail
            projectId={project.id}
            projectUrl={this.projectUrl()}
            resourceUrl={this.resourceUrl()}
            resource={resource}
            dispatch={this.props.dispatch}
          />
        ) : (
          <LoadingBlock />
        )}
        {project ? (
          <section className="bg-neutral05">
            <Utility.BackLinkSecondary
              backText="Back to Book Resources"
              link={this.projectUrl()}
            />
          </section>
        ) : null}
      </div>
    );
  }
}

export default connectAndFetch(withSettings(ResourceDetailContainer));
