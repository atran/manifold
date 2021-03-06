import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import FilteredList from "./FilteredList";
import ReaderNotes from "reader/containers/ReaderNotes";
import GlobalDrawer from "global/containers/drawer";

export default class ReaderDrawer extends PureComponent {
  static displayName = "Notes.ReaderDrawer";

  static propTypes = {
    visible: PropTypes.bool
  };

  renderNotesDrawerContents(props) {
    if (!props.visible) return null;
    return (
      <ReaderNotes filterable>
        <FilteredList />
      </ReaderNotes>
    );
  }

  render() {
    const drawerProps = {
      open: this.props.visible,
      context: "reader",
      size: "wide",
      padding: "none",
      identifier: "notes-drawer",
      lockScroll: "always",
      includeDrawerFrontMatter: true,
      focusTrap: false,
      title: "My Notes"
    };

    return (
      <GlobalDrawer.Wrapper {...drawerProps}>
        {this.renderNotesDrawerContents(this.props)}
      </GlobalDrawer.Wrapper>
    );
  }
}
