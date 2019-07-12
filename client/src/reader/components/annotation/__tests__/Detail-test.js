import React from "react";
import { Provider } from "react-redux";
import AnnotationDetail from "global/components/Annotation/Annotation/UserContent/index.js";
import renderer from "react-test-renderer";
import build from "test/fixtures/build";
import { wrapWithRouter } from "test/helpers/routing";

describe("Reader.Annotation.Annotation component", () => {
  const annotation = build.entity.annotation(
    "2",
    {},
    { creator: build.entity.user("1") }
  );
  const store = build.store();
  const showLogin = jest.fn();

  const root = wrapWithRouter(
    <Provider store={store}>
      <AnnotationDetail annotation={annotation} showLogin={showLogin} />
    </Provider>
  );

  it("renders correctly", () => {
    const component = renderer.create(root);
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
