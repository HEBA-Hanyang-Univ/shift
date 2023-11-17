const { useState } = require("react")

const DropDown = () => {
  const [isExpand, setIsExpand] = useState(false);
  const [selected, setSelected] = useState("shift01");

  // dummy data 
  const optionData= [
    {optionKey: "shift01", optionName: "1번째 SHIFT"},
    {optionKey: "shift02", optionName: "2번째 SHIFT"}
  ];

  // 마우스 클릭 제어
  const handleMouseDown = (e) => {
    e.preventDefault();

    if (e.target.matches(":focus")) {
      setIsExpand((prev) => !prev);
    } else {
      e.target.focus();
      setIsExpand(() => true);
    }
    return false;
  };

  return (
  <>
    {/* onBlur일 때 드롭다운 닫음 */}
    <div className="dropDownWrapper"
    onBlur={() => {
      setIsExpand(() => false);
    }}
      onMouseDown={(e) => {handleMouseDown(e);}}
    >
      <div>
        <span className={`arrow ${isExpand ? "is-expanded" : ""}`}></span>
        <select name="select" value={selected} onChange={(e) => {
          setSelected(e.target.value);
        }}>
          {optionData.length > 0 && optionData.map(({ optionKey, optionName }) => {
            return (
              <option key={optionKey} value={optionKey}>
                {optionName}
              </option>
            );
          })}
        </select>
      </div>
      {isExpand && (
        <ul>
          {optionData.length > 0 && optionData.map(({ optionKey, optionName }) => {
            return (
              <li key={optionKey}>
                <button buttonid={optionKey} onClick={() => {
                  setSelected(optionKey);
                  setIsExpand(false);
                }}
                className={selected === optionKey ? "selected" : ""}>
                  {optionName}
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  </>
  )
};

export default DropDown;
