import React, { PureComponent, PropTypes } from 'react';
import { Form } from 'components/backend';
import { Form as FormContainer } from 'containers/backend';
import { Resource } from 'components/backend';
import { resourcesAPI } from 'api';
import { notificationActions } from 'actions';
import { connect } from 'react-redux';

class ResourceDetailGeneralContainer extends PureComponent {

  static displayName = "ResourceDetail.General";
  static activeNavItem = "general";

  static propTypes = {
  };

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <section>
        <FormContainer.Form
          route={this.props.routes[this.props.routes.length - 1]}
          model={this.props.resource}
          name="backend-resource-update"
          update={resourcesAPI.update}
          create={(model) => resourcesAPI.create(this.props.params.projectId, model) }
          className="form-secondary"
        >
          <Form.TextInput
            label="Title"
            focusOnMount
            name="attributes[title]"
            placeholder="Enter a resource title"
          />
          <Form.TextArea
            label="Description"
            focusOnMount
            name="attributes[description]"
            placeholder="Enter a description"
          />
          <Form.TextInput
            label="Caption"
            focusOnMount
            name="attributes[caption]"
            placeholder="Enter a caption"
          />
          <Form.TextInput
            label="Keywords"
            focusOnMount
            name="attributes[keywords]"
            placeholder="Enter some keywords separated by , or ;"
          />
          <Form.Switch
            label="Allow Download?"
            name="attributes[allowDownload]"
          />
          <Form.Save
            text="Update Resource"
          />
        </FormContainer.Form>
      </section>
    );
  }
}

export default connect(
  ResourceDetailGeneralContainer.mapStateToProps
)(ResourceDetailGeneralContainer);
