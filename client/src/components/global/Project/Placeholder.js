import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';

export default class ProjectPlaceholder extends Component {

  static displayName = "Project.Placeholder";

  static propTypes = {
    color: PropTypes.string
  };

  // static propTypes = {};
  // NB: project-thumb-placeholder can take 1 of 5 modifier classes (Primary through Quinary)
  // For background colors, or none for white.

  render() {
    const color = !this.props.color || this.props.color === "sentary" ? '' : this.props.color;
    const placeholderClasses = classNames(
      'project-thumb-placeholder',
      color
    );

    return (
      <svg version="1.1" className={placeholderClasses}
        x="0px" y="0px" width="200.34735px" height="200.68436px"
        viewBox="0 0 200.34735 200.68436"
      >
        {/* Disable max-length on linter for long SVG path declarations */}
        {/* eslint-disable max-len */}
        <path className="highlight" d="M183.11963,5v6.28238h6.11389v6.28235h6.11383v178.11963H17.22769v-6.28235H11.1138v-6.28235H5V5H183.11963 M188.11963,0h-5H5H0v5v178.11966v5h5h1.1138v1.28235v5h5h1.11389v1.28235v5h5h178.11966h5v-5V17.56473v-5h-5h-1.11383v-1.28235v-5 h-5h-1.11389V5V0L188.11963,0z"/>
        <g>
          <polygon className="background" points="189.23352,17.56471 189.23352,11.28236 183.11963,11.28236 183.11963,5.00002 5,5.00002 5,183.11964 11.11383,183.11964 11.11383,189.40199 17.22772,189.40199 17.22772,195.68434 195.34735,195.68434 195.34735,17.56471 	"/>
        </g>
        <path className="outline" d="M189.73315,17.06471v-6.28223h-6.61353V5.00002H5v178.11963h5.61401v6.78247h6.11377v6.28223h179.11963 V17.06471H189.73315z M6,6.00002h176.11963v176.11963H6V6.00002z M11.61401,183.11964h171.50562V11.78249h5.61353v177.11963 H11.61401V183.11964z M194.84741,195.18434H17.72778v-5.28223h172.00537V18.06471h5.11426V195.18434z"/>
        <rect x="14.11386" y="14.28239" className="tile" width="160.07072" height="159.2132"/>
        <g>
          <path className="icon" d="M132.0144,51.18338h-4.47949c-2.17676,0-3.94727,1.77051-3.94727,3.94727v2.68994v5.63721v64.6084 c0,0.11859,0.02844,0.23358,0.06946,0.34436c0.01001,0.02704,0.01947,0.05273,0.03174,0.07867 c0.01019,0.02161,0.01495,0.04529,0.02673,0.06622l5.1875,9.24805c0.17676,0.31543,0.51074,0.51074,0.87207,0.51074 s0.69531-0.19531,0.87207-0.51074l5.18652-9.24805c0.01172-0.02087,0.01654-0.04449,0.02667-0.06604 c0.01233-0.02606,0.02185-0.05188,0.03192-0.0791c0.04095-0.11072,0.06934-0.22565,0.06934-0.34412v-64.6084v-5.63721v-2.68994 C135.96167,52.95389,134.19116,51.18338,132.0144,51.18338z M128.58698,133.15195l-2.29163-4.08575h6.9588l-2.29114,4.08575 H128.58698z M133.96167,62.45779h-8.37402v-3.63721h8.37402V62.45779z M125.58765,127.06619v-62.6084h8.37402v62.6084H125.58765z M125.58765,55.13065c0-1.07373,0.87402-1.94727,1.94727-1.94727h4.47949c1.07324,0,1.94727,0.87354,1.94727,1.94727v1.68994 h-8.37402V55.13065z"/>
          <path className="icon" d="M129.77515,68.31131c-0.55273,0-1,0.44775-1,1v52.90039c0,0.55273,0.44727,1,1,1s1-0.44727,1-1V69.31131 C130.77515,68.75906,130.32788,68.31131,129.77515,68.31131z"/>
          <path className="icon" d="M79.85767,138.31424c-0.11768,0-0.23633-0.02051-0.35107-0.06348 c-0.39014-0.14648-0.64893-0.51953-0.64893-0.93652v-10.07812H54.24976c-0.55225,0-1-0.44727-1-1V87.3743c0-0.55225,0.44775-1,1-1 h49.7793c0.55273,0,1,0.44775,1,1v38.86182c0,0.55273-0.44727,1-1,1H89.97778l-9.3667,10.73535 C80.41772,138.19412,80.14087,138.31424,79.85767,138.31424z M55.24976,125.23611h24.60791c0.55225,0,1,0.44727,1,1v8.41113 l7.91211-9.06836c0.18994-0.21777,0.46436-0.34277,0.75342-0.34277h13.50586V88.3743h-47.7793V125.23611z"/>
          <g>
            <path className="icon" d="M95.51831,99.28397H62.61694c-0.55225,0-1-0.44775-1-1s0.44775-1,1-1h32.90137c0.55225,0,1,0.44775,1,1 S96.07056,99.28397,95.51831,99.28397z"/>
          </g>
          <g>
            <path className="icon" d="M95.51831,115.50076H62.61694c-0.55225,0-1-0.44727-1-1s0.44775-1,1-1h32.90137c0.55225,0,1,0.44727,1,1 S96.07056,115.50076,95.51831,115.50076z"/>
          </g>
          <g>
            <path className="icon" d="M95.51831,107.39236H62.61694c-0.55225,0-1-0.44727-1-1s0.44775-1,1-1h32.90137c0.55225,0,1,0.44727,1,1 S96.07056,107.39236,95.51831,107.39236z"/>
          </g>
          <path className="icon" d="M109.28003,52.78299c-1.61133-0.66699-3.38086-0.31689-4.61523,0.91846l-9.77301,9.77301 c-0.84857-4.08429-4.4743-7.16315-8.80658-7.16315c-4.71863,0-8.59265,3.65491-8.9585,8.28156l-0.39795-0.16779 c-1.62891-0.68701-3.49707-0.68701-5.12793,0l-0.39746,0.1676c-0.21765-2.75134-1.67444-5.15582-3.81543-6.65491l8.60205-8.60205 c0.77832-0.77832,1.76855-0.76221,2.43652-0.48486c0.66748,0.27686,1.38037,0.96436,1.38037,2.06641c0,0.55225,0.44775,1,1,1 s1-0.44775,1-1c0-1.74609-1.00195-3.24561-2.61523-3.91406c-1.61182-0.66797-3.38135-0.31543-4.61572,0.91846l-9.02679,9.02679 c-1.02441-0.40656-2.13727-0.63715-3.30475-0.63715c-4.95947,0-8.99463,4.03516-8.99463,8.99512 c0,4.95947,4.03516,8.99463,8.99463,8.99463c4.44836,0,8.14288-3.24884,8.8598-7.49609l1.27399-0.53711 c1.13672-0.47803,2.43896-0.47803,3.57373,0l1.27393,0.53693c0.71686,4.24731,4.41144,7.49628,8.85938,7.49628 c4.67279,0,8.52167-3.58221,8.95203-8.14392l11.04163-11.04163c0.77832-0.77881,1.76562-0.76172,2.43652-0.48486 c0.66699,0.27637,1.37988,0.96436,1.37988,2.06592c0,0.55225,0.44727,1,1,1s1-0.44775,1-1 C111.89526,54.95047,110.89331,53.45096,109.28003,52.78299z M62.24438,72.30106c-3.85693,0-6.99463-3.1377-6.99463-6.99463 s3.1377-6.99512,6.99463-6.99512s6.99512,3.13818,6.99512,6.99512S66.10132,72.30106,62.24438,72.30106z M86.08521,72.30106 c-3.85693,0-6.99463-3.1377-6.99463-6.99463s3.1377-6.99512,6.99463-6.99512s6.99512,3.13818,6.99512,6.99512 S89.94214,72.30106,86.08521,72.30106z"/>
        </g>
        {/* eslint-enable max-len */}
      </svg>
    );
  }
}
