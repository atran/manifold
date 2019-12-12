import { TwitterQueryNewContainer } from "../New";

describe("backend/containers/twitter-query/New", () => {
  def("root", () => (
    <TwitterQueryNewContainer dispatch={$dispatch} match={{ params: {} }} />
  ));

  it("matches the snapshot when rendered", () => {
    expect(render($withApp($root)).html()).toMatchSnapshot();
  });
});
