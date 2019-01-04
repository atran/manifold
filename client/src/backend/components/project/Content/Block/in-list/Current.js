import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import Utility from "global/components/utility";
import Identity from "../parts/Identity";
import VisibilityToggle from "../parts/VisibilityToggle";

export default class ProjectContentBlockInListCurrent extends PureComponent {
  static displayName = "Project.Content.Block.InList.Current";

  static propTypes = {
    entity: PropTypes.object.isRequired,
    entityCallbacks: PropTypes.object.isRequired,
    typeComponent: PropTypes.oneOfType([PropTypes.string, PropTypes.func])
  };

  get entity() {
    return this.props.entity;
  }

  get configurable() {
    return this.entity.attributes.configurable;
  }

  render() {
    const TypeComponent = this.props.typeComponent;

    return (
      <TypeComponent>
        {block => (
          <React.Fragment>
            <div className="identity">
              <Identity
                icon={block.icon}
                title={`${block.title} [ID: ${this.entity.id}]`}
              />
            </div>
            <div className="actions">
              <button
                className="action"
                onClick={this.props.entityCallbacks.deleteBlock}
              >
                <Utility.IconComposer icon="mug" size={30} />
              </button>
              <VisibilityToggle
                entity={this.entity}
                entityCallbacks={this.props.entityCallbacks}
              />
              {this.configurable
                ? <button
                    className="action"
                    onClick={this.props.entityCallbacks.editBlock}
                  >
                    <Utility.IconComposer icon="touch" size={30} />
                  </button>
                : null}
              <button className="action" {...this.props.dragHandleProps}>
                <Utility.IconComposer icon="barsDoubleHorizontal" size={30} />
              </button>
            </div>
          </React.Fragment>
        )}
      </TypeComponent>
    );
  }
}