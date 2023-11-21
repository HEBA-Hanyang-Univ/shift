import React from "react";
import "assets/styles/Icon.scss";
import mbtiIcon from "assets/images/SH_icons/MBTI.svg";
import mbtiCompIcon from "assets/images/SH_icons/MBTI_Comp.svg";
import motiveIcon from "assets/images/SH_icons/Motive.svg";
import motiveCompIcon from "assets/images/SH_icons/Motive_Comp.svg";
import valueIcon from "assets/images/SH_icons/Value.svg";
import valueCompIcon from "assets/images/SH_icons/Value_Comp.svg";
import EconomyIcon from "assets/images/SH_icons/Economy.svg";
import EconomyCompIcon from "assets/images/SH_icons/Economy_Comp.svg";
import relationshipIcon from "assets/images/SH_icons/Relationship.svg";
import relationshipCompIcon from "assets/images/SH_icons/Relationship_Comp.svg";
import timeControlIcon from "assets/images/SH_icons/TimeControl.svg";
import timeControlCompIcon from "assets/images/SH_icons/TimeControl_Comp.svg";
import workAbilityIcon from "assets/images/SH_icons/Work.svg";
import workAbilityCompIcon from "assets/images/SH_icons/Work_Comp.svg";
import internalFactorIcon from "assets/images/SH_icons/InternalFactor.svg";
import internalFactorCompIcon from "assets/images/SH_icons/InternalFactor_Comp.svg";
import externalFactorIcon from "assets/images/SH_icons/ExternalFactor.svg";
import externalFactorCompIcon from "assets/images/SH_icons/ExternalFactor_Comp.svg";
import internalViewIcon from "assets/images/SH_icons/InternalView.svg";
import internalViewCompIcon from "assets/images/SH_icons/InternalView_Comp.svg";
import externalViewIcon from "assets/images/SH_icons/ExternalView.svg";
import externalViewCompIcon from "assets/images/SH_icons/ExternalView_Comp.svg";
import defineIcon from "assets/images/SH_icons/Define.svg";
import defineCompIcon from "assets/images/SH_icons/Define_Comp.svg";
import remindIcon from "assets/images/SH_icons/Remind.svg";
import remindCompIcon from "assets/images/SH_icons/Remind_Comp.svg";
import resultIcon from "assets/images/SH_icons/Result.svg";
import resultCompIcon from "assets/images/SH_icons/Result_Comp.svg";

const icons = [
  { incomplete: mbtiIcon, complete: mbtiCompIcon},
  { incomplete: motiveIcon, complete: motiveCompIcon},
  { incomplete: valueIcon, complete: valueCompIcon},
  { incomplete: EconomyIcon, complete: EconomyCompIcon},
  { incomplete: relationshipIcon, complete: relationshipCompIcon},
  { incomplete: timeControlIcon, complete: timeControlCompIcon},
  { incomplete: workAbilityIcon, complete: workAbilityCompIcon},
  { incomplete: internalFactorIcon, complete: internalFactorCompIcon},
  { incomplete: externalFactorIcon, complete: externalFactorCompIcon},
  { incomplete: internalViewIcon, complete: internalViewCompIcon},
  { incomplete: externalViewIcon, complete: externalViewCompIcon},
  { incomplete: defineIcon, complete: defineCompIcon},
  { incomplete: remindIcon, complete: remindCompIcon},
  { incomplete: resultIcon, complete: resultCompIcon}
];

const Icon = ({ index, completed }) => {
  const icon= completed ? icons[index].complete : icons[index].incomplete;

  return (
    <button className="iconBtn">
      <img src={icon} alt={`icon${index}`} />
    </button>
  )
};

export default Icon;