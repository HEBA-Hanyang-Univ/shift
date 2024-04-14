import TRO_IMG from "../../images/TRO.png";
import TRS_IMG from "../../images/TRS.png";
import TCO_IMG from "../../images/TCO.png";
import TCS_IMG from "../../images/TCS.png";
import PRO_IMG from "../../images/PRO.png";
import PRS_IMG from "../../images/PRS.png";
import PCO_IMG from "../../images/PCO.png";
import PCS_IMG from "../../images/PCS.png";

const stateData = {
  TRO: {
    title: "TRO",
    subTitle: "MZ 바이블형",
    img: TRO_IMG,
    hashTagTop: ["#솔직함", "#MZ력만렙"],
    hashTagBottom: ["#눈치99단", "#줏대있는", "#소신발언"],
    sectionThreeTitle : "당신은 MZ의 교과서 ",
    sectionThreeContent : [
      "행동에 꾸밈이 없고 솔직한 당신은 다른 사람들의 비위를 맞추고 싶어하지 않아요. 융통성 있는 척 하지만 사실 그렇게까지 융통성있지는 않습니다.",
      "그래도 다른 사람들은 당신을 이상하다 생각하기 보다는 유쾌하다 생각할 것입니다~ 전형적인 MZ이지만 당신은 호감형 MZ이니 걱정하지 마세요! 애초에 많이 걱정하지도 않을 것 같긴 하지만...",
      "눈치를 보지만 자신의 생각을 표현해야 한다고 판단이 설 경우 주저하지 않습니다.", 
    ]
  },

  TRS: {
    title: "TRS",
    subTitle: "MZ 빌런형",
    img: TRS_IMG,
    hashTagTop: ["#맑눈광", "#MZ력만렙"],
    hashTagBottom: ["#순진한", "#고집 센", "#넓고 얇은 인간관계"],
    sectionThreeTitle : "당신은 MZ 그 잡채!",
    sectionThreeContent : [
      "사회성 하나는 타고 났어요! 매사에 당당한 척 하지만, 마음 한 켠에는 이래도 되나? 하며 걱정하는 당신은 좋게 말하면 줏대 있고, 나쁘게 말하면 고집이 세다고 볼 수 있습니다. 그래도 인간관계에는 큰 문제가 없지만 가끔은 자중하라는 이야기를 듣기도 합니다.",
      "남들이 자신에게 조금이라도 좋지 않은 얘기를 하면 꽤나 많이 억울해하는 편이지만, 금새 잊고 또 실수를 저지른다고 볼 수 있지요~",
      "ㅋㅋㄹㅃㅃ",
    ]
  },

  TCO: {
    title: "TCO",
    subTitle: "MZ 오쏘몰형",
    img: TCO_IMG,
    hashTagTop: ["#인간 리트리버", "#비타민"],
    hashTagBottom: ["#극호감", "#갈등중재자", "#인기쟁이"],
    sectionThreeTitle : "당신은 MZ의 희망편",
    sectionThreeContent : [
      "당신은 이 세상에 꼭 필요한 사람입니다...",
      "항상 좋은 게 좋은거라 생각하며 살아가는 당신은 주로 갈등 상황에서 중재자 역할을 할 것으로 보입니다. 굳이 본인의 성격을 꾸며내지 않고 솔직해서 남녀노소 불문하고 인기가 많을 것입니다. 본인도 본인이 호감형이라는 것을 잘 알고 있겠죠?",
      "가식적인 사람을 좋아하지 않고, 본인처럼 쾌활하고 유쾌한 사람을 좋아합니다. 둥글둥글해 보이지만 본인만의 선이 확실한 당신은 선을 넘는 사람들과 손절하는 것에 거리낌이 없습니다.",
    ]  
  },

  TCS: {
    title: "TCS",
    subTitle: "MZ 뽀시래기형",
    img: TCS_IMG,
    hashTagTop: ["#무해한", "#MZ력만렙"],
    hashTagBottom: ["#순진한", "#고집 센", "#넓고 얇은 인간 관계"],
    sectionThreeTitle : "당신은 꽁꽁 얼어붙은 한강 위 MZ", 
    sectionThreeContent : [ 
      "당신은 소극적 관종이군요!",
      "남들에게 관심 받는 것을 좋아하긴 하지만, 남들의 눈치도 어느 정도 살피는 성격을 가졌을 것이라 생각합니다. 여러 사람들과 두루두루 완만한 관계를 유지하지만, 그 인간관계가 100% 실속 있다고는 생각되지 않습니다.",
      "다른 사람들이 원하는 모습을 최대한 보여주려 하지만, 그 모습이 되려 어색하다 느끼는 사람이 있을 수 있으니 차라리 당신의 본모습을 보여주는 것이 더 좋을지도!",
    ]
  },

  PRO: {
    title: "PRO",
    subTitle: "MZ 호소인형",
    img: PRO_IMG,
    hashTagTop: ["#젊은 꼰대", "#파워T"],
    hashTagBottom: ["#소시오패스", "#똥꼬집", "#근자감"],
    sectionThreeTitle : "당신은 MZ의 절망편",
    sectionThreeContent : [
      "말씀 중에 죄송합니다만, 당신은 절대 MZ가 아닙니다.",
      "당신은 하는 일에 자신감을 가지고 있으며, 다른 사람들과 함께 공동의 목표를 달성해나가는 것을 즐깁니다. 하지만 그 과정에 악의는 없지만, 다른 사람들에게 자신의 의견을 관철시키기 위해 거침없는 태도를 보이는 경우가 있습니다. 약점이라고 생각하는 감정을 드러내는 것을 굉장히 꺼려하는 편입니다.",
      "주변에서 젊은 꼰대라는 말을 자주 듣는 편일 수 있습니다. 자신이 꼰대라는 것을 인정하고 싶지 않아하며, 젊은 세대 속에 끼고 싶어하는 욕구가 드러납니다.",
    ]
  },

  PRS: {
    title: "PRS",
    subTitle: "MZ 하이브리드형",
    img: PRS_IMG,
    hashTagTop: ["#다가가기 어려운", "#공사구분"],
    hashTagBottom: ["#주관이 또렷", "#속을 알 수 없는", "#음침한"],
    sectionThreeTitle : "당신은 MZ의 루시퍼",
    sectionThreeContent: [
      "당신은 MZ와 꼰대가 공존하는 혼종입니다. 하기 싫은 것은 죽어도 안하는 스타일이지만, 동기가 확실한 일에 대해서는 열정적이며 완벽하게 해내는 편입니다.",
      "다가가기 어려운 유형으로 다른 사람들이 당신의 생각을 파악하기 어려워합니다.",
      "공사 구분이 확실한 편",
      "참을성이 있긴 하지만 그리 긴 편은 아닙니다. 기브 앤 테이크가 확실하며, 선의에 의한 도움을 주고 나서는 순간적으로 후회합니다.",
    "취미생활이 다양한 경우가 많으며, 한 가지에 몰두하면 집중력이 굉장히 좋은 편입니다. 본인의 뚜렷한 가치관에 기반하여 친구들을 사귀는 것을 좋아하며, 원치 않게 비위를 맞추는 상황을 굉장히 싫어합니다. 본인이 낸 성과에 대한 확실한 보상을 원하는 편~!",
    ]
  },

  PCO: {
    title: "PCO",
    subTitle: "MZ 관전자형",
    img: PCO_IMG,
    hashTagTop: ["#안읽씹", "#공사구분"],
    hashTagBottom: ["#독립적인", "#기 잘 빨림", "#의외로 친절"],
    sectionThreeTitle : "당신은 MZ 감성 모르면 나가라 ",
    sectionThreeContent: [
      "당신은 어떤 일에 깊게 관여하고 싶지 않아하는 사람입니다. 그래도 1인분은 꾸역꾸역 해내는 당신은 남들에게 폐 끼치는 것을 극도로 싫어합니다. 남들이 자신에게 폐끼치는 것도 극혐한다. 그러나.........후자가 더 크다.......",
      "친해지면 엄청 이상한 모습까지도 보여주지만, 그렇지 않으면 최대한 멀쩡한 사람처럼 보이고자 노력합니다. 당신은 그닥 남들에게 엄청난 관심을 쏟지 않습니다. 그래서인지 안읽씹을 아주 많이 하는데, 스스로 그게 나쁘다고 생각하지는 않습니다.",
      "말을 두루뭉술하게 하는 사람들을 아주 답답해하고, 애매한 것을 좋아하지 않습니다. 본인이 옳다고 주장하는 성격이지만 그것이 틀린 경우가 꽤나 있으며 실수를 인정하는 것을 회피합니다. 그래도 난 멋지다! 응응...",
    ]
  },

  PCS: {
    title: "PCS",
    subTitle: "MZ 말괄량이형",
    img: PCS_IMG,
    hashTagTop: ["#막내st", "#자유분방"],
    hashTagBottom: ["#조용한 관종", "#책임감 강한", "#온순한"],
    sectionThreeTitle : "당신은 MZ 학계의 점심!",
    sectionThreeContent: [
      "의도적으로 관심을 받고 싶지는 않지만 관심받는 것을 꺼려하지 않는 유형",
      "자유분방하지만 가끔은 혼자만의 사색의 시간도 중요한 편입니다. 그렇다고 그 시간이 길어지면 외로움을 타는 편이라 주기적으로 친구들을 만나는 것도 아주 중요합니다. 은은한 관종이기 때문에 본인이 슬쩍 인스타 스토리에 올린 사진을 보고 누군가 관심을 가져준다면 꽤나 뿌듯해합니다. 그렇다고 대놓고 이게 뭐다! 내가 여기있다! 내 사진의 의도는 이거다! 하고 설명하는 사람은 절대 아니며, 오히려 그런건 촌스러운 사람들이나 하는 행동이라 생각합니다.",
      "당신은 살짝의 홍대병이 있으며 그런 자신을 자랑스러워하고 사랑합니다.",
      "당신은 태생적인 애교가 있으며 다른 사람들이 그런 당신을 사랑스럽다 여기는 것을 즐깁니다.",
    ]
  }
}

export default stateData;