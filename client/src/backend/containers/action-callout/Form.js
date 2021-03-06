import React, { Component } from "react";
import PropTypes from "prop-types";
import connectAndFetch from "utils/connectAndFetch";
import { projectsAPI, actionCalloutsAPI, requests } from "api";
import FormContainer from "global/containers/form";
import Form from "global/components/form";
import { entityStoreActions } from "actions";
import lh from "helpers/linkHandler";
import Navigation from "backend/components/navigation";
import withConfirmation from "hoc/with-confirmation";

const { request } = entityStoreActions;

export class ActionCalloutForm extends Component {
  static displayName = "ActionCallout.Form";

  static propTypes = {
    project: PropTypes.object.isRequired,
    confirm: PropTypes.func.isRequired,
    dispatch: PropTypes.func.isRequired,
    history: PropTypes.object.isRequired,
    actionCallout: PropTypes.object.isRequired
  };

  onDelete = () => {
    const heading = "Are you sure you want to delete this call-to-action?";
    const message = "This action cannot be undone.";
    this.props.confirm(heading, message, () => this.onConfirmedDelete());
  };

  onConfirmedDelete = () => {
    const call = actionCalloutsAPI.destroy(this.actionCallout.id);
    const options = {
      removes: { type: "actionCallout", id: this.actionCallout.id }
    };
    const destroyRequest = request(
      call,
      requests.beActionCalloutDestroy,
      options
    );
    this.props.dispatch(destroyRequest).promise.then(() => {
      this.closeDrawer();
    });
  };

  get project() {
    return this.props.project;
  }

  get requestName() {
    return this.actionCallout.id
      ? requests.beActionCalloutCreate
      : requests.beActionCalloutUpdate;
  }

  get actionCallout() {
    return this.props.actionCallout;
  }

  get drawerTitle() {
    if (this.actionCallout.id) return "Edit Call-to-Action";
    return "New Call-to-Action";
  }

  get buttons() {
    return [
      {
        onClick: this.onDelete,
        label: "delete",
        icon: "delete32",
        iconClass: "utility-button__icon--notice"
      }
    ];
  }

  get kindOptions() {
    return [
      { label: "Link", value: "link" },
      { label: "Start Reading", value: "read" },
      { label: "Table of Contents", value: "toc" },
      { label: "Download", value: "download" }
    ];
  }

  get visibilityOptions() {
    return [
      { label: "Always Visible", value: "always" },
      { label: "Visible Only When Authorized", value: "authorized" },
      { label: "Visible Only When Unauthorized ", value: "unauthorized" }
    ];
  }

  get textOptions() {
    const options = [{ label: "Select Text", value: "" }];
    const texts = this.project.relationships.texts.map(text => {
      return { label: text.attributes.title, value: text };
    });
    return options.concat(texts);
  }

  closeDrawer = () => {
    this.fetchActionCallouts();
    return this.props.history.push(
      lh.link("backendProjectLayout", this.project.id),
      { noScroll: true }
    );
  };

  shouldShowTextsForKind(kind) {
    return kind === "read" || kind === "toc";
  }

  shouldShowVisibilityForKind(kind) {
    return kind === "link" || kind === "download";
  }

  shouldShowUrlForKind(kind) {
    return kind === "link";
  }

  shouldShowAttachmentForKind(kind) {
    return kind === "download";
  }

  create = model => {
    const adjusted = { ...model };
    return actionCalloutsAPI.create(this.project.id, adjusted);
  };

  fetchActionCallouts = () => {
    const call = projectsAPI.actionCallouts(this.project.id);
    const actionCalloutsRequest = request(
      call,
      requests.beProjectActionCallouts
    );
    this.props.dispatch(actionCalloutsRequest);
  };

  render() {
    return (
      <>
        <Navigation.DrawerHeader
          icon="touch64"
          title={this.drawerTitle}
          buttons={this.buttons}
        />
        <FormContainer.Form
          model={this.actionCallout}
          name={this.requestName}
          update={actionCalloutsAPI.update}
          create={this.create}
          onSuccess={this.closeDrawer}
          className="form-secondary"
          notificationScope="drawer"
        >
          {getModelValue => (
            <>
              <Form.TextInput
                label="Title"
                name="attributes[title]"
                focusOnMount
              />
              <Form.Select
                label="Type"
                options={this.kindOptions}
                name="attributes[kind]"
              />
              {this.shouldShowVisibilityForKind(
                getModelValue("attributes[kind]")
              ) && (
                <Form.Select
                  label="Visibility"
                  options={this.visibilityOptions}
                  name="attributes[visibility]"
                />
              )}
              {this.shouldShowTextsForKind(
                getModelValue("attributes[kind]")
              ) && (
                <Form.Select
                  label="Link to Text"
                  placeholder="Select Text"
                  name="relationships[text]"
                  options={this.textOptions}
                  entityLabelAttribute={"title"}
                />
              )}
              {this.shouldShowUrlForKind(getModelValue("attributes[kind]")) && (
                <Form.TextInput label="URL" name="attributes[url]" />
              )}
              {this.shouldShowAttachmentForKind(
                getModelValue("attributes[kind]")
              ) && (
                <Form.Upload
                  layout="portrait"
                  label="Download File"
                  accepts="files"
                  readFrom="attributes[attachmentStyles][original]"
                  name="attributes[attachment]"
                  remove="attributes[removeAttachment]"
                />
              )}
              <Form.Save text="Save" />
            </>
          )}
        </FormContainer.Form>
      </>
    );
  }
}

export default withConfirmation(connectAndFetch(ActionCalloutForm));
